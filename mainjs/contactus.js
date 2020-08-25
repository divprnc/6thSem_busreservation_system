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

  var  userEmail;
  var  userName;
  var  userID;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User Signed In");
      var users = firebase.auth().currentUser;
      userEmail = users.email;
      userID = users.uid;
      userName = users.displayName;
      document.getElementById("cust-mail").value = userEmail
      document.getElementById("cust-name").value = userName
      
    } else {
      console.log("User not signed in")
    }
    
  });


  const db = firebase.firestore();
  function contactUs() {
    contact =  {
        "Name": userName,
        "UID": userID,
        "Email": userEmail,
        "Message": document.getElementById("messages").value,
    }
    // console.log(docRef)
    db.collection("ContactUs").add(contact).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);       
         var helpingid = docRef.id;
         return helpingid;
       }).then((helpingid) => {
           window.alert("Your Request Number is " + helpingid);
           window.location.href = "contact.html"
       })

  }