potvrzeni = false
var Button = document.querySelector('input[name=Nezobrazovat]')
var cookies =document.cookie.split(';').map(cookie => cookie.split('=')).reduce((L, [key, value]) => ({...L, [key.trim()]: decodeURIComponent(value)}), {})
var CookiesTutorial = cookies.Tutorial
if (CookiesTutorial == 'none'){
  MoreButtonNaMoreOffnutiMoreTohoJakseTojmenujeTootvljatozapomnelDis()
}
Button.addEventListener('change', function(){
  if(this.checked){
    potvrzeni = true
    cookies = document.cookie = `Tutorial=none`;
  }else{
    potvrzeni = false
  }
})

function MoreButtonNaMoreOffnutiMoreTohoJakseTojmenujeTootvljatozapomnelDis(){
  button = document.getElementById("Tutorial").style.display = 'none'
  potvrzeni = true
}
Hrac = document.querySelector("canvas").getContext("2d");



Objekt = {
  height:40,
  width:40,
  skok:true,
  x:500, 
  y:0,
  RychlostY:0,
  RychlostX:0
};
PoziceHraceY = 500;
OknoHeight = 860;
OknoWidth = 1700;
Hrac.canvas.height = OknoHeight;
Hrac.canvas.width = OknoWidth;
OvladaniMore= {
  up:false,
  right:false,
  left:false,
  Klavesa:function(event) {

    var Klavesnice = (event.type == "keydown")?true:false;
    if (potvrzeni == true){
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


  }

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
  // !!-------default-------!!
  // Objekt.RychlostY *= 1.05;
  // Objekt.RychlostX *= 0.975; 
  // Objekt.RychlostY += 1.6; 
  // Nastavení (rychlost-X, rychlost-Y, gravitace....)

  // !!-------optimální-------!!
  Objekt.y += Objekt.RychlostY;
  Objekt.x += Objekt.RychlostX;
  Objekt.RychlostY *= 1.042;
  Objekt.RychlostX *= 0.975; //(1) rychlost objektu 
  Objekt.RychlostY += 1.7; // skok více je míně!!!!!

  // Kolize more
  if (Objekt.y > PoziceHraceY) {
    Objekt.skok = false;
    Objekt.y = PoziceHraceY;
    Objekt.RychlostY = 0;

  }
    // Kolize box P
  if (Objekt.x > OknoWidth - Objekt.width){
    Objekt.x=OknoWidth - Objekt.width
  }
    // Kolize box L (Vždy 0 || 1)
  if (Objekt.x < 1 ){
    Objekt.x= 0
  }


  Hrac.fillStyle = '#202020';

  Hrac.fillRect(0, 0, OknoWidth, OknoHeight);
  Hrac.fillStyle = '#ffc0cb';
  Hrac.beginPath();





  Hrac.rect(Objekt.x, Objekt.y, Objekt.width, Objekt.height);
  Hrac.fill();
  
  Hrac.strokeStyle = "#ffc0cb";
  
  Hrac.beginPath();

  // Blok1 --------------------------
  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = 10;
  Hrac.beginPath();
  Hrac.moveTo(0, PoziceHraceY + Objekt.height);
  Hrac.lineTo(OknoWidth, PoziceHraceY + Objekt.height);
  Hrac.stroke();

  // Hlavní Blolk!!
  PoziceBloku2Y = PoziceHraceY - 100; //(400)
  Blok2HW = 50; 
  Blok2H = 300; //width
  Blok2HLineWidth = 10;

  BlokLinePlusPos = Blok2HLineWidth + PoziceBloku2Y; //410
  BlokLinePlusPos2 = PoziceBloku2Y - Blok2HLineWidth; //390  vraceni na vychozi pozici
  BlokVychoziPozice = BlokLinePlusPos2 - Objekt.height + Blok2HLineWidth/2;//355

  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = Blok2HLineWidth;
  Hrac.beginPath();
  Hrac.moveTo(Blok2HW, PoziceBloku2Y);
  Hrac.lineTo(Blok2H, PoziceBloku2Y);
  Hrac.stroke();


  // objekt pos 400!!!!
  //355

  // Kolize plošiny 1
  if (Objekt.x < Blok2H && Objekt.x >= Blok2HW - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < PoziceBloku2Y ) {
    Objekt.skok = false;
    Objekt.y = BlokVychoziPozice //Vrázení na pozicu 0 (500)
    Objekt.RychlostY = 0;
  }
  // Kolize plošiny spodní (Názar ze spodu)
  // Hlavní část (bjekt.y < BlokLinePlusPos + 1 && Objekt.y > PoziceBloku2Y - Blok2HLineWidth) + 1 (Proti bugu)
  if (Objekt.x < Blok2H && Objekt.x >= Blok2HW - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < BlokLinePlusPos + 1 && Objekt.y > BlokLinePlusPos2 - 1) {
    Objekt.skok = true
    Objekt.y = PoziceBloku2Y  + 20
    Objekt.RychlostY = 0;
  }
  //--------------------------
  //--------------------------
  //Blok2

  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = 10;
  Hrac.beginPath();
  Hrac.moveTo(0, PoziceHraceY + Objekt.height);
  Hrac.lineTo(OknoWidth, PoziceHraceY + Objekt.height);
  Hrac.stroke();

  // Hlavní Blolk!!
  PoziceBloku2Y_2 = PoziceHraceY - 200; //(400)
  Blok2HW_2 = 400; 
  Blok2H_2 = 600; //width
  Blok2HLineWidth_2 = 10;

  BlokLinePlusPos_2 = Blok2HLineWidth_2 + PoziceBloku2Y_2; //410
  BlokLinePlusPos2_2 = PoziceBloku2Y_2 - Blok2HLineWidth_2; //390  vraceni na vychozi pozici
  BlokVychoziPozice_2 = BlokLinePlusPos2_2 - Objekt.height + Blok2HLineWidth_2/2;//355

  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = Blok2HLineWidth_2;
  Hrac.beginPath();
  Hrac.moveTo(Blok2HW_2, PoziceBloku2Y_2);
  Hrac.lineTo(Blok2H_2, PoziceBloku2Y_2);
  Hrac.stroke();
    // Kolize plošiny 2
  if (Objekt.x < Blok2H_2 && Objekt.x >= Blok2HW_2 - Objekt.width && Objekt.y > BlokLinePlusPos2_2 - Objekt.height  && Objekt.y < PoziceBloku2Y_2 ) {
    Objekt.skok = false;
    Objekt.y = BlokVychoziPozice_2 //Vrázení na pozicu 0 (500)
    Objekt.RychlostY = 0;
  }
  if (Objekt.x < Blok2H_2 && Objekt.x >= Blok2HW_2 - Objekt.width && Objekt.y > BlokLinePlusPos2_2 - Objekt.height  && Objekt.y < BlokLinePlusPos_2 + 1 && Objekt.y > BlokLinePlusPos2_2 - 1) {
    Objekt.skok = true
    Objekt.y = PoziceBloku2Y_2  + 20 //nejvíce optimální!!
    Objekt.RychlostY = 0;
  }
  //--------------------------
  //--------------------------





  window.requestAnimationFrame(an);

};
window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);
window.requestAnimationFrame(an);