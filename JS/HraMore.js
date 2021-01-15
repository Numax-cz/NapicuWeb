
const Player = new Image()
Player.src = './Img/jonanekxd.webp'
PotvrzeniStartuHry = false
PotvrzeniMobil = false
BarvaPozadi = '#202020' //Pozadí canavasGame


var StartAudio = new Audio('./Songs/Ahoj Lidi.mp3')
//NastaveniMenu
document.getElementById('Nastaveni-Zvuky').style.display = 'none'

document.getElementById('mobile').style.display = 'none'
document.getElementById('MenuButtonID').style.display = 'none'
document.getElementById('Nastaveni').style.display = 'none'


if(navigator.userAgent.toLowerCase().match(/mobile/i)) { 
 document.getElementById('MenuButtonID').style.display = 'none'
 document.getElementById('mobile').style.display = 'table'
 document.getElementById('loading').style.display = 'none'
 document.querySelector('canvas').style.display = 'none'
 PotvrzeniMobil = true
}
function Nastaveni(){
  document.getElementById('Nastaveni').style.display = 'table'
  document.getElementById('mobile').style.display = 'none'
  document.getElementById('loading').style.display = 'none'
  document.querySelector('canvas').style.display = 'none'
  document.getElementById('MenuButtonID').style.display = 'none'
}
function NastaveniExit(){
  document.getElementById('Nastaveni').style.display = 'none'
  document.getElementById('mobile').style.display = 'none'
  document.getElementById('loading').style.display = 'none'
  document.querySelector('canvas').style.display = 'block'
  document.getElementById('MenuButtonID').style.display = 'block'
}
function NastaveniZvuky(){
  document.getElementById('informace').style.display = 'none'
  document.getElementById('Nastaveni-Zvuky').style.display = 'inline'
}
function NastaveniInformace(){
  document.getElementById('Nastaveni-Zvuky').style.display = 'none'
  document.getElementById('informace').style.display = 'block'

}



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


function Plosiny(Vyska, Pozice1, Pozice2, LineWidth, Barva, GameName){

  // PoziceDeskyY + Sirka_Desky*3 ( Pozice "0" tesně nad deskou)
  // PoziceDeskyY + Sirka_Desky*4 (Přímo v bloku když sirka_desky = 10...... 10*4 = 40 - v bloku)
  // PoziceBloku2Y = PoziceDeskyY + Sirka_Desky*3; (Pozice "0" - střed objektu sirka_desky)

  PoziceBloku = PoziceDeskyY - Vyska //600 - 100 = 500
  Hrac.strokeStyle = Barva;
  Hrac.lineWidth = LineWidth;
  Hrac.beginPath();
  Hrac.moveTo(Pozice1, PoziceBloku);
  Hrac.lineTo(Pozice2, PoziceBloku);
  Hrac.stroke();



  //X strana
  if(Objekt.x > Pozice1 - 5 - Objekt.width  && Objekt.x < Pozice2 + 5){
    //Y strana
    if(Objekt.y > PoziceBloku + 7  && Objekt.y < PoziceBloku + LineWidth/2 + Objekt.height - 7){
      //Levá strana
      if (Objekt.x > Pozice1 - Objekt.width - 7 && Objekt.x < (Pozice2 + Pozice1 )/2 - 100 - Objekt.width/2){
        Objekt.skok = true;
        Objekt.RychlostX = 0
        Objekt.x = Pozice1  - Objekt.width - 5//AntiBug
      }
      //Pravá strana
      if (Objekt.x < Pozice2 + 7 && Objekt.x > (Pozice2 + Pozice1)/2 + 100 ){
        Objekt.skok = true;
        Objekt.RychlostX = 0


        Objekt.x = Pozice2 + 5
      } 
    }
  }
  // Horní náraz
  if(Objekt.x > Pozice1 - Objekt.width/2 - 10 && Objekt.x < Pozice2 - Objekt.width/2 + 10){
    //Y strana
    if(Objekt.y > PoziceBloku - 10 - LineWidth/2 && Objekt.y < PoziceBloku + LineWidth/2 + 20 ){
      Objekt.skok = false;
      Objekt.y = PoziceBloku - LineWidth/2 //AntiBug
      Objekt.RychlostY = 0;

      if (GameName == 'level_2'){
        WorldID = 2
        NewGameLevel(600)        
      }

    }
  }
  // Dolní náraz
  // X strana
  if(Objekt.x > Pozice1 - 1 - Objekt.width/2 - 15 && Objekt.x < Pozice2 - 1 -Objekt.width/2 + 15){
    //Y strana
    if(Objekt.y > PoziceBloku - 1  && Objekt.y < PoziceBloku + LineWidth/2 + Objekt.height + 3){
      Objekt.skok = true;
      Objekt.y = PoziceBloku + LineWidth/2 + Objekt.height + 3 //AntiBug
      Objekt.RychlostY = 0;
    }
  }
}



function NewGameBlock(){
  if (WorldID == 1){
    Plosiny(120, 120, 400, 10, '#ecf0f1', 'none') 
    Plosiny(220, 600, 800, 10, '#ecf0f1', 'none') 
    Plosiny(300, 1000, 1200, 10, '#ecf0f1', 'none')
    Plosiny(400, 1400, 1600, 10, '#f1c40f', 'level_2')
  }
  // if (WorldID == 2){

  // }

}









Player.onload = function Game() {
  if (PotvrzeniMobil == false){
    if (PotvrzeniStartuHry == false){
      document.querySelector('canvas').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
      document.getElementById('MenuButtonID').style.display = 'block'

      StartAudio.play()
      PotvrzeniStartuHry = true
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
  
    // -------------HLAVNÍ KOLIZE!!!-------------
    // Kolize boxu
    // Kolize box spodní strany
    if (Objekt.y > PoziceDeskyY - Sirka_Desky/2) {
      Objekt.skok = false;
      Objekt.y = PoziceDeskyY - Sirka_Desky/2;
      Objekt.RychlostY = 0;
      
  
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
 
  
    Hrac.rect(Objekt.x, Objekt.y, Objekt.width, Objekt.height);
    Hrac.drawImage(Player, Objekt.x,Objekt.y - Objekt.height, Objekt.width, Objekt.height)
   
    Hrac.strokeStyle = Barva_Desky;
    Hrac.lineWidth = Sirka_Desky;
    Hrac.beginPath();
    Hrac.moveTo(0, PoziceDeskyY);
    Hrac.lineTo(OknoEnd, PoziceDeskyY);
    Hrac.stroke();

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










