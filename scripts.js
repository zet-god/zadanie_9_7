var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame); //błąd?

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {
	playerPick('rock')
});
pickPaper.addEventListener('click', function() {
	playerPick('paper')
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors')
});

var gameState = 'notStarted',
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

var newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultElem.style.display = 'block';
		break;
		case 'ended':
			newGameBtn.innerText = 'Play again';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultElem.style.display = 'none';
	}
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
	player.name = prompt('Please enter your name', 'imię gracza'); //błąd?
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();

		playerNameElem.innerHTML = player.name;
		setGamePoints();
	}
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick; //błąd?
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
	//console.log(playerPick + " " + computerPick);
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone';
	}
	else if (
		(computerPick == 'rock' && playerPick == 'scissors') ||
		(computerPick == 'scissors' && playerPick == 'paper') ||
		(computerPick == 'paper' && playerPick == 'rock')
		) {

		winnerIs = 'computer';
	}
	
	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
	}
	else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
	}
	setGamePoints();
	checkPoints();
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
	//console.log(player.score, computer.score);
}

function checkPoints() {
	if (computer.score == 3) {
		//checkPoints();
		alert('Computer won.');
		gameState = 'ended';
		setGameElements();
	}
	else if (player.score == 3) {
		//checkPoints();
		alert('You won!');
		gameState = 'ended';
		setGameElements();
	}
}

// function checkPoints() {
// 	if (computer.score == 3) {
// 		computerPointsElem.innerHTML = '3';
// 		alert('Computer won');
// 		location.reload();
// 	}
// 	else if (player.score == 3) {
// 		playerPointsElem.innerHTML = '3';
// 		alert('You won');
// 		location.reload();
// 	}
// }