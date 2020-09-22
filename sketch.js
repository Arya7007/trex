var trex,trex_running;
var ground,groundImage;
var invisibleGround
var cloudImage,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,ObstaclesGroup,CloudsGroup;
var count=0
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running=loadAnimation("trex1.png","trex4.png","trex3.png");
  trex_collided=loadAnimation("trex_collided.png");
  groundImage=loadImage( "ground2.png")
  cloudImage=loadImage ("cloud.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  jumpSound=loadSound("jump.mp3");
  
 
}



function setup() {
  
  createCanvas(600,200);
  
   trex= createSprite(50,180,10,20);
   trex.addAnimation("running",trex_running )
  trex.addAnimation("collide",trex_collided )
  trex.scale=0.5
  
  trex.setCollider("circle",0,0,30);
  
  ground=createSprite(300,180,600,20 )
  ground.addImage(groundImage);
  
  invisibleGround=createSprite( 300,185,600,5)
  invisibleGround.visible=false
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  
gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
  
  gameOver.visible = false;
    restart.visible = false;
}

function draw() {
  background(255);
  if (gameState===PLAY){
    ground.velocityX=-6;
  
    if (ground.x<0){
    ground.x=ground.width/2;
  }
    count = count + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      jumpSound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  
 
  spawnClouds()
spawnObstacles()
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
     
    }
  
  }
  else if(gameState === END) {
    //gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
    reset();
  }
  }
  
  
trex.collide(invisibleGround)
  text("Score: "+ count, 450, 50);
    
  drawSprites()
}

 function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage( cloudImage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 600/3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
 }
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
   switch(rand){
      case 1 :obstacle.addImage(cactus1)
        break;
        case 2:obstacle.addImage(cactus2)
        break;
        case 3 :obstacle.addImage(cactus3)
        break;
        case 4 :obstacle.addImage(cactus4)
        break;
        case 5 :obstacle.addImage(cactus5)
        break;
        case 6:obstacle.addImage(cactus6)
        break;
        default:break
    } 
   // obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
   ObstaclesGroup.add(obstacle);
  }
}
  function reset(){
  gameState=PLAY
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameOver.visible = false;
 restart.visible = false;
 trex.changeAnimation("running",trex_running )
 count=0
 
}
