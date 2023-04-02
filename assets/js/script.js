function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function() {
            window.location.href = "profile.html";
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
}
