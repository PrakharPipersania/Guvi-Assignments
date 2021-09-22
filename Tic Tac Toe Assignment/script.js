var turn = 0;
var cellCount = 9;
var players = ["Player 1", "Player 2"]
var symbol = {
	player1: 'X',
	player2: 'O'
};

var main = document.createElement("div");
main.setAttribute("id", "main");
var wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");
main.append(wrapper);

var gamename = document.createElement("div");
gamename.setAttribute("id", "gamename");
gamename.innerText = "Tic Tac Toe";
wrapper.append(gamename);

var divplayer = document.createElement("div");
divplayer.setAttribute("id", "currentPlayer");
divplayer.innerText = players[turn] + " Turn";
wrapper.append(divplayer);

var divboard = document.createElement("div");
divboard.setAttribute("id", "board");

var row1 = document.createElement("div");
row1.setAttribute("class", "row");
var r1c1 = document.createElement("div");
r1c1.setAttribute("class", "cell");
r1c1.setAttribute("id", "r1c1");
r1c1.setAttribute("onclick", "setValue(this)");
r1c1.setAttribute("style", "border-top: 0px;border-left: 0px");
var r1c2 = document.createElement("div");
r1c2.setAttribute("class", "cell");
r1c2.setAttribute("id", "r1c2");
r1c2.setAttribute("onclick", "setValue(this)");
r1c2.setAttribute("style", "border-top: 0px;");
var r1c3 = document.createElement("div");
r1c3.setAttribute("class", "cell");
r1c3.setAttribute("id", "r1c3");
r1c3.setAttribute("onclick", "setValue(this)");
r1c3.setAttribute("style", "border-top: 0px;border-right: 0px");
row1.append(r1c1);
row1.append(r1c2);
row1.append(r1c3);

var row2 = document.createElement("div");
row2.setAttribute("class", "row");
var r2c1 = document.createElement("div");
r2c1.setAttribute("class", "cell");
r2c1.setAttribute("id", "r2c1");
r2c1.setAttribute("onclick", "setValue(this)");
r2c1.setAttribute("style", "border-left: 0px;");
var r2c2 = document.createElement("div");
r2c2.setAttribute("class", "cell");
r2c2.setAttribute("id", "r2c2");
r2c2.setAttribute("onclick", "setValue(this)");
var r2c3 = document.createElement("div");
r2c3.setAttribute("class", "cell");
r2c3.setAttribute("id", "r2c3");
r2c3.setAttribute("onclick", "setValue(this)");
r2c3.setAttribute("style", "border-right: 0px;");
row2.append(r2c1);
row2.append(r2c2);
row2.append(r2c3);

var row3 = document.createElement("div");
row3.setAttribute("class", "row");
var r3c1 = document.createElement("div");
r3c1.setAttribute("class", "cell");
r3c1.setAttribute("id", "r3c1");
r3c1.setAttribute("onclick", "setValue(this)");
r3c1.setAttribute("style", "border-left: 0px;border-bottom: 0px;");
var r3c2 = document.createElement("div");
r3c2.setAttribute("class", "cell");
r3c2.setAttribute("id", "r3c2");
r3c2.setAttribute("onclick", "setValue(this)");
r3c2.setAttribute("style", "border-bottom: 0px;");
var r3c3 = document.createElement("div");
r3c3.setAttribute("class", "cell");
r3c3.setAttribute("id", "r3c3");
r3c3.setAttribute("onclick", "setValue(this)");
r3c3.setAttribute("style", "border-right: 0px;border-bottom: 0px;");
row3.append(r3c1);
row3.append(r3c2);
row3.append(r3c3);

divboard.append(row1);
divboard.append(row2);
divboard.append(row3);

wrapper.append(divboard);

var divreset = document.createElement("button");
divreset.setAttribute("id", "btn-reset");
divreset.setAttribute("onClick", "reset()");
divreset.innerText = "Reset Game";
wrapper.append(divreset);
document.body.append(main);

function toggleplayer() {
	turn = (turn === 0 ? 1 : 0);
}

function setValue(e) {
	var text = e.innerText;
	if (text === "") {
		e.innerText = (turn === 0 ? symbol.player1 : symbol.player2);
		toggleplayer();
		document.getElementById("currentPlayer").innerText = players[turn] + " Turn";
		--cellCount;
	} else {
		document.getElementById("currentPlayer").innerHTML = players[turn] + " Turn: <span style='color:red'>Cell is already occupied. Please Try Again!</span>";
	}
	if (cellCount === 0) {
		document.getElementById("currentPlayer").innerHTML = "<span style='color:limegreen'>Please reset the Game</span>";
	}
}

function reset() {
    turn = 0;
	cellCount = 9;
	for (var i = 1; i <= 3; ++i) {
		for (var j = 1; j <= 3; ++j) {
			document.getElementById("r" + i + "c" + j).innerHTML = '';
		}
	}
    document.getElementById("currentPlayer").innerText = players[turn] + " Turn";
}