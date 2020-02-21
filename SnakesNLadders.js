/*Need to declare all global variables*/
var intervalrunning = false;
var playerturn = 1;
var movelog;
var winflashmsg = document.getElementById("win-flash-msg");
let ladders = new Map();

ladders.set(1, 38);
ladders.set(4, 14);
ladders.set(9, 31);
ladders.set(21, 42);
ladders.set(28, 84);
ladders.set(36, 44);
ladders.set(51, 67);
ladders.set(71, 91);
ladders.set(80, 100);

let snakes = new Map();

snakes.set(16, 6);
snakes.set(48, 26);
snakes.set(49, 11);
snakes.set(56, 53);
snakes.set(62, 19);
snakes.set(64, 60);
snakes.set(87, 24);
snakes.set(93, 73);
snakes.set(95, 75);
snakes.set(98, 78);

var player1 = {
	number: 1,
	square: 0
};

var player2 = {
	number: 2,
	square: 0
};

/*Window onload function; For DOM manipulation*/
window.onload = pageReady;
function pageReady() {
	
	for (const [key, value] of ladders.entries(ladders)) {
		console.log(key, value);
		document.getElementById("square"+key).style = "background-color:#99ff99;";
	}
	
	for (const [key, value] of snakes.entries(snakes)) {
		console.log(key, value);
		document.getElementById("square"+key).style = "background-color:red;";
	}
}

function TryToStartGame(){
	if(intervalrunning === false){
		StartGame();
	}
}

function StartGame()
{
	var interval = 333;
	
	timer = window.setInterval(function(){
		
		intervalrunning = true;
		//Get a random number from 1-6
		var roll = Math.floor(Math.random()*6)+1;
		
		if(playerturn === 1){
			player = player1;
		} else if(playerturn === 2){
			player = player2;
		}
		if(player.square >= 1 && player.square <= 100){
			document.getElementById("square"+player.square).style = "background-color:white;";
		}
		player.square = Math.min(player.square + roll, 100);
		msg = "Player " + player.number + " rolled " + roll + " and landed on " + player.square + ".";
		
		//Check if a ladder is stepped on
		if(ladders.has(player.square)){
			
			player.square = ladders.get(player.square);
			
			msg += " Then they climbed a ladder to " + player.square + "!";
		}
		//Then check if a snake is stepped on
		if(snakes.has(player.square)){
			
			player.square = snakes.get(player.square);
			
			msg += " Then they slid down a snake to " + player.square + "!";
		}
		movelog = "<p>" + msg + "</p>" + document.getElementById("scrollbox").innerHTML;
		document.getElementById("scrollbox").innerHTML = movelog;
		console.log(msg);
		
		
		if(playerturn === 1){
			document.getElementById("square"+player.square).style = "background-color:blue;";
			playerturn = 2;
		} else if(playerturn === 2){
			document.getElementById("square"+player.square).style = "background-color:orange;";
			playerturn = 1;
		}
		
		if(player.square >= 100){
			movelog = "<p>Player " + player.number + " wins!!!</p>" + document.getElementById("scrollbox").innerHTML;
			document.getElementById("scrollbox").innerHTML = movelog;
			document.getElementById("square"+player1.square).style = "background-color:white;";
			document.getElementById("square"+player2.square).style = "background-color:white;";
			player1.square = 0;
			player2.square = 0;
			intervalrunning = false;
			window.clearInterval(timer);
		}
	}, interval);
}