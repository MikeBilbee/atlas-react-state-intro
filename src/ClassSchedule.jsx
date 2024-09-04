// ClassSchedule.jsx
import { useContext } from 'react';
import { EnrolledCoursesContext } from './App';

export default function ClassSchedule() {
	const { enrolledCourses, dropCourse } = useContext(EnrolledCoursesContext);

	return (
		<div className="class-schedule">
			<h1>Class Schedule ({enrolledCourses.length} Courses)</h1> 
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
						<tr key={course.id}> 
							<td>{course.courseNumber}</td>
							<td>{course.courseName}</td>
							<td>
								<button onClick={() => dropCourse(course.courseNumber)}>Drop</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
