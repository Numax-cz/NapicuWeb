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
          NewGameLevel(1000, 0, 250, 0, 2)        
        }
      }
    }
    //Horní náraz plechovka
    if(Plechovka.x > Pozice1 - Plechovka.width/2 - 10 && Plechovka.x < Pozice2 - Plechovka.width/2 + 10){
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
