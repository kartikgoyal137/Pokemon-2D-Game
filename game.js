import { activeParty, activeEnemy, PokeMoves, findDamage, animation , updateHP} from './battle.js';

async function LoadPokemon () { 
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const data = await response.json();

    for(let i = 0; i<1302; i++)
    {
        let variable = data.results[i].name;
        document.querySelector('#choose1').innerHTML += `<option value="${variable}">${variable}</option>`;
        document.querySelector('#choose2').innerHTML += `<option value="${variable}">${variable}</option>`;
    }
}
LoadPokemon();

function matchOver(obj, num) {
    const myPoke = document.querySelector('.myPoke');
    const urPoke = document.querySelector('.urPoke');
    if (num==1)
    {
        myPoke.classList.add('faint');
        setTimeout(() => {
            window.location.href='index.html';
        }, 3000);
    }
    if(num==2)
    {
        urPoke.classList.add('faint');
        setTimeout(() => {
            window.location.href='index.html';
        }, 3000);

    }

}

document.getElementById('startBtn').addEventListener('click', async () => {

    const myPoke = document.querySelector('.myPoke');
    const urPoke = document.querySelector('.urPoke');
    myPoke.classList.remove('faint');
    urPoke.classList.remove('faint');

const value1 = document.getElementById('choose1').value;
const value2 = document.getElementById('choose2').value;

const obj1 = new activeParty(value1,100,null,null,null,null,'myPoke', 1);
const obj2 = new activeEnemy(value2,100,null,null,null,null,'urPoke', 2);

await obj1.fetchData();
await obj2.fetchData();
updateHP(obj2, 1);
updateHP(obj1, 2);

document.getElementById('sprite1').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${obj1.id2}.gif`;
document.getElementById('sprite2').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${obj2.id2}.gif`;
document.getElementById('nameOfMy').innerText = obj1.name.toLowerCase();
document.getElementById('nameOfHis').innerText = obj2.name.toLowerCase();

const moveset = await PokeMoves(obj1.name);
document.querySelector('.task').innerHTML = `<div id="move1" class="moves">${moveset[0].move.name}</div><div id="move2" class="moves">${moveset[1].move.name}</div><div id="move3" class="moves">${moveset[2].move.name}</div><div id="move4" class="moves">${moveset[3].move.name}</div>`;

let isRunning = false;

const selectMove = document.querySelectorAll('.moves')
selectMove.forEach((btn) => {
    btn.addEventListener('click', async () => {
        if(isRunning) {return;}
        isRunning = true;
        const moveN = btn.innerHTML.toString();
        const damage1 = await findDamage(obj1.name,moveN,obj2.name);
        obj2.hp -= damage1;
        await animation(obj1, 'myPoke', 1, obj2);

        if (obj1.hp <= 0)
            {
                matchOver(obj1,1);
                return;
            }
        if (obj2.hp <= 0)
            {
                matchOver(obj2,2);
                return;
            }

        const eneM = obj2.enemyMove().toString();
        const damage2 = await findDamage(obj2.name,eneM,obj1.name);
        obj1.hp -= damage2;
        await animation(obj2, 'urPoke', 2, obj1);

        if (obj1.hp <= 0)
            {
                matchOver(obj1, 1);
                return;
            }
        if (obj2.hp <= 0)
            {
                matchOver(obj2, 2);
                return;
            }

        console.log(damage1);
        console.log(damage2);
        console.log(obj1.hp);
        console.log(obj2.hp);

        isRunning = false;
        })
})

});
