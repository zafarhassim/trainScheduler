 
 var config = {
    apiKey: "AIzaSyCfd9v5H0OMi7Iz5M2pLBPDInlM8BeJy0A",
    authDomain: "trainschedule-77d63.firebaseapp.com",
    databaseURL: "https://trainschedule-77d63.firebaseio.com",
    projectId: "trainschedule-77d63",
    storageBucket: "trainschedule-77d63.appspot.com",
    messagingSenderId: "99539325456"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function(event) {
    event.preventDefault();


  var inputNameInput = $("#trainNameInput").val().trim();
  var inputDestination = $("#destinationInput").val().trim();
  var inputTime = $("#trainTimeInput").val().trim();
  var inputFrequency= $("#frequencyInput").val().trim();

  

  var  inputTrain =  {
    name: inputNameInput,
    destination: inputDestination,
    first: inputTime,
    frequency: inputFrequency
   
    
};

firebase.database().ref().push(inputTrain);


  console.log(inputTrain.name);
  console.log(inputTrain.destination);
  console.log(inputTrain.first);
  console.log(inputTrain.frequency);

});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var inputNameInput = childSnapshot.val().name;
  var inputDestination = childSnapshot.val().destination;
  var inputTime = childSnapshot.val().first;
  var inputFrequency = childSnapshot.val().frequency;
 
var inputTimCov = moment(inputTime, "HH:mm").subtract(1, "years");

var currentTime = moment();

var difference = moment().diff(moment(inputTimCov), "minutes");
var differenceConverted = moment(difference).format("hh:mm");


var remainder = difference % inputFrequency;

var minutesAway = inputFrequency - remainder;

var upcomingTrain = moment().add(minutesAway, "minutes");
var displayedTrain = moment(upcomingTrain).format("hh:mm");



  $("#trainTable > tbody").append("<tr><td>" + inputNameInput + "</td><td>" + inputDestination + "</td><td>" + inputFrequency + "</td><td>" +  displayedTrain + "</td><td>" + minutesAway + "</td></tr>");

});

