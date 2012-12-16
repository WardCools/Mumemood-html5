//Clears the localStorage when the app is started
localStorage.clear();

//Array that contains all the data
var db;
var dataTables = ["id", "feeling_1", "feeling_2", "feeling_3", "feeling_4", "time"];
var propertiesTables = ["age", "sex"];
var counter = 0;
var dataset;

window.onload = init();

//Function that contains everything that should be done when starting the app
function init()
{
	initDatabase();
}


//Function for saving the emotions and loading a new riddle 
function fromEmotionsPageToRiddlesPage()
{
	//Store the emotions the user has entered
	localStorage.emotion1_value = $('#slider1').val();
	localStorage.emotion2_value = $('#slider2').val();
	localStorage.emotion3_value = $('#slider3').val();
	localStorage.emotion4_value = $('#slider4').val();

	//Generate a new riddle
	var riddle = getRandomRiddle();

	document.getElementById("riddle_header").innerHTML=riddle.header;
	document.getElementById("riddle_question").innerHTML=riddle.question;

    localStorage.riddle_answer = riddle.answer;
    
    $("#riddle_answer_button_A_text").text(riddle.allAnswers[0]);
    $("#riddle_answer_button_B_text").text(riddle.allAnswers[1]);
    $("#riddle_answer_button_C_text").text(riddle.allAnswers[2]);
    $("#riddle_answer_button_D_text").text(riddle.allAnswers[3]);
 
    //Reset and start the timer
    localStorage.time_to_solve = 0;
    document.getElementById("timerText").innerHTML= formatTimeString(0);
    localStorage.timer_ID = self.setInterval(function(){count()},1000);
}

function count()
{
	var seconds = Number(localStorage.time_to_solve) + 1;
	document.getElementById("timerText").innerHTML = formatTimeString(seconds);
	localStorage.time_to_solve = seconds;
}

function formatTimeString(seconds)
{
	var secondsString = (seconds % 60);
	var minutesString = Math.floor(seconds / 60);
	
	if (secondsString < 10)
	{
		secondsString = "0" + secondsString;
	}
	
	if (minutesString < 10)
	{
		minutesString = "0" + minutesString;
	}
	
	return (minutesString + ":" + secondsString);
}

//Function that checks whether the answer was good or bad (is called when a user presses one of the answers)
function checkAnswer(buttonId)
{			
	if ($(eval("'#" + buttonId + "_text'")).text() == localStorage.riddle_answer)
	{
		window.clearInterval(localStorage.timer_ID);
		$(eval("'#" + buttonId + "_icon'")).attr("src","images/correct.png");
		document.getElementById("riddle_answer_button_A").disabled = "true";
		document.getElementById("riddle_answer_button_B").disabled = "true";
		document.getElementById("riddle_answer_button_C").disabled = "true";
		document.getElementById("riddle_answer_button_D").disabled = "true";
		
		document.getElementById("saveResultButton").style.visibility = 'visible';
	}
	else
	{	
		$(eval("'#" + buttonId + "_icon'")).attr("src","images/wrong.png");
		document.getElementById(buttonId).disabled = "true";
		var seconds = Number(localStorage.time_to_solve) + 5;	
		localStorage.time_to_solve = seconds;
		var timerText = document.getElementById("timerText");
		//$("#timerIcon").effect("bounce", {}, 500,emptyFunc(){});
		setTimeout(function() {timerText.style.color = "red";}, 200);
		setTimeout(function() {timerText.style.color = "black";}, 1000);
	}
}

function fromRiddlesPageBackToEmotionsPage()
{
	//Enable all the answering buttons
    $("#riddle_answer_button_A").removeAttr("disabled");
    $("#riddle_answer_button_A_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_B").removeAttr("disabled");
    $("#riddle_answer_button_B_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_C").removeAttr("disabled");
    $("#riddle_answer_button_C_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_D").removeAttr("disabled");
    $("#riddle_answer_button_D_icon").attr("src","images/unknown.png");
    
    //Make the result button hidden again in case it is visible
    document.getElementById("saveResultButton").style.visibility = 'hidden';
    
    //Stop the timer function
    window.clearInterval(localStorage.timer_ID);
}

function fromRiddlesPageToResultsPage()
{
	//Enable all the answering buttons
    $("#riddle_answer_button_A").removeAttr("disabled");
    $("#riddle_answer_button_A_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_B").removeAttr("disabled");
    $("#riddle_answer_button_B_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_C").removeAttr("disabled");
    $("#riddle_answer_button_C_icon").attr("src","images/unknown.png");
    $("#riddle_answer_button_D").removeAttr("disabled");
    $("#riddle_answer_button_D_icon").attr("src","images/unknown.png");
    
    //Make the result button hidden again
	document.getElementById("saveResultButton").style.visibility = 'hidden';
}


//Script for putting the sliderlabels in the right position
$('#emotionspage').live('pageshow', function()
{ 
	var offset,
	$slider = null,
	dims = {top: null, left: null};
	$(".slider-label").each(function()
	{
		var $this = $(this);
		$slider = $this.prevAll("div.ui-slider[role='application']");
		if ( $this.hasClass("left") ) {
			offset = $slider.offset();
			dims.top = offset.top + $slider.outerHeight() + 5;
			dims.left = offset.left - 20;
		}
		if ( $this.hasClass("right") ) {
			dims.left += 2*20 + $slider.innerWidth() - $this.innerWidth();
		}
		$this.css( dims );
	});
});	


function fromProfilePageToEmotionsPage()
{
	//save all info in the database
}

//Function that initialises the database
function initDatabase()
{
	try
	{
		if (!window.openDatabase)
		{
			alert('Databases are not supported in this browser.');
		}
		else
		{
			var shortName = 'IQMOODDB';
			var version = '1.0';
			var displayName = 'IQMOOD Database';
			var maxSize = 100000; //  bytes
			db = window.openDatabase(shortName, version, displayName, maxSize);
			clearData();
			db.transaction(createDataTable, errorCB, successCB);
			db.transaction(createPropertiesTable, errorCB, successCB);
		}
	}
	catch(e)
	{
		if (e == 2)
		{
			// Version number mismatch.
			alert("Invalid database version.");
		} 
		else
		{
			alert("Unknown error "+e+".");
		}
		return;
	}
}

//Transaction error callback, called when a db transaction returns an error
function errorCB(tx, err)
{
	alert("Error processing SQL: "+err);
}

//Transaction success callback, called when a db transaction is succesful
function successCB()
{
	
}

//Deletes the IQMOODDATA table
function clearData(){
	db.transaction(
			function (transaction) {
				transaction.executeSql('DROP TABLE IF EXISTS IQMOODDATA');
			}, errorCB, successCB
	);
}

//Creates the IQMOODDATA table
function createDataTable(transaction){
	transaction.executeSql('CREATE TABLE IF NOT EXISTS IQMOODDATA(' + dataTables[0] + ' INTEGER UNIQUE,' + dataTables[1] + ' INTEGER,' + dataTables[2] + ' INTEGER, ' + dataTables[3] + ' INTEGER, ' + dataTables[4] + ' INTEGER, ' + dataTables[5] + ' INTEGER);');
}

//Creates the IQMOODPROPERTIES table
function createPropertiesTable(transaction){
	transaction.executeSql('DROP TABLE IF EXISTS IQMOODPROPERTIES');
	transaction.executeSql('CREATE TABLE IF NOT EXISTS IQMOODPROPERTIES(' + propertiesTables[0] + ' TEXT,' + propertiesTables[1] + ' TEXT);');
}

//Stores the emotions stored in the counter, feeling1-4 and time variables
function storeEmotionsDB()
{
	counter++;
	db.transaction(
		function (transaction)
		{
			transaction.executeSql("INSERT INTO IQMOODDATA(" + dataTables[0] + ", " + dataTables[1] + ", " + dataTables[2] + ", " + dataTables[3] + ", " + dataTables[4] + ", " + dataTables[5] + ") VALUES (?, ?, ?, ?, ?, ?)", [counter, feeling_1, feeling_2, feeling_3, feeling_4, time]);
		}, errorCB, successCB);
}

//Stores the properties given as arguments
function storePropertiesDB(age, sex)
{
	db.transaction(
		function (transaction) 
		{
			transaction.executeSql("INSERT INTO IQMOODPROPERTIES(" + propertiesTables[0] + ", " + propertiesTables[1] + ") VALUES (?, ?)", [age, sex]);
		}, errorCB, successCB);
}

//Gets the data from the IQMOODDATA table and stores it in the dataset array
function createStats()
{
	db.transaction(queryStatsDB, errorCB);
}


function queryStatsDB(transaction)
{
	transaction.executeSql('SELECT * FROM IQMOODDATA',[], queryStatsSuccess, errorCB);
}

function queryStatsSuccess(transaction, results)
{
	dataset = new Array(results.rows.length);
	
	for(var i = 0; i < results.rows.length; i++)
	{
		dataset[i] = new Array(5);
		dataset[i][0] = results.rows.item(i).feeling_1;	//dataTables[1];
		dataset[i][1] = results.rows.item(i).feeling_2;	//dataTables[2];
		dataset[i][2] = results.rows.item(i).feeling_3;	//dataTables[3];
		dataset[i][3] = results.rows.item(i).feeling_4;	//dataTables[4];
		dataset[i][4] = results.rows.item(i).time;		//dataTables[5];
	}
	
	var emotion = 0;
	if($('#radio-choice-0').is(':checked'))
	{
		emotion = 0;
	}
	else if($('#radio-choice-1').is(':checked'))
	{
		emotion = 1;
	}
	else if($('#radio-choice-2').is(':checked'))
	{
		emotion = 2;
	}
	else if($('#radio-choice-3').is(':checked')){
		emotion = 3;
	}
}

//Function for saving the birthyear and sex
function saveProperties()
{
//	if($('#radio-choice-m').is(':checked')){
//		storePropertiesDB($('#age').val(), $('#radio-choice-m').val());
//	}
//	else if ($('#radio-choice-f').is(':checked')){
//		storePropertiesDB($('#age').val(), $('#radio-choice-f').val());
//	}
}	

//Function that resets the sliders
function resetSliders(){
	$('#slider-1').val(50);
	$('#slider-1').slider('refresh');
	$('#slider-2').val(50);
	$('#slider-2').slider('refresh');
	$('#slider-3').val(50);
	$('#slider-3').slider('refresh');
	$('#slider-4').val(50);
	$('#slider-4').slider('refresh');
}