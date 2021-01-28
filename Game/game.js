Hra = document.querySelector('canvas').getContext('2d')

const okno = {
    width_start: 600, //Začátek Okna
    width_end: 1240 //Konec Okna
}
const Pozadi = new Image()
Pozadi.src = '../Img/bg.webp'
const PlayerSkin = new Image()
PlayerSkin.src = '../Img/jonanekxd.webp'
const KeySkin = new Image()
KeySkin.src = 'key.png'
const DoorSkin = new Image()
DoorSkin.src = 'vrata.png'





Hra.canvas.height = okno.width_start;
Hra.canvas.width = okno.width_end;


// static Kolize_RychlostY_1 = 1.042; // *
// static Kolize_RychlostX = 0.975; // * //(1) rychlost objektu 
// static Kolize_RychlostY_2 = 1.7; // + // skok více je míně!!!!!






class HraFc{
    constructor(height, width, x, y, RychlostX, RychlostY, skok){
        this.height = height
        this.width = width
        this.x = x 
        this.y = y
        this.RychlostX = RychlostX
        this.RychlostY = RychlostY
        this.skok = skok
        this.BeforeX = x
        this.BeforeY = y
    }
    Reset(){
        this.x = this.BeforeX
        this.y = this.BeforeY
        this.RychlostX = 0
        this.RychlostY = 0
    }
    static Kolize_RychlostY_1 = 0.9299; 
    static Kolize_RychlostX = 0.925; // * //(1) rychlost objektu 
    static Kolize_RychlostY_2 = 0.584; 

    ZakladniOvladani(){
        if(OvladaniMore.up && this.skok == false){
            this.RychlostY -= 20
            this.skok = true
        }
        else if(OvladaniMore.right){
            this.RychlostX += 0.5
        }
        else if(OvladaniMore.left){
            this.RychlostX -= 0.5
        }   
    }
    Skin(){
        Hra.rect(this.x, this.y, this.width, this.height)
        Hra.drawImage(PlayerSkin, this.x, this.y - this.height, this.width, this.height)
    }


}

class Kolize{
    static ZakladniKolize(Player){
        if(Player.y > (Plosina.ZakladniDeskaVyskaY - Plosina.ZakladniDeskaLineWidth/2)){
            Player.y = (Plosina.ZakladniDeskaVyskaY - Plosina.ZakladniDeskaLineWidth/2)
            Player.skok = false
            Player.RychlostY = 0   
        }
        if(Player.x < 0){
            Player.x = 0
        }
        if(Player.x > okno.width_end - Player.width){
            Player.x = okno.width_end - Player.width
        }
    }
    static ZakladniRychlost(Player){
        Player.y += Player.RychlostY
        Player.x += Player.RychlostX 
        Player.RychlostY *= HraFc.Kolize_RychlostY_1
        Player.RychlostX *= HraFc.Kolize_RychlostX
        Player.RychlostY += HraFc.Kolize_RychlostY_2
    }
    static Setup(Player){
        this.ZakladniRychlost(Player)
        this.ZakladniKolize(Player)
    }
}



class Nepritel{
    constructor(height, width, x, y, RychlostX, RychlostY, skok){
        this.height = height
        this.width = width
        this.x = x 
        this.y = y
        this.RychlostX = RychlostX
        this.RychlostY = RychlostY
        this.skok = skok
    }


    Attack(){
        if((Player.x + Player.width) > this.x && Player.x < (this.x + this.width)){
            if(Player.y > (this.y - this.height) && Player.y < (this.y + this.height)){
                // f
            }            
        }
    }
    Skin(){
        Hra.rect(this.x, this.y, this.width, this.height)
        Hra.drawImage(PlayerSkin, this.x, this.y - this.height, this.width, this.height)
    }
    Setup(){
        this.Attack()
        this.Skin()
    }
}


OvladaniMore= {
    up:false,
    right:false,
    left:false,
    Klavesa:function(event) {
      var Klavesnice = (event.type == "keydown")?true:false;
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
};



const Player = new HraFc(40,40,0,500,0,0,true)
const Nepritel_1 = new Nepritel(40,40,1000,500,0,0,true)







function GameMode(){
    Player.ZakladniOvladani()

    Hra.drawImage(Pozadi,0,0,okno.width_end,okno.width_start) //Pozadí
    Hra.beginPath(); // Zruší cetsu hráče(ghosting)

    Plosina.ZakladniDeska() // Spodní deska
    Key.KeyCountText() //Key Count (x/6)
    World() // Tvorba základního levelu

    Kolize.Setup(Player)
    Kolize.Setup(Nepritel_1)

    Nepritel_1.Setup()
    Player.Skin() // Nastavit hráči skin

    window.requestAnimationFrame(GameMode);
}
window.requestAnimationFrame(GameMode);



window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);






//Hrac

