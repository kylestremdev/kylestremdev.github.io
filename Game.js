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
  }

  this.gameStart = function () {
    eventBus.newEvent("GameStart");
  }

  this.gameBoardCreated = function () {
    eventBus.newEvent("GameBoardCreated");
  }

  this.gameBoardDrawn = function () {
    self = this;
    self.state = "Running Game";
    self.gameLoop = setInterval(function () {
      self.updateFrame();
    }, 150);
  }

  this.gameEnd = function () {
    eventBus.newEvent("GameEnd");

    clearInterval(this.gameLoop);
    this.state = "Ending Game";

  }

  this.gameLogicEnded = function () {
    eventBus.newEvent("GameLogicEnded");
  }

  this.updateFrame = function () {
    eventBus.newEvent("UpdateFrame");
  }

  this.updateFrameBoardCreated = function () {
    eventBus.newEvent("UpdateFrameBoardCreated");
  }

  this.upArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("UpArrowPressed");
  }

  this.downArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("DownArrowPressed");
  }

  this.leftArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("LeftArrowPressed");
  }

  this.rightArrowPressed = function () {

    if (this.state != "Running Game") {
      return;
    }

    eventBus.newEvent("RightArrowPressed");
  }

  this.programStart();
}
