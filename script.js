window.onload = function () {
  var game = new Game();

  document.getElementById('startButton').addEventListener("click", game.gameStart);
  document.getElementById('replay').addEventListener("click", game.gameStart);

  window.onkeydown = function (e) {
    if (e.key == "w" || e.key == "ArrowUp") {
      game.upArrowPressed();
    } else if (e.key == "s" || e.key == "ArrowDown") {
      game.downArrowPressed();
    } else if (e.key == "a" || e.key == "ArrowLeft") {
      game.leftArrowPressed();
    } else if (e.key == "d" || e.key == "ArrowRight") {
      game.rightArrowPressed();
    }
  }
}
