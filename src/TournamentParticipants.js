import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; 
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'; 
import './TournamentParticipants.css'; 

const TournamentParticipants = ({ selectedTeam }) => {
    const [teams, setTeams] = useState([]);
    const [institutions, setInstitutions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const tournamentDoc = doc(db, 'tournaments', 'TOURNEY_0_AVNT');
                const docSnapshot = await getDoc(tournamentDoc);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const noviceTeams = data.noviceBreakingTeams || [];
                    const openTeams = data.openBreakingTeams || [];

                    console.log("Novice Teams: ", noviceTeams); // Debug teams
                    console.log("Open Teams: ", openTeams); 

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

        const fetchInstitutions = async () => {
            try {
                const institutionCollection = collection(db, 'tournaments', 'TOURNEY_0_AVNT', 'institutions');
                const institutionDocs = await getDocs(institutionCollection);
                const institutionMap = {};

                institutionDocs.forEach(doc => {
                    const institutionData = doc.data();
                    console.log("Institution Data: ", doc.id, institutionData); // Debug institution data
                    institutionMap[doc.id] = institutionData.institutionAbbreviation;
                });

                setInstitutions(institutionMap);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTeams();
        fetchInstitutions();
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            setTeams((prevTeams) => {
                const updatedTeams = [...prevTeams];
                updatedTeams[0] = selectedTeam;
                return updatedTeams;
            });
        }
    }, [selectedTeam]);

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
                            <td>{institutions[team] || 'Unknown'}</td> {/* Fetch institution abbreviation */}
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
