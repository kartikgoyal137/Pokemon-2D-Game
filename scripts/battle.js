export const pokeUrl = 'https://pokeapi.co/api/v2/';

export async function PokeMoves(name) {
    const response = await fetch(`${pokeUrl}pokemon/${name.toLowerCase()}`);
    const data = await response.json();
    return data.moves;
}

export class Pokemon {
    constructor(name,hp,moveset, cries, sprites, stats, id, profile) {
        this.name = name;
        this.hp = hp;
        this.moveset = moveset;
        this.cries = cries;
        this.sprites = sprites;
        this.stats = stats;
        this.id = id;
        this.profile = profile;
    }

    async fetchData () {
        const fname = this.name.toLowerCase();
        const response = await fetch(`${pokeUrl}pokemon/${fname}`);
        const data = await response.json();

        const attacks = data.moves;
        const cry = data.cries;

        this.cries = [cry.latest, cry.legacy];
        this.stats = [data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat];
        this.hp = data.stats[0].base_stat*2;
        this.moveset = [attacks[0].move.name, attacks[1].move.name, attacks[2].move.name, attacks[3].move.name];
        this.maxHP = data.stats[0].base_stat*2;
        this.id2 = data.id;

        if(this.profile===1){
            document.querySelector(`.${this.id}`).src = data.sprites.back_default;
        }
        if (this.profile===2)
        {
            document.querySelector(`.${this.id}`).src = data.sprites.front_default;
        }
    }
}


export class activeParty extends Pokemon {
    constructor(name,hp,moveset, cries, sprites, stats, id, profile){
        super(name,hp,moveset, cries, sprites, stats, id, profile);
    }
}

export class activeEnemy extends Pokemon {
    constructor(name,hp,moveset, cries, sprites, stats, id, profile){
        super(name,hp,moveset, cries, sprites, stats, id, profile);
    }

    enemyMove() {
        let x = Math.floor(Math.random()*4);
        return this.moveset[x];
    }
}

export async function findDamage(myName, moveName, enemyName) {

    const pname = myName.toLowerCase();
    const mname = moveName.toLowerCase();
    const ename = enemyName.toLowerCase();
    const response1 = await fetch(`${pokeUrl}pokemon/${pname}`);
    const response2 = await fetch(`${pokeUrl}move/${mname}`);
    const response3 = await fetch(`${pokeUrl}pokemon/${ename}`);
    const pokeData = await response1.json();
    const moveData = await response2.json();
    const enemData = await response3.json();

    let attack = 1;
    let defense = 1;

    if(moveData['damage_class']['name'] === 'physical'){
        attack = pokeData.stats[1].base_stat;
        defense = enemData.stats[2].base_stat;
    }
    if(moveData['damage_class']['name'] === 'special'){
        attack = pokeData.stats[3].base_stat;
        defense = enemData.stats[4].base_stat;
    }
    const power = moveData['power'] || 10;
    let x = Math.random() + 0.6;

    const damage = (attack/defense)*power*x*0.5;
    
    return damage;
    
}


export function updateHP(obj,num) {
    let fraction = (obj.hp)/(obj.maxHP);
    let fraction2 = fraction*100;
    const percentage1 = document.querySelector('#nameOfMy');
    const percentage2 = document.querySelector('#nameOfHis');
    

    if(fraction>0){
    if (num===1)
    {
        percentage2.innerHTML = `${obj.name} ${fraction2.toFixed(0)}%`;
        document.getElementById('bar2').style.width = (fraction*13) + 'vw';
    }
    if(num===2)
    {
        
        percentage1.innerHTML = `${obj.name} ${fraction2.toFixed(0)}%`;
        document.getElementById('bar1').style.width = (fraction*13) + 'vw';
    }
    }
    else {
        if (num===1)
            {
                percentage2.innerHTML = `${obj.name} 0%`;
                document.getElementById('bar2').style.width = 0;
            }
            if(num===2)
            {
                percentage1.innerHTML = `${obj.name} 0%`;
                document.getElementById('bar1').style.width = 0;
            }
    }
}

export function animation(obj, who, num, objsecond){
    
    return new Promise(resolve => {
        const audio = new Audio(`${obj.cries[0]}`);

        const animP = document.querySelector(`.${who}`);
        if(num===1){
            animP.classList.add('animate1');
            updateHP(objsecond, 1);
        }
        if(num===2){
            animP.classList.add('animate2');
            updateHP(objsecond, 2);
        }
        audio.play();
        
        audio.addEventListener('ended', () => {
            if(num===1){
            animP.classList.remove('animate1');
            }
            if(num===2){
                animP.classList.remove('animate2');
            }
            resolve();
        })
    })
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');    
    loader.style.display = 'none';
  });