const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, index) {
    return `
      <div 
        class="cell" 
        contenteditable
        data-col="${index}"
        data-type="cell"
        data-id="${row}:${index}" 
      ></div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, num = '') {
  const resize = num ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${num}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const columnCounter = CODES.Z - CODES.A + 1
  const rows = []
  const column = new Array(columnCounter)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
      
  rows.push(createRow(column))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(columnCounter)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(cell, row + 1))
  }

  return rows.join('')
}
