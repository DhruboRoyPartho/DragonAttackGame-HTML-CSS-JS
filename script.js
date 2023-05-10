//variables
let health = 100;
let gold = 50;
let xp = 0;
let currentWeapon = 0;
let inventory = ["stick"];
let fighting;
let monsterHealth = 0;


//binding html with js
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStat');
const monsterInfo = document.querySelector('.monster-info');

const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: 'town square',
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square."
    },
    {
        name: 'store',
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: 'cave',
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams Arg! as it dies. You gain experience points and find gold"
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. "
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the Dragon! YOU WIN THE GAME! 🎉"
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterInfo.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown(){
    update(locations[0]);
} 
function goStore(){
    update(locations[1]);
}
function goCave(){
    update(locations[2]);
}


function buyHealth(){
    if(gold >= 10){
        health += 10;
        gold -= 10;
        healthText.innerHTML = health;
        goldText.innerHTML = gold;
    }
    else{
        text.innerText = "Sorry, you have not enough gold.";
    }
}
function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "Now, you have a " + newWeapon + '.';
            text.innerText += " In your inventory you have: " + inventory;
        }
        else{
            text.innerText = "Sorry, You have not enough gold.";
            button2.innerText = "Sell weapon for 15 gold";
            button2.onclick = sellWeapon;
        }
    }
    else{
        text.innerText = "You have most powerfull weapon";
    }
}
function sellWeapon(){
    if(inventory.length > 1){
        currentWeapon--;
        gold += 15;
        goldText.innerText = gold;
        let poped = inventory.shift();
        text.innerText = "You have sold " + poped +'.';
        text.innerText += " In your inventory you have: " + inventory +'.';
    }
    else{
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime(){
    fighting = 0;
    goFight();
}
function fightBeast(){
    fighting = 1;
    goFight();
}
function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterInfo.style.display = "block";
    monsterStats.innerText = "Monster: " + monsters[fighting].name + ".";
    monsterStats.innerText += " Health: " + monsterHealth + ".";
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    
    if(health < 0) health = 0;
    if(monsterHealth < 0) monsterHealth = 0;

    healthText.innerText = health;
    monsterStats.innerText = "Monster: " + monsters[fighting].name + ".";
    monsterStats.innerText += " Health: " + monsterHealth + ".";
    if(health <= 0){
        lose();
    }
    else if(monsterHealth <= 0){
        if(fighting === 2){
            winGame();
        }
        else{
            defeatMonster();
        }
    }
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + '.';
}

function lose(){
    update(locations[5]);
}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
    health = 100;
    gold = 50;
    xp = 0;
    currentWeapon = 0;
    inventory = ["stick"];
    fighting;
    monsterHealth = 0;
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function winGame(){
    update(locations[6]);
}