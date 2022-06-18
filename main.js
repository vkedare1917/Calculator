const displaySolution = document.getElementById("displaySolution");
const displayEquation = document.getElementById("displayEquation");
const displayHistory = document.querySelector(".display-history");
const history = document.querySelector(".history");
let equations;
let equationsArray = [];
let answersArray = [];


function displayInput(inputValue) {
   (displaySolution.value === "0") ? displaySolution.value = inputValue : displaySolution.value += inputValue;   
}

function getSolution() {
   equations = displaySolution.value;
   equations = `${equations} = `;
   
   displayEquation.value = equations;
   displaySolution.value = eval(displaySolution.value);
   addToHistory();
}

function addToHistory() {
   equationsArray.push(equations);
   answersArray.push(eval(displaySolution.value));
   let singleValue = "";
   for(let i = 0; i < answersArray.length; i++) {
      singleValue += `
      <div>
         <p><span>${i+1}]</span> &nbsp; ${equationsArray[i]} ${answersArray[i]}</p>
         <hr>
      </div>`;
   }
   displayHistory.innerHTML = singleValue;
}

function clearInput() {
   displaySolution.value = 0;
   displayEquation.value = "";
}

function showHideHistory() {
   history.classList.toggle("show-history");
}

function clearHistory() {
   const confirmAction = confirm("Are you sure you want to clear the history?");

   if (confirmAction){
      displayHistory.innerText = "";
      equationsArray = [];
      answersArray = [];
   }
}
