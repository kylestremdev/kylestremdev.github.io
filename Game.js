function Game () {

  this.graphics = new Graphics(this);
  this.gameLogic = new GameLogic(this);

  this.observers = [this.graphics, this.gameLogic];

  var eventBus = new EventBus(this);

  this.state = undefined;
  this.gameLoop;
  this.gameScore = 0;

  this.programStart = function () {
    eventBus.newEvent("ProgramStart");
    console.log("Program Start");
  }

  this.gameStart = function () {
    eventBus.newEvent("GameStart");
    console.log("Game Start");
  }

  this.gameBoardCreated = function () {
    eventBus.newEvent("GameBoardCreated");
    console.log("Game Board Created");
  }

  this.gameBoardDrawn = function () {
    self = this;
    self.state = "Running Game";
    self.gameLoop = setInterval(function () {
      self.updateFrame();
    }, 150);
    console.log("Game Board Drawn");
  }

  this.gameEnd = function () {
    eventBus.newEvent("GameEnd");

    clearInterval(this.gameLoop);
    this.state = "Ending Game";

    console.log("Game End");
  }

  this.gameLogicEnded = function () {
    eventBus.newEvent("GameLogicEnded");
    console.log("Game Logic Ended");
  }

  this.updateFrame = function () {
    eventBus.newEvent("UpdateFrame");
    console.log("Update Frame");
  }

  this.updateFrameBoardCreated = function () {
    eventBus.newEvent("UpdateFrameBoardCreated");
    console.log("Update Frame Board Created");
  }

  this.upArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("UpArrowPressed");
    console.log("Up Arrow Pressed");
  }

  this.downArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("DownArrowPressed");
    console.log("Down Arrow Pressed");
  }

  this.leftArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("LeftArrowPressed");
    console.log("Left Arrow Pressed");
  }

  this.rightArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("RightArrowPressed");
    console.log("Right Arrow Pressed");
  }

  this.programStart();
}
