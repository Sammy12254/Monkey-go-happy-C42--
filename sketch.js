// creating the game objects and global variables 
  var PLAY = 1;
  var END = 0;
  var END1 = 2;
  var gameState = PLAY;

  var monkey , monkey_running, monkeyCollide;
  var ground, invisibleGround, groundImg;
  var banana ,bananaImage;
  var obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;

  var die, jump, youWin, monkeyAndBanana;

  var score = 0;
  var bananaScore = 0;

//creating the function preload
function preload() {
  
  //creating the monkey running
  monkey_running =   loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  //creatig the monkey Collide
  monkeyCollide = loadAnimation("monkey_1.png");
  
  //creating the ground Image
  groundImg = loadAnimation("ground.jpg");
  
  //ceating the banana Image
  bananaImage = loadImage("banana.png");
  
  //creating the obstacle Image
  obstacleImage = loadImage("obstacle.png");
  
  //creating the die sound
  die = loadSound("die.mp3");
  
  //creating the jump sound
  jump = loadSound("jump.mp3");
   
  //creating the you win sound
  youWin = loadSound("you win.mp3");
  
  //creating the monkey and banana sound
  monkeyAndBanana = loadSound("monkey and banana sound.mp3");
}

//creating the function setup
function setup(){
  
  //creating the Canvas
  createCanvas(600,300);
  
  //creating the obstacleGroup and bananaGroup
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
 
  //creating te monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  //creating the ground
  ground = createSprite(300,1070,600,10);
  ground.scale = 1;
  ground.addAnimation("ground", groundImg);
  
  //creating the invisibleGround
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = false;
}

//creating teh function draw
function draw(){
  
   //creating the background
   background("skyblue");
  
   //creating the colour and giving some text
   fill("black");
   text("SURVIVAL TIME: "+score, 470, 20);
   text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  //creatig the gameState as PLAY
  if (gameState === PLAY){
    
   //Call obstacles and bananas function
    obstacles();
    bananas();
    
    //giving the frameRate for score
    score = score + Math.round(getFrameRate()/60);
    
    //increase the velocity of ground after 4 or 10
    ground.velocityX = -(4+score*1.5/100);
  
    //if keyDown 'space' then the monkey jumps and it plays jump sound
    if(keyDown("space") && monkey.y >= 220) {
      monkey.velocityY = -13; 
      jump.play();
    }
  
    //giving the gravity for monkey
    monkey.velocityY = monkey.velocityY + 0.8
  
    //moving the ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //if monkey is touching bananaGroup then the score + 1  
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
      monkeyAndBanana.play();
      
      //switching the score
       switch (score) {
    case 1:
      monkey.scale = 0.12;
      break;
    case 2:
      monkey.scale = 0.14;
      break;
    case 3:
      monkey.scale = 0.16;
      break;
    case 4:
      monkey.scale = 0.18;
      break;
    case 5:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
    }
    
    
    //if monkey is touching obstacleGroup then the gameState is END
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      //adding the die sound
      die.play();
    }
    
    //if banana score is 5 then gameState is END
    if(bananaScore === 7){
      gameState = END1;
      //adding the youWin sound
      youWin.play();
    }
  }
  
  //creating the gameState as END1
  if(gameState === END1) {
    
    //making the ground.velocityX = 0
    ground.velocityX = 0;
    
    //creating the monkey again
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    //destroying the obstacleGroup and bananaGroup
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);      
    
    //seting the lifeTime for obstacleGroup and bananaGroup
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    //creating the textSize,colour and giving some text
    textSize(25);
    fill("blue");
    text("Congratulations! You WON!!!", 150, 100);
    text("Press 'R' to play again", 240, 150);
    
    //if keyDown 'r' then gameState is PLAY;
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  //creating the gameState as END
  if (gameState === END){
    
    //making the ground.velocityX = 0
    ground.velocityX = 0;
    
    //creating the monkey again
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    //destroying the obstacleGroup and bananaGroup
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);       
    
    //seting the lifeTime for obstacleGroup and bananaGroup
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
   //creating the textSize,colour,stroke and giving some text
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    
    //creating the textSize,colour and giving some text
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    //if keyDown 'r' then gameState is PLAY;
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
  }
   }
  
    //creating the drawSprite
    drawSprites(); 
  
    //colliding the monkey with invisibleGround
    monkey.collide(invisibleGround);
}

//creating the function banana
function bananas(){
  if (frameCount%80 === 0){
    
    //creating the banana
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
}

//creating the function obstcales
function obstacles(){
  if (frameCount%200 === 0){
    
    //creating the obsctacle
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}