export interface Course {
    id: number;
    name: string;
    description: string;
    startDate: string;
}

let courses: Course[] = [
    // Aggiungi qui i tuoi corsi fittizi
];

export const getCourses = () => courses;

export const addCourse = (course: Course) => {
    courses.push(course);
};

export const editCourse = (id: number, updatedCourse: Course) => {
    courses = courses.map(course => (course.id === id ? updatedCourse : course));
};

export const deleteCourse = (id: number) => {
    courses = courses.filter(course => course.id !== id);
};


// bisogna rivedere l'user-name perche si puo duplicare