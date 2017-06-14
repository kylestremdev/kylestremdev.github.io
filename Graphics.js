function Graphics (game) {
  this.game = game;
  this.gameBoard;

  this.notify = function (snakeEvent) {
    switch (snakeEvent.message) {
      case "ProgramStart":
        this.programStart();
        snakeEvent.observerCompletedEvent();
        break;

      case "GameStart":
        this.gameStart();
        snakeEvent.observerCompletedEvent();
        break;

      case "GameBoardCreated":
        this.getGameBoard();
        this.drawGameBoard();

        this.game.gameBoardDrawn();
        snakeEvent.observerCompletedEvent();
        break;

      case "UpdateFrameBoardCreated":
        this.drawGameBoard();
        snakeEvent.observerCompletedEvent();
        break;

      case "GameEnd":
        this.gameBoard = null;

        snakeEvent.observerCompletedEvent();
        break;

      case "GameLogicEnded":
        this.gameEnded();

        snakeEvent.observerCompletedEvent();
        break;
      default:
        snakeEvent.observerCompletedEvent();

    }
  }

  this.programStart = function () {
    document.getElementById('startButton').style.display = "block";
  }

  this.gameStart = function () {
    document.getElementById('startButton').style.display = "none";
    document.getElementById('endGame').style.display = "none";
    document.getElementById('game').style.display = "block";
    document.getElementById('board').style.display = "block";

  }

  this.getGameBoard = function () {
    this.gameBoard = this.game.gameLogic.gameBoard;
    document.getElementById('board').style.width = (this.gameBoard.width * 20) + "px";
    document.getElementById('board').style.height = (this.gameBoard.height * 20) + "px";
    document.getElementById('game').style.textAlign = "center";
  }

  this.drawGameBoard = function () {
    this.gameBoard.generateBoardHTML();
    document.getElementById('board').innerHTML = this.gameBoard.boardHTML;
    document.getElementById('gameScore').innerHTML = this.game.gameLogic.score;
  }

  this.gameEnded = function () {
    document.getElementById('board').innerHTML = "";
    document.getElementById('game').style.display = "none";
    document.getElementById('endGame').style.display = "block";
    document.getElementById('endGame').style.textAlign = "center";
    document.getElementById('score').innerHTML = this.game.gameScore;
  }
}
