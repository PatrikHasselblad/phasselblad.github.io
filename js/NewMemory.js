/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/NewMemory.js
 * @version 1.0
 */

/**
 * Constructor to create a new Memory session.
 * @param {Number} rows - Number of rows in game.
 * @param {Number} cols - Number of columns in game.
 * @exports {Object} - A new Object is exported.
 */
class NewMemory {
  constructor (row, col) {
    this.rows = row
    this.cols = col
  }
}

export { NewMemory }
