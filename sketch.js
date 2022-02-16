var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var block1, block2, edges
var blocks;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(width / 2,300);
  tower.addImage("tower",towerImg);
  ghost = createSprite(width / 2, height / 2)
  ghost.addImage("standing",ghostImg)
  ghost.scale = 0.4
  tower.velocityY = 4;
  block1 = createSprite(tower.x-601/2, height/2, 120, height)
  block2 = createSprite(tower.x+601/2, height/2, 120, height)
  block1.visible = 0
  block2.visible = 0
  blocks = new Group()
  blocks.add(block1)
  blocks.add(block2)
  ghost.debug = 1
  ghost.setCollider("rectangle",-13,30,150,250)
}

function draw() {
  background(31,11,34);
  drawSprites()
  ghost.collide(blocks)
  if(tower.y > 400){
      tower.y = 300
  }
  ghost.velocityY +=0.5
  if (keyDown("SPACE")||keyDown("UP_ARROW")){
    ghost.velocityY = -12
  } 
  if (keyDown("RIGHT")){
    ghost.velocityX = 4
    ghost.mirrorX(-1);
    ghost.setCollider("rectangle",13,30,150,250)
  }
  else if (keyDown("LEFT")){
    ghost.velocityX = -4
    ghost.mirrorX(1);
    ghost.setCollider("rectangle",-13,30,150,250)
  }
  else {
    ghost.velocityX = 0
  }
}
