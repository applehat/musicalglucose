(function(){



	var context = new (window.AudioContext || window.webkitAudioContext)();
	var osc = context.createOscillator();
		osc.type = 'sine'; 
		osc.connect(context.destination); 
		osc.start();

	var osc2 = context.createOscillator();
		osc2.type = 'sine';
		osc2.connect(context.destination);
		osc2.start();

	function test(index){ 
		console.log(document.getElementById("freq"));
		if (index >= notes.length) { 
			osc.stop(); 
			osc2.stop();
		} else { 
			var note = notes[index];

			$("#freq").html(note + " mg/dL");
			osc.frequency.value = note; 
			osc2.frequency.value = note + 100; 
			setTimeout(function(){ 
				test(index + 1); 
			},100);  
		} 
	}

	test(0);



})();