
const Player = new Image()
const PlayerPlechac = new Image()
Player.src = './Img/jonanekxd.webp'
PlayerPlechac.src = './Img/plechac.webp'

PotvrzeniStartuHry = false
PotvrzeniMobil = false
BarvaPozadi = '#202020' //Pozadí canavasGame


var StartAudio = new Audio('./Songs/Ahoj Lidi.mp3')

Hrac = document.querySelector("canvas").getContext("2d");

Barva_Pozadi = '#202020'
Barva_Desky = "#ecf0f1"
Sirka_Desky = 10
WorldID = 1

PoziceSpawnHraceX = 800
PoziceSpawnHraceY = 0

PoziceDeskyY = 600; 
OknoStart = 860;
OknoEnd = 1700;

Kolize_RychlostY_1 = 1.042; // *
Kolize_RychlostX = 0.975; // * //(1) rychlost objektu 
Kolize_RychlostY_2 = 1.7; // + // skok více je míně!!!!!




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
  x:1000, //spawn hrace na ose x
  y:PoziceDeskyY, //spawn hrace na ose y
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

Player.onload = function Game() {
  if (PotvrzeniMobil == false){
    if (PotvrzeniStartuHry == false){
      document.querySelector('canvas').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
      document.getElementById('MenuButtonID').style.display = 'block'

      StartAudio.play()
      PotvrzeniStartuHry = true
    }
    FollowMode() 
    if(Objekt.x > Plechovka.x - Plechovka.height && Objekt.x < Plechovka.x + Plechovka.height){
      if (Objekt.y < Plechovka.y + Plechovka.height && Objekt.y > Plechovka.y - Plechovka.height){

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
    Objekt.y += Objekt.RychlostY;
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
    // Kolize boxu
    // Kolize box spodní strany
    if (Objekt.y> PoziceDeskyY - Sirka_Desky/2) {
      Objekt.skok = false;
      Objekt.y = PoziceDeskyY - Sirka_Desky/2;
      Objekt.RychlostY = 0;
    }
    // Kolize boxu
    // Kolize box spodní strany
    if (Plechovka.y> PoziceDeskyY - Sirka_Desky/2) {
      Plechovka.skok = false;
      Plechovka.y = PoziceDeskyY - Sirka_Desky/2;
      Plechovka.RychlostY = 0;
    }


      // Kolize box pravé strany
    if (Objekt.x > OknoEnd - Objekt.width){
      Objekt.x=OknoEnd - Objekt.width
    }
      // Kolize box levé strany (Vždy 0 || 1)
    if (Objekt.x < 1 ){
      Objekt.x= 0
    }
      // Kolize horní strany
    if (Objekt.y < 1){
      Objekt.y = 0;
    }

  

    Hrac.fillStyle = BarvaPozadi; //Barva pozadí (#202020)
    Hrac.fillRect(0, 0, OknoEnd, OknoStart); //Šířka a Výška pozadí
    //Hrac

  
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



function NewGameLevel(SpawnHraceNaOseX){
  Objekt = {
    height:97, //neměnit!!!!
    width:90, //neměnit!!!!
    skok:true,
    x:SpawnHraceNaOseX, //spawn hrace na ose x
    y:600, //spawn hrace na ose y
    RychlostY:0,
    RychlostX:0
  };
  an = function() {
  
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
    
  
      // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!
    Objekt.y += Objekt.RychlostY;
    Objekt.x += Objekt.RychlostX;
    Objekt.RychlostY *= Kolize_RychlostY_1;
    Objekt.RychlostX *= Kolize_RychlostX; 
    Objekt.RychlostY += Kolize_RychlostY_2; 
      // -------------HLAVNÍ KOLIZE!!!-------------
      // Kolize boxu
        // Kolize box spodní strany
    if (Objekt.y > PoziceHraceY) {
      Objekt.skok = false;
      Objekt.y = PoziceHraceY;
      Objekt.RychlostY = 0;
  
    }
        // Kolize box pravé strany
    if (Objekt.x > OknoWidth - Objekt.width){
      Objekt.x=OknoWidth - Objekt.width
    }
        // Kolize box levé strany (Vždy 0 || 1)
    if (Objekt.x < 1 ){
      Objekt.x= 0
    }
        // Kolize horní strany
    if (Objekt.y < 1){
      Objekt.y = 0;
    }
      // Kolize boxu
  
        
  
  
    Barva_Pozadi = '#202020'
    Barva_Hrace = '#ffc0cb'
    Barva_Desky = "#ecf0f1"
    Sirka_Desky = 10
    Hrac.fillStyle = '#202020'; //Barva pozadí (#202020)
    Hrac.fillRect(0, 0, OknoWidth, OknoHeight); //Šířka a Výška pozadí
    Hrac.fillStyle = '#ffc0cb'; //Barva hráce
    Hrac.rect(Objekt.x, Objekt.y, Objekt.width, Objekt.height);
    Hrac.fill();
    Hrac.strokeStyle = Barva_Desky;
    Hrac.lineWidth = Sirka_Desky;
    Hrac.beginPath();
    Hrac.moveTo(0, PoziceHraceY + Objekt.height);
    Hrac.lineTo(OknoWidth, PoziceHraceY + Objekt.height);
    Hrac.stroke();
    NewGameBlock()
    window.requestAnimationFrame(an);
  };
  
}








window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);










