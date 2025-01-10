// src/App.jsx
import { createContext, useState } from "react";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export const EnrollmentContext = createContext();

export default function App() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const addCourse = (course) => {
        if (
            !enrolledCourses.some((c) => c.courseNumber === course.courseNumber)
        ) {
            setEnrolledCourses([...enrolledCourses, course]);
        }
    };

    const removeCourse = (courseNumber) => {
        setEnrolledCourses(
            enrolledCourses.filter(
                (course) => course.courseNumber !== courseNumber
            )
        );
    };

    return (
        <EnrollmentContext.Provider
            value={{ enrolledCourses, addCourse, removeCourse }}
        >
            <div className="app">
                <Header />
                <SchoolCatalog />
                <ClassSchedule />
            </div>
        </EnrollmentContext.Provider>
    );
}
