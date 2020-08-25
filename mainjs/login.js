var firebaseConfig = {
  apiKey: "AIzaSyD7UEf3vueeEIctl1KOdMxylSRQB3o3utw",
  authDomain: "busreservationproject.firebaseapp.com",
  databaseURL: "https://busreservationproject.firebaseio.com",
  projectId: "busreservationproject",
  storageBucket: "busreservationproject.appspot.com",
  messagingSenderId: "634554492338",
  appId: "1:634554492338:web:adacfd468fdf4a1cdd70ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth.Auth.Persistence.LOCAL;

  
  function signin() {
    var email = document.getElementById("emailid").value;
    var password = document.getElementById("pwd").value;
    // alert('Hello');
    if (email != "" && password != "") {
  
      var result = firebase.auth().signInWithEmailAndPassword(email, password);
      result.catch((error) => {
        msg = error.message;
        alert(msg);
        console.log(error.code);
        console.log(msg);
      })
      console.log('Sign in Sucessfull');
      if (firebase.auth().currentUser.emailVerified == true) {
        window.location.href = "index.html";
    }
    } else {
      window.alert('Please Enter the Email and Password');
    }
   
  
  }
  
  
  function signup() {
    var email = document.getElementById("emailid").value;
    var password = document.getElementById("pwd").value;
    // alert('Hello');
    if (email != "" && password != "") {
  
      var result = firebase.auth().createUserWithEmailAndPassword(email, password);
      result.catch((error) => {
        msg = error.message;
        alert(msg);
        // console.log(error.code);
        // console.log(msg);
        return msg;
      }).then((msg) => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(()  =>{ 
          window.alert("Please Verify your Email and Login Again");
          window.location.href = "login.html";
        });
        
      })
  
  
  
    } else {
      window.alert('Please Enter the Email and Password');
    }
  }


  function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('User entered');
      console.log(user);
      // if(user) {
      //   window.location.href = "./index.html";
      // }
      // ...
    }).then(() => {
      window.location.href = "index.html"
    })
    // alert('Hello');
  }
  
  function logOut() {
    firebase.auth().signOut().then(function () {
      console.log('Sign Out Sucessful');
      window.location.href = "login.html";
    }).catch(function (error) {
      alert(error.message);
    });
  }
  
  function forgotPassword() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById('pwdreset').value;
    // alert(emailAddress);
    auth.sendPasswordResetEmail(emailAddress).then(function () {
      window.alert('Password reset link sent to your email ' + emailAddress);
    }).catch(function (error) {
      alert(error.message);
      console.log(error.message);
    });
  }
  
  function passwordChange() {
    var newPassword = document.getElementById('changepassword').value
    var user = firebase.auth().currentUser;
  
      // window.alert(newPassword)
  
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updatePassword(newPassword).then(function () {
            window.alert('Password Changed')
          }).catch(function (error) {
            window.alert(error.message);
            console.log('Error = ' + error.message);
          });
        }
        else{
          alert('User Not Found');
        }
    });
  
  }
  
