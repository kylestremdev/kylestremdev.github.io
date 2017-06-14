function EventBus (game) {

  this.game = game;

  this.newEvent = function (message) {
    var gameObservers = this.game.observers;

    for (var i = 0; i < gameObservers.length; i++) {
      gameObservers[i].notify(new SnakeEvent(message, gameObservers.length));
    }
  }
}
