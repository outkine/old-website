(function() {
  var blightColor, canvas, cellColor, cells, ctx, drawCells, getSurroundingCount, gridHeight, gridWidth, i, j, makeGrid, randomCell, ref, ref1, tileHeight, tileWidth, updateCells, x, y;

  drawCells = function(cells, cellWidth, cellHeight, cellColor, blightColor) {
    var cell, cells_x, i, len, results, x, y;
    results = [];
    for (x = i = 0, len = cells.length; i < len; x = ++i) {
      cells_x = cells[x];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (y = j = 0, len1 = cells_x.length; j < len1; y = ++j) {
          cell = cells_x[y];
          if (cell) {
            if (cell === 1) {
              ctx.fillStyle = cellColor;
            } else {
              ctx.fillStyle = blightColor;
            }
            results1.push(ctx.fillRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2));
          } else {
            results1.push(ctx.clearRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2));
          }
        }
        return results1;
      })());
    }
    return results;
  };

  updateCells = function(cells) {
    var blight, cell, cells_x, i, j, len, len1, new_cells, ref, surroundingCells, x, y;
    new_cells = makeGrid(0, cells.length, cells[0].length);
    for (x = i = 0, len = cells.length; i < len; x = ++i) {
      cells_x = cells[x];
      for (y = j = 0, len1 = cells_x.length; j < len1; y = ++j) {
        cell = cells_x[y];
        ref = getSurroundingCount(cells, x, y), surroundingCells = ref[0], blight = ref[1];
        if (!cell && surroundingCells > 0 && surroundingCells < 4) {
          if (x === 0 || x === cells.length - 1 || y === 0 || y === cells[0].length - 1 || blight) {
            new_cells[x][y] = -1;
          } else {
            new_cells[x][y] = 1;
          }
        }
      }
    }
    return new_cells;
  };

  getSurroundingCount = function(cells, x, y) {
    var blight, i, j, new_x, new_y, surroundingCells, xChange, yChange;
    surroundingCells = 0;
    blight = false;
    for (xChange = i = -1; i <= 1; xChange = ++i) {
      for (yChange = j = -1; j <= 1; yChange = ++j) {
        if (!(xChange === 0 && yChange === 0)) {
          new_x = x + xChange;
          new_y = y + yChange;
          if (new_x >= 0 && new_x < gridWidth && new_y >= 0 && new_y < gridHeight) {
            if (cells[new_x][new_y] === 1) {
              surroundingCells++;
            } else if (cells[new_x][new_y] === -1) {
              blight = true;
            }
          }
        }
      }
    }
    return [surroundingCells, blight];
  };

  makeGrid = function(number, gridWidth, gridHeight) {
    var x, y;
    return (function() {
      var i, ref, results;
      results = [];
      for (x = i = 1, ref = gridWidth; 1 <= ref ? i <= ref : i >= ref; x = 1 <= ref ? ++i : --i) {
        results.push((function() {
          var j, ref1, results1;
          results1 = [];
          for (y = j = 1, ref1 = gridHeight; 1 <= ref1 ? j <= ref1 : j >= ref1; y = 1 <= ref1 ? ++j : --j) {
            results1.push(number);
          }
          return results1;
        })());
      }
      return results;
    })();
  };

  randomCell = function(cells) {
    var results, x, y;
    results = [];
    while (true) {
      x = Math.floor(Math.random() * cells.length);
      y = Math.floor(Math.random() * cells[0].length);
      if (!cells[x][y]) {
        cells[x][y] = 1;
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  canvas = $('canvas')[0];

  canvas.width = $(document).width();

  canvas.height = $(document).height();

  ctx = canvas.getContext('2d');

  tileWidth = 20;

  tileHeight = 20;

  gridWidth = Math.floor(canvas.width / tileWidth);

  gridHeight = Math.floor(canvas.height / tileHeight);

  ctx.strokeStyle = '#a3a3a3';

  cellColor = '#999999';

  blightColor = '#e05353';

  for (x = i = 0, ref = gridWidth - 1; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
    ctx.beginPath();
    ctx.moveTo(x * tileWidth, 0);
    ctx.lineTo(x * tileWidth, canvas.height);
    ctx.stroke();
  }

  for (y = j = 0, ref1 = gridHeight - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; y = 0 <= ref1 ? ++j : --j) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileHeight);
    ctx.lineTo(canvas.width, y * tileHeight);
    ctx.stroke();
  }

  cells = makeGrid(0, gridWidth, gridHeight);

  randomCell(cells);

  drawCells(cells, tileWidth, tileHeight);

  setInterval(function() {
    return randomCell(cells);
  }, 1000);

  setInterval(function() {
    cells = updateCells(cells);
    return drawCells(cells, tileWidth, tileHeight, cellColor, blightColor);
  }, 100);

}).call(this);
