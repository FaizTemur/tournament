import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore'; 
import './TournamentParticipants.css'; 
  
const TournamentParticipants = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
               
                const tournamentDoc = doc(db, 'tournaments', 'TOURNEY_0_AVNT');

                const docSnapshot = await getDoc(tournamentDoc);

             
                console.log("Document Snapshot:", docSnapshot);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const noviceTeams = data.noviceBreakingTeams || [];
                    const openTeams = data.openBreakingTeams || [];

                    setTeams([...noviceTeams, ...openTeams]);
                } else {
                    setError('No data found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="teams-container">
            <h2 className="teams-title">Teams</h2>
            <table className="teams-table">
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Team Name</th>
                        <th>Institute</th>
                        <th>Positions</th>
                        <th>Points</th>
                        <th>Scores</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td> 
                            <td>{team}</td> 
                            <td>Institute Placeholder</td> 
                            <td>Position Placeholder</td>
                            <td>Points Placeholder</td>
                            <td>Scores Placeholder</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TournamentParticipants;
