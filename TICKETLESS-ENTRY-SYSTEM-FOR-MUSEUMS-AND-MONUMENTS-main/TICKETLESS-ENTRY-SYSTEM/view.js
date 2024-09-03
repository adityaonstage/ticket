
const firebaseConfig = {
    apiKey: "AIzaSyCKUOvEXgCk73HUfa2PSJLEyDIsVpl-VMI",
    authDomain: "heritagekonect.firebaseapp.com",
    databaseURL: "https://heritageKonect-default-rtdb.firebaseio.com",
    projectId: "heritagekonect",
    storageBucket: "heritagekonect.appspot.com",
    messagingSenderId: "196808454018",
    appId: "1:196808454018:web:4377fc3c1a4135ab31a99b",
};

firebase.initializeApp(firebaseConfig);

var heritageKonectDB = firebase.firestore().collection("visitorDB");

let ticketId = document.getElementById("ticketId").innerHTML = Math.floor(Math.random() * 999999) + 100001;

const obj=JSON.parse(localStorage.getItem('personData'))

Object.keys(obj).forEach((item)=>{
    document.getElementById(item).textContent=obj[item];
})

console.log(obj)

let detailObjStore = Object.assign({}, obj);
console.log(detailObjStore);
//const date = obj.date;

const ticketData = `Ticket Id: ${ticketId}, 
                    Museum: ${detailObjStore.museum}, 
                    Names: ${detailObjStore.names}, 
                    Email: ${detailObjStore.email}, 
                    Phone number: ${detailObjStore.phoneNo}, 
                    Gender: ${detailObjStore.gender}, 
                    Aadhar: ${detailObjStore.aadhar},
                    Adults: ${detailObjStore.adults}, 
                    Children: ${detailObjStore.children},
                    Date: ${detailObjStore.date}, 
                    Total: ₹${detailObjStore.totalFare}`

// Generate the URL for the QR code
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(ticketData)}`;
            
// Set the source of the image element to the QR code URL
document.getElementById('qrCodeImage').src = qrCodeUrl;

const saveData = (ticketId, museum, names, email, phoneNo, gender, aadhar, adults, children, /*date,*/ totalFare) => {
    heritageKonectDB.add({
        ticketId: ticketId,
        museum: museum,
        names: names,
        email: email,
        phoneNo: phoneNo,
        gender: gender,
        aadhar: aadhar,
        adults: adults,
        children: children,
        //date: date,
        totalFare: totalFare,
    })
};

saveData(
    ticketId,
    detailObjStore.museum,
    detailObjStore.names,
    detailObjStore.email,
    detailObjStore.phoneNo,
    detailObjStore.gender,
    detailObjStore.aadhar,
    detailObjStore.adults,
    detailObjStore.children,
    //detailObjStore.date,
    detailObjStore.totalFare
  );



function downloadQRCode() {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(ticketData)}`;
  
    const names = detailObjStore.names;
  
    if (names && ticketId) {
      fetch(qrCodeUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
  
          const filename = `${names}_${ticketId}.png`;
  
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = filename;
  
          downloadLink.click();
  
          URL.revokeObjectURL(url);
        });
    } else {
      console.error("Missing or invalid names and ticketId.");
    }
  }

  document.getElementById('downloadButton').addEventListener('click', downloadQRCode);
 

