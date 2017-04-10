$result_box = $('#result');

var times_played, level, score, multiplier;

function init(){
	times_played = 0;
	level = 1;
	score = 0;
	multiplier = 0;
}

function assignMultiplier(level){
	switch(level){
		case 1:
			multiplier = 4;
			break;

		case 2:
			multiplier = 8;
			break;

		case 3:
			multiplier = 12;
			break;

		case 4:
			multiplier = 16;
			break;

		case 5:
			multiplier = 20;
			break;
	}
}

function render(){
	$result_box.val('');
	var prevmultiplier = multiplier - 4 > 0 ? multiplier - 4 : 1 ;
	$('#num2').text(Math.floor(Math.random() * 12 + 1));
	$('#num1').text(Math.floor(Math.random() * (multiplier - prevmultiplier + 1) + prevmultiplier));	// quite difficult to explain, but trying to make sure the 
	//first number is between the limit of the prevmultiplier + 1 and multiplier.
	$('#score').text(score);
	$('#level').text(level);
}

function initSettings(){
	times_played++;
	score += level;
	if(times_played % 5 == 0){  // increase the level after the player has played 5 times in a row.
		level++;
	}

	assignMultiplier(level);
}

function checkAnswer(){
	var num1 = $('#num1').text();
	var num2 = $('#num2').text();

	var result = num1 * num2;
	var user_answer = $result_box.val();

	return user_answer == result;
}

$(function(){

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/test',
		dataType: 'jsonp',
		headers: {
			'authenticated': 'Worthy'
		},
		success: function(data){
			console.log(JSON.parse(data));
		}
	});



	init();
	render();	
	$('#result_container').on('submit', function(e){
		e.preventDefault();
		if(checkAnswer()){
			initSettings();
			render();
		}else{
			$('#result').val('');
			alert("You lose! Go learn your multiplication table well.");
			init();
			render();
		}
	});
});