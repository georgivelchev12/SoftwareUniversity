function create(words) {
   const content = document.getElementById('content');
   
   for (let i = 0; i < words.length; i++) {
      let crDiv = document.createElement("div");
      let crP = document.createElement("p");
      crP.textContent = words[i];
      crP.style.display = 'none';
      crDiv.appendChild(crP);
      content.appendChild(crDiv);
   }
   content.addEventListener("click", e=>{
      e.target.children[0].style.display = "block";
   })
}