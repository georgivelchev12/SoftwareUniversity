function solve() {
   Array.from(document.getElementsByTagName("img")).forEach(img => {
      img.addEventListener("click", clickEvent);
   })

   function clickEvent(e) {
      let card = e.target;
      card.src = './images/whiteCard.jpg'
      card.removeEventListener('click', clickEvent);

      let parent = card.parentNode;
      let resultSpan = document.getElementById("result").children;
      let leftSpan = resultSpan[0]
      let rightSpan = resultSpan[2]

      if (parent.id === 'player1Div') {
         leftSpan.textContent = card.name;
      }
      else if (parent.id === 'player2Div') {
         rightSpan.textContent = card.name;
      }

      if (resultSpan[0].textContent && resultSpan[2].textContent) {
         let winner;
         let looser;
         if (+leftSpan.textContent > +rightSpan.textContent) {
            winner = document.querySelector(`#player1Div img[name="${leftSpan.textContent}"]`)
            looser = document.querySelector(`#player2Div img[name="${rightSpan.textContent}"]`)
         }
         else {
            winner = document.querySelector(`#player2Div img[name="${rightSpan.textContent}"]`)
            looser = document.querySelector(`#player1Div img[name="${leftSpan.textContent}"]`)
         }
         winner.style.border = '2px solid green'
         looser.style.border = '2px solid red'
         document.getElementById('history').textContent += `[${leftSpan.textContent} vs ${rightSpan.textContent}] `
         leftSpan.textContent = '';
         rightSpan.textContent = '';
      }
   }
}