// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAiEQ5nJL1tTKgzkYPI_Rs75jUqMKnyCfc",
    authDomain: "yuvaachat.firebaseapp.com",
    databaseURL: "https://yuvaachat-default-rtdb.firebaseio.com",
    projectId: "yuvaachat",
    storageBucket: "yuvaachat.appspot.com",
    messagingSenderId: "642117353639",
    appId: "1:642117353639:web:5c29510e3d245fb19a1b82"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();