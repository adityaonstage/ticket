
const firebaseConfig = {
    apiKey: "AIzaSyCKUOvEXgCk73HUfa2PSJLEyDIsVpl-VMI",
    authDomain: "heritagekonect.firebaseapp.com",
    projectId: "heritagekonect",
    storageBucket: "heritagekonect.appspot.com",
    messagingSenderId: "196808454018",
    appId: "1:196808454018:web:4377fc3c1a4135ab31a99b",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var heritageKonectDB = db.collection("heritageKonect").set({museum:museus, names:names, email:email, phoneNo: phoneNo, gender: gender, aadhar: aadhar, adults: adults, children: children, total: total})


//view details
let ticketId = document.getElementById("ticketId").innerHTML = Math.floor(Math.random() * 999999) + 100001;


const obj=JSON.parse(localStorage.getItem('personData'))

Object.keys(obj).forEach((item)=>{
    document.getElementById(item).textContent=obj[item];
})

console.log(obj)



let detailObjStore = Object.assign({}, obj);
let cardViewObjStore = Object.assign({}, cardViewObj);
console.log(detailObjStore);
console.log(cardViewObjStore);

document.getElementById("img").src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=
                                        Ticket Id: ${ticketId}, 
                                        Museum: ${detailObjStore.museum}, 
                                        Names: ${detailObjStore.names}, 
                                        Email: ${detailObjStore.email}, 
                                        Phone number: ${detailObjStore.phoneNo}, 
                                        Gender: ${detailObjStore.gender}, 
                                        Aadhar: ${detailObjStore.aadhar},
                                        Adults: ${detailObjStore.adults}, 
                                        Children: ${detailObjStore.children}, 
                                        Total Fare: ₹${detailObjStore.total}, 
                                        Payment Successful!!!`


//saveData
const saveData = (ticketId, museum, names, email, phoneNo, gender, aadhar, adults, children, total) => {
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
        total: total,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
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
    detailObjStore.total
  );
  