(function(){
	function noteFreq(n) {
		return 440 * Math.pow(2, (n - 69) / 12);
	}

	var context = new (window.AudioContext || window.webkitAudioContext)();

	// cool(tm) synthesizer
	var synth = (function() {
		var oscillators = [];
		for (var i = 0; i < 3; i++) {
			var osc = context.createOscillator();
			oscillators.push(osc);
			osc.type = i == 1 ? 'square' : 'sine';
			osc.connect(context.destination);
			osc.start();
		}

		function play(note) {
			for (var i = 0; i < oscillators.length; i++) {
				var osc = oscillators[i];
				osc.frequency.value = noteFreq(note - 12 * (i - 1));
			}
		}

		function stop() {
			for (var i = 0; i < oscillators.length; i++) {
				var osc = oscillators[i];
				osc.stop();
			}
		}

		return {
			play: play,
			stop: stop,
		};
	})();

	function test(index){ 
		console.log(document.getElementById("freq"));
		if (index >= notes.length) {
			synth.stop();
		} else { 
			var note = notes[index];

			$("#freq").html(note + " mg/dL");
			note = Math.floor(36 + ((+note) * (48 / 200)));
			synth.play(note);
			setTimeout(function(){ 
				test(index + 1); 
			}, 125);
		} 
	}

	test(0);
	
	var data = {
		  // A labels array that can contain any sort of values
		  labels: 'mg/dL',
		  // Our series array that contains series objects or in this case series data arrays
		  series: notes
		};

		// Create a new line chart object where as first parameter we pass in a selector
		// that is resolving to our chart container element. The Second parameter
		// is the actual data object.
		new Chartist.Line('.ct-chart', data);
	

})();
