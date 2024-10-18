import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  width: 240px;
  height: 100%;
  background-color: #67d17b;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Button = styled.button`
  width: 180px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.bgColor};
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px 0px #000;
  cursor: pointer;
  text-align: center;
`;

const SelectBox = styled.div`
  width: 200px;
  background-color: #b5e3b2;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RoundButton = styled(Button)`
  background-color: #fff;
  color: #000;
  box-shadow: 0px 0px 0px;
  border: 2px solid #000;
`;

const Sidebar = ({ onRoundSelect }) => {
  const [completedRounds, setCompletedRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRounds = async () => {
      const db = getFirestore();
      const prelimsCollection = collection(db, "tournaments", "TOURNEY_0_AVNT", "PreLim");
      const querySnapshot = await getDocs(prelimsCollection);

      const rounds = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.roundState === 2) {
          rounds.push({
            id: doc.id,
            ...data,
          });
        }
      });

      setCompletedRounds(rounds);
      setLoading(false);
    };

    fetchRounds();
  }, []);

  const handleRoundClick = (round) => {
    const teamName = round.teamName || `Team for Round ${round.id}`;
    onRoundSelect(teamName); // Pass the selected team name back to the parent
  };

  const handleParticipantsClick = () => {
    navigate('/rankings'); // Navigate to the Rankings page
  };

  const handleSpeakersClick = () => {
    navigate('/speakers'); // Navigate to the Speakers page
  };

  return (
    <SidebarContainer>
      <Button bgColor="#ff6f61">ALL ROUNDS</Button>
      <SelectBox>
        {loading ? (
          <p>Loading...</p>
        ) : completedRounds.length === 0 ? (
          <p>No Rounds Completed</p>
        ) : (
          completedRounds.map((round, index) => (
            <RoundButton key={round.id} onClick={() => handleRoundClick(round)}>
              {`Round ${index + 1}`}
            </RoundButton>
          ))
        )}
      </SelectBox>
      <Button bgColor="#ff6f61" onClick={handleParticipantsClick}>PARTICIPANTS</Button>
      <Button bgColor="#f7cbc8" onClick={handleSpeakersClick}>SPEAKERS</Button>
    </SidebarContainer>
  );
};

export default Sidebar;
