const displaySolution = document.getElementById("displaySolution");
const displayEquation = document.getElementById("displayEquation");
const displayHistory = document.querySelector(".display-history");
const history = document.querySelector(".history");
let equations;
let equationsArray = [];
let answersArray = [];

// Display input on screen
function displayInput(inputValue) {
   (displaySolution.value === "0") ? displaySolution.value = inputValue : displaySolution.value += inputValue;   
}

// Calculate values
function getSolution() {
   equations = displaySolution.value;
   equations = `${equations} = `;
   
   displayEquation.value = equations;
   displaySolution.value = eval(displaySolution.value);
   addToHistory();
}

// Store it to history
function addToHistory() {
   equationsArray.push(equations);
   answersArray.push(eval(displaySolution.value));
   let historyDiv = "";
   equationsArray.reverse();
   answersArray.reverse();
   for(let i = 0; i < answersArray.length; i++) {
      historyDiv += `
      <div class='history-div'>
         <p id="${i}">
            <span>${i+1}]</span> 
            ${equationsArray[i]} ${answersArray[i]}
         </p>
      </div>`;
   }
   displayHistory.innerHTML = historyDiv;
}

// Copy from history to display
displayHistory.addEventListener('click', function(e) {
   const index = e.target.id;
   displaySolution.value = answersArray[index];
   displayEquation.value = equationsArray[index];
});

// Backspace functionality
function deleteSingleString() {
   displayEquation.value = "";
   
   if(displaySolution.value !== "") {
      if(displaySolution.value.length > 1) {
         displaySolution.value = displaySolution.value.slice(0,-1);
      }
      else {
         displaySolution.value = "0";
      }
   }
}

// Clear Display
function clearInput() {
   displaySolution.value = 0;
   displayEquation.value = "";
}

// Hide and show history
function showHideHistory() {
   history.classList.toggle("show-history");
}

// Clear history
function clearHistory() {
   const confirmAction = confirm("Are you sure you want to clear the history?");

   if (confirmAction){
      displayHistory.innerText = "";
      equationsArray = [];
      answersArray = [];
   }
}
