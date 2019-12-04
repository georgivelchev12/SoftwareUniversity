function solve() {
   let data = Array.from(document.querySelectorAll('tbody > tr'));
   let searchBtn = document.querySelector("#searchBtn");
   let searchField = document.querySelector("#searchField");
   searchBtn.addEventListener("click", () => {
      let regex = new RegExp(searchField.value, 'gim');
      data.map(e => {
         e.classList.remove("select");
         if (e.textContent.match(regex) !== null) {
            e.classList.add("select");
         }
      })
      searchField.value = '';
   })
}