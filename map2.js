const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const background = new Image();
const player = new Image();
player.src = 'indie_assets/sprite.png';
background.src = 'mapC.png';


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

class PlayerSprite {
    constructor(posX, posY, image)
    {
        this.x = posX;
        this.y = posY;
        this.image = image;
        this.width = 50;
        this.height = 70;
    }

    draw(){
        ctx.drawImage(this.image, 10,10,40,50,this.x,this.y,50,70);
    }
}

function checkGym(city)
{
    if(city.x< 286 && city.x>>-322 && city.y>-1384 && city.y<-1230)
    {
        window.location.href = 'battle.html';
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
    ash.draw();
    console.log(city.x);
    console.log(city.y);
    checkGym(city);

    
    
    if(keys.w.pressed){
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
        {
            const boundary = boundaries[i];
            if(rectCollision(
                {
                    ...ash,
                    y: ash.y - 2 
                  },
                  boundary
                )
            ) 
            {
                console.log('fjdjdf');
                moving = false;
                break;
            }
        }
        if(moving){
        
        movables.forEach(obj => obj.y += 2);
        }
    }
    if(keys.s.pressed){
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if( rectCollision(
                    {
                        ...ash,
                        y: ash.y + 2 
                      },
                      boundary
                    )
                ) 
                {
                    console.log('fjdjdf');
                    moving = false;
                    break;
                }
            }
        if(moving){
       
        movables.forEach(obj => obj.y -= 2);
        }
    }
    if(keys.d.pressed){
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if(rectCollision(
                    {
                        ...ash,
                        x: ash.x + 2 
                      },
                      boundary
                    )
                ) 
                {
                    console.log('fjdjdf');
                    moving = false;
                    break;
                }
            }
        if (moving){
    
        movables.forEach(obj => obj.x -= 2);
        }
    }
    if(keys.a.pressed){
        let moving = true;
        for(let i=0; i<boundaries.length; i++)
            {
                const boundary = boundaries[i];
                if( rectCollision(
                    {
                        ...ash,
                        x: ash.x - 2
                      },
                      boundary
                    )
                ) 
                {
                    console.log('fjdjdf');
                    moving = false;
                    break;
                }
            }
        if(moving){
   
        movables.forEach(obj => obj.x += 2);
        }
    }
    
}
background.onload = () => {
    animate();
    setTimeout(()=>{alert('find the gym');}, 4000);
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
            keys.w.pressed = true;
            break
        case 'a':
            keys.a.pressed = true;
            break
        case 's':
            keys.s.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }

})