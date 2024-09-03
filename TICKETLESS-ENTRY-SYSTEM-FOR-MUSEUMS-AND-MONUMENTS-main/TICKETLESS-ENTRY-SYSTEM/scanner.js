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

const videoElement = document.getElementById('qr-video');
const qrResult = document.getElementById('qr-result');
const scanButton = document.getElementById('scan-button');

let scanner = new Instascan.Scanner({ video: videoElement });


    scanner.addListener('scan', function (content) {
        qrResult.textContent = `Scanned QR Code: ${content}`;
        matchAndProcessQRData(content);
    });
    
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (error) {
        console.error(error);
    });
    
    scanButton.addEventListener('click', function () {
        scanner.start();
    });
    
function matchAndProcessQRData(scannedData) {
    const scannedTicketId = scannedData.match(/Ticket Id: (\d+)/);
    if (scannedTicketId) {
        const matchedTicketId = parseInt(scannedTicketId[1]);
        console.log('Matched Ticket ID:', matchedTicketId);

        heritageKonectDB.where('ticketId', '==', matchedTicketId).get().then(function(querySnapshot) {
            if (querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0];
                const matchedData = doc.data();
                console.log('Matched Firestore Data:', matchedData);

                displayMatchedData(matchedData);
            } else {
                console.log('No matching data found in Firestore.');
            }
        }).catch(function(error) {
            console.error('Error executing Firestore query:', error);
        });
    } else {
        console.log('No matching data found in the scanned QR code.');
    }
}

    function displayMatchedData(matchedData) {
        const museumElement = document.getElementById('museum');
        if (museumElement) {
            museumElement.textContent = matchedData.museum;
            console.log('Museum data displayed:', matchedData.museum);
        } else {
            console.log('Museum element not found');
        }

        const namesElement = document.getElementById('names');
        if (namesElement) {
            namesElement.textContent = matchedData.names;
            console.log('Names data displayed:', matchedData.names);
        } else {
            console.log('Names element not found');
        }
    }

