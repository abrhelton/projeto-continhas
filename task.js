const grid = document.querySelector(".grid");
const checkBtn = document.querySelector("#check-btn");
const redoBtn = document.querySelector("#redo-btn");
const scoreText = document.querySelector("#score");
const cron = document.querySelector("#cron");

let questions = [];
let lstAnswers = [];
let lstTextBoxes = [];
let currentAnswers = [];

var task = getParam("id");

// Generating a different task depending on the value chosen
// previously

operation = task.substring(0,3);
lvl = task.substring(3);

const operationText = document.querySelector("#operation");
const lvlText = document.querySelector("#lvl");

lvlText.innerHTML = `Nível ${lvl.substring(3)}`;
lvlText.classList.add(lvl);

if(operation == "add"){
    operationText.innerHTML = "Adição";
    switch(lvl) {
        case "lvl1":
        console.log(lvl);
        break;
        case "lvl2":
        combinations = calcCombinationsAdd(lvl);
        break;
        case "lvl3":
        combinations = calcCombinationsAdd(lvl);
        break;
        case "lvl4":
        combinations = calcCombinationsAdd(lvl);
        break;
        case "lvl5":
        combinations = calcCombinationsAdd(lvl);
        break;
        case "lvl6":
        combinations = calcCombinationsAdd(lvl);
        break;
        case "lvl7":
        combinations = calcCombinationsAdd(lvl);
        break;
        default:
        console.log("Erro no switch/case");
    }
    generateQuestionsAdd(combinations);
    insertQuestionsAdd();
}
else if(operation == "sub"){
    operationText.innerHTML = "Subtração";
    switch(lvl) {
        case "lvl1":
        console.log(lvl);
        break;
        case "lvl2":
        combinations = calcCombinationsSub(lvl);
        break;
        case "lvl3":
        combinations = calcCombinationsSub(lvl);
        break;
        case "lvl4":
        combinations = calcCombinationsSub(lvl);
        break;
        case "lvl5":
        combinations = calcCombinationsSub(lvl);
        break;
        case "lvl6":
        combinations = calcCombinationsSub(lvl);
        break;
        case "lvl7":
        combinations = calcCombinationsSub(lvl);
        break;
        default:
        console.log("Erro no switch/case");
    }
    generateQuestionsSub(combinations);
    insertQuestionsSub();
}
else if(operation == "mul"){
    operationText.innerHTML = "Multiplicação";
    switch(lvl) {
        case "lvl1":
        console.log(lvl);
        break;
        case "lvl2":
        console.log(lvl);
        break;
        case "lvl3":
        console.log(lvl);
        break;
        case "lvl4":
        console.log(lvl);
        break;
        case "lvl5":
        console.log(lvl);
        break;
        case "lvl6":
        console.log(lvl);
        break;
        case "lvl7":
        console.log(lvl);
        break;
        default:
        console.log("Erro no switch/case");
    }
}
else {
    operationText.innerHTML = "Divisão";
    switch(lvl) {
        case "lvl1":
        console.log(lvl);
        break;
        case "lvl2":
        console.log(lvl);
        break;
        case "lvl3":
        console.log(lvl);
        break;
        case "lvl4":
        console.log(lvl);
        break;
        case "lvl5":
        console.log(lvl);
        break;
        case "lvl6":
        console.log(lvl);
        break;
        case "lvl7":
        console.log(lvl);
        break;
        default:
        console.log("Erro no switch/case");
    }
}


/* 
##################################################################################################
Functions
##################################################################################################
*/

function generateQuestionsAdd(combinations) {

    combinations.forEach((expression, index) => { 
        const div = document.createElement("div");
        let p1 = expression[0].toString();
        let p2 = expression[1].toString();
        // If numbers have different lenghts
        // fill with zeroes the second number
        while(p1.length > p2.length){
            p2 = '0' + p2;
        }
        let carryOut = 0;
        let countAnswer = 0;
        let countCarryOut = 1;
        let answers = [];
        let textBoxes = [];
        let result = 0;
        answerHTML = '';
        carryOutHTML = '&nbsp;';
        for(let i = p1.length-1; i>=0; i--){
            result = parseInt(p1[i], 10) + parseInt(p2[i], 10) + carryOut;
            strResult = result.toString();
            if(result < 10){
                carryOut = 0;
                answerHTML = `<input id="q${index}d${countAnswer}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML; 
                carryOutHTML = '&nbsp;' + carryOutHTML;
                // Pushing into vector the last char of each sum
                answers.push(strResult.charAt(strResult.length - 1)); 
                textBoxes.push(`q${index}d${countAnswer}`);   
            }
            else{
                carryOut = 1; 
                answerHTML = `<input id="q${index}d${countAnswer}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML;
                answers.push(strResult.charAt(strResult.length - 1));
                textBoxes.push(`q${index}d${countAnswer}`); 
                if(i != 0){
                    carryOutHTML = `<input id="q${index}c${countCarryOut}" type="text" maxlength="1" autocomplete="off">` + carryOutHTML;
                    answers.push(1);
                    textBoxes.push(`q${index}c${countCarryOut}`); 
                } 
                else{
                    answerHTML = `<input id="q${index}d${countAnswer+1}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML;
                    answers.push(1);
                    textBoxes.push(`q${index}d${countAnswer+1}`);
                }
            }
            countAnswer++;
            countCarryOut++;
        }
        lstAnswers.push(answers);
        answers = [];
        lstTextBoxes.push(textBoxes);
        textBoxes = [];
       div.innerHTML = `<div class="carryOut">${carryOutHTML}</div>
       <div class="question">
           <div class="signal">&plus;</div>
           <div class="parcelas">
               <div class="parcela1">${expression[0]}</div>
               <div class="parcela2">${expression[1]}</div>
           </div>
       </div>
       <div class="answer">
       ${answerHTML}
       </div>`;
        div.classList.add("expression");
        div.setAttribute('id', `q${index}`);
        questions.push(div);    
    });
}

function generateQuestionsSub(combinations) {
    
    function newResult(p1, newValue, i){
        let chars = p1.split('');
        chars[i-1] = newValue;
        return chars.join('');
    }

    combinations.forEach((expression, index) => { 
        const div = document.createElement("div");
        let p1 = expression[0].toString();
        let p2 = expression[1].toString();
        let slice = '';
        let slicePosition = 100*(1/p1.length);
        // If numbers have different lenghts
        // fill with zeroes the second number
        while(p1.length > p2.length){
            p2 = '0' + p2;
        }
        // Generating the slashes that will later be turn on or off depending
        // on the values
        for(let i= p1.length - 1; i >= 0; i--){
            slice = slice + `<span class="hidden" id="q${index}s${i}" style="right:${100 - i*slicePosition - slicePosition}%;">&frasl;</span>`;
        }
        let countAnswer = 0;
        let countBorrowingZeroes = 0;
        let answers = [];
        let textBoxes = [];
        let result = 0;
        let answerHTML = '';
        let borrowingHTML = '&nbsp;';
        for(let i = p1.length-1; i>=0; i--){
            let aux = i;
            result = parseInt(p1[i], 10) - parseInt(p2[i], 10);
            //console.log("Valor para entrar no if " + result);
            if(result >= 0){
                answerHTML = `<input id="q${index}d${countAnswer}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML; 
                if(countBorrowingZeroes > 0){
                    countBorrowingZeroes--;
                }
                else {
                    borrowingHTML = '&nbsp;' + borrowingHTML;
                } 
                // Pushing into vector the last char of each sum
                answers.push(result); 
                textBoxes.push(`q${index}d${countAnswer}`);   
            }
            else {

                // If the number before is zero e necesssary to move
                // more steps backwards
                while(parseInt(p1[i-1], 10) == 0){
                    // These four lines are to renew the strng with the borrowing values
                    let chars = p1.split('');
                    newValue = '9';
                    chars[i-1] = newValue;
                    p1 = chars.join('');
                    //console.log(p1);
                    countBorrowingZeroes++;
                    i--;
                }

                if(i != aux){

                    // These four lines are to renew the strng with the borrowing values
                    newValue = (parseInt(p1[i-1], 10) - 1).toString();
                    p1 =  newResult(p1, newValue, i);

                    let borrowingAuxHTML = '';
                    //for(let j = aux - 1; j >= i - 1; j--){
                    for(let j = i - 1; j < aux; j++){
                        borrowingAuxHTML = borrowingAuxHTML + `<input id="q${index}b${j}" type="text" maxlength="1" autocomplete="off">` ;
                        answers.push(parseInt(p1[j], 10));
                        textBoxes.push(`q${index}b${j}`); 
                    }
                    borrowingHTML = borrowingAuxHTML + borrowingHTML;
                    answerHTML = `<input id="q${index}d${countAnswer}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML;
                    textBoxes.push(`q${index}d${countAnswer}`);
                    answers.push(result + 10);
                } 
                else {
                // These four lines are to renew the strng with the borrowing values
                let chars = p1.split('');
                newValue = (parseInt(p1[i-1], 10) - 1).toString();
                chars[i-1] = newValue;
                p1 = chars.join('');

                borrowingHTML = `<input id="q${index}b${i - 1}" type="text" maxlength="1" autocomplete="off">` + borrowingHTML;
                answers.push(parseInt(p1[i-1], 10));
                textBoxes.push(`q${index}b${i - 1}`);
                answerHTML = `<input id="q${index}d${countAnswer}" type="text" maxlength="1" autocomplete="off"></input>` + answerHTML;
                answers.push(result + 10);
                textBoxes.push(`q${index}d${countAnswer}`); 
                }
                i = aux;
            }
            countAnswer++;
        }
        lstAnswers.push(answers);
        answers = [];
        lstTextBoxes.push(textBoxes);
        // console.log(textBoxes);
        textBoxes = [];
       div.innerHTML = `<div class="carryOut">${borrowingHTML}</div>
       <div class="question">
           <div class="signal">&minus;</div>
           <div class="parcelas">
               <div class="parcela1">${slice} ${expression[0]}</div>
               <div class="parcela2">${expression[1]}</div>
           </div>
       </div>
       <div class="answer">
       ${answerHTML}
       </div>`;
        div.classList.add("expression");
        div.setAttribute('id', `q${index}`);
        questions.push(div);    
    });
}

function insertQuestionsAdd(){

    function handleTextboxKeyUp(event) {
      const textbox = event.target;
      let currentDigit = event.target.value;

      // Adding answer of the current question to array for later comparison
      // with the actual answers
      currentAnswers.push(currentDigit);

      const currentQuestion = (textbox.parentElement).parentElement;
      let currentQuestionNum = parseInt(currentQuestion.id[1], 10);

      // Getting index of the current textbox
      for(let i=0; i < lstTextBoxes[currentQuestionNum].length; i++){
        if(textbox.id == lstTextBoxes[currentQuestionNum][i]){
            index = i;
        }
      }


      // Focusing the next textbox
        for(let i=0; i < lstTextBoxes[currentQuestionNum].length - 1; i++){
            if(textbox.id == lstTextBoxes[currentQuestionNum][i]){
                nextTextBox = questions[currentQuestionNum].querySelector(`#${lstTextBoxes[currentQuestionNum][i+1]}`);
                nextTextBox.focus();
            }
        }
        
      // Moving to the next question or ending the exercise
        if(textbox.id == lstTextBoxes[currentQuestionNum][lstTextBoxes[currentQuestionNum].length - 1]){
            let mistake = '';

            // Identifying if there is wrong answers comparing with the array
            // we created previously with the inputs from user
            currentAnswers.forEach((answer, index) => {
                if(mistake == ''){
                    if(answer != lstAnswers[currentQuestionNum][index]){
                        mistake = lstTextBoxes[currentQuestionNum][index];
                    }
                }
            });

            if(mistake ==''){
                questions[currentQuestionNum].classList.add("right");
            }
            else {
                questions[currentQuestionNum].classList.add("wrong");
                textboxWrong = questions[currentQuestionNum].querySelector(`#${mistake}`);
                textboxWrong.classList.add("wrong");
            }

            currentAnswers = [];

            setTimeout(function () {
                const nextQuestion = questions[currentQuestionNum].nextElementSibling;

                if(nextQuestion){
    
                    questions[currentQuestionNum].classList.remove('active');
                    nextQuestion.classList.add('active');
                    nextQuestion.querySelector(`#q${currentQuestionNum + 1}d0`).focus();
                }
                else {
                    questions[currentQuestionNum].classList.remove('active');
                }

            }, 4000);
      }
    }

    // Separately add to the page the first div
    for(let i = 0; i < questions.length; i++){
        grid.appendChild(questions[i]);
    }
    questions[0].classList.add('active');
    questions[0].querySelector("#q0d0").focus();

    let textboxes = [];

    for(let j=0; j < lstTextBoxes[0].length; j++){
        textbox = questions[0].querySelector(`#${lstTextBoxes[0][j]}`);
        textboxes.push(textbox);
    }

    textboxes.forEach(textbox => {
    textbox.addEventListener('keyup', handleTextboxKeyUp);
  });

    textboxes = [];

    // Create and append the remaining questions
    for (let i = 1; i < questions.length; i++) {
        for(let j=0; j < lstTextBoxes[i].length; j++){
            textbox = questions[i].querySelector(`#${lstTextBoxes[i][j]}`);
            textboxes.push(textbox);
        }
      textboxes.forEach(textbox => {
        textbox.addEventListener('keyup', handleTextboxKeyUp);
      });
        textboxes = [];
    }

}

function insertQuestionsSub() {

    function handleTextboxKeyUp(event) {
        const textbox = event.target;
        let currentDigit = event.target.value;
  
        // Adding answer of the current question to array for later comparison
        // with the actual answers
        currentAnswers.push(currentDigit);
  
        const currentQuestion = (textbox.parentElement).parentElement;
        let currentQuestionNum = parseInt(currentQuestion.id[1], 10);
  
        // Getting index of the current textbox
        for(let i=0; i < lstTextBoxes[currentQuestionNum].length; i++){
          if(textbox.id == lstTextBoxes[currentQuestionNum][i]){
              index = i;
          }
        }
  
  
        // Focusing the next textbox
          for(let i=0; i < lstTextBoxes[currentQuestionNum].length - 1; i++){
              if(textbox.id == lstTextBoxes[currentQuestionNum][i]){
                  nextTextBox = questions[currentQuestionNum].querySelector(`#${lstTextBoxes[currentQuestionNum][i+1]}`);
                  if(lstTextBoxes[currentQuestionNum][i+1][2] == 'b'){
                    slice = questions[currentQuestionNum].querySelector(`#q${currentQuestionNum}s${lstTextBoxes[currentQuestionNum][i+1][3]}`);
                    slice.classList.remove("hidden");
                    slice.classList.add("visible");
                }
                  nextTextBox.focus();
              }
          }
          
        // Moving to the next question or ending the exercise
          if(textbox.id == lstTextBoxes[currentQuestionNum][lstTextBoxes[currentQuestionNum].length - 1]){
              let mistake = '';
  
              // Identifying if there is wrong answers comparing with the array
              // we created previously with the inputs from user
              currentAnswers.forEach((answer, index) => {
                  if(mistake == ''){
                      if(answer != lstAnswers[currentQuestionNum][index]){
                          mistake = lstTextBoxes[currentQuestionNum][index];
                          console.log(lstAnswers[currentQuestionNum]);
                      }
                  }
              });
  
              if(mistake ==''){
                  questions[currentQuestionNum].classList.add("right");
              }
              else {
                  questions[currentQuestionNum].classList.add("wrong");
                  textboxWrong = questions[currentQuestionNum].querySelector(`#${mistake}`);
                  textboxWrong.classList.add("wrong");
              }
  
              currentAnswers = [];
              
              setTimeout(function () {
                  const nextQuestion = questions[currentQuestionNum].nextElementSibling;
  
                  if(nextQuestion){
      
                      questions[currentQuestionNum].classList.remove('active');
                      nextQuestion.classList.add('active');
                      if(lstTextBoxes[currentQuestionNum + 1][0][2] == 'b'){
                        slice = questions[currentQuestionNum + 1].querySelector(`#q${currentQuestionNum + 1}s${lstTextBoxes[currentQuestionNum + 1][0][3]}`);
                        slice.classList.remove("hidden");
                        slice.classList.add("visible");
                      }
                      nextQuestion.querySelector(`#${lstTextBoxes[currentQuestionNum + 1][0]}`).focus();
                  }
                  else {
                      questions[currentQuestionNum].classList.remove('active');
                  }
  
              }, 4000);
        }
      }
  
    
      for(let i = 0; i < questions.length; i++){
          grid.appendChild(questions[i]);
      }


     // Separately add to the page the first div
      questions[0].classList.add('active');
      if(lstTextBoxes[0][0][2] == 'b'){
          slice = questions[0].querySelector(`#q0s${lstTextBoxes[0][0][3]}`);
          slice.classList.remove("hidden");
          slice.classList.add("visible");
      }
      questions[0].querySelector(`#${lstTextBoxes[0][0]}`).focus();
  
      let textboxes = [];
  
      // Create listeners and moving next div logic for the rest of divs
      for(let j=0; j < lstTextBoxes[0].length; j++){
          textbox = questions[0].querySelector(`#${lstTextBoxes[0][j]}`);
          textboxes.push(textbox);
      }
  
      textboxes.forEach(textbox => {
      textbox.addEventListener('keyup', handleTextboxKeyUp);
    });
  
      textboxes = [];
  
      // Create listeners and moving next div logic for the rest of divs
      for (let i = 1; i < questions.length; i++) {
          for(let j=0; j < lstTextBoxes[i].length; j++){
              textbox = questions[i].querySelector(`#${lstTextBoxes[i][j]}`);
              textboxes.push(textbox);
          }
        textboxes.forEach(textbox => {
          textbox.addEventListener('keyup', handleTextboxKeyUp);
        });
          textboxes = [];
      }
}

function getParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function calcCombinationsAdd(lvl) {
    let combinations = [];
    switch(lvl){
        case "lvl2":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(10, 99), getRandomInt(1, 9)]);
        }
        break;
        case "lvl3":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(10, 99), getRandomInt(10, 99)]);
        }
        break;
        case "lvl4":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(100, 999), getRandomInt(10, 99)]);
        }
        break;
        case "lvl5":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(100, 999), getRandomInt(100, 999)]);
        }
        break;
        case "lvl6":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(1000, 9999), getRandomInt(100, 999)]);
        }
        break;
        case "lvl7":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(1000, 9999), getRandomInt(1000, 9999)]);
        }
        break;
        default:
        console.log("Erro nas combinações");

    }
  
    return combinations;    
}

function calcCombinationsSub(lvl) {
    let combinations = [];
    let parcela1 = 0;
    switch(lvl){
        case "lvl2":
        for (let i = 0; i < 5; i++) {
            parcela1 = getRandomInt(20, 99);
            combinations.push([parcela1, getRandomInt(1, 9)]);
        }
        break;
        case "lvl3":
        for (let i = 0; i < 5; i++) {
            parcela1 = getRandomInt(20, 99);
            combinations.push([parcela1, getRandomInt(10, getRandomInt(20, parcela1))]);
        }
        break;
        case "lvl4":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(100, 999), getRandomInt(10, 99)]);
        }
        break;
        case "lvl5":
        for (let i = 0; i < 5; i++) {
            // parcela1 = getRandomInt(100, 999);
            parcela1 = getRandomInt(10000000, 99999999);
            combinations.push([parcela1, getRandomInt(1000000, parcela1)]);
        }
        break;
        case "lvl6":
        for (let i = 0; i < 5; i++) {
            combinations.push([getRandomInt(1000, 9999), getRandomInt(100, 999)]);
        }
        break;
        case "lvl7":
        for (let i = 0; i < 5; i++) {
            parcela1 = getRandomInt(1000, 9999);
            combinations.push([parcela1, getRandomInt(1000, parcela1)]);
        }
        break;
        default:
        console.log("Erro nas combinações");

    }
  
    return combinations;    
}

// Função para gerar número aleatório entre min e max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}