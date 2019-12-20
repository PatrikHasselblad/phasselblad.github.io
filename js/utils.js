/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/utils.js
 * @version 1.0
 */

// margin: 50px;

/**
  * Style for the shadow-Dom elements.
  */
export const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  position: absolute;
  min-width: 150px;
  width: fit-content;  
  height: fit-content;
  background-color: rgb(88, 87, 87);
  color: #ccc;
  border: 2px solid #000;
  box-shadow: 10px 10px 10px #000;
  display: block;
  float: left;
  font-size: auto;
  text-align: center;
  margin: 0;
}
:host img {
  width: 70px;
  height: 70px;
  position: relative;
  float: left;
}
:host #topBar {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #000;
  color: #ccc;
  text-align: center;
}
:host #topBar #closeBtn {
  float: right;
  width: 18px;
  height: 18px;
  padding: 0;
  margin: 0;
  font-size: auto;
  font-weight: bold;
  text-align: center;
}
  :host #topBar #minBtn {
    float: right;
    width: 18px;
    height: 18px;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
}
:host button {
  width: 70px;
  height: 70px;
  outline-width: 4px;
  outline-color: #9300FF;
}
:host a {
  outline-width: 4px;
  outline-color: #9300FF;
}
:host #chatField {
    position: absolute;
    bottom: 0px;
    margin-bottom: 5px;
    width: 280px;
}
:host #chat {
    width: 296px;
    height: 360px;
    background-color: #ccc;
    color: #000;
    text-align: left;
    margin: 2px;
    overflow: scroll;
    overflow-y: auto;
}
:host #chatField input {
    width: 75%;
    margin-left: 12px;
}
:host #sendBtn {
    width: 50px;
    height: 21px;
}
:host #clockCanvas {
  background-color: #333;
}
:host #answerBar {
  margin-top: 5px;
  text-align: center;
}
:host #clockAnswerBtn {
    width: 50px;
    height: 21px;
    margin-left: 20px;
    padding: 0;
}
:host #hourIn, #minIn {
  width: 40px;
  margin-right: 5px;
}
</style>
`
/**
 * Function to handle each div-box moveability.
 * @param {element} divBox - The box to be moved.
 */
export function draggableWindow (divBox) {
// Code-sample influences taken and modified from 'https://www.kirupa.com/html5/drag.htm.'
  const box = divBox
  // const padding = 10
  // let rect
  // const viewport = {
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   top: 0
  // }
  box.focus()

  let active = false
  let currentX
  let currentY
  let initialX
  let initialY
  let xOffset = 0
  let yOffset = 0

  box.addEventListener('touchstart', dragStart, { passive: true })
  box.addEventListener('touchend', dragEnd, false)
  box.addEventListener('touchmove', drag, { passive: true })
  box.addEventListener('mousedown', dragStart, false)
  box.addEventListener('mouseup', dragEnd, false)
  box.addEventListener('mousemove', drag, false)

  function dragStart (e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset
      initialY = e.touches[0].clientY - yOffset
    } else {
      initialX = e.clientX - xOffset
      initialY = e.clientY - yOffset
    }
    if (e.target === box) {
      active = true
    }
  }
  function dragEnd (e) {
    // removeLayer(box)
    initialX = currentX
    initialY = currentY

    active = false
  }
  function drag (e) {
    if (active) {
      // e.preventDefault() // --------------------------------------------Denna hjälpte lite mot buggen. Tror jag.

      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX
        currentY = e.touches[0].clientY - initialY
      } else {
        currentX = e.clientX - initialX
        currentY = e.clientY - initialY
      }
      xOffset = currentX
      yOffset = currentY

      setTranslate(currentX, currentY, box)
    }
  }
  function setTranslate (xPos, yPos, element) {
    element.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  }
}
