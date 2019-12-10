/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/memory.js
 * @version 1.0
 */

/**
* Function to initialize a new Memory game.
@param {Object} newMemory - Object with parameters of chosen game size.
*/
export function memory (newMemory) {
  const rows = newMemory.rows
  const cols = newMemory.cols
  const tiles = getPictureArray(rows, cols)
  const container = document.querySelector(newMemory.container)

  console.log('syns vi?')
}

/**
 * Function to create and shuffle an array to be used in the memory game.
 * @param {Number} rows - Number of rows.
 * @param {Number} cols - Number of columns.
 */
function getPictureArray (rows, cols) {
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
