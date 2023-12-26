document.addEventListener('DOMContentLoaded', () => {
let monsterContainer = document.querySelector('#monster-container')
const form = document.querySelector('#monster-form')
form.addEventListener('submit', handleForm)
const back = document.querySelector('#back')
showFiftyMonsters()
const forward = document.querySelector('#forward')
forward.addEventListener('click', () => {
    monsterContainer.innerHTML = ''
     showNextFiftyMonsters()
})
})

//create the function that will request and display the monsters in a monster array
function showFiftyMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then((resp)=>resp.json())
    .then((monsterArr) => handleMonster(monsterArr))
}
//creates a function that will handle the monster array requested from the server
function handleMonster(monsterArray){
let monsterContainer = document.querySelector('#monster-container')// grab the container 

monsterArray.forEach(monsterObj=>{
let name = document.createElement('h2')
name.textContent= "Name: " + monsterObj.name;
let age = document.createElement('h4')
age.textContent= "Age: " + monsterObj.age;
let bio = document.createElement('p')
bio.textContent= "Bio: " + monsterObj.description;
monsterContainer.append(name,age,bio)
})}


function handleForm(e) {
e.preventDefault()
  //creates a monster object
  console.log('button was clicked')
  console.log(e.target)
const monsterObj= {
name:e.target.name.value,
age:e.target.age.value,
description:e.target.description.value
}
 //send the new monster data to the server
function postMonster(newObj) {
fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(monsterObj),
})
.then((r) => r.json())
.then((monsterObj) => handleMonster(monsterObj));
}
}

function handleForward() {
let currentPage=document.querySelector('#monster-container')
while(currentPage.firstChild){
currentPage.removeChild(currentPage.firstChild)
}
showNextFiftyMonsters()
}


let firstNumber = 0;
let secondNumber = 50;

function showNextFiftyMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=2`)
    .then((resp) => resp.json())
    .then((monsterNewArr) => {
      // o increment numbers here
      incrementNumbers()
      const nextFifty = monsterNewArr.slice(firstNumber, secondNumber)
      handleMonster(nextFifty);
    })
    .catch((error) => console.error('Error fetching monsters:', error));
}

function incrementNumbers() {
    if (secondNumber - firstNumber === 50 && firstNumber === 50) {
      firstNumber += 50;
      secondNumber += 50;
    }
}

