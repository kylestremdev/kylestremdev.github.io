function Board (width, height) {
  this.width = width;
  this.height = height;
  this.boardArr = [];
  this.boardHTML = "";

  this.generateInitialBoardArr = function () {
    for (var i = 0; i < this.height; i++) {
      var arr = [];
      for (var j = 0; j < this.width; j++) {
        arr.push(0);
      }
      this.boardArr.push(arr);
    }
  }

  this.generateBoardHTML = function () {
    var boardHTML = "";
    for (var i = 0; i < this.boardArr.length; i++) {
      var row = "<div class='row' style='margin:0 auto;'>"
      for (var j = 0; j < this.boardArr[i].length; j++) {
        var color;
        if (this.boardArr[i][j] == 1) {
          color = "red";
        } else if (this.boardArr[i][j] == 2) {
          color = "white";
        } else {
          color = "#444";
        }
        row += "<div class='cell' style='background-color:" + color + ";width:18px;height:18px;display:inline-block;margin:1px;padding:0;'></div>";
      }
      row += "</div>";
      boardHTML += row;
      this.boardHTML = boardHTML;
    }
  }

  this.updateBoardCell = function (y, x, value) {
    this.boardArr[y][x] = value;
  }

  this.generateInitialBoardArr();
}
