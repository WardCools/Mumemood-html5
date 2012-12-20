//Array that contains all the data
var database
var dataTable = ["emotion1Value", "emotion2Value", "emotion3Value", "emotion4Value", "solvingTime","age","sex","date","location"];
var profileTable = ["age", "gender"];
var entries;

$(function()
{
	//Initializes the database
	initializeDatabase();
	
	//Clears the localStorage
	localStorage.clear();
	
	//Load all available profile data into the localStorage.
	localStorage.profile_age = 0;
	localStorage.profile_gender = "unknown";
	localStorage.profile_location = getCurrentLocation();
	
	database.transaction(function (transaction)
	{
		transaction.executeSql('SELECT * FROM PROFILE', [], function(txx, results)
		{
			var age_result = results.rows.item(0).age;
			if (!isNaN(age_result) && (age_result > 0))
			{
				localStorage.profile_age = age_result;
			}

			localStorage.profile_gender = results.rows.item(0).gender;
		});
	});
	
	//this updates the current local time every second the app is running
	self.setInterval(function(){updateLocalTime()},1000);
});

/**
 * Function that initializes the database
 */
function initializeDatabase()
{
	try
	{
		if (!window.openDatabase)
		{
			alert("Databases are not supported in this browser.");
		}
		else
		{
			var shortName = "IQMOODDB";
			var version = "1.0";
			var displayName = "IQMOOD Database";
			var maxSize = (2 * 1024 * 1024); //2 megabytes
			database = window.openDatabase(shortName, version, displayName, maxSize);
			clearData(); //Only needed for testing purposes to clear the database everytime we run
			database.transaction(createEntryTable, errorCB, successCB);
			database.transaction(createProfileTable, errorCB, successCB);
		}
	}
	catch(e)
	{
		if (e == 2)
		{
			alert("Invalid database version.");
		} 
		else
		{
			alert("Unknown database error occured " + e + ".");
		}
	}
}

/**
 * Transaction error callback, called when a database transaction returns an error.
 */
function errorCB(transaction, error)
{
	alert("Error processing SQL: " + error);
}

/**
 * Transaction success callback, called when a database transaction is succesful.
 */
function successCB()
{
	
}

/**
 * Function that deletes the IQMOODDATA table
 */
function clearData()
{
	database.transaction(
			function (transaction)
			{
				transaction.executeSql('DROP TABLE IF EXISTS ENTRY');
				transaction.executeSql('DROP TABLE IF EXISTS PROFILE');
			}, errorCB, successCB);
}

/**
 * Function that creates the ENTRY Table
 */
function createEntryTable(transaction)
{
	transaction.executeSql('CREATE TABLE IF NOT EXISTS ENTRY(' + dataTable[0] + ' INTEGER,' + dataTable[1] + ' INTEGER, ' + dataTable[2] + ' INTEGER, ' + dataTable[3] + ' INTEGER, '  + dataTable[4] + ' INTEGER,'  + dataTable[5] + ' INTEGER,'  + dataTable[6] + ' TEXT,'  + dataTable[7] + ' TEXT,' + dataTable[8] + ' TEXT);');
}

/**
 * Function that creates the PROFILE Table
 */
function createProfileTable(transaction)
{
	transaction.executeSql('CREATE TABLE IF NOT EXISTS PROFILE(' + profileTable[0] + ' INTEGER,' + profileTable[1] + ' TEXT);');
}

/**
 * Function that stores a riddle entry in the database
 */
function storeEntry(emo1,emo2,emo3,emo4,time,age,gender,date,loc)
{
	alert("storeEntry is running");
	
	database.transaction(
		function (transaction)
		{
			transaction.executeSql("INSERT INTO ENTRY(" + dataTable[0] + ", " + dataTable[1] + ", " + dataTable[2] + ", " + dataTable[3] + ", " + dataTable[4] + ", " + dataTable[5] + ", " + dataTable[6] + ", "  + dataTable[7] + ", " + dataTable[8] + ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [emo1,emo2,emo3,emo4,time,age,gender,date,loc]);
		}
		, errorCB, successCB);
}

/**
 * Function that stores a user's age and sex in the database
 */
function storeProfile(age, gender)
{
	database.transaction(
		function (transaction) 
		{
			transaction.executeSql("DELETE FROM PROFILE");
			transaction.executeSql("INSERT INTO PROFILE(" + profileTable[0] + ", " + profileTable[1] + ") VALUES (?, ?)", [age, gender]);
		}
		, errorCB, successCB);
}

function loadEntriesIntoArray()
{
	alert("getEntries is running");
	
	database.transaction(queryEntries, errorCB);
}

function queryEntries(transaction)
{
	alert("queryEntries is running");
	
	transaction.executeSql('SELECT * FROM ENTRY',[], queryEntriesSuccess, errorCB);
}

function queryStatsSuccess(transaction, results)
{
	alert("queryEntriesSuccess is running");
	
	var amountOfEntries = results.rows.length;
	dataset = new Array(amountOfEntries);
	
	for(var i = 0; i < amountOfEntries; i++)
	{
		dataset[i] = new Array(10);
		var entry = results.rows.item(i);
		
		dataset[i][0] = entry.entryID;
		dataset[i][1] = entry.emotion1Value;
		dataset[i][2] = entry.emotion2Value;
		dataset[i][3] = entry.emotion3Value;
		dataset[i][4] = entry.emotion4Value;
		dataset[i][5] = entry.solvingTime;
		dataset[i][6] = entry.age;
		dataset[i][7] = entry.sex;
		dataset[i][8] = entry.location;
		dataset[i][9] = entry.date;
	}
}