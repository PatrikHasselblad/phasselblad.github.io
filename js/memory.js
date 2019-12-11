/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/memory.js
 * @version 1.0
 */

/**
* Function to initialize a new Memory game.
* @param {Object} newMemory - Object with parameters of chosen game size.
*/

class Memory extends window.HTMLElement {
 constructor (newMemory) {
   super ()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

  const rows = newMemory.rows
  const cols = newMemory.cols
  const tiles = getPictureArray(rows, cols)
  let pairs = 0
  let tries = 0
  let turn1 = null
  let turn2 = null
  let lastTile = null
  const container = document.querySelector('#memoryBox')
  // const template = document.querySelectorAll('#memoryApp')[0].content.firstElementChild

  tiles.forEach(function (tile, index) {
    const a = document.createElement('a') // .importNode(template, true)
    container.appendChild(a)

    a.addEventListener('click', function (event) {
      event.preventDefault()
      const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      turnBrick(tile, img)
    })
    if ((index + 1) % cols === 0) {
      container.appendChild(document.createElement('br'))
    }
  })
}

turnBrick (tile, img) {
    if (turn2) {
      return
    }
    img.src = '../image/' + tile + '.png'

    if (!turn1) {
      turn1 = img
      lastTile = tile
    } else {
      if (img === turn1) {
        return
      }
      tries += 1
      turn2 = img

      if (tile === lastTile) {
        pairs += 1

        if (pairs === (cols * rows) / 2) {
          console.log('You won with ' + tries + ' number of tries.')
        }

        window.setTimeout(function () {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')

          turn1 = null
          turn2 = null
        }, 300)
      } else {
        window.setTimeout(function () {
          turn1.src = '../image/0.png'
          turn2.src = '../image/0.png'

          turn1 = null
          turn2 = null
        }, 500)
      }
    }
  }
}

/**
 * Function to create and shuffle an array to be used in the memory game.
 * @param {Number} rows - Number of rows.
 * @param {Number} cols - Number of columns.
 */
getPictureArray (rows, cols) {
  const pictureArray = []

  // Add 2 of each card
  for (let i = 1; i <= (rows * cols) / 2; i++) {
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

export { memory }
