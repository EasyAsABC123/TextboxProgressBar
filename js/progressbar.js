function AnimateProgressBar(progressBarID, width, stop) {
	var progressBar = $('#' + progressBarID);

	if (stop) {
		progressBar.stop();
	}

	progressBar.addClass('Processing');
	progressBar.removeClass('Complete');
	progressBar.css('display', 'block');
	progressBar.css('width', '15px');
	progressBar.animate(
        {
        	width: width + 'px'
        }, {
        	easing: 'linear',
        	duration: 10000,
        	complete: function () {
        		AnimateProgressBar(progressBarID, width, false);
        	}
        }
    );
}

/**
 * This method will animate the shiny part of
 * the progress bar.
 */
function AnimateShiny(timeout, width, duration) {
	setTimeout(function () {
		var shiny = $('#LevelShiny');

		if (ie) {
			// This version is for IE 6/7/8 because they don't handle
			// fade in/fade out for transparent PNGs.
			shiny.css('display', 'block');
			shiny.animate(
                        {
                        	marginLeft: width
                        }, {
                        	easing: 'linear',
                        	duration: duration,
                        	complete: function () {
                        		shiny.css('display', 'none');
                        		shiny.css('margin-left', '0px');
                        		AnimateShiny(5000, width, duration);
                        	}
                        }
                );
		}
		else {
			shiny.fadeIn(80, function () {
				shiny.animate(
                        {
                        	marginLeft: width
                        }, {
                        	easing: 'linear',
                        	duration: duration,
                        	complete: function () {
                        		shiny.fadeOut(80, function () {
                        			shiny.css('margin-left', '0px');
                        			AnimateShiny(5000, width, duration);
                        		});
                        	}
                        }
                );
			});
		}
	}, timeout);
}

function CompleteProgressBar(progressBarID, width, completeWidth, fadeOut, preFadeCallback, callback) {
	var progressBar = $('#' + progressBarID);

	progressBar.stop();
	progressBar.animate(
        {
        	width: width + 'px'
        }, {
        	easing: 'linear',
        	duration: 400,
        	complete: function () {
        		progressBar.removeClass('Processing');
        		progressBar.addClass('Complete');
        		progressBar.css('width', completeWidth + 'px');

        		if (fadeOut) {
        			if (preFadeCallback != null) {
        				preFadeCallback();
        			}

        			progressBar.fadeOut(1000, function () {
        				if (callback != null) {
        					callback();
        				}
        			});
        		}
        		else {
        			if (preFadeCallback != null) {
        				preFadeCallback();
        			}

        			if (callback != null) {
        				callback();
        			}
        		}
        	}
        }
    );
}