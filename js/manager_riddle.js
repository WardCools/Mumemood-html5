/**
 * Function that creates and returns a random riddle.
 */
function getRandomRiddle()
{
	switch(getRandomIntegerBetween(1,2))
	{
	case 1: 
	  return getNewMathRiddle();
	  break;
	case 2: 
		return getNewLetterRiddle();
	  break;
	default:
		return getNewMathRiddle();
	}	
}


/**
 * Creates and returns a mathematical riddle.
 */
function getNewMathRiddle()
{
	//Create the riddle: a simple sum of two random numbers
	var a = getRandomIntegerBetween(5,17); 
	var b = getRandomIntegerBetween(11,29);
	var c = getRandomIntegerBetween(5,17);
	var riddleString = (a + " + " + b + " + " + c + " = ?");
	
	//Create the 4 random possible answers (one of which is correct)
	var riddleAnswer = a+b+c;
	var offset = getRandomIntegerBetween(0,-3);
	var riddlePossibleAnswers = new Array(4);
	for(var i = 0; i < 4; i++)
	{
		riddlePossibleAnswers[i] = riddleAnswer + i + offset;
	}
	
	//Create a riddle object and return it
	var riddle =
	{
		type: "math", //string
		header: "Solve this sum", //string
		question: riddleString, //string
		answer: riddleAnswer, //integer
		allAnswers: riddlePossibleAnswers //an array of four integers
	};
	
	return riddle;
}


/**
 * Creates and returns a letter riddle.
 */
function getNewLetterRiddle()
{

	//Create the riddle: a random sequence of letters
	var letters = "";
	
	for(var i = 0; i < 4; i++)
	{
		letters += getRandomLetter(letters);
	}
	
	var riddleString = getScrambledString(getExpandedString(letters));
	
	//Create the 4 random possible answers (one of which is correct)
	var randomInteger = getRandomIntegerBetween(3,4);
	var riddleHeader = "Which letter appears " + randomInteger + " times?";
	var riddleAnswer = letters[randomInteger-1];
	var riddlePossibleAnswers = new Array(4);
	letters = getScrambledString(letters);
	for(var i = 0; i < 4; i++)
	{
		riddlePossibleAnswers[i] = letters[i];
	}

	//Create a riddle object and return it
	var riddle =
	{
		type: "letter", //string
		header: riddleHeader, //string
		question: riddleString, //string
		answer: riddleAnswer, //1-letter string
		allAnswers: riddlePossibleAnswers //array of four 1-letter strings
	};
	
	return riddle;	
}




/**
 * Returns a random number between a and b, including a and b.
 * This function only works properly on integers.
 */
function getRandomIntegerBetween(a,b)
{
	var minimum = Math.min(a,b);
	var maximum = Math.max(a,b);
	
	var difference = Math.abs(minimum - maximum);
	return (minimum + Math.round(Math.random() * difference));
}

/**
 * Returns a random uppercase letter from the alphabet, excluding any letters given.
 */
function getRandomLetter(excluding)
{
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	for(var i = 0; i < excluding.length; i++)
	{
		var excludedLetter = excluding[i];
		alphabet = alphabet.replace(excludedLetter,"");
	}
	
	var index = getRandomIntegerBetween(0,alphabet.length-1);
	
	return alphabet[index];
}

/**
 * Returns a string which consists of one time the first letter in letters, two times the second letter
 * in letters, three times the third letter in letters and so on... in a random order. 
 */
function getExpandedString(letters)
{
	var expandedString = "";
	
	for(var i = 0; i < letters.length; i++)
	{
		var currentLetter = letters[i];
		
		for(var j = 0; j < i+1; j++)
		{
			expandedString += currentLetter;
		}
	}
	
	return expandedString;
}

/**
 * Returns a string in which all the characters are randomly re-ordered.
 */
function getScrambledString(characters)
{

	var amountOfCharacters = characters.length;
	var scrambledString = "";

	for (var i = 0; i < amountOfCharacters; i++)
	{

	    var randomIndex = getRandomIntegerBetween(0,characters.length-1);
	    scrambledString += characters[randomIndex];
	    characters = characters.substring(0,randomIndex) + characters.substring(randomIndex+1);
	}

	return scrambledString;
}











