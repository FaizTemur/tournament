import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './SpeakersList.css';

const SpeakersList = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tournamentRef = collection(db, 'tournaments/TOURNEY_0_AVNT/teams');
        const teamSnapshot = await getDocs(tournamentRef);
        const speakersData = [];

        for (const teamDoc of teamSnapshot.docs) {
          const teamData = teamDoc.data();

          // Fetch speakers for each team
          const speakersCollectionRef = collection(teamDoc.ref, 'speakers');
          const speakersSnapshot = await getDocs(speakersCollectionRef);
          console.log(`Team: ${teamData.teamName}, Speakers Count: ${speakersSnapshot.size}`);

          const speakerScoresMap = {};
          speakersSnapshot.forEach((speakerDoc) => {
            const speakerData = speakerDoc.data();
            const speakerId = speakerDoc.id; 
            const speakerName = speakerData.speakerName; 

            if (speakerId && speakerName) {
              speakerScoresMap[speakerId] = {
                speakerId,
                speakerName,
                teamName: teamData.teamName || 'Unknown Team',
                totalSpeakerScore: 0,
                roundScores: [],
              };
            }
          });

          // Fetch round data for each team
          const roundDataCollectionRef = collection(teamDoc.ref, 'roundData');
          const roundDataSnapshot = await getDocs(roundDataCollectionRef);
          console.log(`Round Data Count for ${teamData.teamName}: ${roundDataSnapshot.size}`);

          roundDataSnapshot.forEach((roundDoc) => {
            const roundData = roundDoc.data();
            console.log(`Processing Round: ${roundDoc.id}`);

            // Check if roundCategory is 0 before processing speaker scores
            if (roundData.roundCategory === 0 && Array.isArray(roundData.speakersInRound)) {
              roundData.speakersInRound.forEach((speaker) => {
                const { speakerId, speakerScore } = speaker;
                console.log(`Found Speaker - ID: ${speakerId}, Score: ${speakerScore}`);

                if (speakerScoresMap[speakerId]) {
                  speakerScoresMap[speakerId].totalSpeakerScore += speakerScore || 0;
                  speakerScoresMap[speakerId].roundScores.push(speakerScore || 0); 
                }
              });
            }
          });

          speakersData.push(...Object.values(speakerScoresMap));
        }

        console.log('Final Speakers Data:', speakersData);
        setSpeakers(speakersData);
      } catch (error) {
        console.error('Error fetching speaker data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="speakers-list">
      <h2>Speakers</h2>
      <div className="table-container">
        <div className="table-header">
          <div className="header-rank">Rank</div>
          <div className="header-speaker-name">Speaker Name</div>
          <div className="header-team-name">Team Name</div>
          <div className="header-total-speaker-score">Total Speaker Score</div>
          <div className="header-round-scores">Round Scores</div>
        </div>
        
        {speakers.map((speaker, index) => (
          <div key={index} className="speaker-row">
            <div className="rank">{index + 1}</div>
            <div className="speaker-name">{speaker.speakerName || 'N/A'}</div>
            <div className="team-name">{speaker.teamName || 'N/A'}</div>
            <div className="total-speaker-score">{speaker.totalSpeakerScore || 'N/A'}</div>
            <div className="round-scores">
              {speaker.roundScores.length > 0 ? (
                speaker.roundScores.map((score, roundIndex) => (
                  <div key={roundIndex}>Round {roundIndex + 1}: {score}</div>
                ))
              ) : (
                <div>No Scores</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakersList;
