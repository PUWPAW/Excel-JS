const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, num = '') {
  return `
    <div class="row">
      <div class="row-info">${num}</div>
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnCounter)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
