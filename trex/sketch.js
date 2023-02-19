var roof,roofImg;
var ObstaclesGroup,obstacle1,obstacle2,obstacle3
var coin,coinImg,coinsGroup;
var score =0
var boy,boyImg
var butterfly,butterflyImg;
var invisibleGround,invisibleGroundImg;
var invisibleBlock,invisibleBlocksG;
var gameState = PLAY
var PLAY;
var END;
var gameOver,gameOverImg
var Health = 10
var ButterflysGroup;
//var restart,restartImg;
var coinSound,gameoverSound;
var jumpSound,djSound

function preload(){
roofImg = loadImage("Images/background.png")
obstacle1 = loadImage("Images/box.png")
obstacle2 = loadImage("Images/box1.png")
obstacle3 = loadImage("Images/soler.png") 
coinImg = loadImage("Images/coin1.png")
boyImg = loadAnimation("runner.png","runner1.png")
butterflyImg = loadAnimation("Images/butterfly 1.png","Images/butterfly 2.png") 
  gameOverImg = loadImage("Images/gameover.png")
 //restartImg = loadImage("Images/unnamed.png")
  coinSound = loadSound("sound/coinmp.mp3")
  gameoverSound = loadSound("sound/game-over.mp3")
  djSound = loadSound("sound/jump.mp3")
  jumpSound = loadSound("sound/crate-break.mp3")
  
}

function setup(){
createCanvas(700,400)  
ObstaclesGroup = createGroup();
  
roof = createSprite(0,0,700,400)
roof.addImage("roof",roofImg)
roof.scale =2.3 
  
boy = createSprite(250,260,20,20) 
boy.addAnimation(boyImg) 

  
 gameOver = createSprite(290,290)
 gameOver.addImage("gameOver",gameOverImg)
 gameOver.scale = 0.3
 
  invisibleGround = createSprite(200,289,990,30);
  invisibleGround.visible = false;
  
  /*restart = createSprite(290,280)
  restart.addImage("restart",restartImg)
  restart.scale = 0.2*/
  
  
    
  
  coinsGroup = new Group();
  invisibleBlocksG = new Group();
  boy.setCollider("rectangle",0,0,20,20)
  //boy.debug = true
  ButterflysGroup = new Group();
 
}

function draw(){
background(0)
spawnObstacles();  
if(gameState === PLAY){  
  gameOver.visible = false;
  //restart.visible = false;
roof.velocityX = -(3+ 1 * score/5)  
if (roof.x < 0){
      roof.x = roof.width/2;
    }
  if(boy.isTouching(coinsGroup)){
    coinSound.play();
  for(var i =0;i<coinsGroup.length;i++)
  {
  coinsGroup[i].destroy();
  score = score+1 
    break
    
  }  
}
    if(boy.isTouching(ButterflysGroup)){
      ButterflysGroup.destroyEach();
      Health = Health-1
      roof.velocityX-(3 -1* Health/1)
    }

   if(boy.isTouching(ObstaclesGroup)){
    jumpSound.play();
     ObstaclesGroup.destroyEach();
   }   
     
   
    
  boy.collide(invisibleGround)
 /* if(mousePressedOver(restart)) {
      reset();
    }*/
  
  if(keyDown("space")){
    boy.velocityY = -12
    
     djSound.play();
  }
     boy.velocityY = boy.velocityY + 0.8 
  }
  if(Health === 0){
    gameOver.visible = true
    gameState = "END"
   // restart.visible = true
    gameoverSound.play();
    boy.destroy();
    roof.velocityX = 0
    coinsGroup.setVelocityXEach(0)
    coinsGroup.setLifetimeEach(-1)
  ObstaclesGroup.setVelocityXEach(0)
ObstaclesGroup.setLifetimeEach(0)
  ButterflysGroup.setVelocityXEach(0)
    ButterflysGroup.setLifetimeEach(-1)
  }
  if(gameState ===END){

  }

  
//createcoinsGroup();
  
 
  
 //function coinsGroup(){
if(frameCount % 20 === 0){
  coin = createSprite(800,270)
  coin.addImage("coin",coinImg)
  coin.scale = 0.1
  coin.velocityX = -4
  coin.X = Math.round(random(750,270))
  coinsGroup.add(coin)
  coinsGroup.lifetime = 300;
}
 //}
  if(frameCount % 300 === 0){
     butterfly = createSprite(0,300)
    butterfly.addAnimation("butterfly",butterflyImg)
    butterfly.scale = 0.06
    butterfly.velocityX = 3 
    butterfly.X = Math.round(random(750,270))
    ButterflysGroup.add(butterfly)
    
  }
  
 drawSprites()
  
  fill("white")
  textSize(20)
  text("score:" +score,370,20)
  
  fill("white")
  textSize(20)
  text("Health:" + Health,100,20 )
  
function spawnObstacles(){
if (frameCount % 300 === 0){
   var obstacle = createSprite(750,270);
   obstacle.velocityX = -4;
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
  
   //add each obstacle to the group
    ObstaclesGroup.add(obstacle);  
} 
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  boy.addAnimation("boy",boyImg) 
}