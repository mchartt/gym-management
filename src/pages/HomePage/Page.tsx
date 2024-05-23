import React from 'react';

interface HomePageProps {
    navigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    return (
        <div>
            <h2>Welcome to the Gym Management Tool</h2>
            <button onClick={() => window.location.href = 'https://www.coni.it'}>Visit CONI</button>
            <button onClick={() => window.location.href = 'https://www.sportesalute.eu'}>Visit Sport e Salute</button>
            <button onClick={() => window.location.href = 'https://www.sport.governo.it/it/'}>Visit ASD</button>
        </div>
    );
};

export default HomePage;
