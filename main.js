const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation-btn");
const equalToBtn = document.querySelector(".equal-to-btn");
const clearInputBtn = document.querySelector(".clear-input-btn");
const historyBtn = document.querySelector(".history-btn");
const clearHistoryBtn = document.querySelector(".clear-history-btn");
const deleteStringBtn = document.querySelector(".delete-string-btn");
const displaySolution = document.getElementById("displaySolution");
const displayEquation = document.getElementById("displayEquation");
const displayHistory = document.querySelector(".display-history");
const history = document.querySelector(".history");
const closeBtn = document.querySelector(".close-btn");

let equations;
let equationsArray = [];
let answersArray = [];

// Display input on screen
function displayInput(inputValue) {
   displaySolution.value === "0"
      ? (displaySolution.value = inputValue)
      : (displaySolution.value += inputValue);
}

// To display numbers
numberBtns.forEach(numberBtn => {
   numberBtn.addEventListener("click", e => {
      const number = e.target.innerText;
      displayInput(number);
   });
});

// To display operations
operationBtns.forEach(operationBtn => {
   operationBtn.addEventListener("click", e => {
      const operation = e.target.innerText;
      displayInput(operation);
   });
});

// Calculate values
equalToBtn.addEventListener("click", () => {
   equations = displaySolution.value;
   equations = `${equations} = `;

   displayEquation.value = equations;
   displaySolution.value = eval(displaySolution.value);
   addToHistory();
   checkNumberIsFloat(eval(displaySolution.value));
});

// Clear Display
clearInputBtn.addEventListener("click", () => {
   displaySolution.value = 0;
   displayEquation.value = "";
});

// Hide and show history
historyBtn.addEventListener("click", () => {
   history.classList.toggle("show-history");
});

// Closing with cross button
closeBtn.addEventListener('click', () => history.classList.toggle("show-history"));

// Clear history
clearHistoryBtn.addEventListener("click", () => {
   const confirmAction = confirm("Are you sure you want to clear the history?");

   if (confirmAction) {
      displayHistory.innerText = "";
      equationsArray = [];
      answersArray = [];
   }
});

// Backspace functionality
deleteStringBtn.addEventListener("click", () => {
   displayEquation.value = "";

   if (displaySolution.value !== "") {
      if (displaySolution.value.length > 1) {
         displaySolution.value = displaySolution.value.slice(0, -1);
      } else {
         displaySolution.value = "0";
      }
   }
});


// Store it to history
function addToHistory() {
   equationsArray.push(equations);
   answersArray.push(displaySolution.value);
   let historyDiv = "";
   equationsArray.reverse();
   answersArray.reverse();
   for (let i = 0; i < answersArray.length; i++) {
      historyDiv += `
      <div class='history-div'>
         <p id="${i}">
            <span>${i + 1}]</span> 
            ${equationsArray[i]} ${answersArray[i]}
            </p>
      </div>`;
   }
   displayHistory.innerHTML = historyDiv;
}

// Copy from history to display
displayHistory.addEventListener("click", e => {
   const index = e.target.id;
   displaySolution.value = answersArray[index];
   displayEquation.value = equationsArray[index];
});

function checkNumberIsFloat(resultValue) {
   if(Number.isInteger(resultValue)) {
      return;
   }
   else {
      displaySolution.value = resultValue.toFixed(2);
   }
}