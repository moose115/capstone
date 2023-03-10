-- CreateEnum
CREATE TYPE "Actions" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'CREATE_SELF', 'READ_SELF', 'UPDATE_SELF', 'DELETE_SELF');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "userId" STRING NOT NULL,
    "email" STRING(255) NOT NULL,
    "firstName" STRING,
    "lastName" STRING,
    "phoneNumber" CHAR(10),
    "band" STRING,
    "address" STRING,
    "city" STRING,
    "province" STRING,
    "postal" STRING,
    "password_hash" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOL NOT NULL DEFAULT false,
    "confirmationToken" STRING NOT NULL,
    "roleId" INT8 NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" "Roles" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Permission" (
    "name" STRING NOT NULL,
    "action" "Actions" NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("name","action")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "action" "Actions" NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","name","action")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" INT8 NOT NULL DEFAULT unique_rowid(),
    "courseName" STRING NOT NULL,
    "courseDescription" STRING NOT NULL,
    "isOnline" BOOL NOT NULL,
    "canvaLink" STRING,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "userId" STRING NOT NULL,
    "courseId" INT8 NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "scheduleId" INT8 NOT NULL DEFAULT unique_rowid(),
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INT4 NOT NULL,
    "location" STRING NOT NULL,
    "courseId" INT8 NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("scheduleId")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quizId" INT8 NOT NULL DEFAULT unique_rowid(),
    "courseId" INT8 NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizId")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionId" INT8 NOT NULL DEFAULT unique_rowid(),
    "questionText" STRING NOT NULL,
    "quizId" INT8 NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answerId" INT8 NOT NULL DEFAULT unique_rowid(),
    "answerText" STRING NOT NULL,
    "isCorrect" BOOL NOT NULL,
    "questionId" INT8 NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "QuestionFeedback" (
    "feedbackId" INT8 NOT NULL DEFAULT unique_rowid(),
    "feedbackText" STRING NOT NULL,
    "rating" INT4 NOT NULL,
    "questionId" INT8 NOT NULL,

    CONSTRAINT "QuestionFeedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_name_action_fkey" FOREIGN KEY ("name", "action") REFERENCES "Permission"("name", "action") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionFeedback" ADD CONSTRAINT "QuestionFeedback_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
