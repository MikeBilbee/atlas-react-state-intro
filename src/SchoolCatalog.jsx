// src/SchoolCatalog.jsx
import { useEffect, useState } from "react";

export default function SchoolCatalog() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses.json");
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourses = courses.filter((course) => {
        const search = searchTerm.toLowerCase();
        return (
            course.courseNumber.toLowerCase().includes(search) ||
            course.courseName.toLowerCase().includes(search)
        );
    });

    return (
        <div className="school-catalog">
            <h1>School Catalog</h1>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Trimester</th>
                        <th>Course Number</th>
                        <th>Courses Name</th>
                        <th>Semester Credits</th>
                        <th>Total Clock Hours</th>
                        <th>Enroll</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course) => (
                        <tr key={course.courseNumber}>
                            <td>{course.trimester}</td>
                            <td>{course.courseNumber}</td>
                            <td>{course.courseName}</td>
                            <td>{course.semesterCredits}</td>
                            <td>{course.totalClockHours}</td>
                            <td>
                                <button>Enroll</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}
