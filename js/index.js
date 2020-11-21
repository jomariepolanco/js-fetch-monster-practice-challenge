//DOM ELEMENTS
const monsterContainer = document.querySelector("#monster-container")
const createMonster = document.querySelector("#create-monster")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")

//RENDERING VARIABLES
let page = 1 

//EVENT LISTENERS
forwardButton.addEventListener("click", (event) => {
    const monsterOl = event.target.previousElementSibling.previousElementSibling.children[page - 1]
    page += 1 
    fetchMonstersGet(page)
    if (parseInt(monsterOl.dataset.id) === page) {
        console.log(monsterOl)
        console.log(page)
        monsterOl.style.display = ""
    } else {
        console.log(page)
        console.log(monsterOl)
        monsterOl.style.display = "none"
    }
})

backButton.addEventListener("click", (event) => {
    const monsterOls = Array.from(event.target.previousElementSibling.children)
    const monsterOl = event.target.previousElementSibling.children[page - 2]
    page -= 1 
    if (parseInt(monsterOl.dataset.id) === page) {
        console.log(monsterOl)
        console.log(page)
        monsterOl.style.display = ""
        monsterOls.forEach(ol => {
            if (ol.dataset.id !== monsterOl.dataset.id) {
                ol.style.display = "none"
            }
        })
    } else {
        console.log(page)
        console.log(monsterOl)
        monsterOl.style.display = "none"
    }
})

createMonster.addEventListener("submit", event => {
    event.preventDefault()
    const newMonster = {
        name: event.target.name.value, 
        age: event.target.age.value,
        description: event.target.description.value 
    }
    fetchNewMonsterPost(newMonster)
})
 
//FETCH FUNCTIONS
const fetchMonstersGet = (page) => {
    page = page 
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monstersData => renderMonsters(monstersData))
}

const fetchNewMonsterPost = (monster) => {
    return fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    })
        .then(response => response.json())
        .then(newMonster => renderOneMonster(newMonster))
}

//RENDERING FUNCTIONS
const renderMonsters = (monsters) => {
    const ol = document.createElement("ol")
    ol.dataset.id = page 
    monsterContainer.append(ol)
    monsters.forEach(monster => {
        renderOneMonster(monster)
    })
}

const renderOneMonster = (monster) => {
    const allOl = document.querySelectorAll("ol")
    const lastOl = allOl[allOl.length - 1]
    const monsterLi = document.createElement("li")
    monsterLi.dataset.id = monster.id 
    monsterLi.textContent = `${monster.name}, age: ${monster.age}` 
    const monsterP = document.createElement("p")
    monsterP.textContent = monster.description
    monsterLi.append(monsterP)
    lastOl.append(monsterLi)
}

const createNewMonsterForm = () => {
    const form = document.createElement("form")
    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.name = "name"
    nameInput.value = "name"
    const ageInput = document.createElement("input")
    ageInput.type = "text"
    ageInput.name = "age"
    ageInput.value = "age"
    descInput = document.createElement("input")
    descInput.type = "text"
    descInput.name = "description"
    descInput.value = "description"
    submitInput = document.createElement("input")
    submitInput.type = "submit"
    submitInput.name = "submit"
    submitInput.value = "Create Monster"
    form.append(nameInput, ageInput, descInput, submitInput)
    createMonster.append(form)
}

//INITIALIZERS
const initialize = () => {
    fetchMonstersGet(1) 
    createNewMonsterForm()
}
initialize()