
// Následuje hráče
function FollowMode(){
    if(Plechovka.x < Objekt.x - Objekt.width){
        Plechovka.RychlostX = 3
    }
    else if(Plechovka.x > Objekt.x + Objekt.width){
        Plechovka.RychlostX = -3
    }
}

StayModeRychlostX = 3
// Pohybuje se z bodu a do bodu b (Po x ose)
function StayMode(Pozice1, Pozice2){
    if(Plechovka.x > Pozice2 - Plechovka.width + 13){
        StayModeRychlostX = - 3
    }
    if(Plechovka.x < Pozice1 - 13){
        StayModeRychlostX = 3
    }
    Plechovka.RychlostX = StayModeRychlostX
}
StayModeRychlostY = 3
// Pohybuje se z bodu A do bodu B (Po y ose)
function UpToDownMode(up, down){
    if(Plechovka.y > down){
        StayModeRychlostY = -3
    }
    if(Plechovka.y < up){
        RandomRychlostUpToDownMode = Math.floor(Math.random() * 2) + 4;
        console.log(RandomRychlostUpToDownMode)
        StayModeRychlostY = RandomRychlostUpToDownMode
    }
    Plechovka.RychlostY = StayModeRychlostY
}