window.onload = function(){

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDfeexNBYQP5YWYbKfi_SvvmYET1T0CQtg",
    authDomain: "traintime-8d21e.firebaseapp.com",
    databaseURL: "https://traintime-8d21e.firebaseio.com",
    projectId: "traintime-8d21e",
    storageBucket: "",
    messagingSenderId: "337448981793"
  };
  firebase.initializeApp(config);

  var database=firebase.database();
  





	//this function will occur when the submit button is clicked
	$(".btn").on("click", function(event){
		event.preventDefault();

		//get values from input fields
		var trainName = $("#trainName").val();
		var destination = $("#Destination").val();
		var firstTrain = $("#FirstTrain").val();
		var frequency = $("#Frequency").val();

		database.ref().push({
			name:trainName,
			dest:destination,
			fTrain:firstTrain,
			freq:frequency
		});

		location.reload();

		console.log(trainName+", "+destination+", "+firstTrain+", "+frequency);
	});

	//what to get from the databse when it loads 
  	database.ref().on("child_added", function(childSnapshot){
  		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().dest;
		var first = childSnapshot.val().fTrain;
		var frequency = childSnapshot.val().freq;

  		var currentTime = moment();
  		console.log(moment().format("hh:mm)"));
  		 // variables
	    var tFrequency = frequency;
	    var firstTime = first;

	    // First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	    console.log("First Time: " + firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % tFrequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = tFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	  	$(".tbody").append($("<tr><td>"+childSnapshot.val().name+
	  	"</td><td>"+childSnapshot.val().dest+"</td><td>"+childSnapshot.val().freq+"</td><td>"+nextTrain+"</td><td>"+tMinutesTillTrain+"</td></tr>"));
	  	
	},function(errorObject){
	 		console.log("Errors Handled:"+ errorObject.code);
	 });


}