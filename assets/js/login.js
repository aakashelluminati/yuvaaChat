// Log in an existing user
function loginUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
  
        // Redirect to the chat page
        window.location.href = "chat.html";
      })
      .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
  
        // Display error message
        alert(errorMessage);
      });
  }
  