var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImage, zombieGroup;
var bullet, bulletImage;


function preload(){
  
  shooterDead = loadImage("assets/shooter_1.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImage = loadImage("assets/zombie.png")

  bulletImage = loadImage("assets/bullet.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,50,300)

   zombieGroup = createGroup()



}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

  spawnBullets();
  
  /*if(zombieGroup.isTouching(bullet)){
    zombieGroup.destroy();
    console.log("true");
  }*/

  

 // zombieGroup.collide(bullet, removeZombie)

}



//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  for (var i = 0; i < zombieGroup.length; i++) {
    if (zombieGroup.get(i).isTouching(bullet)) {
        zombieGroup.get(i).destroy();
       
    }    
    }
}

if(zombieGroup.isTouching(player)){
  player.addImage(shooterDead);
  zombieGroup.setVelocityXEach(0);
  //zombieGroup.setLifetimeEach(0); 
  zombieGroup.destroyEach();
}

drawSprites();

spawnZombies();

}

function spawnZombies(){
  if(frameCount%80 === 0){
    zombie = createSprite(width, height-100, 15, 100 )
    zombie.addImage(zombieImage);
    zombie.scale = 0.15;
    zombie.velocityX = Math.round(random(-2, -5))
    zombie.y = Math.round(random(height - 1200, height - 100));
    
    zombie.lifetime = height/zombie.velocityY;

    zombieGroup.add(zombie);
  }
}

function spawnBullets(){
  bullet = createSprite(player.x, player.y, 20, 20);
  bullet.addImage(bulletImage);
  bullet.scale = 0.05;
  bullet.velocityX = 15;
}

function removeZombie(){
  zombieGroup.remove();
}