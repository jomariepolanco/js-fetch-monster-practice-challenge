const monsterContainer = document.querySelector("#monster-container")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")

let page = 1 

forwardButton.addEventListener("click", () => {
    const monsterOl = event.target.previousElementSibling.previousElementSibling.children[page - 1]
    page += 1 
    fetchMonstersGet(page)
    if (parseInt(monsterOl) === page) {
        console.log(monsterOl)
        console.log(page)
        monsterOl.style.display = ""
    } else {
        console.log(page)
        console.log(monsterOl)
        monsterOl.style.display = "none"
    }
})
 
const fetchMonstersGet = (page) => {
    page = page 
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monstersData => renderMonsters(monstersData))
}

const renderMonsters = (monsters) => {
    const ol = document.createElement("ol")
    ol.dataset.id = page 
    monsterContainer.append(ol)
    monsters.forEach(monster => {
        const monsterLi = document.createElement("li")
        monsterLi.dataset.id = monster.id 
        monsterLi.textContent = `${monster.name}, age: ${monster.age}` 
        const monsterP = document.createElement("p")
        monsterP.textContent = monster.description
        monsterLi.append(monsterP)
        ol.append(monsterLi)
    })
}

const initialize = () => {
    fetchMonstersGet(1) 
}
initialize()