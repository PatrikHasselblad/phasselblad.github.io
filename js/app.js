/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/app.js
 * @version 1.0
 */

// CUSTOM EVENTS -- dispatch events

import './Desktop.js'

document.querySelector('#username').classList.add('hide')

// Från denna modul laddar jag skrivbordet, alltså desktop.js.

/* Kolla upp om det går att gömma browserns meny, sökfält osv i ett popup fönster. Kolla också om det är tillåtet med popuppisar för att göra sin app.

ATT GÖRA:
*Skapa componenter - alltså det där shadowroot skiten.
*Börja planera för klockuppgiften.
*Gör små ikoner som föreställer chat, memory och klockappen (till att börja med).
*Ett enkelt litet tillägg kan vara att man kan välja bakgrundsbilder. Det tar vi, inte som den egen definierade appen utan som en grej bara. Kan va roligt.
Kanske byta "tema", meny å allt annat byter färger osv.
*Custom elemnts skapas i respektive js fil. Memory i memory.js, learnClock i learnClock.js... inte i New eftersom det bara skapar en ny grund för ett nytt
knapptryck på respektive ikon. Så att objekten kan fungera separat. Där finns en nöt att knäcka.
*När man hovrar över ikonerna så tycker jag att vi ska förstora dem en smula, så som i demon. Det ser snyggt ut. Antagligen med eventlisteners.
Fixa även så att man bara flyttar divvarna via baren, eller nåt sånt.

*/
