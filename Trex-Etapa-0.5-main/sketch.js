var INICIO = 1;
var FIM = 0;
var estadojogo = INICIO;

var trex;
var trexcorre;
var chao;
var chaoinvisivel;
var nuvemimg;
var pontuacao;
var trex2;
var res
var go
var restart
var gameo


function preload()
{
  trexcorre =loadAnimation("trex1.png","trex3.png","trex4.png");
  trex2 = loadAnimation("trex.collided.png");
  imgchao = loadImage("ground2.png");
  nuvemimg = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  res = loadImage("restart.png");
  go = loadImage("gameOver.png");

}


function setup()
{
createCanvas(1200,200);

trex = createSprite(100,130,20,20);
trex.addAnimation("tcorre",trexcorre);
trex.addAnimation("t2",trex2);
trex.scale=0.5;

chao = createSprite(600,150,20,20);
chao.addImage(imgchao);
chao.x = chao.width/2;

chaoinvisivel=createSprite(100,160,30,10);
chaoinvisivel.visible = false;

restart = createSprite(600,100,10,10);
restart.addImage(res);

gameo = createSprite(600,120,10,10);
gameo.addImage(go);

gpobs = new Group();
gpnuvens = new Group();

trex.setCollider("circle",0,0,55);
trex.debug = true;

pontuacao = 0;
}

function draw()
{
  background(200);

  text("pontuação: " +pontuacao,1000,20);
 

  //console.error("erro");
  //console.warn("aviso");
  //console.info("informacao");

if(estadojogo === INICIO){
  pontuacao = pontuacao +Math.round(getFrameRate() /60);

  chao.velocityX=-10;

  if(chao.x<0)
  {
    chao.x=chao.width/2;
  }
  if(keyDown(UP_ARROW) && trex.y>=130)
  {
    trex.velocityY=-10;
  }

  //gravidade
  trex.velocityY=trex.velocityY+0.7;

  criarnuvens();

  criarobstaculos();
 
 if(gpobs.isTouching(trex)){
   estadojogo = FIM;
 }


}

else if(estadojogo === FIM){
 chao.velocityX = 0;

trex.changeAnimation("t2",trex2);

 gpobs.setVelocityXEach(0);
 gpnuvens.setVelocityXEach(0);

 gpobs.setLifetimeEach(-8);
 gpnuvens.setLifetimeEach(-8);
}

 trex.collide(chaoinvisivel);


  drawSprites();
  
}

function criarnuvens()
{
  if (frameCount %60===0)
  {
  var nuvem=createSprite(1100,50,10,10);
  nuvem.velocityX = -3;
  nuvem.addImage(nuvemimg);
  nuvem.y=Math.round(random(10,130));
  nuvem.depth=trex.depth;
  trex.depth=trex.depth+1;
  nuvem.lifetime=400;
  gpnuvens.add(nuvem);
}

}

function criarobstaculos(){
  if(frameCount %60===0)
  {
  var obstaculo = createSprite(1100,125,10,10);
  obstaculo.velocityX = -10;

  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstaculo.addImage(obstaculo1);
    break;
    case 2: obstaculo.addImage(obstaculo2);
    break;
    case 3: obstaculo.addImage(obstaculo3);
    break;
    case 4: obstaculo.addImage(obstaculo4);
    break;
    case 5: obstaculo.addImage(obstaculo5);
    break;
    case 6: obstaculo.addImage(obstaculo6);
    break;
    default: break;
  }
  obstaculo.scale = 0.7;
  obstaculo.lifetime = 120;
  gpobs.add(obstaculo);
  }
}
