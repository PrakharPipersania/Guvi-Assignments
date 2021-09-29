// Cricket Class
var Cricket = /** @class */ (function () {
    // Constructor
    function Cricket(cricketConfig) {
        // Creating Game Elements
        this.createGameElements();
        // Creating Team 1
        this.team1 = new Team(1, cricketConfig.playerCount, cricketConfig.ballCount, cricketConfig.timerCount);
        this.scoreBoard1 = document.getElementById("score-board1");
        this.scoreBoard1.append(this.team1.teamScoresTable());
        // Creating Team 2
        this.team2 = new Team(2, cricketConfig.playerCount, cricketConfig.ballCount, cricketConfig.timerCount);
        this.scoreBoard2 = document.getElementById("score-board2");
        this.scoreBoard2.append(this.team2.teamScoresTable());
        // Reset Button
        this.resetButton = document.getElementById("reset");
        this.resetButton.onclick = this.reset();
        // Generate Button
        this.generateButton = (document.getElementById("generate"));
        this.generateButton.onclick = this.generateResult();
    }
    // Create Game Elements
    Cricket.prototype.createGameElements = function () {
        var container = document.getElementById("main");
        // Row 1 (Game Name Heading)
        var row1 = document.createElement("div");
        row1.setAttribute("class", "row text-center");
        var gameName = document.createElement("h1");
        gameName.setAttribute("class", "p-0 m-0 mt-2");
        gameName.innerText = "Cricket Game";
        row1.append(gameName);
        container.append(row1);
        // hr Element
        var hr1 = document.createElement("hr");
        container.append(hr1);
        // Row 2 (Instruction/Timer, Reset Button)
        var row2 = document.createElement("div");
        row2.setAttribute("class", "row justify-content-center text-center");
        var gameDetails = document.createElement("div");
        gameDetails.setAttribute("class", "col-lg-6");
        var instruction = document.createElement("h5");
        instruction.setAttribute("id", "timer");
        instruction.innerText = "Team 1 can Start the Match";
        var resetbtn = document.createElement("button");
        resetbtn.setAttribute("class", "btn-sm btn-primary");
        resetbtn.setAttribute("id", "reset");
        resetbtn.innerText = "Reset Game";
        gameDetails.append(instruction);
        gameDetails.append(resetbtn);
        row2.append(gameDetails);
        container.append(row2);
        // Row 3 (Total Score, Hit Button, Score Board)
        var row3 = document.createElement("div");
        row3.setAttribute("class", "row text-center");
        for (var team = 1; team <= 2; ++team) {
            var board = document.createElement("div");
            board.setAttribute("class", "col-lg-6 p-0");
            var hr1_1 = document.createElement("hr");
            board.append(hr1_1);
            var header5 = document.createElement("h5");
            header5.innerHTML = "Team " + team + " Score: <span id=\"total-score" + team + "\">0</span>";
            board.append(header5);
            var hitbtn = document.createElement("div");
            if (team == 1) {
                hitbtn.innerHTML = "<button class=\"btn-sm btn-primary\" id=\"hit" + team + "\">Hit " + team + "</button>";
            }
            else {
                hitbtn.innerHTML = "<button class=\"btn-sm btn-primary\" id=\"hit" + team + "\" disabled>Hit " + team + "</button>";
            }
            board.append(hitbtn);
            var hr2_1 = document.createElement("hr");
            board.append(hr2_1);
            var header6 = document.createElement("h6");
            header6.innerText = "Team " + team + " Score Board";
            board.append(header6);
            var scoreBoardDiv = document.createElement("div");
            scoreBoardDiv.setAttribute("class", "px-4");
            scoreBoardDiv.setAttribute("id", "score-board" + team);
            board.append(scoreBoardDiv);
            row3.append(board);
        }
        container.append(row3);
        // hr Element
        var hr2 = document.createElement("hr");
        container.append(hr2);
        // Row 4 (Generate Result Button)
        var row4 = document.createElement("div");
        row4.setAttribute("class", "row text-center");
        var generateDiv = document.createElement("div");
        generateDiv.setAttribute("class", "col-lg-12");
        var generatebtn = document.createElement("button");
        generatebtn.setAttribute("class", "btn-sm btn-primary");
        generatebtn.setAttribute("id", "generate");
        generatebtn.disabled = true;
        generatebtn.innerText = "Generate Result";
        generateDiv.append(generatebtn);
        row4.append(generateDiv);
        container.append(row4);
        // Row 5 (MATCH WON BY, MAN OF THE MATCH)
        var row5 = document.createElement("div");
        row5.setAttribute("class", "row justify-content-between text-center");
        var wonByDiv = document.createElement("div");
        wonByDiv.setAttribute("class", "col-lg-6");
        var wonBy = document.createElement("p");
        wonBy.setAttribute("id", "won-by");
        wonBy.setAttribute("class", "m-0");
        wonBy.innerText = "MATCH WON BY: ";
        wonByDiv.append(wonBy);
        var manOfTheMatchDiv = document.createElement("div");
        manOfTheMatchDiv.setAttribute("class", "col-lg-6");
        var manOfTheMatch = document.createElement("p");
        manOfTheMatch.setAttribute("id", "man-of-the-match");
        manOfTheMatch.setAttribute("class", "m-0");
        manOfTheMatch.innerText = "MAN OF THE MATCH: ";
        manOfTheMatchDiv.append(manOfTheMatch);
        row5.append(wonByDiv);
        row5.append(manOfTheMatchDiv);
        container.append(row5);
    };
    // Reset Method
    Cricket.prototype.reset = function () {
        return function () {
            window.location.reload();
        };
    };
    // Generate Result Method
    Cricket.prototype.generateResult = function () {
        var _this_1 = this;
        return function () {
            _this_1.generateButton.disabled = true;
            var timerContent = document.getElementById("timer");
            var winningTeam = document.getElementById("won-by");
            var manOfTheMatch = (document.getElementById("man-of-the-match"));
            timerContent.innerText = "Please Reset the Game to Play Again!";
            if (_this_1.team1.getTotalScore() > _this_1.team2.getTotalScore()) {
                var man = _this_1.team1.getManOfTheMatch();
                winningTeam.innerText = "MATCH WON BY: TEAM 1";
                manOfTheMatch.innerText = "MAN OF THE MATCH: " + man[0] + " SCORE: " + man[1] + " (TEAM 1)";
            }
            else if (_this_1.team1.getTotalScore() < _this_1.team2.getTotalScore()) {
                var man = _this_1.team2.getManOfTheMatch();
                winningTeam.innerText = "MATCH WON BY: TEAM 2";
                manOfTheMatch.innerText = "MAN OF THE MATCH: " + man[0] + " SCORE: " + man[1] + " (TEAM 2)";
            }
            else {
                winningTeam.innerText = "MATCH DRAW";
                manOfTheMatch.innerText = "MAN OF THE MATCH: NONE";
            }
        };
    };
    return Cricket;
}());
// Class Team
var Team = /** @class */ (function () {
    // Constructor
    function Team(teamId, playerCount, ballCount, timerCount) {
        this.teamId = teamId;
        this.playerCount = playerCount;
        this.ballCount = ballCount;
        this.curPlayer = 1;
        this.curBall = 1;
        this.timerCount = timerCount;
        this.isTimerRunning = false;
        this.manOfTheMatch = "None";
        this.manOfTheMatchScore = 0;
        this.total = 0;
        this.timerContent = document.getElementById("timer");
        this.hitButton = document.getElementById("hit" + teamId);
        this.hitButton.onclick = this.hit();
    }
    // Creating Table Head for Team
    Team.prototype.tableHeader = function () {
        var header = document.createElement("thead");
        var row = document.createElement("tr");
        var teamName = document.createElement("th");
        teamName.setAttribute("scope", "col");
        teamName.innerText = "TEAM " + this.teamId;
        row.append(teamName);
        for (var b = 1; b <= this.ballCount; ++b) {
            var ball = document.createElement("th");
            ball.setAttribute("scope", "col");
            ball.innerText = "B" + b;
            row.append(ball);
        }
        var total = document.createElement("th");
        total.setAttribute("scope", "col");
        total.innerText = "TOTAL";
        row.append(total);
        header.append(row);
        return header;
    };
    // Creating Table Body for Team
    Team.prototype.tableBody = function () {
        var body = document.createElement("tbody");
        for (var r = 1; r <= this.playerCount; ++r) {
            var row = document.createElement("tr");
            var playerName = document.createElement("th");
            playerName.setAttribute("scope", "row");
            playerName.innerText = "PLAYER " + r;
            row.append(playerName);
            for (var b = 1; b <= this.ballCount; ++b) {
                var ball = document.createElement("td");
                ball.setAttribute("id", "t" + this.teamId + "-p" + r + "-b" + b);
                row.append(ball);
            }
            var total = document.createElement("td");
            total.setAttribute("id", "t" + this.teamId + "-p" + r + "-total");
            row.append(total);
            body.append(row);
        }
        return body;
    };
    // Creating Table for Team
    Team.prototype.teamScoresTable = function () {
        var table = document.createElement("table");
        table.setAttribute("class", "table table-bordered table-hover");
        table.setAttribute("id", "team" + this.teamId);
        table.append(this.tableHeader());
        table.append(this.tableBody());
        return table;
    };
    // Hit Method (To hit the ball)
    Team.prototype.hit = function () {
        var _this_1 = this;
        return function () {
            if (_this_1.isTimerRunning === false) {
                _this_1.isTimerRunning = true;
                _this_1.runTimer();
            }
            if (_this_1.curPlayer <= _this_1.playerCount) {
                var runs = Math.floor(Math.random() * 7);
                var player = document.getElementById("t" + _this_1.teamId + "-p" + _this_1.curPlayer + "-b" + _this_1.curBall);
                player.innerText = runs.toString();
                _this_1.total += runs;
                _this_1.Score();
                if (runs === 0 || _this_1.curBall === _this_1.ballCount) {
                    _this_1.curPlayer = _this_1.curPlayer + 1;
                    _this_1.curBall = 1;
                }
                else {
                    _this_1.curBall = _this_1.curBall + 1;
                }
            }
            else {
                _this_1.hitButton.disabled = true;
            }
        };
    };
    // Score Methof for Score Calculations
    Team.prototype.Score = function () {
        var score = 0;
        var playerTotal = document.getElementById("t" + this.teamId + "-p" + this.curPlayer + "-total");
        for (var b = 1; b <= this.curBall; ++b) {
            var val = +document.getElementById("t" + this.teamId + "-p" + this.curPlayer + "-b" + b).innerText;
            score += val;
        }
        playerTotal.innerText = score.toString();
        if (score > this.manOfTheMatchScore) {
            this.manOfTheMatchScore = score;
            this.manOfTheMatch = "PLAYER " + this.curPlayer;
        }
        document.getElementById("total-score" + this.teamId).innerText =
            this.total.toString();
    };
    // Method to Start the Timer
    Team.prototype.runTimer = function () {
        var timer = this.timerCount;
        var _this = this;
        function counter() {
            _this.timerContent.innerText = "Timer: " + timer + " sec";
            timer--;
            var v = setTimeout(counter, 1000);
            if (timer < 0 || _this.curPlayer > _this.playerCount) {
                clearInterval(v);
                _this.hitButton.disabled = true;
                if (_this.teamId == 1) {
                    var hitBtn2 = document.getElementById("hit2");
                    hitBtn2.disabled = false;
                    _this.timerContent.innerText = "Team 2 can Start the Match";
                }
                else {
                    _this.timerContent.innerText = "You can now Generate the Result";
                    var generate = document.getElementById("generate");
                    generate.disabled = false;
                }
            }
        }
        counter();
    };
    // Total Score Getter Method
    Team.prototype.getTotalScore = function () {
        return this.total;
    };
    // Man of the Match Getter Method
    Team.prototype.getManOfTheMatch = function () {
        return [this.manOfTheMatch, this.manOfTheMatchScore];
    };
    return Team;
}());
// Creating Object for Cricket (Number of Players, Number of Balls, Timer can be change below)
var game = new Cricket({
    playerCount: 10,
    ballCount: 6,
    timerCount: 60
});
