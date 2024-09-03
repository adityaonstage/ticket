
const detailObj={
    museum:"",
    names:"",
    email:"",
    phoneNo:"",
    gender:"",
    aadhar:"",
    adults:"1",
    children:"0",
    date:"",
    totalFare:"50"
}

var adultFare=50;
var childrenFare=25;
var totalAdultFare=50;
var totalChildrenFare=0;
var totalFare=0;
document.getElementById('totalFare').innerHTML = '₹50'

function handleMuseum(museumValue){
    if(museumValue !== ''){
        detailObj.museum=museumValue
    }else{
        alert("Select museum...")
    }
}

function handleNames(namesValue){
    if(/^[a-zA-Z() ]+$/.test(namesValue)){
        detailObj.names=namesValue
        console.log(detailObj.names);
    }else{
        alert("Please enter your name in the name field")
    }
}

function handleEmail(emailValue){
    if(String(emailValue).toLowerCase().match(/\S+@\S+\.\S+/)){
        detailObj.email=emailValue
        console.log(detailObj.email);
    }else{
        alert("Please enter the valid email")
    }
}

function handlePhoneNo(phoneNoValue){
    if(/^\d+$/.test(phoneNoValue) && (phoneNoValue>999999999)){
        detailObj.phoneNo=phoneNoValue
    }else{
        alert("Please enter valid phone numner")
    }
}

function handleAadhar(aadharValue){
    if(/^\d+$/.test(aadharValue) && (aadharValue>99999999999)){
        detailObj.aadhar=aadharValue
    }else{
        alert("Please enter valid aadhar number")
    }
}

function handleGenders(genderValue){
    detailObj.gender=genderValue.value
}

function handleAdults(adultsValue){
    if(adultsValue !== ''){
        detailObj.adults=adultsValue
        totalAdultFare=(adultsValue*adultFare)
        totalFare=totalAdultFare+totalChildrenFare
        document.getElementById('totalFare').innerHTML='₹'+totalFare
        detailObj.totalFare=totalFare
    }else{
        alert("Please select Adults count")
    }
}

function handleChildren(childrenValue){
        detailObj.children=childrenValue
        totalChildrenFare=(childrenValue*childrenFare)
        totalFare=totalChildrenFare+totalAdultFare
        document.getElementById('totalFare').innerHTML='₹'+totalFare
        detailObj.totalFare=totalFare
}

function handleDate(dateValue) {
    if (dateValue !== '') {
        detailObj.date = dateValue;
        console.log(detailObj.date);
    } else {
        alert("Select a date...");
    }
}


function validateAndSubmit() {
    // Your form validation logic here
  
    if (detailObj.names != "" && detailObj.email != "" && detailObj.phoneNo != "" && detailObj.gender != "" && detailObj.aadhar != "") {
      localStorage.setItem('formSubmitted', 'true'); // flag indicating the form has been submitted
      localStorage.setItem('personData', JSON.stringify(detailObj));
      return true;
    } else {
      alert("Enter the mandatory fields");
      return false;
    }
  }
  



console.log(detailObj);


