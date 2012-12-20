/**
 * Function that should be called whenever the user is about to go to the profile page.
 */
function page_profile_enter()
{
	//Set the age to a previously stored value if found
	var age = localStorage.profile_age;
	if (isNaN(age) || (age < 1))
	{
		document.getElementById("age_input").value = "";	
	}
	else
	{
		document.getElementById("age_input").value = age; 
	}
	
	//Set the location to the last known location
	document.getElementById("location_text").innerHTML = localStorage.profile_location;
	
	//Set the gender to a previously stored value if found
	var gender = localStorage.profile_gender;
	if (gender == "male")
	{
		document.getElementById("gender_input_M").checked = true;
	}
	if (gender == "female")
	{
		document.getElementById("gender_input_F").checked = true;
	}
	if (gender == "unknown")
	{
		document.getElementById("gender_input_M").checked = false;
		document.getElementById("gender_input_F").checked = false;
	}
	
	$("#gender_input_M").checkboxradio("refresh"); //warning: this method returns??
	$("#gender_input_F").checkboxradio("refresh");
}


/**
 * Function that should be called whenever the user leaves the profile page.
 */
function page_profile_exit()
{
	var age = document.getElementById("age_input").value;
	if (isNaN(age) || (age < 1))
		{
			age = 0;
		}
	
	var gender = "unknown";
	if (document.getElementById("gender_input_M").checked)
	{
			gender = "male";
	}
	
	if (document.getElementById("gender_input_F").checked)
	{
			gender = "female";
	}
	
	localStorage.profile_age = age;
	localStorage.profile_gender = gender;
	storeProfile(age, gender);
}

/**
 * Function that is called every second to update the date.
 */
function updateLocalTime()
{
	var date = new Date();
	localStorage.profile_date = date;
	document.getElementById("local_time_text").innerHTML = formatDateString(date);
}

function formatDateString(date)
{
	var sec = date.getSeconds();
	var min = date.getMinutes();
	var hour = date.getHours();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	
	if (sec < 10)
	{
		sec = "0" + sec;
	}
	if (min < 10)
	{
		min = "0" + min;
	}
	if (hour < 10)
	{
		hour = "0" + hour;
	}
	if (day < 10)
	{
		day = "0" + day;
	}
	if (month < 10)
	{
		month = "0" + month;
	}
	
	return (hour  + ":" + min + ":" + sec + "  -  " + day + "/" + month + "/" + year);
}


/**
 * Function that updates the dropdown box when the user turns the reminding option on or off
 */
function updateRemindSelectMenu(boolean)
{
	var dropdownbox = document.getElementById('interval_list');
	
	if(boolean)
	{
		dropdownbox.selectedIndex = 0;

	}
	else
	{
		dropdownbox.selectedIndex = 3;
	}

	$("#interval_list").selectmenu("refresh");
}

function updateRemindRadioButtons()
{
	var index = document.getElementById("interval_list").selectedIndex;
	
	if(index == 3)
	{
		document.getElementById("auto_remind_off").checked = true;
	}
	else
	{
		document.getElementById("auto_remind_on").checked = true;
	}
	
	$("#auto_remind_on").checkboxradio("refresh");
	$("#auto_remind_off").checkboxradio("refresh");
}








