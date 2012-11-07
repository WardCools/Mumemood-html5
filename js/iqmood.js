//Clears the localStorage when the app is started
localStorage.clear();

//Some functions to test swiping (doesn't work yet)
//$('#propertiespage').bind('swipeleft', function() {
//$.mobile.changePage("#emotionspage");
//});
//$(document).on('mobileinit', function () {
//$.mobile.ignoreContentEnabled = true;
//});

//Array that contains all the data
var dataset;
var db;
var dataTables = ["id", "feeling_1", "feeling_2", "feeling_3", "feeling_4", "time"];
var riddleTables = ["riddle", "answer_1", "answer_2", "answer_3", "answer_4"];
var riddles = ["images/usa3.jpg", "images/india.jpg", "images/france.jpg", "images/uk.jpg"];
var answers_1 = ["USA", "India", "France", "UK"];
var answers_2 = ["Russia", "Belarus", "Netherlands", "China"];
var answers_3 = ["Alaska", "China", "Germany", "Spain"];
var answers_4 = ["Belgium", "Pakistan", "UK", "Mexico"];
var counter = 0;
var feeling_1 = 50;
var feeling_2 = 50;
var feeling_3 = 50;
var feeling_4 = 50;
var time = 0;
var riddle = new Array(5);
var choice_a;
var choice_b;
var choice_c;

window.onload = init();
//Function that contains everything that should be done when starting the app
function init(){
	initDatabase();
}

//Script for putting the sliderlabels in the right position
$('#emotionspage').live('pageshow', function() { 
	var offset,
	$slider = null,
	dims = {
			top: null,
			left: null
	};
	$(".slider-label").each(function() {
		var $this = $(this);
		$slider = $this.prevAll("div.ui-slider[role='application']");
		if ( $this.hasClass("left") ) {
			offset = $slider.offset();
			dims.top = offset.top + $slider.outerHeight();
			dims.left = offset.left - 20;
		}
		if ( $this.hasClass("right") ) {
			dims.left += 2*20 + $slider.innerWidth() - $this.innerWidth();
		}
		$this.css( dims );
	});
});		

//Function that initialises the database
function initDatabase() {
	try {
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
		} else {
			var shortName = 'IQMOODDB';
			var version = '1.0';
			var displayName = 'IQMOOD Database';
			var maxSize = 100000; //  bytes
			db = window.openDatabase(shortName, version, displayName, maxSize);
			db.transaction(storeRiddles, errorCB, successCB);
			clearData();
			db.transaction(createDataTables, errorCB, successCB);
//			storeEmotionsDB();
		}
	} catch(e) {
		if (e == 2) {
			// Version number mismatch.
			alert("Invalid database version.");
		} else {
			alert("Unknown error "+e+".");
		}
		return;
	}
}

//Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

//Transaction success callback
function successCB() {
//	alert("success!");
}

//Creates the IQMOODRIDDLES table and stores the riddles in it
function storeRiddles(transaction){
	transaction.executeSql('DROP TABLE IF EXISTS IQMOODRIDDLES');
	transaction.executeSql('CREATE TABLE IF NOT EXISTS IQMOODRIDDLES(' + riddleTables[0] + ' TEXT, ' + riddleTables[1] + ' TEXT, ' + riddleTables[2] + ' TEXT, ' + riddleTables[3] + ' TEXT, ' + riddleTables[4] + ' TEXT);');
	for(var i = 0; i<riddles.length; i++){
		transaction.executeSql("INSERT INTO IQMOODRIDDLES(" + riddleTables[0] + ", " + riddleTables[1] + ", " + riddleTables[2] + ", " + riddleTables[3] + ", " + riddleTables[4] + ") VALUES (?, ?, ?, ?, ?)", [riddles[i], answers_1[i], answers_2[i], answers_3[i], answers_4[i]]);
	}
}

//Creates he IQMOODDATA
function createDataTables(transaction){
	transaction.executeSql('CREATE TABLE IF NOT EXISTS IQMOODDATA(' + dataTables[0] + ' INTEGER UNIQUE,' + dataTables[1] + ' INTEGER,' + dataTables[2] + ' INTEGER, ' + dataTables[3] + ' INTEGER, ' + dataTables[4] + ' INTEGER, ' + dataTables[5] + ' INTEGER);');
}

//Stores the emotions stored in the counter, feeling1-4 and time variables
function storeEmotionsDB(){
	counter++;
	db.transaction(
		function (transaction) {
			transaction.executeSql("INSERT INTO IQMOODDATA(" + dataTables[0] + ", " + dataTables[1] + ", " + dataTables[2] + ", " + dataTables[3] + ", " + dataTables[4] + ", " + dataTables[5] + ") VALUES (?, ?, ?, ?, ?, ?)", [counter, feeling_1, feeling_2, feeling_3, feeling_4, time]);
		}, errorCB, successCB
	);
}

//Deletes the IQMOODDATA table
function clearData(){
	db.transaction(
		function (transaction) {
			transaction.executeSql('DROP TABLE IF EXISTS IQMOODDATA');
		}, errorCB, successCB
	);
}

//Gets the data from the IQMOODDATA table and stores it in the dataset array
function createStats(){
	db.transaction(queryStatsDB, errorCB);
}
function queryStatsDB(transaction) {
	transaction.executeSql('SELECT * FROM IQMOODDATA',[], queryStatsSuccess, errorCB);
}
function queryStatsSuccess(transaction, results) {
//	alert(results.rows.length);
	dataset = new Array(results.rows.length);
	for(var i = 0; i < results.rows.length; i++){
		dataset[i] = new Array(5);
		dataset[i][0] = results.rows.item(i).feeling_1;//dataTables[1];
		dataset[i][1] = results.rows.item(i).feeling_2;//dataTables[2];
		dataset[i][2] = results.rows.item(i).feeling_3;//dataTables[3];
		dataset[i][3] = results.rows.item(i).feeling_4;//dataTables[4];
		dataset[i][4] = results.rows.item(i).time;//dataTables[5];
	}
	createSvg();
}

//Gets a random riddle and its answers from the IQMOODRIDDLES table and stores it in the riddle array
function getRiddle(){
	db.transaction(queryRiddleDB, errorCB);
}
function queryRiddleDB(transaction) {
	transaction.executeSql('SELECT * FROM IQMOODRIDDLES',[], queryRiddleSuccess, errorCB);
}
function queryRiddleSuccess(transaction, results) {
	var ranNumber = Math.round(Math.random() * 3);
	riddle[0] = results.rows.item(ranNumber).riddle;//riddleTables[0];
	riddle[1] = results.rows.item(ranNumber).answer_1;//riddleTables[1];
	riddle[2] = results.rows.item(ranNumber).answer_2;//riddleTables[2];
	riddle[3] = results.rows.item(ranNumber).answer_3;//riddleTables[3];
	riddle[4] = results.rows.item(ranNumber).answer_4;//riddleTables[4];
	$("#riddle_image").attr("src",riddle[0]);
	setAnswers();
	startTimer();
	$("#countdowntimer").countdown('option', {until: +30});
}

//Function for saving the birthyear and sex
function saveProperties() {
	localStorage.setItem("age", $('#age').val())
	if($('#radio-choice-m').is(':checked')){
		localStorage.setItem("sex", $('#radio-choice-m').val());
	}
	else if ($('#radio-choice-f').is(':checked')){
		localStorage.setItem("sex", $('#radio-choice-f').val());
	}
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

//Function for saving the emotions
function saveEmotions() {
	feeling_1 = $('#slider-1').val();
	feeling_2 = $('#slider-2').val();
	feeling_3 = $('#slider-3').val();
	feeling_4 = $('#slider-4').val();
	getRiddle();
}

//Function that loads the answers for the riddle and puts that in a random order, NOG NIET VOLLEDIG RANDOM
function setAnswers(n){
	var k = Math.round(Math.random() * 2);
	var second = (k+2)%3;
	var third = (k+1)%3;
	$('#oldBtnaText').text(riddle[k+1]);
	$('#oldBtnbText').text(riddle[second+1]);
	$('#oldBtncText').text(riddle[third+1]);
	localStorage.setItem("choice_a", k);
	localStorage.setItem("choice_b", second);
	localStorage.setItem("choice_c", third);
}

//Info about timer: http://keith-wood.name/countdown.html
//Function to start te countdown timer
function startTimer() {
	$('#countdowntimer').countdown({until: +30, format: 'S', onExpiry: timesUp});
}

//Function that handle's the time's up
function timesUp() { 
	var r=confirm("Time's up!");
	if (r==true) {
		$.mobile.changePage("#emotionspage");
		$('#countdowntimer').countdown('destroy');
	}
	else {}
} 

//Function to detract time from countdown timer
function detract(n){
	var periods = $('#countdowntimer').countdown('getTimes'); 
	var newuntil = periods[6] - n;
	$('#countdowntimer').countdown('option', {until: newuntil});
}		

//Function that checks whether the answer was good or bad
function checkAnswer(n){
	var check = localStorage.getItem("choice_" + n);
	if(check == 0) {
		answerGood();
	} 
	else{
		$('#oldBtn' + n + 'Text').text("FALSE");
		detract(5);
	}
}

////Function that checks whether the answer was good or bad
//function checkAnswer(n){
////	var check = localStorage.getItem("choice_" + n);
//	if(eval("choice_" + n) == 0) {
//		answerGood();
//	} 
//	else{
//		$('#oldBtn' + n + 'Text').text("FALSE");
//		detract(5);
//	}
//}

//Function that alerts the user when he solved the riddle
function answerGood(){
	var r=confirm("You were correct!");
	if (r==true) {
		$.mobile.changePage("#emotionspage");
		resetSliders();
		var periods = $('#countdowntimer').countdown('getTimes'); 
		time = periods[6];
		localStorage.setItem("riddletime_" + counter, time);
		storeEmotionsDB();
		$('#countdowntimer').countdown('destroy');
	}
	else {
	}
}

var svg;

//Function that creates the graph using d3 and svg (android 2.3 doesn't support svg!, so try to use canvas or so)
function createSvg(){
	var w = 300;
	var h = 300;
	var padding = 30; //Space between axes and dots
	var riddleScale = d3.scale.linear()
	.domain([0, 35])//((d3.max(dataset2, function(d) { return d[4]; })) + 20) ])
	.range([padding, w-padding*2]);
	var happysadScale = d3.scale.linear()
	.domain([0, 100])//((d3.max(dataset2, function(d) { return d[0]; })) + 20) ])
	.range([h-padding, padding]);

//	var canvas = d3.select("#graph")
//	.append("canvas")
//	.attr("width", w)
//	.attr("height", h);

//	var context = canvas.node().getContext("2d");
//	context.fillStyle = "black";
//	context.strokeStyle = "#666";
//	context.strokeWidth = 1.5;

//	dataset.forEach(function(d) {
//	context.beginPath();
//	context.arc(riddleScale(d[4]), happysadScale(d[0]), 10, 0, 2*Math.PI);
//	context.fill();
//	context.stroke();
//	});

	var xAxis = d3.svg.axis()
	.scale(riddleScale)
	.orient("bottom")
	.ticks(10);
	var yAxis = d3.svg.axis()
	.scale(happysadScale)
	.orient("left")
	.ticks(10);

	svg = d3.select("#graph")
	.append("svg")
	.attr("width", w)
	.attr("height", h)
	.attr("align", "center");

	svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d) {
		return riddleScale(d[4]);
	})
	.attr("cy", function(d) {
		return happysadScale(d[0]);
	})
	.attr("r", 10)
	.attr("fill", "black");


	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (w - padding) + ")")
	.call(xAxis);
	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);
}

//Function to remove the svg
function remove_graph(){
	svg.remove();
}

//Function to converse an svg to a format supported by android 2.3 browser -> This function is not yet in use.
function converse_svg() {
	container = $("#graph");
	//Create a new canvas to hold our rendering
	var canvas = document.createElement("canvas");
	canvas.setAttribute("style", "height:" + container.height() + ";width:" + container.width() + ";");
	//Use canvg to convert SVG to canvas and render the results
	canvg(canvas, svg);
	//Add the new canvas to the page
	container.append(canvas);
}