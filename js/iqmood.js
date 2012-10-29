
document.addEventListener("deviceready", onDeviceReady, false);
				
function onDeviceReady() {
		    
	}
		    
		    
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);

	// Populate the database 
    //
    function populateDB(tx) {
		 tx.executeSql('DROP TABLE IF EXISTS DEMO');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
		 tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
		 tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

		    // Transaction error callback
		    //
		    function errorCB(tx, err) {
			alert("Error processing SQL: "+err);
		    }

		    // Transaction success callback
		    //
		    function successCB() {
			alert("success!");
		    }
		
		//localStorage.clear();
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
		//Counter for saving the emotions
		var counter = 0;
		//Array that contains all the data
		var dataset;
		//Storing some test data	
//		localStorage.setItem("happy_sad_0", 40);
//		localStorage.setItem("relaxed_stressed_0", 70);
//		localStorage.setItem("energetic_slow_ 0", 75);
//		localStorage.setItem("confident_insecure_0", 55);
//		localStorage.setItem("riddletime_0", 10);	
//		localStorage.setItem("happy_sad_1", 20);
//		localStorage.setItem("relaxed_stressed_1", 65);
//		localStorage.setItem("energetic_slow_ 1", 40);
//		localStorage.setItem("confident_insecure_1", 30);
//		localStorage.setItem("riddletime_1", 75);
	       
//		$('#propertiespage').bind('swipeleft', function() {
//			$.mobile.changePage("#emotionspage");
//		});

//		$(document).on('mobileinit', function () {
//			$.mobile.ignoreContentEnabled = true;
//		});

//		initDatabase();

		
		var IQMOODDB;
		

		function initDatabase() {
			try {
			    if (!window.openDatabase) {
				alert('Databases are not supported in this browser.');
			    } else {
				var shortName = 'IQMOODDB';
				var version = '1.0';
				var displayName = 'IQMOOD Database';
				var maxSize = 100000; //  bytes
				IQMOODDB = openDatabase(shortName, version, displayName, maxSize);
				createTables();
			    }
			} catch(e) {
		 
			    if (e == 2) {
				// Version number mismatch.
				console.log("Invalid database version.");
			    } else {
				console.log("Unknown error "+e+".");
			    }
			    return;
			}
		}
		
		function createTables(){
			IQMOODDB.transaction(
			function (transaction) {
				transaction.executeSql('CREATE TABLE IF NOT EXISTS page_settings(id INTEGER NOT NULL PRIMARY KEY, fname TEXT NOT NULL,bgcolor TEXT NOT NULL, font TEXT, favcar TEXT);', []);
			}
		    );
			prePopulate();
		}
		
		function prePopulate(){
			IQMOODDB.transaction(
			    function (transaction) {
				//Optional Starter Data when page is initialized
				var dataa = ['1','none','#B3B4EF','Helvetica','Porsche 911 GT3'];
				transaction.executeSql("INSERT INTO page_settings(id, fname, bgcolor, font, favcar) VALUES (?, ?, ?, ?, ?)", [dataa[0], dataa[1], dataa[2], dataa[3], dataa[4]]);
			    }
			);
		}
		
		function onError(tx, error) {
			alert(error.message);
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
				
	       //Function for saving the emotions
		function save_emotions() {
			localStorage.setItem("happy_sad_" + counter, $('#slider-1').val());
			localStorage.setItem("relaxed_stressed_" + counter, $('#slider-2').val());
			localStorage.setItem("energetic_slow_ " + counter, $('#slider-3').val());
			localStorage.setItem("confident_insecure_" + counter, $('#slider-4').val());
			start_timer();
			new_riddle();
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
	       			       
	       //Function that creates a new riddle
	       function new_riddle(){
			var ranNumber = Math.round(Math.random() * 3);
			localStorage.setItem("aaaaaaaaaa", ranNumber);
			get_image(ranNumber);
			set_answers(ranNumber);
			$('#countdowntimer').countdown('option', {until: +30});
	       }
	       
	       //Function that loads the riddle image (n is the number of the riddle)
	       function get_image(n){
			var image = localStorage.getItem("riddle_" + n);
			$('#riddle_image').attr("src",image);
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
	       
	       //Function that loads the answers for the riddle and puts that in a random order, NOG NIET VOLLEDIG RANDOM
	       function set_answers(n){
			var k = Math.round(Math.random() * 2);
			localStorage.setItem("choice_a", k);
			var second = (k+2)%3;
			localStorage.setItem("choice_b", second);
			var third = (k+1)%3;
			localStorage.setItem("choice_c", third);
			var forth = (k+3)%4;
			localStorage.setItem("choice_d", forth);
			var answer_a = localStorage.getItem("answer_" + n + k);
			$('#oldBtnaText').text(answer_a);
			var answer_b = localStorage.getItem("answer_" + n + second);
			$('#oldBtnbText').text(answer_b);
			var answer_c = localStorage.getItem("answer_" + n + third);
			$('#oldBtncText').text(answer_c);
	       }
		
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
				var timesolved = periods[6];
				localStorage.setItem("riddletime_" + counter, timesolved);
				counter++;
				$('#countdowntimer').countdown('destroy');
			}
			else {
			}
		}
		
		//Function that loads the stats and the graph
		function create_stats(){
			get_data();
			create_svg();
		}
		//Function that puts all the collected data in the dataset array
		function get_data(){
			dataset = new Array(counter);
			for (j=0; j<counter; j++){
				dataset[j] = new Array(5);
				dataset[j][0] = localStorage.getItem("happy_sad_" + j);
				dataset[j][1] = localStorage.getItem("relaxed_stressed_" + j);
				dataset[j][2] = localStorage.getItem("energetic_slow_ " + j);
				dataset[j][3] = localStorage.getItem("confidentinsecure_" + j);
				dataset[j][4] = localStorage.getItem("riddletime_" + j);
			}
//			localStorage.setItem("tester", dataset);
		}
		
//		var dataset2 = [
//			[40, 70, 75, 50, 10],
//			[20, 65, 40, 50, 75]
//		];
//		localStorage.setItem("testdataset2", dataset2);

//		var datates = d3.range(500).map(function() {
//		  	return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
//		});
//		localStorage.set("testest",datates);
		
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
				
//			var canvas = d3.select("#graph")
//				.append("canvas")
//				.attr("width", w)
//				.attr("height", h);
	
//			var context = canvas.node().getContext("2d");
//			context.fillStyle = "black";
//			context.strokeStyle = "#666";
//			context.strokeWidth = 1.5;
			
//			dataset.forEach(function(d) {
//				context.beginPath();
//				context.arc(riddleScale(d[4]), happysadScale(d[0]), 10, 0, 2*Math.PI);
//				context.fill();
//				context.stroke();
//			});
				
			
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