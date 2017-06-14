function Snake (centerPoint) {

  this.head = centerPoint;

  this.tail = [];

  this.length = 3;

  this.generateInitialTail = function () {
    for (var i = 1; i < this.length; i++) {
      this.tail.push([this.head[0] + i, this.head[1]]);
    }
  }

  this.updateSnake = function (newHeadPoint) {
    this.tail.splice(0, 0, this.head);
    this.head = newHeadPoint;

    if (this.tail.length > this.length - 1) {
      return this.tail.pop();
    }
  }

  this.growSnake = function () {
    this.length++;
  }

  this.generateInitialTail();
}
