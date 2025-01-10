// src/SchoolCatalog.jsx
import { useEffect, useState } from "react";

export default function SchoolCatalog() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

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

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    const filteredCourses = courses.filter((course) => {
        const search = searchTerm.toLowerCase();
        return (
            course.courseNumber.toLowerCase().includes(search) ||
            course.courseName.toLowerCase().includes(search)
        );
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortBy === null) {
            return 0; // No sorting
        }

        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) {
            return sortDirection === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
            return sortDirection === "asc" ? 1 : -1;
        } else {
            return 0;
        }
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
                        <th onClick={() => handleSort("trimester")}>
                            Trimester
                        </th>
                        <th onClick={() => handleSort("courseNumber")}>
                            Course Number
                        </th>
                        <th onClick={() => handleSort("courseName")}>
                            Courses Name
                        </th>
                        <th onClick={() => handleSort("semesterCredits")}>
                            Semester Credits
                        </th>
                        <th onClick={() => handleSort("totalClockHours")}>
                            Total Clock Hours
                        </th>
                        <th>Enroll</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCourses.map((course) => (
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
