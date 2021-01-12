
const Player = new Image()
Player.src = './Img/jonanekxd.webp'
PotvrzeniStartuHry = false
PotvrzeniMobil = false
BarvaPozadi = '#202020' //Pozadí canavasGame


var StartAudio = new Audio('./Songs/Ahoj Lidi.mp3')
//NastaveniMenu
document.getElementById('Nastaveni-Zvuky').style.display = 'none'

document.getElementById('mobile').style.display = 'none'
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

// Spodní deska
Barva_Pozadi = '#202020'
Barva_Desky = "#ecf0f1"
Sirka_Desky = 10

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
  x:10, //spawn hrace na ose x
  y:10, //spawn hrace na ose y
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


// LineWidth = 10 někdy opravit!!! (problém u kolizi boklu!)
function Plosiny(Vyska, Pozice1, Pozice2, LineWidth, Barva){

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

  // Boční náraz není :( bugoval se 

  // Plosina1Naraz = Pozice2 + 5 //Prava strana 
  // Plosina2Naraz = Pozice1 - 5 //Leva strana

  // if (Objekt.x < Plosina1Naraz - 5 && Objekt.x > Pozice2 - 50){
  //   if (Objekt.y > PoziceBloku - LineWidth/2  && Objekt.y < PoziceBloku + LineWidth/2 -3 ){
  //     Objekt.x = Plosina1Naraz - 5
  //     console.log('hiot')
  //     Objekt.RychlostX = 0
  //   }

  // }

    //X strana
    if(Objekt.x > Pozice1 - 7 - Objekt.width  && Objekt.x < Pozice2 + 7){
      //Y strana
      if(Objekt.y > PoziceBloku + 7  && Objekt.y < PoziceBloku + LineWidth/2 + Objekt.height - 7){
        //Levá strana
        if (Objekt.x > Pozice1 - Objekt.width - 7 && Objekt.x < (Pozice2 + Pozice1)/2 ){
          Objekt.skok = true;
          Objekt.x = Pozice1  - Objekt.width - 7//AntiBug
        }
        //Pravá strana
        if (Objekt.x < Pozice2 + 7 && Objekt.x > (Pozice2 + Pozice1)/2 ){
          Objekt.skok = true;
          Objekt.x = Pozice2 + 7
        } 
      }
    }

  if(Objekt.x > Pozice1 - Objekt.width/2 - 10 && Objekt.x < Pozice2 - Objekt.width/2 + 10){
    //Y strana
    if(Objekt.y > PoziceBloku - 10 - LineWidth/2 && Objekt.y < PoziceBloku + LineWidth/2 + 20 ){
      Objekt.skok = false;
      Objekt.y = PoziceBloku - LineWidth/2 //AntiBug
      Objekt.RychlostY = 0;
    }
  }
  // Dolní náraz
  // X strana
  if(Objekt.x > Pozice1 - 1 - Objekt.width/2 - 15 && Objekt.x < Pozice2 - 1 -Objekt.width/2 + 15){
    //Y strana
    if(Objekt.y > PoziceBloku - 1  && Objekt.y < PoziceBloku + LineWidth/2 + Objekt.height + 1){
      Objekt.skok = true;
      Objekt.y = PoziceBloku + LineWidth/2 + Objekt.height + 1 //AntiBug
      Objekt.RychlostY = 0;
      
    }
  }
}
function NewGameBlock(){
  Plosiny(140, 120, 400, 10, '#ecf0f1') 
  // Plosiny(150, 750, 805, 20, '#e84118') 

  Plosiny(150, 600, 800, 10, '#ecf0f1') 
  
}


Player.onload = function Game() {
  if (PotvrzeniMobil == false){
    if (PotvrzeniStartuHry == false){
      document.querySelector('canvas').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
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
    // Kolize boxu
  
      
  
    // Třídit!!!!!
    // Spodní deska
  
    
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










window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);










