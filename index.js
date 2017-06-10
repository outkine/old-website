(function() {
  var canvas, cells, copy, ctx, drawCells, getSurroundingCount, gridHeight, gridWidth, i, j, k, ref, ref1, tileHeight, tileWidth, updateCells, x, y;

  drawCells = function(cells, cellWidth, cellHeight) {
    var cell, cells_x, j, len, results, x, y;
    results = [];
    for (x = j = 0, len = cells.length; j < len; x = ++j) {
      cells_x = cells[x];
      results.push((function() {
        var k, len1, results1;
        results1 = [];
        for (y = k = 0, len1 = cells_x.length; k < len1; y = ++k) {
          cell = cells_x[y];
          if (cell != null) {
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
    var cell, cells_x, j, k, len, len1, new_cells, surroundingCells, x, y;
    new_cells = copy(cells);
    for (x = j = 0, len = cells.length; j < len; x = ++j) {
      cells_x = cells[x];
      for (y = k = 0, len1 = cells_x.length; k < len1; y = ++k) {
        cell = cells_x[y];
        surroundingCells = getSurroundingCount(cells, x, y);
        if (((cell != null) && surroundingCells === 2) || surroundingCells === 3) {
          console.log(x, y, cell, surroundingCells);
          new_cells[x][y] = true;
        } else {
          new_cells[x][y] = void 0;
        }
      }
    }
    return new_cells;
  };

  getSurroundingCount = function(cells, x, y) {
    var j, k, new_x, new_y, surroundingCells, xChange, yChange;
    surroundingCells = 0;
    for (xChange = j = -1; j <= 1; xChange = ++j) {
      for (yChange = k = -1; k <= 1; yChange = ++k) {
        if (!(xChange === 0 && yChange === 0)) {
          new_x = x + xChange;
          new_y = y + yChange;
          if (new_x >= 0 && new_x < gridWidth && new_y >= 0 && new_y < gridHeight) {
            if (cells[new_x][new_y] != null) {
              surroundingCells++;
            }
          }
        }
      }
    }
    return surroundingCells;
  };

  copy = function(list) {
    var j, len, new_list, v;
    new_list = [];
    for (j = 0, len = list.length; j < len; j++) {
      v = list[j];
      new_list.push(v.slice());
    }
    return new_list;
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

  for (x = j = 0, ref = gridWidth - 1; 0 <= ref ? j <= ref : j >= ref; x = 0 <= ref ? ++j : --j) {
    ctx.beginPath();
    ctx.moveTo(x * tileWidth, 0);
    ctx.lineTo(x * tileWidth, canvas.height);
    ctx.stroke();
  }

  for (y = k = 0, ref1 = gridHeight - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; y = 0 <= ref1 ? ++k : --k) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileHeight);
    ctx.lineTo(canvas.width, y * tileHeight);
    ctx.stroke();
  }

  cells = (function() {
    var l, ref2, results;
    results = [];
    for (i = l = 1, ref2 = gridWidth; 1 <= ref2 ? l <= ref2 : l >= ref2; i = 1 <= ref2 ? ++l : --l) {
      results.push(new Array(gridHeight));
    }
    return results;
  })();

  cells[11][10] = true;

  cells[11][11] = true;

  cells[11][12] = true;

  cells[11][11] = true;

  cells[12][12] = true;

  cells[12][13] = true;

  drawCells(cells, tileWidth, tileHeight);

  setInterval(function() {
    cells = updateCells(cells);
    return drawCells(cells, tileWidth, tileHeight);
  }, 500);

  setInterval(function() {});

}).call(this);
