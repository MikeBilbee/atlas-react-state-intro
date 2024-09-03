// App.jsx 
import { createContext, useState } from 'react'
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export const EnrolledCoursesContext = createContext([]);

export default function App() {
	const [enrolledCourses, setEnrolledCourses] = useState([]);

	const enrollCourse = (course) => {
		setEnrolledCourses([...enrolledCourses, course]);
	};

	const dropCourse = (courseNumber) => {
		setEnrolledCourses(enrolledCourses.filter(c => c.courseNumber !== courseNumber));
	};

	return (
		<div>
			<EnrolledCoursesContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
				<Header />
				<SchoolCatalog />
				<ClassSchedule />
			</EnrolledCoursesContext.Provider>
		</div>
	);
}
