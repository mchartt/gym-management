import React, { useState, useEffect } from 'react';
import { getMembers, addMember, editMember, deleteMember, Member } from './services/memberService';
import { getCourses, addCourse, editCourse, deleteCourse, Course } from './services/coursseService';
import HomePage from './pages/HomePage/Page';
import MemberListPage from './pages/MembersList/Page';
import CoursesListPage from './components/CoursesList';
import './App.css';
import {APP_VERSION} from "./version";

const App: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [currentPage, setCurrentPage] = useState<string>('home');

    useEffect(() => {
        fetchMembers();
        fetchCourses();
    }, []);

    const fetchMembers = () => {
        const membersData = getMembers();
        setMembers(membersData);
    };

    const fetchCourses = () => {
        const coursesData = getCourses();
        setCourses(coursesData);
    };

    const handleAddMember = (member: Member) => {
        addMember(member);
        fetchMembers();
    };

    const handleEditMember = (id: number, updatedMember: Member) => {
        editMember(id, updatedMember);
        fetchMembers();
        setSelectedMember(null); // Clear selection after editing
    };

    const handleDeleteMember = (id: number) => {
        deleteMember(id);
        fetchMembers();
    };

    const handleAddCourse = (course: Course) => {
        addCourse(course);
        fetchCourses();
    };

    const handleEditCourse = (id: number, updatedCourse: Course) => {
        editCourse(id, updatedCourse);
        fetchCourses();
        setSelectedCourse(null); // Clear selection after editing
    };

    const handleDeleteCourse = (id: number) => {
        deleteCourse(id);
        fetchCourses();
    };

    const handleSelectMember = (id: number) => {
        const member = members.find(member => member.id === id) || null;
        setSelectedMember(member);
    };

    const handleSelectCourse = (id: number) => {
        const course = courses.find(course => course.id === id) || null;
        setSelectedCourse(course);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'members':
                return (
                    <MemberListPage
                        members={members}
                        onEdit={handleSelectMember}
                        onDelete={handleDeleteMember}
                        onAdd={handleAddMember}
                        selectedMember={selectedMember}
                        onEditSubmit={handleEditMember}
                    />
                );
            case 'courses':
                return (
                    <CoursesListPage
                        courses={courses}
                        onEdit={handleSelectCourse}
                        onDelete={handleDeleteCourse}
                        onAdd={handleAddCourse}
                        selectedCourse={selectedCourse}
                        onEditSubmit={handleEditCourse}
                    />
                );
            default:
                return <HomePage navigate={setCurrentPage} />;
        }
    };

    return (
        <div>
            <header className="header">
                <h1>Gym Management Tool</h1>
                <nav>
                    <button onClick={() => setCurrentPage('home')}>Home</button>
                    <button onClick={() => setCurrentPage('members')}>Members</button>
                    <button onClick={() => setCurrentPage('courses')}>Courses</button>
                </nav>
                <div className="version">Version: {APP_VERSION}</div>
            </header>
            {renderPage()}
        </div>
    );
};

export default App;
