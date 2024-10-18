import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './TournamentList.css';

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const fetchTournaments = async () => {
            const tourneyCollection = collection(db, 'tournaments');
            const tourneySnapshot = await getDocs(tourneyCollection);
            const tourneyList = tourneySnapshot.docs.map(doc => doc.data());
            setTournaments(tourneyList);
        };
        fetchTournaments();
    }, [db]);

    const handleTournamentClick = (tourney) => {
        if (tourney) {
            navigate('/teams', { state: { tournament: tourney } });
        }
    };

    return (
        <div className="tournament-list-container">
            <div className="header">
                <h1>Select Tournament</h1>
                <motion.button 
                    className="create-tournament-btn"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/create-tournament')}
                >
                    Create a Tournament
                </motion.button>
            </div>

            <div className="tournament-grid">
                {tournaments.length > 0 ? (
                    tournaments.map((tourney, index) => (
                        <motion.div
                            key={index}
                            className="tournament-card"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleTournamentClick(tourney)}
                        >
                            <div className="tournament-image-placeholder"></div>
                            <div className="tournament-info">
                                <p className="tournament-name"><strong>{tourney.tournamentName}</strong></p>
                                <p className="tournament-type">{tourney.tournamentType}</p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="no-tournaments">
                        <p>No Tournaments Available</p>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            onClick={() => navigate('/create-tournament')}
                        >
                            Would you like to create one?
                        </motion.button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentList;
