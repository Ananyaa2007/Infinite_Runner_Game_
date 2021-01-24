//defining values to the game's states
PLAY = 1;
END = 0;
//defining the gamestate
gameState = PLAY;
//variable for storing the score of the player
var score = 0;

function preload() {
  //loading the required images
  playerImage = loadImage("images/girl.gif");
  coinImage = loadImage("images/coin.jpg");
  bgImage = loadImage("images/garden.jpg");
  stoneImage = loadImage("images/rock.jpg");
}

function setup() {
  //creation of canvas
  createCanvas(displayWidth-110,displayHeight-80);
  background("white");

  //creating background sprite and giving image to it
  bg = createSprite(0, 200, 600, 100)
  bg.addImage(bgImage);
  //setting the scale to the image of the background
  bg.scale = 9;
  //giving velocity to the background so as to make it appear like continuosly moving
  bg.velocityX = -4;
  bg.x = bg.width / 2;

  //creation of the player
  player = createSprite(150, 700, 10, 10);
  player.addImage(playerImage);
  //scaling for the image
  player.scale = 0.5;

  //defining 2 groups for obstacles and coins
  obstaclesGroup = new Group();
  coinsGroup = new Group();

  //giving value to the score
  score = 0;
 
  //setting camera for the game
  camera.position.x = displayWidth/2;
  camera.position.y = bg.y+160
}

function draw() {

  //condition for the gamestate play
  if (gameState == PLAY) {
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    spawnObstacles();
    coins();

    if (keyDown("space") && player.y >= 100) {
      player.velocityY = -13;
    }

    player.velocityY = player.velocityY + 0.8;

    invisibleGround = createSprite(200, 720, 800, 10);
    invisibleGround.visible = false;
    player.collide(invisibleGround);

    if (player.isTouching(coinsGroup)) {
      score = score + 5;
      coinsGroup.destroyEach();
    }

    if (player.isTouching(obstaclesGroup)) {
      gameState = END;
    }

    drawSprites();

    textSize(30);
    fill("black");
    stroke("black");
    strokeWeight(4);
    text("SCORE : " + score, displayWidth/2.5, 50);
  }

  //condition for the gamstate end
  if (gameState === END) {

    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);

    player.velocityY = 0;

    textSize(50);
    fill("black");
    stroke("black");
    strokeWeight(4);
    text("GAME OVER", displayWidth/3, 160);
    
  }

}

//function for spawning the stones randomly
function spawnObstacles() {
  if (World.frameCount % 200 === 0) {
    obstacle = createSprite(430, 650, 20, 20);
    obstacle.addImage(stoneImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 50;
    obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);
  }
}

//function for spawning the coins randomly
function coins() {
  if (frameCount % 80 === 0) {
    coin = createSprite(330, 350);
    coin.x = Math.round(random(120, 200));
    coin.y = 200;
    coin.addImage(coinImage);
    coin.scale = 0.5;
    coin.lifetime = 50;
    coin.velocityX = -4;
    coinsGroup.add(coin);
  }
}