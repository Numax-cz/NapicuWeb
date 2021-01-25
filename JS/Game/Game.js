
const Player = new Image()
const PlayerPlechac = new Image()
const Pozadi = new Image()
PotvrzeniStartuHry = true


PlayerPlechac.src = './Img/plechac.webp'
Pozadi.src = './Img/bg.webp'



const Platforma = new Image()
Platforma.src = './Img/Deska.webp'

const PlatformaVyherni = new Image()
PlatformaVyherni.src = './Img/DeskaVyherni.webp'


PotvrzeniMobil = false
const GodMode = false
PlechovkaKolize = true

var StartAudio = new Audio('./Songs/Ahoj Lidi.mp3')

Hrac = document.querySelector("canvas").getContext("2d");


Barva_Desky = "#ecf0f1"
Sirka_Desky = 10
WorldID = 1
PoziceDeskyY = 600; 


PoziceSpawnPlechaceX = 1000
PoziceSpawnPlechaceY = PoziceDeskyY

PoziceSpawnHraceX = 8
PoziceSpawnHraceY = 0


const OknoStart = 860;
const OknoEnd = 1700;

const Kolize_RychlostY_1 = 1.042; // *
const Kolize_RychlostX = 0.975; // * //(1) rychlost objektu 
const Kolize_RychlostY_2 = 1.7; // + // skok více je míně!!!!!




Hrac.canvas.height = OknoStart;
Hrac.canvas.width = OknoEnd;
Objekt = {
  height:97, //neměnit!!!!
  width:90, //neměnit!!!!
  skok:true,
  x:PoziceSpawnHraceX, //spawn hrace na ose x
  y:PoziceSpawnHraceY, //spawn hrace na ose y
  RychlostY:0,
  RychlostX:0
};

Plechovka = {
  height:97, //neměnit!!!!
  width:90, //neměnit!!!!
  skok:true,
  x:PoziceSpawnPlechaceX, //spawn hrace na ose x
  y:PoziceSpawnPlechaceY, //spawn hrace na ose y
  RychlostY:0,
  RychlostX:0,
};


OvladaniMore= {
  up:false,
  right:false,
  left:false,
  Klavesa:function(event) {
    var Klavesnice = (event.type == "keydown")?true:false;
    switch(event.keyCode) {
        case 65:
        OvladaniMore.left = Klavesnice;
      break;
      case 32:
        OvladaniMore.up = Klavesnice;
      break;
      case 68:
        OvladaniMore.right = Klavesnice;
      break;
    }
  }
};
Tutorial = false
Player.onload  = function Game() {
  if (PotvrzeniMobil == false){
    
    
    if (PotvrzeniStartuHry == false){
      document.querySelector('canvas').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
      document.getElementById('MenuButtonID').style.display = 'block'
      StartAudio.play()
      PotvrzeniStartuHry = true
    }
  
    MoveMode()
    
    if(GodMode == false){
      if(Objekt.x > Plechovka.x - Plechovka.height + 24 && Objekt.x < Plechovka.x + Plechovka.height - 24){
        if (Objekt.y < Plechovka.y + Plechovka.height && Objekt.y > Plechovka.y - Plechovka.height){
          GameOver()
        } 
      }
    }

  
   
  
  
    if (OvladaniMore.up && Objekt.skok == false) {
      Objekt.RychlostY -= 20;
      Objekt.skok = true;   
       
    }
    if (OvladaniMore.right) {
      Objekt.RychlostX += 0.5;
    }
  
    if (OvladaniMore.left) {
      Objekt.RychlostX -= 0.5;
  
    }
   
  
    // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!!
    Objekt.y += Objekt.RychlostY
    Objekt.x += Objekt.RychlostX;
    Objekt.RychlostY *= Kolize_RychlostY_1;
    Objekt.RychlostX *= Kolize_RychlostX; 
    Objekt.RychlostY += Kolize_RychlostY_2; 


    Plechovka.y += Plechovka.RychlostY;
    Plechovka.x += Plechovka.RychlostX;
    Plechovka.RychlostY *= Kolize_RychlostY_1;
    Plechovka.RychlostX *= Kolize_RychlostX; 
    Plechovka.RychlostY += Kolize_RychlostY_2; 
  
    // -------------HLAVNÍ KOLIZE!!!-------------
    ZakladniKolize()


  
    Hrac.drawImage(Pozadi, 0, 0, OknoEnd, OknoStart)

    // Hrac.fillRect(0, 0, OknoEnd, OknoStart); //Šířka a Výška pozadí
    // //Hrac

  
    Hrac.strokeStyle = Barva_Desky;
    Hrac.lineWidth = Sirka_Desky;
    Hrac.beginPath();

    Hrac.moveTo(0, PoziceDeskyY);
    Hrac.lineTo(OknoEnd, PoziceDeskyY);
    Hrac.stroke();
    //Hrac
    Hrac.rect(Objekt.x, Objekt.y, Objekt.width, Objekt.height);
    Hrac.drawImage(Player, Objekt.x,Objekt.y - Objekt.height, Objekt.width, Objekt.height)
    //Plechovka


    Hrac.rect(Plechovka.x, Plechovka.y, Plechovka.width, Plechovka.height);

    Hrac.drawImage(PlayerPlechac, Plechovka.x,Plechovka.y - Plechovka.height, Plechovka.width, Plechovka.height)

    NewGameBlock()

    window.requestAnimationFrame(Game);
  }
};




function NewGameLevel(SpawnHraceNaOseX, SpawnHraceNaOseY,SpawnPlechaceNaOseX, SpawnPlechaceNaOseY){
  PoziceSpawnPlechaceX = SpawnPlechaceNaOseX
  PoziceSpawnPlechaceY = SpawnPlechaceNaOseY

  PoziceSpawnHraceX = SpawnHraceNaOseX
  PoziceSpawnHraceY = SpawnHraceNaOseY

  Objekt = {
    height:97, //neměnit!!!!
    width:90, //neměnit!!!!
    skok:true,
    x:SpawnHraceNaOseX, //spawn hrace na ose x
    y:SpawnHraceNaOseY, //spawn hrace na ose y
    RychlostY:0,
    RychlostX:0
  };
  Plechovka = {
    height:97, //neměnit!!!!
    width:90, //neměnit!!!!
    skok:true,
    x:SpawnPlechaceNaOseX, //spawn hrace na ose x
    y:SpawnPlechaceNaOseY, //spawn hrace na ose y
    RychlostY:0,
    RychlostX:0,
  };
  
}








window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);










