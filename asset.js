const canvas1 = document.getElementById("background-road");
const ctx1 = canvas1.getContext('2d');
canvas1.height = window.innerHeight;
canvas1.width = window.innerWidth;
const green_road = new Image();
green_road.src = 'indie_assets/tiles.png';
green_road.onload = function () {
    for(let i=0; i<2000; i+=25){
    for(let j=0; j<1200; j+=25){
    ctx1.drawImage(green_road, 49,42,12,12,i,j,25,25);
    }
    for(let i=0; i<1350; i+=25){
    for(let j=275; j<320; j+=25){
    ctx1.drawImage(green_road, 113,32,15,15,i,j,25,25);
    }
    for(let i=500; i<550; i+=25){
    for(let j=50; j<325; j+=25){
    ctx1.drawImage(green_road, 113,32,15,15,i,j,25,25);
    }
    for(let i=700; i<750; i+=25){
    for(let j=325; j<800; j+=25){
    ctx1.drawImage(green_road, 113,32,15,15,i,j,25,25);
    }
}
}
}

const canvas2 = document.getElementById("tree-house");
const ctx2 = canvas2.getContext('2d');
canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;
const tree = new Image();
tree.src = 'indie_assets/tiles2.png';
const house = new Image();
house.src = 'indie_assets/Buildings.png';
tree.onload = function () {
        for(let j=0; j<1200; j+=50) {
            if(j===0){
                for(let i=0; i<1361; i+=30) {
                     ctx2.drawImage(tree, 272,23,17,26,i,j,30,50);
                    }
            }
            else {
                ctx2.drawImage(tree, 272,23,17,26,0,j,30,50);
                ctx2.drawImage(tree, 272,23,17,26,1350,j,30,50);
            }
        }
}
house.onload = function houses () {
        ctx2.drawImage(house, 208,22,80,72,40,450,150,150);
        ctx2.drawImage(house, 208,22,80,72,220,450,150,150);
        ctx2.drawImage(house, 435,130,96,70,350,125,150,150);
        ctx2.drawImage(house, 502,235,80,70,750,325,150,k);
}
}
}
let k = 150;
document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowUp'){
        k = 3;
        houses();
    }
})