function MoveMode(){
    if(WorldID == 1){
        FollowMode() 
    }
    if(WorldID == 2){
        StayMode(120, 700)
    }
}

function FollowMode(){

    
    if(Plechovka.x < Objekt.x){
        Plechovka.RychlostX = 3
    }
    if(Plechovka.x > Objekt.x){
        Plechovka.RychlostX = -3
    }



}


StayModeRychlost = 3
//Vždy dopsat (a, b)
function StayMode(Pozice1, Pozice2){
    
    if(Plechovka.x > Pozice2 - Plechovka.width + 13){
        StayModeRychlost = - 3
    }
    if(Plechovka.x < Pozice1 - 13){
        StayModeRychlost = 3
    }


    Plechovka.RychlostX = StayModeRychlost
}