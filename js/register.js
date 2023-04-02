// Register a new user
function registerUser() {
    var name = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var database = firebase.database(); // Add this line to reference the database

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential;

            // Save user data to the database
            database.ref('users/' + user.uid).set({
                name: name,
                email: email,
                uid: user.uid
            }).then(() => {
                // Redirect to the chat page
                window.location.href = "chat.html";
            })

        })
        .catch((error) => {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;

            // Display error message
            alert(errorMessage);
        });
}
