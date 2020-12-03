var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground;
var bananaImage, obstacleImage,gameOverImage,gameOver;
var FoodGroup, obstacleGroup;
var survive;
var temp;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameover.png");

}

function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  // ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {

  background('white');

  if (gameState === PLAY) {

    survivalTime();

    if (ground.x < 0) {

      ground.x = ground.width / 2;

    }

    if (keyDown("space") && monkey.y >= 305) {

      monkey.velocityY = -12;

    }

    // monkey.debug = true;

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);



    spawnBanana();
    spawnObstacles();

    if (monkey.isTouching(obstacleGroup)) {

      gameState = END;

    }
  } else if (gameState === END) {
    
    temp = survive;
    reset();

  }

  drawSprites();

}

function spawnBanana() {
  if (frameCount % 80 === 0) {

    var banana = createSprite(400, 200, 10, 10)
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;

    banana.y = Math.round(random(120, 250));

    FoodGroup.add(banana);

  }

}

function survivalTime() {

  survive = 0;
  stroke("white");
  textSize(20);
  fill("black");
  survive = Math.round(frameCount / frameRate())
  text("Survival Time : " + survive, 130, 30)

}

function spawnObstacles() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400, 326, 30, 30)
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;

    obstacle.x = Math.ceil(random(200, 400))

    //obstacle.debug = true;

    obstacleGroup.add(obstacle);

  }
}



function reset() {

  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.velocityX = 0;
  ground.velocityX = 0;
  monkey.velocityY = 0;

  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);

  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  textSize(20);
  noStroke();
  fill('black');
  text("Survival Time: " + temp,130,150);
  monkey.visible = false;
  
  gameOver = createSprite(200,210,20,20);
  gameOver.addImage(gameOverImage);
  
}