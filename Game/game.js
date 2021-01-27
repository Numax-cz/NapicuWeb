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
    }
    static Kolize_RychlostY_1 = 0.9299; 
    static Kolize_RychlostX = 0.925; // * //(1) rychlost objektu 
    static Kolize_RychlostY_2 = 0.584; 
    ZakladniRychlost(){
        this.y += this.RychlostY
        this.x += this.RychlostX
        this.RychlostY *= HraFc.Kolize_RychlostY_1
        this.RychlostX *= HraFc.Kolize_RychlostX
        this.RychlostY += HraFc.Kolize_RychlostY_2
    }
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
    ZakladniKolize(){
        if(this.y > (Plosina.ZakladniDeskaVyskaY - Plosina.ZakladniDeskaLineWidth/2)){
            this.y = (Plosina.ZakladniDeskaVyskaY - Plosina.ZakladniDeskaLineWidth/2)
            this.skok = false
            this.RychlostY = 0   
        }
        if(this.x < 0){
            this.x = 0
        }
        if(this.x > okno.width_end - this.width){
            this.x = okno.width_end - this.width
        }
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



const Player = new HraFc(40,40,0,591,0,0,true)






function GameMode(){
    Player.ZakladniRychlost() //Ovládání - rychlost
    Player.ZakladniOvladani() //Ovládání 
    Player.ZakladniKolize()


    Hra.drawImage(Pozadi,0,0,okno.width_end,okno.width_start) //Pozadí
    Hra.beginPath(); // Zruší cetsu hráče(ghosting)

    Plosina.ZakladniDeska() // Spodní deska
    
    
    Key.KeyCountText()
    Level.BaseLevel()

    Hra.rect(Player.x, Player.y, Player.width, Player.height);
    Hra.drawImage(PlayerSkin, Player.x, Player.y - Player.height, Player.width, Player.height)


    window.requestAnimationFrame(GameMode);
}
window.requestAnimationFrame(GameMode);



window.addEventListener("keydown", OvladaniMore.Klavesa)
window.addEventListener("keyup", OvladaniMore.Klavesa);






//Hrac

