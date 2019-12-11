/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/memory.js
 * @version 1.0
 */

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memoryApp">
    <a id="aLink" href="#"><img src="/image/0.png" alt="A memory brick"></a>
 </div>
 `

/**
* Constructs a new Memory game.
* @param {Object} newMemory - Object with parameters of chosen game size.
*/
class Memory extends window.HTMLElement {
  constructor (newGame) {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.playMemory(newGame)
  }

  playMemory (newGame) {
    console.log(newGame)
    this.rows = newGame.rows
    this.cols = newGame.cols
    const tiles = this.getPictureArray()
    this.pairs = 0
    this.tries = 0
    this.turn1 = null
    this.turn2 = null
    this.lastTile = null
    const container = document.querySelector('#memoryBox')
    const position = this.shadowRoot.querySelector('.memoryApp a') // .content.firstElementChild
    // const position = document.querySelectorAll('.memoryApp')[0] // .content.firstElementChild
    console.log('cols' + this.cols)

    tiles.forEach(function (tile, index) {
      const a = document.importNode(position, true)
      container.appendChild(a)
      console.log(a)

      a.addEventListener('click', function (event) {
        event.preventDefault()
        const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
        this.turnBrick(tile, img)
      })
    //  if ((index + 1) % this.cols === 0) {
      //  container.appendChild(document.createElement('br'))
      // }
    })
  }

  turnBrick (tile, img) {
    if (this.turn2) {
      return
    }
    img.src = '../image/' + tile + '.png'

    if (!this.turn1) {
      this.turn1 = img
      this.lastTile = tile
    } else {
      if (img === this.turn1) {
        return
      }
      this.tries += 1
      this.turn2 = img

      if (tile === this.lastTile) {
        this.pairs += 1

        if (this.pairs === (this.cols * this.rows) / 2) {
          console.log('You won with ' + this.tries + ' number of tries.')
        }

        window.setTimeout(function () {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')

          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        window.setTimeout(function () {
          this.turn1.src = '../image/0.png'
          this.turn2.src = '../image/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 500)
      }
    }
  }

  /**
 * Function to create and shuffle an array to be used in the memory game.
 * @param {Number} rows - Number of rows.
 * @param {Number} cols - Number of columns.
 */
  getPictureArray () {
    const pictureArray = []

    // Add 2 of each card
    for (let i = 1; i <= (this.rows * this.cols) / 2; i++) {
      pictureArray.push(i)
      pictureArray.push(i)
    }
    // Shuffler
    for (let i = pictureArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pictureArray[i]
      pictureArray[i] = pictureArray[j]
      pictureArray[j] = temp
    }
    return pictureArray
  }
}

window.customElements.define('memory-app', Memory)
export { Memory }
