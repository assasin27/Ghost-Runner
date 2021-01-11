var PLAY=0;
var END=1;
var gameState=PLAY;

var score=0;

var tower,door,climber,ghost,invisible;

var towerImg,doorImg,climberImg,ghostImg,spooky;

var doorGroup,climberGroup,invisibleGroup;

function preload(){
  
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
  spooky=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  
 // spooky.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=5;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleGroup= new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  
}

function draw(){
  
  background(0);
  
  if(gameState===PLAY){
  
  score=score+Math.round(getFrameRate()/60); 
  
    
  if(tower.y>400){
    
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x=ghost.x-4;
  }
  
  
  if(keyDown("right_arrow")){
    
    ghost.x=ghost.x+4;
  }
  
  
  if(keyDown("space")){
    
    ghost.velocityY=-4;
  
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
  }
    
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    
    ghost.destroy();
    gameState=END;
  }
  
   spawnDoor();
   drawSprites();
   
    stroke("black");
    fill("black");
    textSize(30);
    text("Score: "+score,100,100);
  }
  
  if(gameState===END){
   
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",250,250);
  }
  
  
}

function spawnDoor(){
  
  if(frameCount%100===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.x=Math.round(random(120,400))
    door.velocityY=5;
    door.lifetime=200;
    doorGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=5;
    climber.lifetime=200;
    climberGroup.add(climber);
    
    invisible=createSprite(200,15)
    invisible.width=climber.width;
    invisible.height=2;
    invisible.x=door.x;
    invisible.velocityY=5;
    invisible.debug=true;
    invisibleGroup.add(invisible);
    
    ghost.depth=door.depth;
    ghost.depth +=1;
  }
}