/**
 * Creates and returns a mathematical riddle.
 */
function getNewMathRiddle()
{
	//Create the riddle: a simple sum of two random numbers
	var a = getRandomBetween(11,29);
	var b = getRandomBetween(5,17);
	var riddleHeader = "Solve this sum"
	var riddleString = (a + " + " + b + " = ?");
	var riddleAnswer = a+b;
	
	//Create the 4 random possible answers (one of which is correct)
	var offset = getRandomBetween(0,-3);
	var riddlePossibleAnswers = new Array(4);
	for(var i = 0; i < 4; i++)
	{
		riddlePossibleAnswers[i] = riddleAnswer + i + offset;
	}
	
	//Create a riddle object and return it
	var riddle =
	{
		header: riddleHeader,
		question: riddleString,
		answer: riddleAnswer,
		allAnswers: riddlePossibleAnswers
	};
	
	return riddle;
}


/**
 * Creates and returns a letter riddle.
 */
function getNewLetterRiddle()
{
	for(var i = 0; i < 13; i++)
	{
		s
	}
	
	
	var riddleHeader = "Which letter appears most?"
	var riddleString = "";
	var riddleAnswer = "";
	
	return riddle;	
}




/**
 * Returns a random number between a and b, including a and b.
 * This function only works properly on integers.
 */
function getRandomBetween(a,b)
{
	var minimum = Math.min(a,b);
	var maximum = Math.max(a,b);
	
	var difference = Math.abs(minimum - maximum);
	return (minimum + Math.round(Math.random() * difference));
}