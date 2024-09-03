// SchoolCatalog.jsx
import { useState, useEffect } from 'react';

export default function SchoolCatalog() {
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState(null);
	const [sortDirection, setSortDirection] = useState('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(()=> {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('/api/courses.json');

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setCourses(data);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []); 

	const filteredCourses = courses.filter((course) => {
		const query = searchQuery.toLowerCase();
		return (
			course.courseNumber.toLowerCase().includes(query) ||
			course.courseName.toLowerCase().includes(query)
		);
	});

	const handleSort = (column) => {
		if (sortBy === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(column);
			setSortDirection('asc');
		}
	};

	const sortedCourses = [...filteredCourses].sort((a, b) => {
		if (a[sortBy] < b[sortBy]) {
			return sortDirection === 'asc' ? -1 : 1;
		}
		if (a[sortBy] > b[sortBy]) {
			return sortDirection === 'asc' ? 1 : -1;
		}
		return 0;
	});

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem);

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="school-catalog">
			<h1>School Catalog</h1>
			<input 
				type="text" 
				placeholder="Search" 
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<table>
				<thead>
					<tr>
						<th onClick={() => handleSort('trimester')}>Trimester</th>
						<th onClick={() => handleSort('courseNumber')}>Course Number</th>
						<th onClick={() => handleSort('courseName')}>Courses Name</th>
						<th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
						<th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
						<th>Enroll</th>
					</tr>
				</thead>
				<tbody>
					{currentCourses.map((course) => (
						<tr key={course.id}>
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
				<button onClick={handlePrevPage} disabled={currentPage === 1}>
					Previous
				</button>
				<button onClick={handleNextPage} disabled={indexOfLastItem >= sortedCourses.length}>
					Next
				</button>
			</div>
		</div>
	);
}
