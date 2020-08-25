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
function getDataOfBus() {
    var dates = document.getElementById('departure-date').value.toString();
    var fromd = document.getElementById('from-dest').value.toString()
    var tod = document.getElementById('to-dest').value.toString()
    console.log(dates + " -" + fromd + " -" + tod)

    db.collection('Buses').where("DepartureDate", "==", dates).where("To", "==", tod).
    where("From", "==", fromd).get().then((snapshot) => {
        let html = '';
        snapshot.forEach((busDatas) => {
            busData = busDatas.data()
              console.log(busData)
              busData.docId = busDatas.id
            html += `
  <div class="single-room-area d-flex align-items-center 
    mb-50 wow fadeInUp" data-wow-delay="100ms" id="prince">
  
    <div class="room-thumbnail">
      <img src="${busData.ImageLink}" alt="">
    </div>
  
    <div class="room-content">
  
    <h2><a href="javascript:getID('${busData.docId}');">${busData.TourName}</h2>
      <h6>${busData.From} to ${busData.To}</h6>
      <h4>₹ ${busData.SeatPrice} </h4>
  
      <div class="room-feature">
        <h6>Boarding Point  <span>${busData.BoardingTime}</span></h6>
        <h6>Dropping Point <span>${busData.DroppingTime}</span></h6>
        <h6>Seats Left <span>${busData.SeatsLeft}</span></h6>
        <h6>Total Time <span>${busData.TotalTime}</span></h6>
        <h6>Departure Date <span>${busData.DepartureDate}</span></h6>
      </div>
  
 <a href="single-bus.html" class="btn view-detail-btn">
       <!-- View Details 
        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        -->
      </a> 
      
  
    </div>
  
  </div>`

  document.getElementById('bus-container-dynamic').innerHTML = html;

        })    // End foreach
    })      // End then






}


function getID(id) {
  window.location = "single-bus.html?id=" + id
}



function settingData(id) {

  console.log("Id ->" + id);
  busid =  id;
  setData(id)
}


function setData(busid) {
  console.log("Bus id => " + busid)
  var imager =   document.getElementById('set-image')
  console.log(imager);
}





// db.collection('Buses').where("DepartureDate", "==", "2020-04-02").where("To", "==", 'Vellore').where( "From", "==" ,"Banglore").get().then((snapshot) => {

//     let html = '';

//     snapshot.forEach((busDatas) => {

//       busData = busDatas.data()

//     //   console.log(busData)

//       html += `

//   <div class="single-room-area d-flex align-items-center 
//     mb-50 wow fadeInUp" data-wow-delay="100ms">

//     <div class="room-thumbnail">
//       <img src="${busData.ImageLink}" alt="">
//     </div>

//     <div class="room-content">

//       <h2>${busData.TourName}</h2>
//       <h6>${busData.From} to ${busData.To}</h6>
//       <h4>₹ ${busData.SeatPrice} </h4>

//       <div class="room-feature">
//         <h6>Boarding Point  <span>${busData.BoardingTime}</span></h6>
//         <h6>Dropping Point <span>${busData.DroppingTime}</span></h6>
//         <h6>Seats Left <span>${busData.SeatsLeft}</span></h6>
//         <h6>Total Time <span>${busData.TotalTime}</span></h6>
//         <h6>Departure Date <span>${busData.DepartureDate}</span></h6>
//       </div>

//       <a href="#" class="btn view-detail-btn">
//         View Details 
//         <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//       </a>

//     </div>

//   </div>`

//     document.getElementById('bus-container-dynamic').innerHTML = html;

//     })    // End foreach
//   })      // End then


