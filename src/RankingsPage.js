import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useState, useEffect } from 'react';
import './RankingsPage.css'; 

function RankingsPage() {
  const [view, setView] = useState('adjudicators');
  const [adjudicators, setAdjudicators] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchAdjudicators = async () => {
      const querySnapshot = await getDocs(collection(db, 'tournaments/TOURNEY_0_AVNT/adjudicators'));
      const adjudicatorData = querySnapshot.docs.map(doc => doc.data());
      setAdjudicators(adjudicatorData);
    };

    const fetchSpeakers = async () => {
      const teamsSnapshot = await getDocs(collection(db, 'tournaments/TOURNEY_0_AVNT/teams'));
      const speakerData = [];
    
      console.log('Teams Snapshot:', teamsSnapshot.docs); // Log the teams snapshot

      for (const teamDoc of teamsSnapshot.docs) {
        const team = teamDoc.data();
        
        // Log the team data for debugging
        console.log('Team Data:', team);

        const teamName = team.teamName || "Unknown Team";
        const institutionID = team.institutionID || "Unknown Institution";  // Check if institutionID is fetched
        
        // Log to check if institutionID exists
        console.log(`Team: ${teamName}, Institution ID: ${institutionID}`);

        // If institutionID is missing, log a warning
        if (!team.institutionID) {
          console.warn(`Missing institutionID for team: ${teamName}`);
        }

        // Fetch speakers for each team
        const teamSpeakers = await getDocs(collection(db, `tournaments/TOURNEY_0_AVNT/teams/${teamDoc.id}/speakers`));
    
        // Iterate through the speakers
        teamSpeakers.forEach(speakerDoc => {
          const speaker = speakerDoc.data();
          const speakerName = speaker.speakerName || "Unknown Speaker";

          speakerData.push({
            speakerName: speakerName,
            teamName: teamName,
            institutionID: institutionID,  // Ensure the institutionID is passed correctly
          });
        });
      }
    
      setSpeakers(speakerData);
    };

    fetchAdjudicators();
    fetchSpeakers();
  }, []);

  return (
    <div>
      <div className="toggle-buttons">
        <button className={view === 'adjudicators' ? 'active' : ''} onClick={() => setView('adjudicators')}>Adjudicators</button>
        <button className={view === 'speakers' ? 'active' : ''} onClick={() => setView('speakers')}>Speakers</button>
      </div>
      {view === 'adjudicators' ? <AdjudicatorsTable adjudicators={adjudicators} /> : <SpeakersTable speakers={speakers} />}
    </div>
  );
}

function AdjudicatorsTable({ adjudicators }) {
  return (
    <div className="table">
      <h3>Adjudicators</h3>
      <div className="table-header">
        <span>Adjudicator Name</span>
        <span>Institution ID</span>
      </div>
      {adjudicators.map((adj, index) => (
        <div key={index} className="table-row">
          <span>{adj.adjudicatorName}</span>
          <span>{adj.institutionID}</span>
        </div>
      ))}
    </div>
  );
}

function SpeakersTable({ speakers }) {
  return (
    <div className="table">
      <h3>Speakers</h3>
      <div className="table-header">
        <span>Speaker Name</span>
        <span>Team Name</span>
        <span>Institution ID</span>
      </div>
      {speakers.map((speaker, index) => (
        <div key={index} className="table-row">
          <span>{speaker.speakerName}</span>
          <span>{speaker.teamName}</span>
          <span>{speaker.institutionID}</span>
        </div>
      ))}
    </div>
  );
}

export default RankingsPage;
