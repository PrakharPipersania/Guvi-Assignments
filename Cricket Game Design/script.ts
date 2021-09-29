// Interface for Cricket Class
interface CricketConfig {
  playerCount: number;
  ballCount: number;
  timerCount: number;
}

// Cricket Class
class Cricket {
  // Properties
  private team1: Team;
  private scoreBoard1: HTMLDivElement;
  private team2: Team;
  private scoreBoard2: HTMLDivElement;
  private resetButton: HTMLButtonElement;
  private generateButton: HTMLButtonElement;

  // Constructor
  constructor(cricketConfig: CricketConfig) {
    // Creating Game Elements
    this.createGameElements();

    // Creating Team 1
    this.team1 = new Team(
      1,
      cricketConfig.playerCount,
      cricketConfig.ballCount,
      cricketConfig.timerCount
    );
    this.scoreBoard1 = <HTMLDivElement>document.getElementById(`score-board1`);
    this.scoreBoard1.append(this.team1.teamScoresTable());

    // Creating Team 2
    this.team2 = new Team(
      2,
      cricketConfig.playerCount,
      cricketConfig.ballCount,
      cricketConfig.timerCount
    );
    this.scoreBoard2 = <HTMLDivElement>document.getElementById(`score-board2`);
    this.scoreBoard2.append(this.team2.teamScoresTable());

    // Reset Button
    this.resetButton = <HTMLButtonElement>document.getElementById("reset");
    this.resetButton.onclick = this.reset();

    // Generate Button
    this.generateButton = <HTMLButtonElement>(
      document.getElementById("generate")
    );
    this.generateButton.onclick = this.generateResult();
  }

  // Create Game Elements
  private createGameElements() {
    let container = <HTMLDivElement>document.getElementById("main");
    // Row 1 (Game Name Heading)
    let row1 = document.createElement("div");
    row1.setAttribute("class", "row text-center");
    let gameName = document.createElement("h1");
    gameName.setAttribute("class", "p-0 m-0 mt-2");
    gameName.innerText = "Cricket Game";
    row1.append(gameName);
    container.append(row1);
    // hr Element
    let hr1 = document.createElement("hr");
    container.append(hr1);
    // Row 2 (Instruction/Timer, Reset Button)
    let row2 = document.createElement("div");
    row2.setAttribute("class", "row justify-content-center text-center");
    let gameDetails = document.createElement("div");
    gameDetails.setAttribute("class", "col-lg-6");
    let instruction = document.createElement("h5");
    instruction.setAttribute("id", "timer");
    instruction.innerText = "Team 1 can Start the Match";
    let resetbtn = document.createElement("button");
    resetbtn.setAttribute("class", "btn-sm btn-primary");
    resetbtn.setAttribute("id", "reset");
    resetbtn.innerText = "Reset Game";
    gameDetails.append(instruction);
    gameDetails.append(resetbtn);
    row2.append(gameDetails);
    container.append(row2);
    // Row 3 (Total Score, Hit Button, Score Board)
    let row3 = document.createElement("div");
    row3.setAttribute("class", "row text-center");
    for (let team = 1; team <= 2; ++team) {
      let board = document.createElement("div");
      board.setAttribute("class", "col-lg-6 p-0");
      let hr1 = document.createElement("hr");
      board.append(hr1);
      let header5 = document.createElement("h5");
      header5.innerHTML = `Team ${team} Score: <span id="total-score${team}">0</span>`;
      board.append(header5);
      let hitbtn = document.createElement("div");
      if (team == 1) {
        hitbtn.innerHTML = `<button class="btn-sm btn-primary" id="hit${team}">Hit ${team}</button>`;
      } else {
        hitbtn.innerHTML = `<button class="btn-sm btn-primary" id="hit${team}" disabled>Hit ${team}</button>`;
      }
      board.append(hitbtn);
      let hr2 = document.createElement("hr");
      board.append(hr2);
      let header6 = document.createElement("h6");
      header6.innerText = `Team ${team} Score Board`;
      board.append(header6);
      let scoreBoardDiv = document.createElement("div");
      scoreBoardDiv.setAttribute("class", "px-4");
      scoreBoardDiv.setAttribute("id", `score-board${team}`);
      board.append(scoreBoardDiv);
      row3.append(board);
    }
    container.append(row3);
    // hr Element
    let hr2 = document.createElement("hr");
    container.append(hr2);
    // Row 4 (Generate Result Button)
    let row4 = document.createElement("div");
    row4.setAttribute("class", "row text-center");
    let generateDiv = document.createElement("div");
    generateDiv.setAttribute("class", "col-lg-12");
    let generatebtn = document.createElement("button");
    generatebtn.setAttribute("class", "btn-sm btn-primary");
    generatebtn.setAttribute("id", "generate");
    generatebtn.disabled = true;
    generatebtn.innerText = "Generate Result";
    generateDiv.append(generatebtn);
    row4.append(generateDiv);
    container.append(row4);
    // Row 5 (MATCH WON BY, MAN OF THE MATCH)
    let row5 = document.createElement("div");
    row5.setAttribute("class", "row justify-content-between text-center");
    let wonByDiv = document.createElement("div");
    wonByDiv.setAttribute("class", "col-lg-6");
    let wonBy = document.createElement("p");
    wonBy.setAttribute("id", "won-by");
    wonBy.setAttribute("class", "m-0");
    wonBy.innerText = "MATCH WON BY: ";
    wonByDiv.append(wonBy);
    let manOfTheMatchDiv = document.createElement("div");
    manOfTheMatchDiv.setAttribute("class", "col-lg-6");
    let manOfTheMatch = document.createElement("p");
    manOfTheMatch.setAttribute("id", "man-of-the-match");
    manOfTheMatch.setAttribute("class", "m-0");
    manOfTheMatch.innerText = "MAN OF THE MATCH: ";
    manOfTheMatchDiv.append(manOfTheMatch);
    row5.append(wonByDiv);
    row5.append(manOfTheMatchDiv);
    container.append(row5);
  }

  // Reset Method
  private reset(): () => void {
    return () => {
      window.location.reload();
    };
  }

  // Generate Result Method
  private generateResult(): () => void {
    return () => {
      this.generateButton.disabled = true;
      let timerContent = <HTMLHeadingElement>document.getElementById("timer");
      let winningTeam = <HTMLParagraphElement>document.getElementById("won-by");
      let manOfTheMatch = <HTMLParagraphElement>(
        document.getElementById("man-of-the-match")
      );
      timerContent.innerText = "Please Reset the Game to Play Again!";
      if (this.team1.getTotalScore() > this.team2.getTotalScore()) {
        let man = this.team1.getManOfTheMatch();
        winningTeam.innerText = "MATCH WON BY: TEAM 1";
        manOfTheMatch.innerText = `MAN OF THE MATCH: ${man[0]} SCORE: ${man[1]} (TEAM 1)`;
      } else if (this.team1.getTotalScore() < this.team2.getTotalScore()) {
        let man = this.team2.getManOfTheMatch();
        winningTeam.innerText = "MATCH WON BY: TEAM 2";
        manOfTheMatch.innerText = `MAN OF THE MATCH: ${man[0]} SCORE: ${man[1]} (TEAM 2)`;
      } else {
        winningTeam.innerText = "MATCH DRAW";
        manOfTheMatch.innerText = `MAN OF THE MATCH: NONE`;
      }
    };
  }
}

// Class Team
class Team {
  // Properties
  private teamId: number;
  private playerCount: number;
  private ballCount: number;
  private curPlayer: number;
  private curBall: number;
  private timerCount: number;
  private isTimerRunning: boolean;
  private timerContent: HTMLHeadingElement;
  private manOfTheMatch: string;
  private manOfTheMatchScore: number;
  private total: number;
  private hitButton: HTMLButtonElement;

  // Constructor
  constructor(
    teamId: number,
    playerCount: number,
    ballCount: number,
    timerCount: number
  ) {
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
    this.timerContent = <HTMLHeadingElement>document.getElementById(`timer`);
    this.hitButton = <HTMLButtonElement>document.getElementById(`hit${teamId}`);
    this.hitButton.onclick = this.hit();
  }

  // Creating Table Head for Team
  private tableHeader() {
    let header = document.createElement("thead");
    let row = document.createElement("tr");
    let teamName = document.createElement("th");
    teamName.setAttribute("scope", "col");
    teamName.innerText = `TEAM ${this.teamId}`;
    row.append(teamName);
    for (let b = 1; b <= this.ballCount; ++b) {
      let ball = document.createElement("th");
      ball.setAttribute("scope", "col");
      ball.innerText = `B${b}`;
      row.append(ball);
    }
    let total = document.createElement("th");
    total.setAttribute("scope", "col");
    total.innerText = "TOTAL";
    row.append(total);
    header.append(row);
    return header;
  }

  // Creating Table Body for Team
  private tableBody() {
    let body = document.createElement("tbody");
    for (let r = 1; r <= this.playerCount; ++r) {
      let row = document.createElement("tr");
      let playerName = document.createElement("th");
      playerName.setAttribute("scope", "row");
      playerName.innerText = `PLAYER ${r}`;
      row.append(playerName);
      for (let b = 1; b <= this.ballCount; ++b) {
        let ball = document.createElement("td");
        ball.setAttribute("id", `t${this.teamId}-p${r}-b${b}`);
        row.append(ball);
      }
      let total = document.createElement("td");
      total.setAttribute("id", `t${this.teamId}-p${r}-total`);
      row.append(total);
      body.append(row);
    }
    return body;
  }

  // Creating Table for Team
  teamScoresTable() {
    let table = document.createElement("table");
    table.setAttribute("class", "table table-bordered table-hover");
    table.setAttribute("id", `team${this.teamId}`);
    table.append(this.tableHeader());
    table.append(this.tableBody());
    return table;
  }

  // Hit Method (To hit the ball)
  private hit(): () => void {
    return () => {
      if (this.isTimerRunning === false) {
        this.isTimerRunning = true;
        this.runTimer();
      }
      if (this.curPlayer <= this.playerCount) {
        let runs = Math.floor(Math.random() * 7);
        let player = document.getElementById(
          `t${this.teamId}-p${this.curPlayer}-b${this.curBall}`
        );
        player.innerText = runs.toString();
        this.total += runs;
        this.Score();
        if (runs === 0 || this.curBall === this.ballCount) {
          this.curPlayer = this.curPlayer + 1;
          this.curBall = 1;
        } else {
          this.curBall = this.curBall + 1;
        }
      } else {
        this.hitButton.disabled = true;
      }
    };
  }

  // Score Methof for Score Calculations
  private Score() {
    let score = 0;
    let playerTotal = document.getElementById(
      `t${this.teamId}-p${this.curPlayer}-total`
    );
    for (let b = 1; b <= this.curBall; ++b) {
      let val = +document.getElementById(
        `t${this.teamId}-p${this.curPlayer}-b${b}`
      ).innerText;
      score += val;
    }
    playerTotal.innerText = score.toString();

    if (score > this.manOfTheMatchScore) {
      this.manOfTheMatchScore = score;
      this.manOfTheMatch = `PLAYER ${this.curPlayer}`;
    }

    document.getElementById(`total-score${this.teamId}`).innerText =
      this.total.toString();
  }

  // Method to Start the Timer
  private runTimer() {
    let timer = this.timerCount;
    let _this = this;
    function counter() {
      _this.timerContent.innerText = `Timer: ${timer} sec`;
      timer--;
      let v = setTimeout(counter, 1000);
      if (timer < 0 || _this.curPlayer > _this.playerCount) {
        clearInterval(v);
        _this.hitButton.disabled = true;
        if (_this.teamId == 1) {
          let hitBtn2 = <HTMLButtonElement>document.getElementById("hit2");
          hitBtn2.disabled = false;
          _this.timerContent.innerText = "Team 2 can Start the Match";
        } else {
          _this.timerContent.innerText = "You can now Generate the Result";
          let generate = <HTMLButtonElement>document.getElementById("generate");
          generate.disabled = false;
        }
      }
    }
    counter();
  }

  // Total Score Getter Method
  getTotalScore() {
    return this.total;
  }

  // Man of the Match Getter Method
  getManOfTheMatch() {
    return [this.manOfTheMatch, this.manOfTheMatchScore];
  }
}

// Creating Object for Cricket (Number of Players, Number of Balls, Timer can be change below)
let game = new Cricket({
  playerCount: 10,
  ballCount: 6,
  timerCount: 60,
});