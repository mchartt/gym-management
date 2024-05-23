import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './CourseList.css';

interface Course {
    id: number;
    name: string;
    description: string;
    startDate: string;
}

interface CoursesListPageProps {
    courses: Course[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAdd: (course: Course) => void;
    selectedCourse: Course | null;
    onEditSubmit: (id: number, updatedCourse: Course) => void;
}

const CoursesListPage: React.FC<CoursesListPageProps> = ({
                                                             courses,
                                                             onEdit,
                                                             onDelete,
                                                             onAdd,
                                                             selectedCourse,
                                                             onEditSubmit,
                                                         }) => {
    const [course, setCourse] = useState<Course>(
        selectedCourse || { id: 0, name: '', description: '', startDate: '' }
    );

    useEffect(() => {
        if (selectedCourse) {
            setCourse(selectedCourse);
        } else {
            setCourse({ id: 0, name: '', description: '', startDate: '' });
        }
    }, [selectedCourse]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedCourse) {
            onEditSubmit(selectedCourse.id, course);
        } else {
            onAdd(course);
        }
        setCourse({ id: 0, name: '', description: '', startDate: '' });
    };

    return (
        <div>
            <h2>Courses</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={course.name}
                    onChange={handleChange}
                    placeholder="Course Name"
                />
                <input
                    type="text"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    placeholder="Course Description"
                />
                <input
                    type="date"
                    name="startDate"
                    value={course.startDate}
                    onChange={handleChange}
                    placeholder="Start Date"
                />
                <button type="submit">{selectedCourse ? 'Edit' : 'Add'} Course</button>
            </form>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        {course.name} - {course.description} - Start Date: {course.startDate}
                        <button onClick={() => onEdit(course.id)}>Edit</button>
                        <button onClick={() => onDelete(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoursesListPage;
