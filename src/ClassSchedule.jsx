// src/ClassSchedule.jsx
import { useContext } from "react";
import { EnrollmentContext } from "./App";

export default function ClassSchedule() {
    const { enrolledCourses, removeCourse } = useContext(EnrollmentContext);

    return (
        <div className="class-schedule">
            <h1>Class Schedule ({enrolledCourses.length})</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course Number</th>
                        <th>Course Name</th>
                        <th>Drop</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledCourses.map((course) => (
                        <tr key={course.courseNumber}>
                            <td>{course.courseNumber}</td>
                            <td>{course.courseName}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        removeCourse(course.courseNumber)
                                    }
                                >
                                    Drop
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
