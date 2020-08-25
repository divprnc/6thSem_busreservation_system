
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
const db = firebase.firestore();
var urlParams = new URLSearchParams(window.location.search);
busid = urlParams.get('id');

var Basictravellerdata ={}
var EachSeatPrice ;
var docRef = db.collection("Buses").doc(busid);
docRef.get().then(function(doc) {
  if (doc.exists) {
    data = doc.data()
    Basictravellerdata["BusData"] = {
      "BoardingTime": data.BoardingTime,
      "DroppingTime": data.DroppingTime,
      "From": data.From,
      "To": data.To,
      "DepartureDate": data.DepartureDate,
      "TourName": data.TourName,
      "SeatPrice": data.SeatPrice
    }
    EachSeatPrice = data.SeatPrice
      // console.log("Document data:", doc.data());
  } else {
      // console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User Signed In");
    var users = firebase.auth().currentUser;
    Basictravellerdata["Basic"] = {
      "UserEmail":  users.email,
      "UserId":  users.uid,
      "BusID": busid
    }
  } else {
    console.log("User not signed in")
  }
  Basictravellerdata["BusId"] = busid
});

db.collection('Buses').doc(busid).get().then((doc) => {
  let html = '';
  var data = doc.data();
  html += `<img src="${data.ImageLink}" class="d-block w-100" alt="">`
  document.getElementById("set-image").innerHTML = html;
}).catch((e) => {
  console.log(e);
})

db.collection('Buses').doc(busid).get().then((doc) => {
  let html = '';
  var data = doc.data();
  
  html += `

    <div class="room-features-area d-flex flex-wrap mb-50">
    <h6>Boarding Time <span>${data.BoardingTime}</span></h6>
    <h6>Dropping Time <span>${data.DroppingTime}</span></h6>
    <h6>Seats Left <span>${data.SeatsLeft}</span></h6>
    <h6>Price <span>₹${data.SeatPrice}</span></h6>
    </div>

    `
  document.getElementById("bus-details").innerHTML = html;
}).catch((e) => {
  console.log(e);
})

// console.log(busid)



// let Razorpay = 
function printData() {




  let checks = document.getElementsByClassName('checkme');
  // console.log(checks);
  let count = 0;
  let seats = [];
  for (i = 0; i < checks.length; i++) {
      if (checks[i].checked === true) {
          // console.log("Valuess -> " + checks[i].value)
          seats.push(parseInt(checks[i].value))
          count++;
      } else {
          // console.log("Not ->" + i)
      }
  }
  Basictravellerdata["AllSeat"] = seats
  // console.log("Count - .>" + count)
  var custname = document.getElementsByClassName("cust-name");
  var custage = document.getElementsByClassName("cust-age");
  var custMale = document.getElementsByClassName("cust-male");
  var custFemale = document.getElementsByClassName("cust-female");
  // console.log(data);
  

  // Saving Traveller Data to the Database
  var data = {}
  
  let gender ;
    console.log("Seats -> " + seats);
    for(j = 0; j<count;j++) {
        // console.log("Traveller - " + (j+1))
        // console.log("Name ->" + custname[j].value)
        // console.log("Age ->" + custage[j].value)
        if(custMale[j].checked === true){
            // console.log("Gender ->" + custMale[j].value)
            gender = custMale[j].value
        }else{
            
            // console.log("Gender ->" + custFemale[j].value)
            gender = custFemale[j].value
        }
        // console.log("Seat Number -> " + seats[j])
        if(!(custname[j].value == "" || custage[j].value == "" || gender == ""))
        {
          Basictravellerdata["Traveller" +(j+1)] = {
              "Name": custname[j].value,
              "Age": custage[j].value,
              "Gender" : gender,
              "SeatNumber": seats[j],
          }
        }else{
          alert("Please Fill all the Details");
          break;
        }

    }

  
    bookTicket(Basictravellerdata);
}


function bookTicket(custData){

    
  // var data = custData
  const db = firebase.firestore();
  console.log(custData)

 db.collection("BookedTicketData").add(custData).then((docRef) => {
   console.log("Document written with ID: ", docRef.id);
   did = docRef.id
   return  did
  }).then((orderid) => {

    
  // Getting the number of seat to update

  var docRef = db.collection("Buses").doc(busid);

  docRef.get().then(function(doc) {
      if (doc.exists) {
        data = doc.data()
          // console.log("Seats", data.SeatsLeft);
        seatsLeftInBus = data.SeatsLeft;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      return seatsLeftInBus
  }).then((rs) => {
    // Counting the selected Seats
  let checks = document.getElementsByClassName('checkme');
    let count = 0;
    for (i = 0; i < checks.length; i++) {
        if (checks[i].checked === true) {
            // console.log("Valuess -> " + checks[i].value)
            // seats.push(parseInt(checks[i].value))
            count++;
        } else {
            // console.log("Not ->" + i)
        }
    }
    // console.log("SeatCount ->" + count)
    // Updating the bus seat after booking 
    var sLeft = rs-count
    console.log(rs);
    console.log(busid)
    db.collection("Buses").doc(busid).update({
      SeatsLeft: sLeft
    }).then((docRef) => {
      console.log("Seat successfully updated!");
      window.location.href = "invoice.html?orderid=" + orderid
    }).catch((e) => {
      console.log(e.message);
    })
  })

  



  })
 
}


// Making the form to fill the customer details

let validate = (num) => {
  let checks = document.getElementsByClassName('checkme');
  console.log(checks); 
  let html = '';
  let count = 0;
  for (i = 0; i < checks.length; i++) {
      if (checks[i].checked === true) {
          console.log("Value -> " + checks[i].value)
          count++;
      } else {
          // console.log("Not ->" + i)
      }
  }
  for (i = 0; i < count; i++) {
      html += `
          <form class="customer-validation">

              <div class="customer-datas">
              <div class="f7 customer-data" >
              <div class="row justify-content-between align-items-end">
      <div class="col-6 col-md-2 col-lg-3">
          <label for="Name">Name</label>
          <input type="text" class="form-control   cust-name"  name="name"
              placeholder="Name" >
      </div>
      <div class="col-6 col-md-2 col-lg-3">
          <label for="Age">Age</label>
          <input type="number" class="form-control  cust-age"  name="age"
              placeholder="Age">

      </div>
      <div class="col-6 col-md-2 col-lg-3">
          <label for="Gender">Gender</label><br>
          <label class="checkbox-inline">
         <input type="checkbox"  class="cust-male" value="Male"> Male
      </label>
          <label class="checkbox-inline">
         <input  class="cust-female" type="checkbox"  value="Female"> Female
      </label>

      </div>
  </div>
  <br>
              
          </div>
          <hr />

          </div>


          </form>
  
  
  `
  }
  html += `

      <button id="payment-button" type="submit" style="background-color: teal; color: white;" 
  onclick="printData()" class="btn roberto-btn w-100">Book your Ticket</button>
  

  `
  document.getElementById("cust-data").innerHTML = html;
}
