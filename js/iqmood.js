

localStorage.clear();
//Save the riddles
localStorage.setItem("riddle_0", "images/usa3.jpg");
localStorage.setItem("riddle_1", "images/india.jpg");
localStorage.setItem("riddle_2", "images/france.jpg")
localStorage.setItem("riddle_3", "images/uk.jpg");
//Save the possible answers
localStorage.setItem("answer_00", "USA");
localStorage.setItem("answer_01", "Russia");
localStorage.setItem("answer_02", "Alaska");
localStorage.setItem("answer_03", "Belgium");
localStorage.setItem("answer_10", "India");
localStorage.setItem("answer_11", "Russia");
localStorage.setItem("answer_12", "China");
localStorage.setItem("answer_13", "Pakistan");
localStorage.setItem("answer_20", "France");
localStorage.setItem("answer_21", "Netherlands");
localStorage.setItem("answer_22", "Germany");
localStorage.setItem("answer_23", "UK");
localStorage.setItem("answer_30", "UK");
localStorage.setItem("answer_31", "China");
localStorage.setItem("answer_32", "Spain");
localStorage.setItem("answer_33", "Mexico");
//Array that contains all the data
var dataset;
//Storing some test data	
//localStorage.setItem("happy_sad_0", 40);
//localStorage.setItem("relaxed_stressed_0", 70);
//localStorage.setItem("energetic_slow_ 0", 75);
//localStorage.setItem("confident_insecure_0", 55);
//localStorage.setItem("riddletime_0", 10);	
//localStorage.setItem("happy_sad_1", 20);
//localStorage.setItem("relaxed_stressed_1", 65);
//localStorage.setItem("energetic_slow_ 1", 40);
//localStorage.setItem("confident_insecure_1", 30);
//localStorage.setItem("riddletime_1", 75);

//$('#propertiespage').bind('swipeleft', function() {
//$.mobile.changePage("#emotionspage");
//});

//$(document).on('mobileinit', function () {
//$.mobile.ignoreContentEnabled = true;
//});

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

window.onload = init();

function init(){
	initDatabase();
}


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
			storeEmotions();
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
//
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

//Transaction success callback
//
function successCB() {
//	alert("successsss!");
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
function storeEmotions(){
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
function getData(){
	db.transaction(queryDB, errorCB);
}
function queryDB(transaction) {
	transaction.executeSql('SELECT * FROM IQMOODDATA',[], querySuccess, errorCB);
}
function querySuccess(transaction, results) {
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
}

//Gets a random riddle and its answers from the IQMOODRIDDLES table and stores it in the riddle array
function getRiddle(){
	alert("ofar");
	db.transaction(queryRiddleDB, errorCB);
}
function queryRiddleDB(transaction) {
	transaction.executeSql('SELECT * FROM IQMOODRIDDLES',[], queryRiddleSuccess, errorCB);
}
function queryRiddleSuccess(transaction, results) {
	var ranNumber = Math.round(Math.random() * 3);
	riddle[0] = results.rows.item(ranNumber).riddleTables[0];
	riddle[1] = results.rows.item(ranNumber).riddleTables[1];
	riddle[2] = results.rows.item(ranNumber).riddleTables[2];
	riddle[3] = results.rows.item(ranNumber).riddleTables[3];
	riddle[4] = results.rows.item(ranNumber).riddleTables[4];
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

//Function for saving the birthyear and sex
function save_properties() {
	localStorage.setItem("age", $('#age').val())
	if($('#radio-choice-m').is(':checked')){
		localStorage.setItem("sex", $('#radio-choice-m').val());
	}
	else if ($('#radio-choice-f').is(':checked')){
		localStorage.setItem("sex", $('#radio-choice-f').val());
	}
}	

//Function that resets the sliders
function reset_sliders(){
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
function save_emotions() {
//	localStorage.setItem("happy_sad_" + counter, $('#slider-1').val());
//	localStorage.setItem("relaxed_stressed_" + counter, $('#slider-2').val());
//	localStorage.setItem("energetic_slow_ " + counter, $('#slider-3').val());
//	localStorage.setItem("confident_insecure_" + counter, $('#slider-4').val());
	feeling_1 = $('#slider-1').val();
	feeling_2 = $('#slider-2').val();
	feeling_3 = $('#slider-3').val();
	feeling_4 = $('#slider-4').val();
	new_riddle();
}

//Function that creates a new riddle
function new_riddle(){
	getRiddle();
	alert("voorbij");
	$('#riddle_image').attr("src",riddle[0]);
	setAnswers();
	start_timer();
	$('#countdowntimer').countdown('option', {until: +30});
//	var ranNumber = Math.round(Math.random() * 3);
//	localStorage.setItem("aaaaaaaaaa", ranNumber);
//	get_image(ranNumber);
}

//Function that loads the answers for the riddle and puts that in a random order, NOG NIET VOLLEDIG RANDOM
function setAnswers(n){
	var k = Math.round(Math.random() * 3);
	var second = (k+3)%4;
	var third = (k+1)%4;
	localStorage.setItem("choice_a", k);
	localStorage.setItem("choice_b", second);
	localStorage.setItem("choice_c", third);
	$('#oldBtnaText').text(riddle[k]);
	$('#oldBtnbText').text(riddle[second]);
	$('#oldBtncText').text(riddle[third]);
//	var answer_a = localStorage.getItem("answer_" + n + k);
//	var answer_b = localStorage.getItem("answer_" + n + second);
//	var answer_c = localStorage.getItem("answer_" + n + third);
}

//Info about timer: http://keith-wood.name/countdown.html
//Function to start te countdown timer
function start_timer() {
	$('#countdowntimer').countdown({until: +30, format: 'S', onExpiry: liftOff});
}

//Function that handle's the time's up
function liftOff() { 
	var r=confirm("Time's up!");
	if (r==true) {
		$.mobile.changePage("#emotionspage");
		$('#countdowntimer').countdown('destroy');
	}
	else {
	}
} 

//Function to detract time from countdown timer
function detract(n){
	var periods = $('#countdowntimer').countdown('getTimes'); 
	var newuntil = periods[6] - n;
	$('#countdowntimer').countdown('option', {until: newuntil});
}		

//Function that loads the riddle image (n is the number of the riddle)
//function get_image(n){
//	var image = localStorage.getItem("riddle_" + n);
//	$('#riddle_image').attr("src",image);
//}


//Function that checks wether the answer was good or bad
function check_answer(n){
	var check = localStorage.getItem("choice_" + n);
	if(check == 0) {
		answer_good();
	} 
	else{
		$('#oldBtn' + n + 'Text').text("FALSE");
		detract(5);
	}
}

//Function that alerts the user when he solved the riddle
function answer_good(){
	var r=confirm("You were correct!");
	if (r==true) {
		$.mobile.changePage("#emotionspage");
		reset_sliders();
		var periods = $('#countdowntimer').countdown('getTimes'); 
		time = periods[6];
		localStorage.setItem("riddletime_" + counter, time);
//		counter++;
		storeEmotions();
		$('#countdowntimer').countdown('destroy');
	}
	else {
	}
}

//Function that loads the stats and the graph
function create_stats(){
	getData();
	create_svg();
}
//Function that puts all the collected data in the dataset array
//function get_data(){
//	dataset = new Array(counter);
//	for (j=0; j<counter; j++){
//		dataset[j] = new Array(5);
//		dataset[j][0] = localStorage.getItem("happy_sad_" + j);
//		dataset[j][1] = localStorage.getItem("relaxed_stressed_" + j);
//		dataset[j][2] = localStorage.getItem("energetic_slow_ " + j);
//		dataset[j][3] = localStorage.getItem("confidentinsecure_" + j);
//		dataset[j][4] = localStorage.getItem("riddletime_" + j);
//	}
////	localStorage.setItem("tester", dataset);
//}

//var dataset2 = [
//[40, 70, 75, 50, 10],
//[20, 65, 40, 50, 75]
//];
//localStorage.setItem("testdataset2", dataset2);

//var datates = d3.range(500).map(function() {
//return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
//});
//localStorage.set("testest",datates);

//Function that creates the graph using d3

var svg;

function create_svg(){
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

function remove_graph(){
	svg.remove();
}

// Database creëren via PhoneGap
//document.addEventListener("deviceready", onDeviceReady, false); //Nodig bij PhoneGap
//function onDeviceReady() {
//	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
//	db.transaction(populateDB, errorCB, successCB);
//}
//
//
//
//// Populate the database 
////
//function populateDB(tx) {
//	tx.executeSql('DROP TABLE IF EXISTS DEMO');
//	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
//	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
//	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
//}
//
//// Transaction error callback
////
//function errorCB(tx, err) {
//	alert("Error processing SQL: "+err);
//}
//
//// Transaction success callback
////
//function successCB() {
//	alert("success!");
//}