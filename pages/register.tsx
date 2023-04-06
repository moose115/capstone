// import Layout from '@/components/layout/Layout';

// const Register = () => {
//   return <Layout>Register</Layout>;
// };

// export default Register;

import { useState } from "react";
import { Course } from "../components/interfaces";
import { coursesData } from "../components/mockData";


export default function Register() {
  const [registeredCourses, setRegisteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );
  const [email, setEmail] = useState<string>("");

  const handleRegistration = () => {
    if (!selectedCourse) {
      alert("Please select a course to register.");
      return;
    }

    if (registeredCourses.find((c) => c.courseId === selectedCourse.courseId)) {
      alert("You have already registered for this course.");
      return;
    }

    setRegisteredCourses([...registeredCourses, selectedCourse]);
    setSelectedCourse(undefined);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Register for Classes</h1>
        <div>
          <label>Email: </label> <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Select a course:</label> <br />
          <select
            value={selectedCourse ? selectedCourse.courseId : ""}
            onChange={(e) =>
              setSelectedCourse(
                coursesData.find((c) => c.courseId === Number(e.target.value))
              )
            }
          >
            <option value="">--Select a course--</option>
            {coursesData.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  );
}
