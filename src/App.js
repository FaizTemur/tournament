import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import TournamentList from './TournamentList';
import TournamentParticipants from './TournamentParticipants'; // Assuming this is your RankingPage.js
import RankingHeader from './RankingHeader';
import Sidebar from './Sidebar';
import SpeakersList from './SpeakersList';
import RankingsPage from './RankingsPage';
import './App.css';

const App = () => {
  const [availableTeamsIds, setAvailableTeamsIds] = useState([]);
  const [roundCategory, setRoundCategory] = useState(null); // State to hold the selected round's category
  const location = useLocation();

  const isParticipantsPage = location.pathname === '/teams';
  const isSpeakersPage = location.pathname === '/speakers';

  // Function to handle round selection in the Sidebar
  const handleRoundSelect = (teamsIds, category) => {
    setAvailableTeamsIds(teamsIds); // Update state with selected round's teams
    setRoundCategory(category); // Update round category
  };

  return (
    <div className="app-container">
      {/* Show RankingHeader and Sidebar on both participants and speakers pages */}
      {(isParticipantsPage || isSpeakersPage) && <RankingHeader />}
      {(isParticipantsPage || isSpeakersPage) && <Sidebar onRoundSelect={handleRoundSelect} />}
      
      <Routes>
        <Route path="/" element={<TournamentList />} />
        <Route
          path="/teams"
          element={<TournamentParticipants availableTeamsIds={availableTeamsIds} roundCategory={roundCategory} />} // Pass the round category
        />
        <Route path="/speakers" element={<SpeakersList />} />
        <Route path="/rankings" element={<RankingsPage />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
