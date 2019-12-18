export const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  position: absolute;
  margin: 50px;
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
}
</style>
`

export function draggableWindow (divBox) {
  const box = divBox
  // const container = document.querySelector('.wrapper')

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
    console.log(currentX, currentY)
  }
  function dragEnd (e) {
    initialX = currentX
    initialY = currentY

    active = false
  }
  function drag (e) {
    if (active) {
      // e.preventDefault()

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
