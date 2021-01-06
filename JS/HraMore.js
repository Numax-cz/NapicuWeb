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


PoziceHraceY = 500; 
OknoHeight = 860;
OknoWidth = 1700;
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


  // ObjektMoznostSkoku(5) (true||false) = skok true || false (Plošina gliding)
  // Vyska, Pozice1, Pozice2, SirkaLine(MAX 40), ObjektMoznostSkoku, Barva
  Plosiny(100, 50, 300, 20, true, "#ecf0f1") //"#ecf0f1"
  Plosiny(200, 400, 600, 10, true, "#ecf0f1")
  Plosiny(400, 600, 1000, 10, false, "#c0392b")
  Plosiny(250, 1450, 2000, 15, true, "#f39c12")
  function Plosiny(Vyska, Pozice1, Pozice2, SirkaLine, ObjektMoznostSkoku, Barva){
    Vyska = PoziceHraceY - Vyska; // = 400(100)

    BlokLinePlusPos = SirkaLine + Vyska; 
    BlokLinePlusPos2 = Vyska - SirkaLine; 
    BlokVychoziPozice = BlokLinePlusPos2 - Objekt.height + SirkaLine/2;
  
    Hrac.strokeStyle = Barva; //barva plosiny
    Hrac.lineWidth = SirkaLine;
    Hrac.beginPath();
    Hrac.moveTo(Pozice1, Vyska);
    Hrac.lineTo(Pozice2, Vyska);
    Hrac.stroke();
  
  
    if (Objekt.x < Pozice2 && Objekt.x >= Pozice1 - Objekt.width && Objekt.y > BlokLinePlusPos2 - Objekt.height  && Objekt.y < Vyska ) {

      Objekt.skok = false; //|| true
      Objekt.y = BlokVychoziPozice //Zpět na výchozí pozici (Pod plošinou)
      Objekt.RychlostY = 0;  
      
    }
    // Kolize plošiny spodní (Názar ze spodu)
    // Spodí náraz plošiny (1, lepší přesnost přichycení )
    if (ObjektMoznostSkoku == false && Objekt.x <= Pozice2 && Objekt.x >= Pozice1 - Objekt.width && Objekt.y < Vyska + SirkaLine + 1 && Objekt.y > Vyska - SirkaLine - 1){
      Objekt.skok = ObjektMoznostSkoku //|| false
      Objekt.y = Vyska + SirkaLine*2 //Zpět na výchozí pozici (Pod plošinou) (Vyska + SirkaLine*2)
      Objekt.RychlostY = 0;
    }
    // Spodí náraz plošiny (2, horší přesnost přichycení => Kvalita nárazu) 
    // Když se buguje > "&& Objekt.y < Vyska + SirkaLine/2 + 1  && Objekt.y > Vyska - SirkaLine - 1"
    if (Objekt.x <= Pozice2 && Objekt.x >= Pozice1 - Objekt.width && Objekt.y < Vyska + SirkaLine/2  && Objekt.y > Vyska - SirkaLine ) {
      Objekt.skok = true //|| false
      Objekt.y = Vyska + SirkaLine //Zpět na výchozí pozici (Pod plošinou) (Vyska + SirkaLine*2)
      Objekt.RychlostY = 0;
    }


    


    



  }
  





  window.requestAnimationFrame(an);

};


















window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);
window.requestAnimationFrame(an);











