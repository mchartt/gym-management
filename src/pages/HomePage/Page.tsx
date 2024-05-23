import React from 'react';

interface HomePageProps {
    navigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    return (
        <div>
            <h2>Welcome to the Gym Management Tool</h2>
            <button onClick={() => navigate('members')}>Go to Members</button>
            <button onClick={() => navigate('courses')}>Go to Courses</button>
        </div>
    );
};

export default HomePage;
