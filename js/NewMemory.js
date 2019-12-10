/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/NewMemory.js
 * @version 1.0
 */

/**
 * Constructor to create a new Memory session.
 * @param {Number} rows - Number of rows in game.
 * @param {Number} cols - Number of columns in game.
 * @param {String} container - Location where the memory should be shown.
 * @exports {Object} - A new Object is exported.
 */
class NewMemory {
  constructor (rows, cols, container) {
    this.rows = rows
    this.cols = cols
    this.container = container
  }
}

export { NewMemory }
