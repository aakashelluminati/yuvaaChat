/* Time */
var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');
deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);

// for (var i = 0; i < messageTime.length; i++) {
	// messageTime[i].innerHTML = moment().format('h:mm A');
// }


// Get a reference to the messages collection
var messagesRef = firebase.database().ref('messages');
  
var conversation = document.querySelector('.conversation-container');
var usersRef = firebase.database().ref('users');
var users = {};
fetchUserData();
loadMessages();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log(user);
      currentUser = user;
      console.log('Logged in as: ' + currentUser.email);
  } else {
      console.log('Logged out');
      window.location.href = "login.html";
  }
});


function fetchUserData(){
    
  usersRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      users[childSnapshot.key] = childData;
    });
  })
  
}


/* Message */

var form = document.querySelector('.conversation-compose');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	var input = e.target.input;
	if (input.value) {
    // Create a new message object
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      message: input.value,
      timestamp: Date.now(),
      username: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid
    });
    input.value = '';
	}
	e.preventDefault();
}

// Load messages from the database
function loadMessages() {
  messagesRef.on('child_added', function(childSnapshot) {
    var element = document.createElement('div');
    var childData = childSnapshot.val();

    // Get username from users table
    var sender = users[childData.uid].name;

    if (childData.uid != firebase.auth().currentUser.uid) {
      element.innerHTML = '<span class="sender">' + sender + '</span> <br>' 
    }   
    element.innerHTML +=  childData.message +
      '<span class="metadata">' +
        '<span class="time">' + moment(childData.timestamp).format('h:mm A') + '</span>' +

        '<span class="tick tick-animation">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
        '</span>' +
      '</span>';

      // if (true) {
      //     element.innerHTML += 
      //     '<span class="tick tick-animation">' +
      //       '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
      //       '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
      //     '</span>' +
      //   '</span>';

      // }else{
      //   element.innerHTML += '</span>';

      // }
  
    if (childData.uid === firebase.auth().currentUser.uid) {
    	element.classList.add('message', 'sent');
    } else {
    	element.classList.add('message', 'received');
    }
		conversation.appendChild(element);
    scrollToBottom();
    animateMessage(element)

  })
}

function scrollToBottom(){
	conversation.scrollTop = conversation.scrollHeight;
}

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
    if(tick){
      tick.classList.remove('tick-animation');
    }
	}, 500);
}


function logout() {
  firebase.auth().signOut();
  window.location.href = "login.html";
}

// Logout button click event
document.getElementById('logoutButton').addEventListener('click', logout);
