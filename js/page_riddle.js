/**
 * Function that should be called whenever the user is about to go to the riddle page.
 */
function page_riddle_enter()
{
	//Generate a new riddle
	var riddle = getRandomRiddle();

	//Set the riddle question on the page
	document.getElementById("riddle_header").innerHTML=riddle.header;
	document.getElementById("riddle_question").innerHTML=riddle.question;

	
    localStorage.riddle_answer = riddle.answer;
    
    $("#riddle_answer_button_A_text").text(riddle.allAnswers[0]);
    $("#riddle_answer_button_B_text").text(riddle.allAnswers[1]);
    $("#riddle_answer_button_C_text").text(riddle.allAnswers[2]);
    $("#riddle_answer_button_D_text").text(riddle.allAnswers[3]);
 
    //Reset and start the timer
    localStorage.solvingTime = 0;
    document.getElementById("timerText").innerHTML= formatTimeString(0);
    localStorage.timer_ID = self.setInterval(function(){count()},1000);	
	
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
}


/**
 * Function that should be called whenever the user leaves the riddle page.
 */
function page_riddle_exit()
{
    //Stop the timer function
    window.clearInterval(localStorage.timer_ID);
}


/**
 * Function that is called every second when the timer is active.
 */
function count()
{
	var seconds = Number(localStorage.solvingTime) + 1;
	document.getElementById("timerText").innerHTML = formatTimeString(seconds);
	localStorage.solvingTime = seconds;
}

/**
 * Function that takes an integer and converts it a time string formatted as MM:SS
 */
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

/**
 * Function that checks whether the answer to the current riddle is correct or wrong.
 */
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
		var seconds = Number(localStorage.solvingTime) + 5;	
		localStorage.solvingTime = seconds;
		var timerText = document.getElementById("timerText");
		$("#timerIcon").effect( "bounce", "slow" );
		setTimeout(function() {timerText.style.color = "red";}, 200);
		setTimeout(function() {timerText.style.color = "black";}, 1000);
	}
}

/**
* Function that saves the result of the last solved in the database
*/
function save_riddle_result()
{
	if((localStorage.profile_age < 1) || (localStorage.profile_gender == "unknown"))
	{
		showFillInProfileDialog();
	}
	else
	{
		var emo1 = localStorage.emotion1Value;
		var emo2 = localStorage.emotion2Value;
		var emo3 = localStorage.emotion3Value;
		var emo4 = localStorage.emotion4Value;
		var time = localStorage.solvingTime;
		var age = localStorage.profile_age;
		var gender = localStorage.profile_gender;
		var date = localStorage.profile_date;
		var location = localStorage.profile_location;
		
		storeEntry(emo1,emo2,emo3,emo4,time,age,gender,date,location);
	}
}

/**
 * Creates a black overlay element and a dialog asking the user to fill in the profile page
 */
function showFillInProfileDialog()
{
	var overlayElement = document.createElement('div');
	$(overlayElement).css({background: 'black',opacity: '0.7',width: '100%',height: '100%',position: 'absolute',top: 0,left: 0,display: 'none',zIndex: 101}).attr('id', 'overlay_element');
	$('body').append(overlayElement);
	
	var dialogBox = document.createElement('div');
	$(dialogBox).css({background: 'white',width: '60%',height: '60%',margin:'20% 20%',position: 'fixed',zIndex: 102}).attr('id', 'dialog_box');
	$('body').append(dialogBox);
	
	
	var dialogBoxText = document.createElement("h3");
	$(dialogBoxText).text("To save your results, you need to fill in your profile.");
	$(dialogBox).append(dialogBoxText);
	
	var dialogBoxButtonGoToProfile = document.createElement("button");
	$(dialogBoxButtonGoToProfile).text("Go to my profile");
	$(dialogBox).append(dialogBoxButtonGoToProfile);
	
	var dialogBoxButtonDontSave = document.createElement("button");
	$(dialogBoxButtonDontSave).text("Don't save");
	$(dialogBox).append(dialogBoxButtonDontSave);
	
	
	$('#overlay_element').fadeIn('slow');
	$('#dialog_box').fadeIn('slow');
}
