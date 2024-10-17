import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  width: 240px; /* Adjusted width */
  height: 100%;
  background-color: #67d17b; /* Matched green background */
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px; /* Increased gap for better spacing */
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
  box-shadow: 5px 5px 0px #000; /* Increased shadow to make it stand out more */
  cursor: pointer;
  text-align: center;
`;

const SelectBox = styled.div`
  width: 200px;
  height: auto; /* Adjust height to fit content */
  background-color: #b5e3b2; /* Light green background */
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Increase gap between round buttons */
`;

const RoundButton = styled(Button)`
  background-color: #fff; /* White background for round buttons */
  color: #000;
  box-shadow: 0px 0px 0px; /* Remove shadow */
  border: 2px solid #000; /* Added solid black border */
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Button bgColor="#ff6f61">ALL ROUNDS</Button>
      <SelectBox>
        <RoundButton>ROUND 4</RoundButton>
        <RoundButton>ROUND 4</RoundButton>
        <RoundButton>ROUND 5</RoundButton>
        <RoundButton>ROUND 4</RoundButton>
        <RoundButton>ROUND 5</RoundButton>
        <RoundButton>QF</RoundButton>
        <RoundButton>SF</RoundButton>
      </SelectBox>
      <Button bgColor="#ff6f61">TEAMS</Button>
      <Button bgColor="#f7cbc8">SPEAKERS</Button>
    </SidebarContainer>
  );
};

export default Sidebar;
