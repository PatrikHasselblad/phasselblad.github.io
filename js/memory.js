/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/memory.js
 * @version 1.0
 */

import { NewMemory } from './NewMemory.js'

/* const template = document.createElement('template')
template.innerHTML = `
      <a id="aLink" href="#"><img src="/image/0.png" alt="A memory brick"></a>
 ` */
// <div class="memoryApp"></div>

/**
* Constructs a new Memory game.
* @param {Object} newMemory - Object with parameters of chosen game size.
*/
const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  margin: 50px;
  width: 250px;
  height: 350px;
  background-color: rgb(88, 87, 87);
  border: 2px solid #000;
  box-shadow: 10px 10px 10px;
  /* display: block; */
  float: left;
}
</style>
`

class Memory extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    // this.box = appendChild(document.querySelector('#memory'))
  }

  connectedCallback () {
    const memoryBtn = document.querySelector('#memorybtn')
    memoryBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      const newGame = new NewMemory(2, 2)
      this.rows = newGame.rows
      this.cols = newGame.cols
      this.pairs = 0
      this.tries = 0
      this.turn1 = null
      this.turn2 = null
      this.lastTile = null
      this.tiles = this.getPictureArray()
      this.playMemory()
      console.log(this.tiles)
    })
  }

  playMemory () {
    const template1 = document.querySelector('#memoryBox')
    // const brick = .appendChild(template1.content.cloneNode(true))
    const position = document.querySelector('#memory')
    // console.log(brick)
    // Set image size.
    const imgStyle = document.createElement('style')
    imgStyle.innerHTML = '.memBrick img {width: 70px;}'
    this.shadowRoot.appendChild(imgStyle)

    const temp = document.querySelectorAll(template1)[0].content.firstElementChild

    this.tiles.forEach((tile, index) => {
      const a = document.cloneNode(temp, true) // .appendChild(imgTemplate.content.cloneNode(true))
      console.log('a', a)
      position.appendChild(temp)

      // console.log(container)

      a.addEventListener('click', e => {
        e.preventDefault()
        const img = e.target.nodeName === 'IMG' ? e.target : e.target.firstElementChild
        this.turnBrick(tile, img)
      })
      if ((index + 1) % this.cols === 0) {
        position.appendChild(document.createElement('br'))
      }
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

          const elem = document.querySelector('#memoryBox')
          elem.remove()
        }

        window.setTimeout(() => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')

          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        window.setTimeout(() => {
          this.turn1.src = '../image/0.png'
          this.turn2.src = '../image/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 500)
      }
    }
  }
  // }

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
