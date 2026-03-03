import * as progressService from "../services/progress.service.js";

export const createProgress = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.user?.id) {
      payload.user_id = req.user.id;
    }
    const progress = await progressService.createProgress(payload);
    res.status(201).json(progress);
  } catch (err) {
    next(err);
  }
};

export const getAllProgress = async (_req, res, next) => {
  try {
    const progress = await progressService.getAllProgress();
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressById = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressById(req.params.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressByUser = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressByUser(req.params.userId);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressByLesson = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressByLesson(
      req.params.lessonId
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const updated = await progressService.updateProgress(
      req.params.id,
      req.body
    );
    res.json(updated[1][0]);
  } catch (err) {
    next(err);
  }
};

export const deleteProgress = async (req, res, next) => {
  try {
    await progressService.deleteProgress(req.params.id);
    res.json({ message: "Progress deleted" });
  } catch (err) {
    next(err);
  }
};

export const getLessonStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const status = await progressService.getLessonStatus(
      userId,
      req.params.lessonId
    );
    res.json(status);
  } catch (err) {
    next(err);
  }
};

export const getCourseSummary = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const summary = await progressService.getCourseSummary(
      userId,
      req.params.courseId
    );
    res.json(summary);
  } catch (err) {
    next(err);
  }
};

export const getProgressHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const history = await progressService.getProgressHistory(userId);
    res.json(history);
  } catch (err) {
    next(err);
  }
};

export const syncProgress = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const progress = await progressService.syncProgress(userId, req.body);
    res.status(200).json(progress);
  } catch (err) {
    next(err);
  }
};

export const recordWrongAnswersBulk = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const created = await progressService.recordWrongAnswersBulk(
      userId,
      req.body
    );
    res.status(201).json({ inserted: created.length });
  } catch (err) {
    next(err);
  }
};
