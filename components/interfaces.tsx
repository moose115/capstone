export interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  isOnline: boolean;
  canvaLink?: string;
  schedules?: Schedule[];
  quiz?: Quiz;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  band: string;
  address: string;
  city: string;
  province: string;
  courses?: Course[];
  role: Role;
}

export interface Schedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Quiz {
  quizId: number;
  quizName: string;
  numberOfQuestions: number;
  passingScore: number;
}

export enum Role {
  STUDENT = "Student",
  TEACHER = "Teacher"
}
