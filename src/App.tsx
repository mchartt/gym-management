import React, { useState, useEffect } from 'react';
import { getMembers, addMember, editMember, deleteMember, Member, usernameExists } from './services/memberService';
import { getCourses, addCourse, editCourse, deleteCourse, Course } from './services/coursseService';
import HomePage from './pages/HomePage/Page';
import MemberListPage from './pages/MembersList/Page';
import CoursesListPage from './components/CoursesList';
import './App.css'; // Include CSS for general styles
import { APP_VERSION } from './version'; // Importa la versione

const App: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchMembers();
        fetchCourses();
    }, []);

    const fetchMembers = () => {
        const membersData = getMembers();
        setMembers(membersData);
        setLoading(false);
    };

    const fetchCourses = () => {
        const coursesData = getCourses();
        setCourses(coursesData);
        setLoading(false);
    };

    const handleAddMember = (member: Member) => {
        if (usernameExists(member.username)) {
            setErrorMessage('Username already exists!');
            return;
        }
        addMember(member);
        fetchMembers();
        setErrorMessage(null);
    };

    const handleEditMember = (id: number, updatedMember: Member) => {
        editMember(id, updatedMember);
        fetchMembers();
        setSelectedMember(null); // Clear selection after editing
        setErrorMessage(null);
    };

    const handleDeleteMember = (id: number) => {
        deleteMember(id);
        fetchMembers();
        setErrorMessage(null);
    };

    const handleAddCourse = (course: Course) => {
        addCourse(course);
        fetchCourses();
        setErrorMessage(null);
    };

    const handleEditCourse = (id: number, updatedCourse: Course) => {
        editCourse(id, updatedCourse);
        fetchCourses();
        setSelectedCourse(null); // Clear selection after editing
        setErrorMessage(null);
    };

    const handleDeleteCourse = (id: number) => {
        deleteCourse(id);
        fetchCourses();
        setErrorMessage(null);
    };

    const handleSelectMember = (id: number) => {
        const member = members.find(member => member.id === id) || null;
        setSelectedMember(member);
        setErrorMessage(null);
    };

    const handleSelectCourse = (id: number) => {
        const course = courses.find(course => course.id === id) || null;
        setSelectedCourse(course);
        setErrorMessage(null);
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

    if (loading) {
        return (
            <div className="loading-page">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

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
            {errorMessage && <div className="error">{errorMessage}</div>}
            {renderPage()}
        </div>
    );
};

export default App;
