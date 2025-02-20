// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs3ONnZVFAzfR-uxb14QWbahWYh_fMQbA",
  authDomain: "recipe-organizer-45d5d.firebaseapp.com",
  projectId: "recipe-organizer-45d5d",
  storageBucket: "recipe-organizer-45d5d.firebasestorage.app",
  messagingSenderId: "246851132039",
  appId: "1:246851132039:web:18d16a8d1c2340d101f622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Add new recipe
async function addRecipe(name, ingredients, instructions, category, imageUrl) {
    try {
        const docRef = await addDoc(collection(db, "recipes"), {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            category: category,
            imageUrl: imageUrl,
            favorite: false,
            createdAt: new Date().toISOString()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {  
        console.error("Error adding document: ", e);
    }
}

addRecipe("Pancakes", ["flour", "milk", "eggs"], "Mix all ingredients together and cook on a griddle", "Breakfast", "https://www.simplyrecipes.com/thmb/1")