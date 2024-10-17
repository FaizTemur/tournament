// fetchData.js
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from './firebaseConfig'; // Import the initialized Firestore instance

// Function to fetch participants data from Firestore
export const fetchParticipants = async () => {
  try {
    // Reference the 'Participants' collection in Firestore
    const participantsCollection = collection(db, 'Participants');
    
    // Get all the documents from the 'Participants' collection
    const participantSnapshot = await getDocs(participantsCollection);
    
    // Map through the documents and return their data
    const participantList = participantSnapshot.docs.map(doc => doc.data());
    
    return participantList; // Return the list of participants
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error; // Rethrow error if needed to handle it elsewhere
  }
};

// Function to fetch teams data from Firestore
export const fetchTeams = async () => {
  try {
    // Reference the 'Teams' collection in Firestore
    const teamsCollection = collection(db, 'Teams');
    
    // Get all the documents from the 'Teams' collection
    const teamsSnapshot = await getDocs(teamsCollection);
    
    // Map through the documents and return their data
    const teamList = teamsSnapshot.docs.map(doc => doc.data());
    
    return teamList; // Return the list of teams
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error; // Rethrow error if needed to handle it elsewhere
  }
};

// Function to fetch speakers data from Firestore
export const fetchSpeakers = async () => {
  try {
    // Reference the 'Speakers' collection in Firestore
    const speakersCollection = collection(db, 'Speakers');
    
    // Get all the documents from the 'Speakers' collection
    const speakersSnapshot = await getDocs(speakersCollection);
    
    // Map through the documents and return their data
    const speakerList = speakersSnapshot.docs.map(doc => doc.data());
    
    return speakerList; // Return the list of speakers
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error; // Rethrow error if needed to handle it elsewhere
  }
};
