import { Lesson } from '../models/lesson.model.js';
import { LessonFlashcard } from '../models/lessonFlashcard.model.js';
import { LessonQuestion } from '../models/lessonQuestion.model.js';
import { LessonQuestionOption } from '../models/lessonQuestionOption.model.js';


const lessonIncludes = [
  {
    model: LessonFlashcard,
    as: 'flashcards',
    required: false,
    separate: false,
  },
  {
    model: LessonQuestion,
    as: 'questions',
    required: false,
    include: [
      {
        model: LessonQuestionOption,
        as: 'options',
        required: false,
      },
    ],
  },
];

const lessonOrder = [
  ['lesson_order', 'ASC'],
  [{ model: LessonFlashcard, as: 'flashcards' }, 'card_order', 'ASC'],
  [{ model: LessonQuestion, as: 'questions' }, 'question_order', 'ASC'],
  [
    { model: LessonQuestion, as: 'questions' },
    { model: LessonQuestionOption, as: 'options' },
    'option_order',
    'ASC',
  ],
];

export const createLesson = async (data) => Lesson.create(data);

export const getLessonsByCourseId = async (courseId) =>
  Lesson.findAll({
    where: { course_id: courseId },
    include: lessonIncludes,
    order: lessonOrder,
  });

export const getLessonById = async (id) =>
  Lesson.findByPk(id, { include: lessonIncludes, order: lessonOrder });

export const updateLesson = async (id, updates) =>
  Lesson.update(updates, { where: { id }, returning: true });

export const deleteLesson = async (id) => Lesson.destroy({ where: { id } });
