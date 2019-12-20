/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/app.js
 * @version 1.0
 */

// CUSTOM EVENTS -- dispatch events

import './Desktop.js'

document.querySelector('#username').classList.add('hide')

/*
ATT GÖRA:
--*LADDA NER LITE OLIKA WEB-LÄSARE OCH PRÖVA PROGRAMMET.
--*MÅSTE KOLLA UPP OM DET FINNS NÅGOT BÄTTRE OCH SÄKRARE SÄTT ATT FLYTTA RUTOR PÅ. DEM BUGGAR SOM FAN OM MAN KLICKAR SOM EN PÅTÄND POTATIS.
--*Fixa hut man flyttar, kanske med hjälp av en knapp, om top-baren fortsätter att vara avig. En passande ikon är ju en 4-vägs-pil.
--*MÅSTE ORDNA SÅ ATT DEN AKTIVA RUTAN ALLTID ÄR ÖVERST. FOKUS PÅ RUTAN MAN KLICKAR PÅ.
--*DET FINNS EN BUGG NÄR MAN FLYTTAR RUTORNA SNABBT.
--*Se över eventlisteners, om man kan effektivisera detta.
--*Fixa så att rutorna överlappar på ett snyggt vis.
--*Fixa så att rutorna inte kan försvinna för långt utanför skrivbordet.
--*Gör små ikoner som föreställer chat, memory och klockappen (till att börja med).
--*Ett enkelt litet tillägg kan vara att man kan välja bakgrundsbilder. Det tar vi, inte som den egen definierade appen utan som en grej bara. Kan va roligt.
Kanske byta "tema", meny å allt annat byter färger osv.
--*När man hovrar över ikonerna så tycker jag att vi ska förstora dem en smula, så som i demon. Det ser snyggt ut. Antagligen med eventlisteners.
--*Fixa även så att man bara flyttar divvarna via baren, eller nåt sånt.
--*Fixa resultat listen så att den konstant ligger i botten, det är fult när den ploppar upp. (memory, clock)
--*Se över färgerna, kanske lägga in någon diskret bakgrundsbild istället i apparna.
--*Fixa skrivsbordsfönstret så att det är 1 storlek.
--*Offline saker, den där sidbackaren kan ju vara nåt. Även cache som nämnt i några appar.
--*FÖR ATT FLYTTA FÖR VAR GÅNG MAN STARTAR EN NY APP SÅ FÅR VI NOG ANVÄNDA KOORDINATER. INTE MARGIN.
--*EXTRA FUNKTION KAN VARA ATT MINIMERA, MAN TAR BORT ALLT UNDER MENYRADEN, FLYTTAR SKITEN NER I HÖRNET, VID KLICK, ÅTERSTÄLL.
--*BUG - finns en när man tar mitt på rutan och flyttar den, då följer texten med på nå vis.

---CLOCK---
--*Ordna så att man kan välja antal klockövningar, förslagsvis endast läraren, så kanske ett lösenordsskyddat alternativ som
    sätter variabeln för hela sidan. Värt att undersöka. (clock)
--*Fixa kommentarer för klockans funkisar.
--*Gör en scoreboard, alternativt skicka resultaten till lärarens mail. Kan även vara ett senare tillägg.
--*Kolla över input fälten. Nu finns det sifferknappar när man kör appen utan verktygsfältet. Det ser ju lite sisådär ut.

---CHAT---
--*Extra funktioner - byta namn, lägg till knapp bredvid förminska knappen, ett kugghjul, som öppnar username grejjan igen.
--*Local storage som sparar chat från tidigare. Enkelt enkelt. -- Kanske byta till cache
--*Fixa en knapp som rensar historiken och skärmen.
--*LocalStorage sparar dubbelt osv, förstås när det är flera fönster öppna. Så kan vi inte ha det. Kolla upp cacha. Alternativt ha den någon annanstans.
--*Kanske lägga till tid på varje medelande tagg så att man vet när det skrevs. Det kan ju inte vara så svårt, lägga innan namnet
      typ.
--*Kanske göra nån grej så att chatten alltid är öppen och registrerar medelanden, så att man även, offline, kan ta del av vad som skrivits när väl
     internet funkar igen.
--*Gör chatten finare. Den är ful.
--*Gör något åt X-listen i fönstret, den vill man ju inte ha där. Skriver folk för långt måste det ju bli ett <enter> typ, jag tror appen redan gör det,
    men värt att kolla upp.

---MEMORY---
--*tID ÖVER? fIXA TYP, PIKNAPPAR, ELLER "WASD"-KNAPPARNA FÖR ATT RÖRA SIG RUNT.
--*Jag vill ha en highscore!
--*Fixa så att man kan välja storlek på brädan själv, inom givna intervaller.
--*Kan va bra att behålla som mall för tillfället: imgHide.innerHTML = `.memBrick #${bricks} {visibility: hidden;}`
--*Lägg lite margin på resultatet, det sitter typ i väggen av boxen.

FRÅGOR ATT STÄLLA:
--*Kolla upp angående layouen, alltså innerHtml stilen i utils.
--*Kolla upp om man ska öppna 1 fönster som täcker skärmen eller om detta funkar bra.
*/
