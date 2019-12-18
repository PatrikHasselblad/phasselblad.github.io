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
