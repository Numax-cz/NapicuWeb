function Plosiny(Vyska, Pozice1, Pozice2, LineWidth,  GameName){

  
  
  PoziceBloku = PoziceDeskyY - Vyska //600 - 100 = 500
  
 
  Hrac.lineWidth = LineWidth;
  Hrac.beginPath();
  Hrac.moveTo(Pozice1, PoziceBloku);
  Hrac.lineTo(Pozice2, PoziceBloku);
  if(GameName !== 'none'){
    Barva = PlatformaVyherni
  }else{
    Barva = Platforma
  }
  Hrac.drawImage(Barva, Pozice1, PoziceBloku - LineWidth/2, Pozice2-Pozice1,LineWidth)

  //Boční náraz
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
      if(GameName !== "none"){
        LevelMode(GameName)
      }
      
    }
  }

  //Horní náraz plechovka
  if(Plechovka.x > Pozice1 - Plechovka.width/2 - 10 && Plechovka.x < Pozice2 - Plechovka.width/2 + 10 && PlechovkaKolize == true){
    //Y strana
    if(Plechovka.y > PoziceBloku - 10 - LineWidth/2 && Plechovka.y < PoziceBloku + LineWidth/2 + 20 ){
      Plechovka.skok = false;
      Plechovka.y = PoziceBloku - LineWidth/2 //AntiBug
      Plechovka.RychlostY = 0;
    
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
function ZakladniKolize(){
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
    if (Objekt.y < (1 + Objekt.height)){
      Objekt.y = 0 + Objekt.height;
      Objekt.skok = true;
    }
}