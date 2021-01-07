potvrzeni = false




var Button = document.querySelector('input[name=Nezobrazovat]')
var cookies =document.cookie.split(';').map(cookie => cookie.split('=')).reduce((L, [key, value]) => ({...L, [key.trim()]: decodeURIComponent(value)}), {})
var CookiesTutorial = cookies.Tutorial
if (CookiesTutorial == 'none'){
  MoreButtonNaMoreOffnutiMoreTohoJakseTojmenujeTootvljatozapomnelDis()
  MoreButtonNaMoreOffnutiMoreTohoJakseTojmenujeTootvljatozapomnelDis2()
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
}
function MoreButtonNaMoreOffnutiMoreTohoJakseTojmenujeTootvljatozapomnelDis2(){
  button = document.getElementById("Tutorial2").style.display = 'none'
  potvrzeni = true;
}






Hrac = document.querySelector("canvas").getContext("2d");

LevelAcces = null;
PoziceHraceY = 500; 
OknoHeight = 860;
OknoWidth = 1700;
Kolize_RychlostY_1 = 1.042; // *
Kolize_RychlostX = 0.975; // * //(1) rychlost objektu 
Kolize_RychlostY_2 = 1.7; // + // skok více je míně!!!!!



Hrac.canvas.height = OknoHeight;
Hrac.canvas.width = OknoWidth;
Objekt = {
  height:40,
  width:40,
  skok:true,
  x:500, //spawn hrace na ose x
  y:PoziceHraceY, //spawn hrace na ose y
  RychlostY:0,
  RychlostX:0
};

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



function Plosiny(Vyska, Pozice1, Pozice2, SirkaLine, ObjektMoznostSkoku, Barva, LevelName, debugging){

  PoziceBloku2Y = PoziceHraceY - Vyska; 
  Blok2HW = Pozice1; 
  Blok2H = Pozice2; //width
  Blok2HLineWidth = SirkaLine;

  BlokLinePlusPos = Blok2HLineWidth + PoziceBloku2Y; 
  BlokLinePlusPos2 = PoziceBloku2Y - Blok2HLineWidth; 
  BlokVychoziPozice = BlokLinePlusPos2 - Objekt.height + Blok2HLineWidth/2;

  Hrac.strokeStyle = Barva; //barva plosiny
  Hrac.lineWidth = Blok2HLineWidth;
  Hrac.beginPath();
  Hrac.moveTo(Blok2HW, PoziceBloku2Y);
  Hrac.lineTo(Blok2H, PoziceBloku2Y);
  Hrac.stroke();


 
  if (Objekt.x < Blok2H && Objekt.x >= Blok2HW - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < PoziceBloku2Y ) {
    Objekt.skok = false;
    Objekt.y = BlokVychoziPozice 
    Objekt.RychlostY = 0;


    if (LevelName == "Game2"){
      LevelAcces = "Level1Com"
      Level2()
    }
    if (LevelName == "Game3"){
      LevelAcces = "Level2Com"
      Level3()
    } 
    if (LevelName == "Game4"){
      LevelAcces = "Level3Com"
      Level4()
    } 
    
  }
  if (debugging == true && Objekt.x < Blok2H && Objekt.x >= Blok2HW - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < BlokLinePlusPos + 10 && Objekt.y > BlokLinePlusPos2 - 10 ){
    Objekt.skok = ObjektMoznostSkoku //|| false
    Objekt.y = PoziceBloku2Y  + 20;
    Objekt.RychlostY = 0; 
  }
  
  // Kolize plošiny spodní (Názar ze spodu)
  // Hlavní část (bjekt.y < BlokLinePlusPos + 1 && Objekt.y > PoziceBloku2Y - Blok2HLineWidth) + 1 (Proti bugu)
  if (debugging == false && Objekt.x < Blok2H && Objekt.x >= Blok2HW - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < BlokLinePlusPos + 1 && Objekt.y > BlokLinePlusPos2 - 1) {
    Objekt.skok = ObjektMoznostSkoku //|| false
    
    Objekt.y = PoziceBloku2Y  + 20;
    Objekt.RychlostY = 0; 
  }
}

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
 

  // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!!
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


  // ObjektMoznostSkoku(5) (true||false) = skok true || false (Plošina gliding)
  // Vyska, Pozice1, Pozice2, SirkaLine(MAX 40), ObjektMoznostSkoku, Barva, level, debugging(True když blok prochází!!!)
  //(Kolize SirkaLine max 40-50")
  //Neoptimalizováno 
  Plosiny(100, 50, 300, 10, true, "#ecf0f1", "none", false) //"#ecf0f1"
  Plosiny(200, 400, 600, 10, true, "#ecf0f1", "none", false) 
  Plosiny(400, 600, 1000, 10, false, "#c0392b", "none", false) 
  Plosiny(250, 1450, 2000, 15, true, "#f39c12", "Game2", false)

  window.requestAnimationFrame(an);
};


/////////////////////////
/////////////////////////
/////////////////////////
// -------Game2------- //
/////////////////////////
/////////////////////////
/////////////////////////


function Level2(){
  if (LevelAcces == "Level1Com"){
    PoziceHraceY = 500; 

    Hrac.canvas.height = OknoHeight;
    Hrac.canvas.width = OknoWidth;
    Objekt = {
      height:40,
      width:40,
      skok:true,
      x:800, //spawn hrace na ose x
      y:PoziceHraceY, //spawn hrace na ose y
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
    
  
      // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!!
      Objekt.y += Objekt.RychlostY;
      Objekt.x += Objekt.RychlostX;
      Objekt.RychlostY *= 1.042;
      Objekt.RychlostX *= 0.975; //(1) rychlost objektu 
      Objekt.RychlostY += 1.7; // skok více je míně!!!!!
  
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
  
      Plosiny(100, 400, 800, 10, true, "#ecf0f1", "none", false) 
      Plosiny(200, 400, 600, 10, true, "#ecf0f1", "none", true) 
      Plosiny(300, 600, 1000, 10, true, "ecf0f1", "none", false) 
      Plosiny(250, 1450, 2000, 15, true, "#f39c12", "Game3", false)
      window.requestAnimationFrame(an);
    };
  }
}


/////////////////////////
/////////////////////////
/////////////////////////
// -------Game3------- //
/////////////////////////
/////////////////////////
/////////////////////////


function Level3(){
  if (LevelAcces == "Level2Com"){
    PoziceHraceY = 500; 

    Hrac.canvas.height = OknoHeight;
    Hrac.canvas.width = OknoWidth;
    Objekt = {
      height:40,
      width:40,
      skok:true,
      x:800, //spawn hrace na ose x
      y:PoziceHraceY, //spawn hrace na ose y
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
    

      // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!!
      Objekt.y += Objekt.RychlostY;
      Objekt.x += Objekt.RychlostX;
      Objekt.RychlostY *= 1.042;
      Objekt.RychlostX *= 0.975; //(1) rychlost objektu 
      Objekt.RychlostY += 1.7; // skok více je míně!!!!!

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

      Plosiny(100, 400, 800, 10, true, "#ecf0f1", "none", false) 
      Plosiny(200, 200, 300, 10, true, "#ecf0f1", "none", true)
      Plosiny(300, 400, 500, 10, true, "#ecf0f1", "none", true)
      Plosiny(300, 500, 900, 10, true, "ecf0f1", "none", false) 
      Plosiny(450, 400, 1400, 10, false, "#c0392b", "none", true) 
      Plosiny(250, 1450, 2000, 15, true, "#f39c12", "Game4", false)
      window.requestAnimationFrame(an);
    };
  

  }
}


/////////////////////////
/////////////////////////
/////////////////////////
// -------Game4------- //
/////////////////////////
/////////////////////////
/////////////////////////


function Level4(){
  if (LevelAcces == "Level3Com"){
    PoziceHraceY = 500; 

    Hrac.canvas.height = OknoHeight;
    Hrac.canvas.width = OknoWidth;
    Objekt = {
      height:40,
      width:40,
      skok:true,
      x:1000, //spawn hrace na ose x
      y:PoziceHraceY, //spawn hrace na ose y
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
    

      // !!-------optimální(Někdy opravit problém - propad přes plošinu)-------!!
      Objekt.y += Objekt.RychlostY;
      Objekt.x += Objekt.RychlostX;
      Objekt.RychlostY *= 1.042;
      Objekt.RychlostX *= 0.975; //(1) rychlost objektu 
      Objekt.RychlostY += 1.7; // skok více je míně!!!!!

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

      Plosiny(50, 400, 800, 10, true, "#ecf0f1", "none", true) 
      Plosiny(100, 100, 300, 10, true, "#ecf0f1", "none", false)
      Plosiny(250, 400, 500, 10, true, "#ecf0f1", "none", false)
      Plosiny(300, 600, 800, 10, true, "#ecf0f1", "none", true)
      Plosiny(350, 900, 1300, 10, true, "ecf0f1", "none", false)
      Plosiny(300, 1450, 2000, 15, true, "#f39c12", "Game5", false)
      window.requestAnimationFrame(an);
    };
  

  }
}
























window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);
window.requestAnimationFrame(an);










