(function() {
  var blightColor, canvas, cellColor, cellSpawnTime, cellSpawnWait, cellUpdateTime, cellUpdateWait, cells, changeSize, ctx, drawCells, drawOutline, getSurroundingCount, gridHeight, gridWidth, makeGrid, outlineColor, randomCell, ref, tileHeight, tileWidth, update, updateCells;

  $('#hide-content').on('click touch', function() {
    if ($('.container').css('visibility') === 'visible') {
      return $('.container').css('visibility', 'hidden');
    } else {
      return $('.container').css('visibility', 'visible');
    }
  });

  $('.container').css('height', $(document).height());

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

  changeSize = function() {
    canvas.width = $(document).width();
    canvas.height = $(document).height();
    return [Math.floor(canvas.width / tileWidth), Math.floor(canvas.height / tileHeight)];
  };

  drawOutline = function(color, gridWidth, gridHeight, tileWidth, tileHeight) {
    var i, j, ref, ref1, results, x, y;
    ctx.strokeStyle = color;
    for (x = i = 0, ref = gridWidth - 1; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
      ctx.beginPath();
      ctx.moveTo(x * tileWidth, 0);
      ctx.lineTo(x * tileWidth, canvas.height);
      ctx.stroke();
    }
    results = [];
    for (y = j = 0, ref1 = gridHeight - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; y = 0 <= ref1 ? ++j : --j) {
      ctx.beginPath();
      ctx.moveTo(0, y * tileHeight);
      ctx.lineTo(canvas.width, y * tileHeight);
      results.push(ctx.stroke());
    }
    return results;
  };

  canvas = $('canvas')[0];

  ctx = canvas.getContext('2d');

  tileWidth = 20;

  tileHeight = 20;

  ref = changeSize(), gridWidth = ref[0], gridHeight = ref[1];

  outlineColor = '#E5E5E5';

  cellColor = '#A6C0C5';

  blightColor = '#F5968C';

  drawOutline(outlineColor, gridWidth, gridHeight, tileWidth, tileHeight);

  cells = makeGrid(0, gridWidth, gridHeight);

  randomCell(cells);

  drawCells(cells, tileWidth, tileHeight, cellColor, blightColor);

  cellUpdateTime = 0;

  cellUpdateWait = 100;

  cellSpawnTime = 0;

  cellSpawnWait = 1000;

  $(window).resize(function() {
    var ref1;
    ref1 = changeSize(), gridWidth = ref1[0], gridHeight = ref1[1];
    drawOutline(outlineColor, gridWidth, gridHeight, tileWidth, tileHeight);
    return cells = makeGrid(0, gridWidth, gridHeight);
  });

  update = function(timeStamp) {
    if (timeStamp - cellUpdateTime > cellUpdateWait) {
      cellUpdateTime = timeStamp;
      cells = updateCells(cells);
      drawCells(cells, tileWidth, tileHeight, cellColor, blightColor);
    }
    if (timeStamp - cellSpawnTime > cellSpawnWait) {
      cellSpawnTime = timeStamp;
      randomCell(cells);
    }
    return window.requestAnimationFrame(update);
  };

  window.requestAnimationFrame(update);

}).call(this);
