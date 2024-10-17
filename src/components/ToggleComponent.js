import React, { useState, useEffect } from 'react';
import { fetchParticipants } from '../fetchData';

const ToggleComponent = () => {
  const [viewMode, setViewMode] = useState('Speaker');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchParticipants();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setViewMode('Speaker')}>Speaker</button>
      <button onClick={() => setViewMode('Adjudicator')}>Adjudicator</button>

      {viewMode === 'Speaker' ? (
        data
          .filter(item => item.speakerType)
          .map((speaker, index) => (
            <div key={index}>
              <p>Name: {speaker.name}</p>
              <p>Institute: {speaker.institute}</p>
              <p>Team: {speaker.team}</p>
              <p>Contact: {speaker.contact}</p>
              <p>Email: {speaker.email}</p>
              <p>Speaker Type: {speaker.speakerType}</p>
            </div>
          ))
      ) : (
        data
          .filter(item => item.adjudicatorType)
          .map((adjudicator, index) => (
            <div key={index}>
              <p>Name: {adjudicator.name}</p>
              <p>Contact: {adjudicator.contact}</p>
              <p>Email: {adjudicator.email}</p>
              <p>Adjudicator Type: {adjudicator.adjudicatorType}</p>
            </div>
          ))
      )}
    </div>
  );
};

export default ToggleComponent; // Export the component as default
