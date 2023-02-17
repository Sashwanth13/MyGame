var PLAY = 0
var END = 1
var gameState = PLAY

var input, heading;
var sky;
var player, playerDead;
var skyImg;
var obstaclesGroup, obstacle1, obstacle2
var invisibleGround

var score = 0

var gameOverImg,restartImg

function preload() {
  skyImg = loadImage("Background.png");
  obstacle1 = loadImage("barrel1.png");
  obstacle2 = loadImage("rock1.png");
  playerImg = loadAnimation("charecter(1).png", "charecter(2).png", "charecter(3).png", "charecter(4).png", "charecter(5).png", "charecter(6).png")
  playerDead_1 = loadImage("Dead(1).png")
  playerDead_2 = loadImage("Dead(2).png")
  playerDead_3 = loadImage("Dead(3).png")
  playerDead_4 = loadImage("Dead(4).png")
  playerDead_5 = loadImage("Dead(5).png")
  playerDead_6 = loadImage("Dead(6).png")

  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(800, 600);
  sky = createSprite(400, 350, 800, 50);
  sky.addImage("Sky", skyImg);
  player = createSprite(50, 500, 50, 100);
  player.addAnimation("player", playerImg);
  player.addImage("dead_1", playerDead_1);
  player.addImage("dead_2", playerDead_2);
  player.addImage("dead_3", playerDead_3);
  player.addImage("dead_4", playerDead_4);
  player.addImage("dead_5", playerDead_5);
  player.addImage("dead_6", playerDead_6);

  obstaclesGroup = new Group();
  invisibleGround = createSprite(200,605,400,10);
  invisibleGround.visible = false;
  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart = createSprite(400,400);
  restart.addImage(restartImg);
  restart.scale = 0.5;
}

function draw() {
  background("skyblue");

  if(gameState === PLAY){
    sky.velocityX = -1.5;
    
    gameOver.visible = false;
    restart.visible = false;
    
    score = score + Math.round(frameCount/320);

    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -20;
    }
    if (sky.x < 300){
      sky.x = sky.width/2;
    }
    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8
    spawnObstacles();
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
    }
    else if (gameState === END) {
      console.log("hey")
       gameOver.visible = true;
       restart.visible = true;
      
       player.changeImage("dead_1", playerDead_1);
       player.changeImage("dead_2", playerDead_2);
       player.changeImage("dead_3", playerDead_3);
       player.changeImage("dead_4", playerDead_4);
       player.changeImage("dead_5", playerDead_5);
       player.changeImage("dead_6", playerDead_6);

       fill("black");
       textSize(20)
       text("Game Over", 400,300);

       player.velocityY = 0
       sky.velocityX = 0

      
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);

     if(mousePressedOver(restart)){
       restartGame();
     }
    }

    player.collide(invisibleGround);


drawSprites();
  fill("black");
  textSize(20)
  text("Score: "+ score, 650,50);
}

function spawnObstacles(){
  if (frameCount % 160 === 0){
    var obstacle = createSprite(800,550,10,40);
    obstacle.velocityX = -10;
    obstacle.setCollider("circle",0,0,40);

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.4;
       break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.25;
       break;
      default: break;
     }
              
     obstacle.lifetime = 300;

     obstaclesGroup.add(obstacle);
  }
}
function restartGame(){
  gameState = PLAY
  restart.visible = false
  gameOver.visible = false;
  score = 0
  obstaclesGroup.destroyEach();
  player.changeAnimation("player", playerImg);

}