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


    Plosiny(400, 1400, 1600, 30, '#f1c40f', 'level_3')

  }
}
function MoveMode(){
  if(WorldID == 1){
    FollowMode() 
  }
  if(WorldID == 2){
    StayMode(120, 450)
  }
}




