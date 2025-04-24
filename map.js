const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const background = new Image();
const player = new Image();
player.src = 'indie_assets/sprite.png';
background.src = 'indie_assets/mapC.png';


class Boundary {
    constructor(posX,posY){
        this.x = posX;
        this.y = posY;
        this.width = 40;
        this.height = 40;
    }

    draw()
    {
        ctx.fillStyle = 'rgba(255,0,0,0)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const colMap = [];
for(let i=0; i<collision.length; i+=75)
    {
        colMap.push(collision.slice(i,i+75));
    }


const offset = { x:-160 , y:-100}
const boundaries = [];
colMap.forEach((row,i) => {
    row.forEach((Symbol,j) => {
        if(Symbol===4726)
        {
            boundaries.push(new Boundary(j*40 + offset.x,i*40+offset.y))
        }
    })
})

class Sprite {
    constructor(posX, posY, image)
    {
        this.x = posX;
        this.y = posY;
        this.image = image;
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y);
    }
}



function rectCollision(rect1,rect2)
{
    return (rect1.x + rect1.width >= rect2.x &&
        rect1.x <= 40 + rect2.x &&
        rect1.y <= rect2.y + 40 &&
        rect1.y + rect1.height >= rect2.y)
}

let a =10;
let b= 10;

class PlayerSprite {
    constructor(posX, posY, image)
    {
        this.x = posX;
        this.y = posY;
        this.image = image;
        this.width = 50;
        this.height = 72;
    }

    draw(a, b){
        ctx.drawImage(this.image, a,b,40,50,this.x,this.y,50,70);
    }
}

;
function checkGym(city)
{
    if(city.x< 286 && city.x >-322 && city.y>-1384 && city.y<-1230)
    {
        pressEnter.style.display = 'inline-block';
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter')
            {
                window.location.href = 'battle.html';
                
                
            }
        })
    }
    else {
        pressEnter.style.display = 'none';
    }
}


const city = new Sprite(-160, -100, background);
const movables = [city,...boundaries]
const ash = new PlayerSprite(canvas.width/2, canvas.height/2 + 20, player);

function animate()
{
    
    window.requestAnimationFrame(animate); 
    city.draw();
    boundaries.forEach((boundary)=> {
        boundary.draw();
    })
    ash.draw(a,b);
    console.log(city.x);
    console.log(city.y);
    checkGym(city);

    
    
    
    if(keys.w.pressed){
        a = 75;
        b= 200;
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
        {
            const boundary = boundaries[i];
            if(rectCollision(
                {
                    ...ash,
                    y: ash.y - 4 
                  },
                  boundary
                )
            ) 
            {
                moving = false;
                break;
            }
        }
        if(moving){
        
        movables.forEach(obj => obj.y += 4);
        }
    }
    if(keys.s.pressed){
        let moving = true;
        a = 10;
        b= 10;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if( rectCollision(
                    {
                        ...ash,
                        y: ash.y + 4 
                      },
                      boundary
                    )
                ) 
                {
                    moving = false;
                    break;
                }
            }
        if(moving){
       
        movables.forEach(obj => obj.y -= 4);
        }
    }
    if(keys.d.pressed){
        a = 75;
        b= 138;
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if(rectCollision(
                    {
                        ...ash,
                        x: ash.x + 4 
                      },
                      boundary
                    )
                ) 
                {
                    moving = false;
                    break;
                }
            }
        if (moving){
    
        movables.forEach(obj => obj.x -= 4);
        }
    }
    if(keys.a.pressed){
        a = 75;
        b= 75;
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if( rectCollision(
                    {
                        ...ash,
                        x: ash.x - 4
                      },
                      boundary
                    )
                ) 
                {
                    moving = false;
                    break;
                }
            }
        if(moving){
   
        movables.forEach(obj => obj.x += 4);
        }
    }
    
}
background.onload = () => {
    animate();
}




const keys = {
    w : {
        pressed : false
    },
    a : {
        pressed : false
    },
    s : {
        pressed : false
    },
    d : {
        pressed : false
    }
}

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = true;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = true;
            break;
        case 's':
        case 'ArrowDown':
            keys.s.pressed = true;
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = true;
            break;
    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = false;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = false;
            break;
        case 's':
        case 'ArrowDown':
            keys.s.pressed = false;
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = false;
            break;
    }

})

document.addEventListener('keydown', () => {
    const speak = document.createElement('div');
    speak.innerHTML = '<audio src="indie_assets/voice.mp3" autoplay></audio>';
    document.body.appendChild(speak);
}, {once:true});


document.addEventListener('keydown', () => {
    const ins = document.querySelector('.instruct');
    ins.remove();
}, {once: true});
