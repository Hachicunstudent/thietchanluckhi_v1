// saveToFirestore.js
import {firestore} from '../firebase';
import { addDoc, collection } from 'firebase/firestore';


const removeFalsyValues = (obj) => {
  const cleanedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const cleanedNestedObj = removeFalsyValues(obj[key]);
      if (Object.keys(cleanedNestedObj).length !== 0) {
        cleanedObj[key] = cleanedNestedObj;
      }
    } else if (obj[key]) { // This will check for truthy values, so all falsy values are skipped
      cleanedObj[key] = obj[key];
    }
  }

  return cleanedObj;
};



// Function to save data to Firestore
export const saveDataToFirestore = async (userEmail, data) => {
  try {
    // Log the type of userEmail
    console.log('Type of userEmail:', typeof userEmail, 'Value of userEmail:', userEmail);

    // Ensure that userEmail is a string
    if (typeof userEmail !== 'string' || !userEmail) {
      throw new Error('User email must be a valid string.');
    }

    // Split the email at '@' and take the first part
    const username = userEmail.split('@')[0];
    // Sanitize the username to remove any characters that are not allowed in Firestore collection names
    const sanitizedUsername = username.replace(/[^\w\s]/gi, '_');

    // Remove undefined and empty values from data
    const cleanedData = removeFalsyValues(data);
    console.log('Cleaned data:', cleanedData);

    // Use the sanitized username as the collection name
    const docRef = await addDoc(collection(firestore, sanitizedUsername), cleanedData);

    console.log('Document written with ID: ', docRef.id);

    // Save docRef.id to session storage
    sessionStorage.setItem('docId', docRef.id);

    return true;
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
    return false;
  }
};
