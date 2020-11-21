const monsterContainer = document.querySelector("#monster-container")
// console.log(monsterContainer)

const fetchMonstersGet = () => {
    return fetch('http://localhost:3000/monsters/?_limit=50')
        .then(resp => resp.json())
        .then(monstersData => renderMonsters(monstersData))
}

const renderMonsters = (monsters) => {
    const ol = document.createElement("ol")
    monsterContainer.append(ol)
    console.log(monsterContainer)
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
    fetchMonstersGet() 
}
initialize()