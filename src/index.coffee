---
---

hideContentButton = document.querySelector '#hide-content'
content = document.querySelector '#content'
hideContentButton.addEventListener 'click', () ->
  if content.style.display == 'none'
    content.style.display = 'block'
  else
    content.style.display = 'none'

container = document.querySelector '.container'
container.style.height = Math.max( 
  document.body.scrollHeight, 
  document.body.offsetHeight, 
  document.documentElement.scrollHeight, 
  document.documentElement.offsetHeight, 
  window.innerHeight
) + 'px'

drawCells = (cells, cellWidth, cellHeight, cellColor, blightColor) ->
  for cells_x, x in cells
    for cell, y in cells_x
      if cell
        if cell == 1
          ctx.fillStyle = cellColor
        else
          ctx.fillStyle = blightColor
        ctx.fillRect x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2
      else
        ctx.clearRect x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2

updateCells = (cells) ->
  new_cells = makeGrid(0, cells.length, cells[0].length)
  for cells_x, x in cells
    for cell, y in cells_x
      [surroundingCells, blight] = getSurroundingCount(cells, x, y)
      if not cell and surroundingCells > 0 and surroundingCells < 4
        if x == 0 or x == cells.length - 1 or y == 0 or y == cells[0].length - 1 or blight
          new_cells[x][y] = -1
        else
          new_cells[x][y] = 1
  return new_cells

getSurroundingCount = (cells, x, y) -> 
  surroundingCells = 0
  blight = false
  for xChange in [-1..1]
    for yChange in [-1..1]
      if not (xChange == 0 and yChange == 0)
        new_x = x + xChange
        new_y = y + yChange
        if new_x >= 0 and new_x < gridWidth and new_y >= 0 and new_y < gridHeight
          if cells[new_x][new_y] == 1
            surroundingCells++
          else if cells[new_x][new_y] == -1
            blight = true
  return [surroundingCells, blight]

makeGrid = (number, gridWidth, gridHeight) ->
  return ((number for y in [1..gridHeight]) for x in [1..gridWidth])

randomCell = (cells) ->
  while true
    x = Math.floor(Math.random() * cells.length)
    y = Math.floor(Math.random() * cells[0].length)
    if not cells[x][y]
      cells[x][y] = 1
      break

changeSize = ->
  canvas.width = window.innerWidth
  canvas.height = document.documentElement.scrollHeight
  return [Math.floor(canvas.width / tileWidth), Math.floor(canvas.height / tileHeight)]

drawOutline = (color, gridWidth, gridHeight, tileWidth, tileHeight) ->
  ctx.strokeStyle = color
  for x in [0..(gridWidth - 1)]
    ctx.beginPath()
    ctx.moveTo x * tileWidth, 0
    ctx.lineTo x * tileWidth, canvas.height
    ctx.stroke()

  for y in [0..(gridHeight - 1)]
    ctx.beginPath()
    ctx.moveTo 0, y * tileHeight
    ctx.lineTo canvas.width, y * tileHeight
    ctx.stroke()


canvas = document.querySelector 'canvas'
ctx = canvas.getContext '2d'

tileWidth = 20
tileHeight = 20 
[gridWidth, gridHeight] = changeSize()
outlineColor = '#E5E5E5'
cellColor = '#A6C0C5'
blightColor = '#F5968C'
drawOutline(outlineColor, gridWidth, gridHeight, tileWidth, tileHeight)


cells = makeGrid(0, gridWidth, gridHeight)
randomCell(cells)
drawCells(cells, tileWidth, tileHeight, cellColor, blightColor)
cellUpdateTime = 0
cellUpdateWait = 100
cellSpawnTime = 0
cellSpawnWait = 1000

window.addEventListener 'resize', ->
  [gridWidth, gridHeight] = changeSize()
  drawOutline(outlineColor, gridWidth, gridHeight, tileWidth, tileHeight)
  cells = makeGrid(0, gridWidth, gridHeight)

update = (timeStamp) ->
  if timeStamp - cellUpdateTime > cellUpdateWait
    cellUpdateTime = timeStamp
    cells = updateCells(cells)
    drawCells(cells, tileWidth, tileHeight, cellColor, blightColor)

  if timeStamp - cellSpawnTime > cellSpawnWait
    cellSpawnTime = timeStamp
    randomCell(cells)

  window.requestAnimationFrame(update)

# randomCell(cells)
window.requestAnimationFrame(update)