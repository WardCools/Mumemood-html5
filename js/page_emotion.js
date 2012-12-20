/**
 * Function that should be called whenever the user is about to go to the emotion page.
 */
function page_emotion_enter()
{
	
}


/**
 * Function that should be called whenever the user leaves the emotion page.
 */
function page_emotion_exit()
{
	//Store the emotions the user has entered
	localStorage.emotion1Value = $('#slider1').val();
	localStorage.emotion2Value = $('#slider2').val();
	localStorage.emotion3Value = $('#slider3').val();
	localStorage.emotion4Value = $('#slider4').val();
}

/**
 * Function that puts the emotion labels on the correct position. This only runs when the app is loaded or refreshed
 */
function positionLabels()
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
}

/**
 * Whenever the page loads or is refreshed, position the labels correctly 
 */
$('#page_emotion').ready(function()
{ 
	positionLabels()
});	

/**
 * Whenever the window is resized, position the labels correctly 
 */
$(window).resize(function()
{ 
	positionLabels()
});