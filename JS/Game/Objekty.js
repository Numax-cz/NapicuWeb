
class Plosina{
    constructor(Vyska, Pozice1, Pozice2, LineWidth, Skin){
        this.Vyska = Vyska
        this.Pozice1 = Pozice1
        this.Pozice2 = Pozice2
        this.LineWidth = LineWidth
        this.Skin = Skin

    }

    
    static ZakladniDeskaVyskaY = 550
    static ZakladniDeskaLineWidth = 24
    static ZakladniDeska(){ //Nastavení Základní Grafiky Desky
        Hra.beginPath();
        Hra.strokeStyle = '#ecf0f1';
        Hra.lineWidth = Plosina.ZakladniDeskaLineWidth;
        Hra.moveTo(0, Plosina.ZakladniDeskaVyskaY);
        Hra.lineTo(okno.width_end,Plosina.ZakladniDeskaVyskaY);
        Hra.stroke();
    }
    DeskaImg(){ //Nastavení Grafiky Desky (Img)
        Hra.lineWidth = this.LineWidth;
        Hra.moveTo(this.Pozice1, this.Vyska);
        Hra.lineTo(this.Pozice2, this.Vyska);
        Hra.drawImage(this.Skin, this.Pozice1, this.Vyska - this.LineWidth/2, this.Pozice2-this.Pozice1,this.LineWidth)
    }
    DeskaColor(){ //Nastavení Grafiky Desky
        Hra.beginPath();
        Hra.strokeStyle = this.Skin
        Hra.lineWidth = this.LineWidth
        Hra.moveTo(this.Pozice1, this.Vyska)
        Hra.lineTo(this.Pozice2, this.Vyska)
        Hra.stroke()
    }
    PokrocileKolize(Hrac){ //Nastavení Kolize
        //Detekce X strany
        if(Hrac.x > (this.Pozice1 - Hrac.width - 2) && Hrac.x < (this.Pozice2 + 2)){
            if(Hrac.y > ((this.Vyska - this.LineWidth/2) + 2) && Hrac.y < ((this.Vyska + this.LineWidth/2) - 2)){   
                if(Hrac.x > (this.Pozice1 - Hrac.width - 2) && Hrac.x < (this.Pozice1 - Hrac.width + 10)){
                    Hrac.x = (this.Pozice1 - Hrac.width - 2)
                    Hrac.skok = true
                    Hrac.RychlostX = 0
                    Hrac.Rychlosty = 0
                }
                if(Hrac.x < (this.Pozice2 + 2) && Hrac.x > (this.Pozice2 - 10)){
                    Hrac.x = this.Pozice2 + 2
                    Hrac.skok = true
                    Hrac.RychlostX = 0
                    Hrac.Rychlosty = 0
                }
            }
        }
        if(Hrac.x > (this.Pozice1 - Hrac.width) && Hrac.x < this.Pozice2){
            //Horní Náraz
            if(Hrac.y > (this.Vyska - this.LineWidth/2) && Hrac.y < (this.Vyska - 1)){
                Hrac.y = (this.Vyska - this.LineWidth/2)
                Hrac.skok = false
                Hrac.RychlostY = 0 
            }
            //Dolní Náraz
            if(Hrac.y < (this.Vyska + this.LineWidth/2 + Hrac.height) && Hrac.y > (this.Vyska + 1)){
                Hrac.y = (this.Vyska + this.LineWidth/2 + Hrac.height)
                Hrac.skok = true
                Hrac.RychlostY = 0
            }
        }
    }
    Setup(Hrac){ //Pro Fast Setup
        this.DeskaColor()
        this.PokrocileKolize(Hrac)
    }   
}

class Key{
    constructor(Vyska, Pozice1){
        this.Vyska = Vyska
        this.Pozice1 = Pozice1
        this.width = 20
        this.VyskaBefore = Vyska
        this.Pozice1Before = Pozice1
    }
    static CelkemKlicu = 6
    static KeyCountRemaining = Key.CelkemKlicu
    static KeyCount = 0
    KeyReset(){
        this.Vyska = this.VyskaBefore
        this.Pozice1 = this.Pozice1Before
        this.width = 20
        Key.KeyCount = 0
    }

    static KeyCountText(){
        document.getElementById('Key').innerText = Key.KeyCount + '/' + Key.CelkemKlicu
    }
    KeyImg(){
        Hra.drawImage(KeySkin, this.Pozice1,this.Vyska - this.width/2, this.width, this.width)
    }
    KeyTake(){
        if(Player.x > (this.Pozice1 - Player.width) && this.Pozice1 !== 0 && Player.x < (this.Pozice1 + 20)){
            if(Player.y > (this.Vyska - this.width/2) && Player.y < (this.Vyska + this.width/2 + Player.height)){
                var KeyTakeSound = new Audio('https://napicu.eu/Songs/Key.mp3')
                KeyTakeSound.play()
                this.Pozice1 = 0
                this.Vyska = 10
                this.width = 0
                Key.KeyCount += 1
                Key.KeyCountRemaining -=1
            }
        }
    }

    KeySetup(){ //Pro Fast Setup
        this.KeyImg()
        this.KeyTake()
    }

}

class Door{
    constructor(Vyska, Pozice1, LevelId){
        this.Vyska = Vyska
        this.Pozice1 = Pozice1
        this.width = 50
        this.LevelId = LevelId
    }
    Open(){
        if(Player.x > (this.Pozice1 - Player.width) && Player.x < (this.Pozice1 + 200)){
            if(Player.y > (this.Vyska - this.width/2) && Player.y < (this.Vyska + this.width/2 + Player.height)){
                if(Key.CelkemKlicu == Key.KeyCount){
                    Level.ID = this.LevelId
                    Player.Reset()
                }else{
                    console.log('nemáš key')
                }
            }
        }
    }
    DoorImg(){
        Hra.drawImage(DoorSkin, this.Pozice1,this.Vyska - this.width/2, this.width, this.width)
    }
    DoorSetup(){
        this.DoorImg()
        this.Open()
    }
}

// Level_1

const Door_1 = new Door(513, 1150, 2)
const Key_1 = new Key(270, 100)
const Key_2 = new Key(370, 500)
const Key_3 = new Key(420, 700)
const Key_4 = new Key(370, 1100)
const Key_5 = new Key(210, 1180)
const Key_6 = new Key(420, 350)
const Plosina_2 = new Plosina(450, 280, 450, 20, '#2b2b2b')
const Plosina_3 = new Plosina(300, 0, 350, 20, '#2b2b2b')
const Plosina_4 = new Plosina(400, 480, 550, 20, '#2b2b2b')
const Plosina_5 = new Plosina(450, 650, 820, 20, '#2b2b2b')
const Plosina_6 = new Plosina(400, 1000, 1600, 20, '#2b2b2b')
const Plosina_8 = new Plosina(250, 600, 1600, 20, '#2b2b2b')

// Level_2




