  //--------------------------
  //--------------------------

  
  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = 10;
  Hrac.beginPath();
  Hrac.moveTo(0, PoziceHraceY + Objekt.height);
  Hrac.lineTo(OknoWidth, PoziceHraceY + Objekt.height);
  Hrac.stroke();

  // Hlavní Blolk!!
  PoziceBloku2Y_3 = PoziceHraceY - 200; //(400)
  Blok2HW_3 = 400; 
  Blok2H_3 = 600; //width
  Blok2HLineWidth_3 = 10;

  BlokLinePlusPos_3 = Blok2HLineWidth_3 + PoziceBloku2Y_3; //410
  BlokLinePlusPos2_3 = PoziceBloku2Y_3 - Blok2HLineWidth_3; //390  vraceni na vychozi pozici
  BlokVychoziPozice_3 = BlokLinePlusPos2_3 - Objekt.height + Blok2HLineWidth_3/2;//355

  Hrac.strokeStyle = "#ecf0f1";
  Hrac.lineWidth = Blok2HLineWidth_3;
  Hrac.beginPath();
  Hrac.moveTo(Blok2HW_3, PoziceBloku2Y_3);
  Hrac.lineTo(Blok2H_3, PoziceBloku2Y_3);
  Hrac.stroke();
    // Kolize plošiny 2
  if (Objekt.x < Blok2H_3 && Objekt.x >= Blok2HW_3 - Objekt.width && Objekt.y > BlokLinePlusPos2_3 - Objekt.height  && Objekt.y < PoziceBloku2Y_3 ) {
    Objekt.skok = false;
    Objekt.y = BlokVychoziPozice_3 //Vrázení na pozicu 0 (500)
    Objekt.RychlostY = 0;
  }
  if (Objekt.x < Blok2H_3 && Objekt.x >= Blok2HW_3 - Objekt.width && Objekt.y > BlokLinePlusPos2_3 - Objekt.height  && Objekt.y < BlokLinePlusPos_3 + 1 && Objekt.y > BlokLinePlusPos2_3 - 1) {
    Objekt.skok = true
    Objekt.y = PoziceBloku2Y_3  + 20 //nejvíce optimální!!
    Objekt.RychlostY = 0;
  }
  //--------------------------
  //--------------------------