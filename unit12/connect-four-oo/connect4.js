class Game {
  constructor(height = 6, width = 7) {
    this.height = height
    this.width = width
    this.currPlayer = 1
    this.board = []
    this.makeBoard()
    this.makeHtmlBoard()
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }))
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board')

    const top = document.createElement('tr')
    top.setAttribute('id', 'column-top')

    this.handleGameClick = this.handleClick.bind(this)
    
    top.addEventListener('click', this.handleGameClick) // do handleClick

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td')

      headCell.setAttribute('id', x)
      top.append(headCell)
    }

    board.append(top)

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr')

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td')

        cell.setAttribute('id', `${y}-${x}`)
        row.append(cell)
      }

      board.append(row)
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) return y
    }

    return null
  }

  placeInTable(y, x) {
    const piece = document.createElement('div')
    piece.classList.add('piece')
    piece.classList.add(`p${this.currPlayer}`)
    piece.style.top = -50 * (y + 2)

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece)
  }

  endGame(msg) {
    alert(msg)
  }

  handleClick(evt) {
    const x = +evt.target.id
    const y = this.findSpotForCol(x)

    if (y === null) return

    this.board[y][x] = this.currPlayer
    this.placeInTable(y, x)

    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1
  }
}

new Game()