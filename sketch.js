var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var obstacleGroup;
var gameState = "play"
var block1, block2, edges
var blocks;
var light = 255
var gameOverImg, gameOver

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("game-over1.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(width / 2,300);
  gameOver = createSprite(width/2, height/2, width, height)
  gameOver.addImage("gameOver",gameOverImg)
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
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  obstacleGroup = new Group()
  blocks.add(block1)
  blocks.add(block2)
  tower.debug = 1
  ghost.debug = 1
  ghost.setCollider("rectangle",-13,30,150,250)
  edges = createEdgeSprites()
  doors()
}

function draw() {
  drawSprites();
  background(31,11,34);
  console.log(gameState)
  if(gameState == "play"){
    ghost.collide(blocks)
    ghost.collide(climbersGroup)
    if(ghost.isTouching(invisibleBlockGroup)){
      gameState="end"
    }
    if(frameCount % 180 == 0){
      doors()
    }
    if(tower.y > 400){
      tower.y = 300
    }
    ghost.velocityY +=0.5
    if (keyDown("SPACE")||keyDown("UP_ARROW")){
      ghost.velocityY = -12
    } 
    if (keyDown("RIGHT")||keyDown("D")){
      ghost.velocityX = 4
      ghost.mirrorX(-1);
      ghost.setCollider("rectangle",13,30,150,250)
    }
    else if (keyDown("LEFT")||keyDown("A")){
      ghost.velocityX = -4
      ghost.mirrorX(1);
      ghost.setCollider("rectangle",-13,30,150,250)
    }
    else {
      ghost.velocityX = 0
    }
    if (ghost.velocityX == 0 && ghost.mirrorX() == 1) {
      console.log("true")
    }
    else{
      console.log("false")
    }
  }
  else{
    tower.velocityY = 0
    ghost.velocityX = 0
    ghost.velocityY = 0
    obstacleGroup.setVelocityYEach(0)
    obstacleGroup.setLifetimeEach(-1)
  }
}



function doors(){
  door = createSprite(Math.round(random(tower.x-200, tower.x+200)), -50, 5, 5)
  door.velocityY=tower.velocityY
  door.addImage("door",doorImg)
  door.depth = 2
  door.debug = 1
  door.lifetime = Math.round(windowHeight/3)
  doorsGroup.add(door)
  obstacleGroup.add(door)

  climber = createSprite(door.x, 15)
  climber.velocityY = tower.velocityY
  climber.addImage("climber",climberImg)
  climber.depth = 2
  climber.debug = 1
  climber.lifetime = Math.round(windowHeight/3)
  climbersGroup.add(climber)
  obstacleGroup.add(climber)

  invisibleBlock = createSprite(door.x, climber.y+(climber.height/2), climber.width, 2)
  invisibleBlock.velocityY = tower.velocityY
  invisibleBlock.lifetime = Math.round(windowHeight/3)
  invisibleBlock.visible = 1
  invisibleBlock.depth=2
  invisibleBlock.debug = 1
  invisibleBlockGroup.add(invisibleBlock)
  obstacleGroup.add(invisibleBlock)
}
