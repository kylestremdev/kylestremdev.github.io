function GameLogic (game) {
  this.game = game;
  this.gameBoard;
  this.snake;
  this.applePos;
  this.direction = "up";
  this.directionChangeAllowed = true;
  this.score = 0;


  this.availableSpaces = [];

  this.notify = function (snakeEvent) {
    switch (snakeEvent.message) {
      case "ProgramStart":
        snakeEvent.observerCompletedEvent();
        break;
      case "GameStart":
        /* initialize Game Logic */
        // get new Board
        this.getNewGameBoard();
        // initially populate gameboard with snake and generate apple
        this.populateNewGameBoard();
        this.generateAvailableSpaces();
        this.generateApple();
        // notify game of gameboard creation
        this.game.gameBoardCreated();
        snakeEvent.observerCompletedEvent();
        break;
      case "UpdateFrame":
        this.directionChangeAllowed = true;
        this.updateSnake();
        if (this.game.state == "Running Game") {
          this.updateSnakeOnBoard();
          this.generateAvailableSpaces();
          this.game.updateFrameBoardCreated();
        }

        snakeEvent.observerCompletedEvent();
        break;
      case "GameEnd":
        this.game.gameScore = this.score;
        this.score = 0;
        this.gameBoard = null;
        this.snake = null;
        this.direction = "up";

        this.game.gameLogicEnded();
        snakeEvent.observerCompletedEvent();
        break;
      case "UpArrowPressed":
        if (this.direction != "down" && this.directionChangeAllowed) {
          this.direction = "up";
          this.directionChangeAllowed = false;
        }
        snakeEvent.observerCompletedEvent();
        break;
      case "DownArrowPressed":
        if (this.direction != "up" && this.directionChangeAllowed) {
          this.direction = "down";
          this.directionChangeAllowed = false;
        }
        snakeEvent.observerCompletedEvent();
        break;
      case "LeftArrowPressed":
        if (this.direction != "right" && this.directionChangeAllowed) {
          this.direction = "left";
          this.directionChangeAllowed = false;
        }
        snakeEvent.observerCompletedEvent();
        break;
      case "RightArrowPressed":
        if (this.direction != "left" && this.directionChangeAllowed) {
          this.direction = "right";
          this.directionChangeAllowed = false;
        }
        snakeEvent.observerCompletedEvent();
        break;
      default:
        snakeEvent.observerCompletedEvent();
    }
  }

  this.getNewGameBoard = function () {
    this.gameBoard = new Board(20, 20);
  }

  this.populateNewGameBoard = function () {
    // find center board to start snake
    var centerPoint = [0,0];
    centerPoint[0] = Math.floor(this.gameBoard.height / 2);
    centerPoint[1] = Math.floor(this.gameBoard.width / 2);

    this.snake = new Snake(centerPoint);

    this.gameBoard.updateBoardCell(this.snake.head[0], this.snake.head[1], 2);

    for (var i = 0; i < this.snake.tail.length; i++) {
      var y = this.snake.tail[i][0];
      var x = this.snake.tail[i][1];
      this.gameBoard.updateBoardCell(y, x, 2);
    }
  }

  this.generateAvailableSpaces = function () {
    this.availableSpaces = [];

    for (var i = 0; i < this.gameBoard.boardArr.length; i++) {
      for (var j = 0; j < this.gameBoard.boardArr[i].length; j++) {
        if (this.gameBoard.boardArr[i][j] == 0) {
          this.availableSpaces.push([i, j]);
        }
      }
    }
  }

  this.generateApple = function () {
    // randomly take apple from a position in availableSpaces
    var appleIdx = Math.floor(Math.random() * this.availableSpaces.length)
    var applePos = this.availableSpaces[appleIdx];

    this.gameBoard.updateBoardCell(applePos[0], applePos[1], 1);

    this.availableSpaces.splice(applePos, 1);

    this.applePos = applePos;
  }

  this.updateSnake = function () {
    var newHead = [0, 0];
    if (this.direction == "up") {
      newHead = [this.snake.head[0] - 1, this.snake.head[1]];
    } else if (this.direction == "down") {
      newHead = [this.snake.head[0] + 1, this.snake.head[1]];
    } else if (this.direction == "left") {
      newHead = [this.snake.head[0], this.snake.head[1] - 1];
    } else if (this.direction == "right") {
      newHead = [this.snake.head[0], this.snake.head[1] + 1];
    }

    if (newHead[0] < 0 || newHead[0] >= this.gameBoard.height) {
      return this.game.gameEnd();
    } else if (newHead[1] < 0 || newHead[1] >= this.gameBoard.width) {
      return this.game.gameEnd();
    } else if (this.gameBoard.boardArr[newHead[0]][newHead[1]] == 2) {
      return this.game.gameEnd();
    }

    if (newHead[0] == this.applePos[0] && newHead[1] == this.applePos[1]) {
      this.snake.growSnake();

      var newHeadIdxInAvailableSpaces = this.availableSpaces.findIndex(function (element) {
        return element[0] == newHead[0] && element[1] == newHead[1];
      })

      this.availableSpaces.splice(newHeadIdxInAvailableSpaces, 1);

      this.generateApple();
      this.score += 10;
    }

    var sheddedTail = this.snake.updateSnake(newHead);
    if (sheddedTail) {
      this.gameBoard.updateBoardCell(sheddedTail[0], sheddedTail[1], 0);
    }
  }

  this.updateSnakeOnBoard = function () {
    this.gameBoard.updateBoardCell(this.snake.head[0], this.snake.head[1], 2);

    for (var i = 0; i < this.snake.tail.length; i++) {
      var y = this.snake.tail[i][0];
      var x = this.snake.tail[i][1];
      this.gameBoard.updateBoardCell(y, x, 2);
    }
  }
}
