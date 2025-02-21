// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();


// DOM Elements
const recipeForm = document.getElementById('recipeForm');
const recipeInput = document.getElementById('recipeInput');
const recipeList = document.getElementById('recipes');
const filterInput = document.getElementById('filterInput');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const homeBtn = document.getElementById('homeBtn');
const favoritesBtn = document.getElementById('favoritesBtn');

// State
let editingId = null;

// Load Recipes
function loadRecipes(filter = '') {
    recipeList.innerHTML = '';
    db.collection('recipes').get().then((snapshot) => {
        snapshot.forEach(doc => {
            const recipe = { id: doc.id, ...doc.data() };
            if (filter === '' || 
                recipe.ingredients.toLowerCase().includes(filter.toLowerCase()) || 
                recipe.mealType.toLowerCase().includes(filter.toLowerCase())) {
                displayRecipe(recipe);
            }
        });
    });
}

// Display Recipe
function displayRecipe(recipe) {
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <p>${recipe.favorite ? '⭐ Favorite' : ''}</p>
        <button onclick="editRecipe('${recipe.id}')">Edit</button>
        <button onclick="deleteRecipe('${recipe.id}')">Delete</button>
    `;
    recipeList.appendChild(li);
}

// Add/Edit Recipe
recipeInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const recipe = {
        name: document.getElementById('recipeName').value,
        ingredients: document.getElementById('ingredients').value,
        instructions: document.getElementById('instructions').value,
        mealType: document.getElementById('mealType').value,
        favorite: document.getElementById('favorite').checked
    };

    if (editingId) {
        db.collection('recipes').doc(editingId).update(recipe).then(() => {
            alert('Recipe updated!');
            editingId = null;
            recipeInput.reset();
            recipeForm.style.display = 'none';
            loadRecipes();
        });
    } else {
        db.collection('recipes').add(recipe).then(() => {
            alert('Recipe added!');
            recipeInput.reset();
            recipeForm.style.display = 'none';
            loadRecipes();
        });
    }
});

// Edit Recipe
function editRecipe(id) {
    editingId = id;
    db.collection('recipes').doc(id).get().then(doc => {
        const recipe = doc.data();
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('ingredients').value = recipe.ingredients;
        document.getElementById('instructions').value = recipe.instructions;
        document.getElementById('mealType').value = recipe.mealType;
        document.getElementById('favorite').checked = recipe.favorite;
        recipeForm.style.display = 'block';
    });
}

// Delete Recipe
function deleteRecipe(id) {
    if (confirm('Are you sure?')) {
        db.collection('recipes').doc(id).delete().then(() => {
            alert('Recipe deleted!');
            loadRecipes();
        });
    }
}

// Navigation
addRecipeBtn.addEventListener('click', () => {
    recipeForm.style.display = 'block';
    recipeInput.reset();
    editingId = null;
});
homeBtn.addEventListener('click', () => {
    recipeForm.style.display = 'none';
    loadRecipes();
});
favoritesBtn.addEventListener('click', () => {
    recipeForm.style.display = 'none';
    loadRecipes('favorite'); // Simplified filter for favorites
});

// Filter Recipes
filterInput.addEventListener('input', (e) => loadRecipes(e.target.value));

// Initial Load
loadRecipes();


const chatInput = document.getElementById('chatInput');
const chatSubmit = document.getElementById('chatSubmit');
const chatResponse = document.getElementById('chatResponse');

chatSubmit.addEventListener('click', () => {
    const ingredients = chatInput.value;
    chatResponse.textContent = `Try making a simple dish with ${ingredients}! How about ${ingredients.split(',').join(' and ')} salad?`;
});


function mockBiometricLogin() {
    if (confirm('Simulate fingerprint scan?')) {
        alert('Logged in!');
        document.body.style.display = 'block'; // Show app
    } else {
        alert('Login failed.');
    }
}
document.body.style.display = 'none'; // Hide until login
mockBiometricLogin();


