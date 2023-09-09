const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const grid = document.querySelector(".grid");
const checkBtn = document.querySelector("#check-btn");
const redoBtn = document.querySelector("#redo-btn");
const scoreText = document.querySelector("#score");
const cron = document.querySelector("#cron");
let answers = [];

// cron
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;


// start cronometer
startTime = Date.now() - elapsedTime;
intervalId = setInterval(updateTime, 75);


// generating combinations
combinations = calcCombinations(numbers);

// shuffling combinations
combShuffled = shuffle(combinations);

combShuffled.forEach((expression, index) => { 
        const div = document.createElement("div");
        div.innerHTML = `<p>${expression[0]} x ${expression[1]} =&nbsp;</p><input type="text"></input>`;
        div.classList.add("expression");
        div.setAttribute('id', `expr-${index}` );
        grid.append(div);        
});


const expressionsDivs = Array.from(grid.children);


// starting vector with falses to avoid
// checkBtn check empty fields
for(let i=0; i<expressionsDivs.length; i++){
    answers[i] = false;
}


expressionsDivs.forEach((expression, index) => {
    answerBox = expression.querySelector("input");
    answerBox.addEventListener("keyup", function(event) {
        currentNum = event.target.value;
        expr = combinations[index];
        result = expr[0] * expr[1];
        if(currentNum.length == String(result).length){
            // checking answer is right or wrong
            if(Number(currentNum) == result){
                answers[index] = true;
            }
            else {
                answers[index] = false;
            }
            // select next div
            nextExpressionDiv = expression.nextSibling;
            if(nextExpressionDiv != null){
                // get next textbox
                nextTextBox = nextExpressionDiv.querySelector("input");
                // focus next textbox
                nextTextBox.focus();
            }
        }
    });
});

checkBtn.addEventListener("click", () => {
    expressionsDivs.forEach((div, index) => {
        if(answers[index]){
            div.classList.add("right");
        }
        else {
            div.classList.add("wrong");
        }
        div.querySelector("input").disabled = true;
    });
    let right=0;
    let score=0;
    for(let i=0; i<=answers.length; i++){
        if(answers[i]){
            right++;
        }
    }
    score = (10 * (right/answers.length)).toFixed(1);
    scoreText.innerHTML = `Nota: ${score}&nbsp;&nbsp;`;
    clearInterval(intervalId);
});



redoBtn.addEventListener("click", () => {
    // reload page;
    location.reload();
    clearInterval(intervalId);
});




function updateTime(){
    elapsedTime = Date.now() - startTime;
    secs = Math.floor(elapsedTime / 1000 % 60);
    mins = Math.floor(elapsedTime / (1000 * 60) % 60);

    secs = pad(secs);
    mins = pad(mins);

    cron.textContent = `Tempo: ${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" +  unit;
    }
}

function calcCombinations(numbers) {
    const combinations = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            combinations.push(Math.random() >= 1/2 ? [numbers[i], numbers[j]] : [numbers[j], numbers[i]]);
        }
    }
    return combinations;    
}


function shuffle(array){
    let currentIndex = array.length;

    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * array.length);
        currentIndex-=1;

        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}