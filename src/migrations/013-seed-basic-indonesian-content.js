export async function up({ context: queryInterface }) {
  const now = new Date();

  // 1) Course
  const [courseRows] = await queryInterface.sequelize.query(
    `
      INSERT INTO "Courses" ("title", "description", "createdAt", "updatedAt")
      VALUES (:title, :desc, :now, :now)
      RETURNING id;
    `,
    {
      replacements: {
        title: "Bahasa Indonesia Dasar",
        desc: "Materi sapaan, perkenalan, dan latihan dasar.",
        now,
      },
    }
  );
  const courseId = courseRows[0].id;

  // 2) Lessons
  const [lessonRows] = await queryInterface.sequelize.query(
    `
      INSERT INTO "Lessons"
        ("course_id","title","type","content","lesson_order","createdAt","updatedAt")
      VALUES
        (:cid, 'Salam dan Perkenalan', 'material',
          'Halo! Di pelajaran ini kamu belajar sapaan dasar: Halo, Selamat pagi/siang/sore/malam, dan cara memperkenalkan diri singkat.',
          1, :now, :now),
        (:cid, 'Kartu Sapaan', 'flashcard', NULL, 2, :now, :now),
        (:cid, 'Pilihan Ganda Sapaan', 'multiple_choice', NULL, 3, :now, :now)
      RETURNING id, title;
    `,
    { replacements: { cid: courseId, now } }
  );

  const flashcardLessonId =
    lessonRows.find((l) => l.title === "Kartu Sapaan")?.id ?? lessonRows[1].id;
  const quizLessonId =
    lessonRows.find((l) => l.title === "Pilihan Ganda Sapaan")?.id ?? lessonRows[2].id;

  // 3) Flashcards
  await queryInterface.bulkInsert("LessonFlashcards", [
    {
      lesson_id: flashcardLessonId,
      card_order: 1,
      front_text: "Good morning",
      back_text: "Selamat pagi",
      createdAt: now,
      updatedAt: now,
    },
    {
      lesson_id: flashcardLessonId,
      card_order: 2,
      front_text: "Good night",
      back_text: "Selamat malam",
      createdAt: now,
      updatedAt: now,
    },
    {
      lesson_id: flashcardLessonId,
      card_order: 3,
      front_text: "Thank you",
      back_text: "Terima kasih",
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // 4) Lesson questions + options
  const [questionRows] = await queryInterface.sequelize.query(
    `
      INSERT INTO "LessonQuestions"
        ("lesson_id","question_order","prompt","explanation","createdAt","updatedAt")
      VALUES
        (:lid, 1, 'Terjemahan ''Good night'' adalah ...', 'Dipakai untuk berpamitan malam hari', :now, :now),
        (:lid, 2, 'Sapaan yang tepat untuk pagi hari?', NULL, :now, :now)
      RETURNING id, question_order;
    `,
    { replacements: { lid: quizLessonId, now } }
  );

  const q1 = questionRows.find((q) => q.question_order === 1) ?? questionRows[0];
  const q2 = questionRows.find((q) => q.question_order === 2) ?? questionRows[1];

  await queryInterface.bulkInsert("LessonQuestionOptions", [
    // q1
    {
      question_id: q1.id,
      option_order: 1,
      option_text: "Selamat siang",
      is_correct: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      question_id: q1.id,
      option_order: 2,
      option_text: "Selamat malam",
      is_correct: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      question_id: q1.id,
      option_order: 3,
      option_text: "Selamat pagi",
      is_correct: false,
      createdAt: now,
      updatedAt: now,
    },
    // q2
    {
      question_id: q2.id,
      option_order: 1,
      option_text: "Selamat pagi",
      is_correct: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      question_id: q2.id,
      option_order: 2,
      option_text: "Selamat malam",
      is_correct: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      question_id: q2.id,
      option_order: 3,
      option_text: "Halo",
      is_correct: false,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // 5) Exam + questions/options
  const [examRows] = await queryInterface.sequelize.query(
    `
      INSERT INTO "Exams"
        ("course_id","lesson_id","title","description","total_questions","passing_score","createdAt","updatedAt")
      VALUES
        (:cid, :lid, 'Ujian Akhir - Sapaan Dasar', 'Evaluasi pemahaman sapaan dasar Bahasa Indonesia.', 2, 80, :now, :now)
      RETURNING id;
    `,
    { replacements: { cid: courseId, lid: quizLessonId, now } }
  );
  const examId = examRows[0].id;

  const [examQuestionRows] = await queryInterface.sequelize.query(
    `
      INSERT INTO "ExamQuestions"
        ("exam_id","type","prompt","createdAt","updatedAt")
      VALUES
        (:eid, 'multiple_choice', 'Apa arti ''Good morning''?', :now, :now),
        (:eid, 'multiple_choice', 'Sapaan yang tepat untuk waktu malam?', :now, :now)
      RETURNING id, prompt;
    `,
    { replacements: { eid: examId, now } }
  );

  const eq1 = examQuestionRows[0];
  const eq2 = examQuestionRows[1];

  await queryInterface.bulkInsert("ExamQuestionOptions", [
    // eq1
    { question_id: eq1.id, text: "Selamat pagi", is_correct: true, createdAt: now, updatedAt: now },
    { question_id: eq1.id, text: "Selamat siang", is_correct: false, createdAt: now, updatedAt: now },
    { question_id: eq1.id, text: "Selamat malam", is_correct: false, createdAt: now, updatedAt: now },
    // eq2
    { question_id: eq2.id, text: "Selamat pagi", is_correct: false, createdAt: now, updatedAt: now },
    { question_id: eq2.id, text: "Selamat malam", is_correct: true, createdAt: now, updatedAt: now },
    { question_id: eq2.id, text: "Halo", is_correct: false, createdAt: now, updatedAt: now },
  ]);
}

export async function down({ context: queryInterface }) {
  // Clean up seeded data by titles
  await queryInterface.sequelize.query(`
    DELETE FROM "ExamQuestionOptions" WHERE "question_id" IN (
      SELECT id FROM "ExamQuestions" WHERE exam_id IN (
        SELECT id FROM "Exams" WHERE title = 'Ujian Akhir - Sapaan Dasar'
      )
    );
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "ExamQuestions" WHERE exam_id IN (
      SELECT id FROM "Exams" WHERE title = 'Ujian Akhir - Sapaan Dasar'
    );
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "Exams" WHERE title = 'Ujian Akhir - Sapaan Dasar';
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "LessonQuestionOptions" WHERE "question_id" IN (
      SELECT id FROM "LessonQuestions" WHERE "lesson_id" IN (
        SELECT id FROM "Lessons" WHERE title IN ('Kartu Sapaan', 'Pilihan Ganda Sapaan', 'Salam dan Perkenalan')
      )
    );
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "LessonQuestions" WHERE "lesson_id" IN (
      SELECT id FROM "Lessons" WHERE title = 'Pilihan Ganda Sapaan'
    );
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "LessonFlashcards" WHERE "lesson_id" IN (
      SELECT id FROM "Lessons" WHERE title = 'Kartu Sapaan'
    );
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "Lessons" WHERE title IN ('Salam dan Perkenalan', 'Kartu Sapaan', 'Pilihan Ganda Sapaan');
  `);

  await queryInterface.sequelize.query(`
    DELETE FROM "Courses" WHERE title = 'Bahasa Indonesia Dasar';
  `);
}
