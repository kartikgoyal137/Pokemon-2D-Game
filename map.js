const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function LoadAssets(source) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = source;
        img.onload = () => resolve(img);
    });
}

async function loadEnv() {
    const [green, road, tree, house, ash] = await Promise.all([
        LoadAssets('indie_assets/tiles.png'),
        LoadAssets('indie_assets/tiles.png'),
        LoadAssets('indie_assets/tiles2.png'),
        LoadAssets('indie_assets/Buildings.png'),
        LoadAssets('indie_assets/sprite.png')
    ]);

    return {green, road, tree, house, ash};
}

function drawEnv(ctx, images) {
    let {green, road, tree, house, ash} = images;

        for(let i=0; i<2000; i+=25){
        for(let j=0; j<1200; j+=25){
        ctx.drawImage(green, 49,42,12,12,i,j,25,25);
        }
        }
        for(let i=0; i<1500; i+=25){
        for(let j=275; j<320; j+=25){
        ctx.drawImage(road, 113,32,15,15,i,j,25,25);
        }
        }
        for(let i=500; i<550; i+=25){
        for(let j=50; j<325; j+=25){
        ctx.drawImage(road, 113,32,15,15,i,j,25,25);
        }
        }
        for(let i=700; i<750; i+=25){
        for(let j=325; j<800; j+=25){
        ctx.drawImage(road, 113,32,15,15,i,j,25,25);
        }
        }

        ctx.drawImage(house, 208,22,80,72,40,450,150,150);
        ctx.drawImage(house, 208,22,80,72,220,450,150,150);
        ctx.drawImage(house, 435,130,96,70,350,125,150,150);
        ctx.drawImage(house, 502,235,80,70,750,325,150,150);

        for(let j=0; j<1200; j+=50) {
            if(j===0){
                for(let i=0; i<1500; i+=30) {
                     ctx.drawImage(tree, 272,23,17,26,i,j,30,50);
                    }
            }
            else {
                ctx.drawImage(tree, 272,23,17,26,0,j,30,50);
                ctx.drawImage(tree, 272,23,17,26,1470,j,30,50);
            }
        }
}

let a = 200;
let b = 200;
let preva = 200;
let prevb = 200;

function stop(key) {
    if (key === 'ArrowUp')
        {
            
            b += 10;
        }
        else if (key === 'ArrowDown')
        {
            
            b -= 10;
        }
        if (key === 'ArrowLeft')
        {
            
            a += 10;
        }
        if (key === 'ArrowRight')
        {
            
            a -= 10;
        }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp')
    {
        
        b -= 10;
    }
    else if (e.key === 'ArrowDown')
    {
        
        b += 10;
    }
    if (e.key === 'ArrowLeft')
    {
        
        a -= 10;
    }
    if (e.key === 'ArrowRight')
    {
        
        a += 10;
    }
    if(collide(a,b,h)) {
        stop(e.key);
    }
})

const obstacles = [
    {x:40 , y:450 , width:150 , height:150 },
    {x:220 , y:450 , width:150 , height:150 },
    {x:350 , y:125 , width:150 , height:150 },
    {x:750 , y:325 , width:150 , height:150 },
    {x:0 , y:0 , width:1500 , height:25 },
    {x:0 , y:0 , width:25 , height:1500 },
    {x:1475 , y:0 , width:25 , height:1500 },
    {x:0 , y:750 , width:1500 , height:50 }
]

let h = 40;
function drawSprite(ctx, images, a, b) {
    
    let {green, road, tree, house, ash} = images;
    
    ctx.drawImage(ash, 10,10,40,50,a,b,h,h);

    
}

function collide (a,b,h) {
    for ( let obstacle of obstacles) {
        if (
            (a < (obstacle.x + obstacle.width)) &&
            (a + h > obstacle.x) &&
            (b < (obstacle.y + obstacle.height)) &&
            (b + h > obstacle.y)
        )
        {   
            return true;
        }
    }
    return false;
}



async function StartGame() {
    const images = await loadEnv();

    function GameLoop(){
        drawEnv(ctx, images);
        drawSprite(ctx,images,a,b);
        requestAnimationFrame(GameLoop);
    }

    GameLoop();
}

StartGame();