export type Answer = {
  answerId: number;
  answerText: string;
  isCorrect: boolean;
};

export type QuestionFeedback = {
  feedbackId: number;
  feedbackText: string;
  rating: number;
};

export type Question = {
  questionId: number;
  questionText: string;
  answers: Answer[];
  feedback: QuestionFeedback[];
};

export type Quiz = {
  quizId: number;
  questions: Question[];
};

export type Course = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  isOnline: boolean;
  canvaLink: string?;
  schedules: Schedule[]?;
  quiz: Quiz?;
};
