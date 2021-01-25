function NewGameBlock(){
  if (WorldID == 1){
    Plosiny(120, 120, 400, 30,'none') 
    Plosiny(220, 600, 800, 30,'none') 
    Plosiny(300, 1000, 1200, 30,'none')
    Plosiny(400, 1400, 1600, 30,'level_2')
  }
  if (WorldID == 2){
    Plosiny(120, 120, 450, 30,'none') 
    Plosiny(230, 600, 900, 30,'none')
    Plosiny(330, 1000, 1200, 30,'none')
    Plosiny(400, 1400, 1600, 30, 'level_3')
  }
  if(WorldID == 3){
    Plosiny(150, 320, 550, 30,'none') 
    Plosiny(250, 50, 200, 30,'none')
    Plosiny(380, 405, 650, 30,'none') 
    Plosiny(330, 1000, 1200, 30,'none')
    Plosiny(400, 1400, 1600, 30,'level_4')
  }
}
function MoveMode(){
  if(WorldID == 1){
    FollowMode()
  }
  if(WorldID == 2){
    StayMode(120, 450)
  }
  if(WorldID == 3){
    PlechovkaIgnoreKolize()
    UpToDownMode(50, 340)
  }
}


function PlechovkaIgnoreKolize(){
  PlechovkaKolize = false
}

function LevelMode(GameName){
  if (GameName == 'level_2'){
    WorldID = 2
    NewGameLevel(1000, 600, 250, 0) //PoziceHrace(x y) PozicePlechace(x y)    
  }
  if (GameName == 'level_3'){
    WorldID = 3
    NewGameLevel(1000, 600, 90, 0) //PoziceHrace(x y) PozicePlechace(x y)    
  }

}