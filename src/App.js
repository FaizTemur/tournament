// src/App.js
import React from 'react';
import TournamentParticipants from './TournamentParticipants'; // Ensure the path is correct
import RankingHeader from './RankingHeader'; // Ensure the path is correct
import Sidebar from './Sidebar';
import './App.css'; // Import overall styling

const App = () => {
    return (
        <div className="app-container">
            <RankingHeader /> {/* Ranking header is now at the top */}
            <Sidebar></Sidebar>
            <TournamentParticipants /> {/* Render the participants below the header */}
        </div>
    );
};

export default App;
