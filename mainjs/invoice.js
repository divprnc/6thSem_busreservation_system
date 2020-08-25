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
  
  var Basictravellerdata ={}
  orderid = urlParams.get('orderid');
console.log(orderid)


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User Signed In");
      var users = firebase.auth().currentUser;
      document.getElementById("cname").innerHTML =  "Name - " + users.displayName
      document.getElementById("cemail").innerHTML = "Email - " +users.email
      document.getElementById("order-id").innerHTML = " OrderID - " +orderid
    } else {
      console.log("User not signed in")
    }
  });




  var docRef = db.collection("BookedTicketData").doc(orderid);
  var html = ''
docRef.get().then(function(doc) {
  if (doc.exists) {
    data = doc.data()
    // console.log(data.Traveller1.Age)
    document.getElementById("cfrom").innerHTML = "From - " + data.BusData.From
    document.getElementById("ctoo").innerHTML = "To - " + data.BusData.To
    document.getElementById("boarding-time").innerHTML = "Boarding Time - " + data.BusData.BoardingTime
    document.getElementById("departure-date").innerHTML = "Departure Date - " + data.BusData.DepartureDate
    document.getElementById("tour-name").innerHTML = data.BusData.TourName

    // data.filter((key) => key.includes)

    travellerDatas = Object.keys(data).reduce((acc, key) => {
      if (key.includes('Traveller')) {
        acc.push(data[key])
      }
      return acc;
    }, [])

    console.log(travellerDatas)
    
    for(var i = 0; i<travellerDatas.length; i++) {
      // count
      html += `
      
                      <tr>
                      <th class="no">${(i+1)}</th>
                      <th class="desc">${travellerDatas[i].Name}</th>
                      <th class="unit">${travellerDatas[i].Age}</th>
                      <th class="qty">${travellerDatas[i].Gender}</th>
                      <th class="qty">${travellerDatas[i].SeatNumber}</th>
                      <th class="total">${data.BusData.SeatPrice}</th>
                    </tr>
      
              `;



    }

    document.getElementById("set-data-cust").innerHTML = html

    // Setting the ticket 
    var subtotal =data.BusData.SeatPrice * travellerDatas.length
    document.getElementById("sub-price").innerHTML = "₹ " + (subtotal)
    var tax = (subtotal*10)/100
    document.getElementById("tax").innerHTML = "₹ " + (tax)
    document.getElementById("grand-total").innerHTML = "₹ " + (tax + subtotal)


  } else {
      // console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});