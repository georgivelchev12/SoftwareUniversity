function solve() {
  let correctAnswers = 0;
  let tempIndex = 0;

  Array.from(document.querySelectorAll(".quiz-answer"))
  .map(x=>{
      x.addEventListener("click", function nextQuestion(e){
        if(e.target.innerHTML == "onclick" ||
        e.target.innerHTML == "JSON.stringify()" ||
        e.target.innerHTML == "A programming API for HTML and XML documents"){
          correctAnswers++;
        }
        let currentSection = document.querySelectorAll("section")[tempIndex];
        currentSection.style.display = "none";
        currentSection.classList.add("hidden");

        let nextSection = document.querySelectorAll("section")[tempIndex + 1]
        
        if(nextSection){
          nextSection.classList.remove("hidden");
        nextSection.style.display = "block";

        }
        else {
          showResult(correctAnswers)
        }

        tempIndex++;
        
      })
  })
  
  function showResult(correctAnswers){
    document.querySelector("#results").style.display = "block";

    if(correctAnswers === 3 ){
      document.querySelector("#results > li > h1")
      .innerHTML = "You are recognized as a top JavaScript fan!"
    }
    else{
      document.querySelector("#results > li > h1")
      .innerHTML = `You have ${correctAnswers} right answers`

    }
  }  
}
