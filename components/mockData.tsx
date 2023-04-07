import { Course, User, Role } from "./interfaces";

export const coursesData: Course[] = [
  {
    courseId: 1,
    courseName: "Breastfeeding Essential Class",
    courseDescription: "A beginner's guide to Anything",
    isOnline: true,
    canvaLink: "https://www.canva.com",
    schedules: [
      {
        dayOfWeek: "Monday",
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      },
      {
        dayOfWeek: "Wednesday",
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      }
    ],
    quiz: {
      quizId: 1,
      quizName: "Introduction to Anything Quiz",
      numberOfQuestions: 10,
      passingScore: 70
    }
  },
  {
    courseId: 2,
    courseName: "Advanced Anything",
    courseDescription: "An advanced guide to Anything",
    isOnline: true,
    canvaLink: "https://www.canva.com",
    schedules: [
      {
        dayOfWeek: "Tuesday",
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      },
      {
        dayOfWeek: "Thursday",
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      }
    ],
    quiz: {
      quizId: 2,
      quizName: "Advanced Anything Quiz",
      numberOfQuestions: 15,
      passingScore: 80
    }
  },
  {
    courseId: 3,
    courseName: "Introduction to Types of Anything",
    courseDescription: "A beginner's guide to Types of Anything",
    isOnline: true,
    canvaLink: "https://www.canva.com",
    schedules: [
      {
        dayOfWeek: "Monday",
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      },
      {
        dayOfWeek: "Wednesday",
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      }
    ],
    quiz: {
      quizId: 3,
      quizName: "Introduction to Types of Anything Quiz",
      numberOfQuestions: 10,
      passingScore: 70
    }
  }
];

export const userData: User[] = [
  {
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "555-555-5555",
    band: "A",
    address: "123 Main St",
    city: "Anytown",
    province: "AB",
    courses: [],
    role: Role.STUDENT
  }
  
];

