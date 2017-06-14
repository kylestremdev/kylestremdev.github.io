function SnakeEvent (message, numberOfObservers) {
  this.message = message;

  var completionCount = 0;

  this.observerCompletedEvent = function () {
    completionCount++;

    if (completionCount == numberOfObservers) {
      this.finished();
    }
  };

  this.finished = function () {
    delete this;
  }

}
