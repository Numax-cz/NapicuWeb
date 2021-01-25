
class Plosina{
    constructor(Vyska, Pozice1, Pozice2, LineWidth, Skin, GameName){
        this.Vyska = Vyska
        this.Pozice1 = Pozice1
        this.Pozice2 = Pozice2
        this.LineWidth = LineWidth
        this.Skin = Skin
        this.GameName = GameName   
    }
    static ZakladniDeskaVyskaY = 550
    static ZakladniDeskaLineWidth = 24
    static ZakladniDeska(){
        Hra.beginPath();
        Hra.strokeStyle = '#ecf0f1';
        Hra.lineWidth = Plosina.ZakladniDeskaLineWidth;
        Hra.moveTo(0, Plosina.ZakladniDeskaVyskaY);
        Hra.lineTo(okno.width_end,Plosina.ZakladniDeskaVyskaY);
        Hra.stroke();
    }
    DeskaImg(){
        Hra.lineWidth = this.LineWidth;
        Hra.moveTo(this.Pozice1, this.Vyska);
        Hra.lineTo(this.Pozice2, this.Vyska);
        Hra.drawImage(this.Skin, this.Pozice1, this.Vyska - this.LineWidth/2, this.Pozice2-this.Pozice1,this.LineWidth)
    }
    DeskaColor(){
        Hra.beginPath();
        Hra.strokeStyle = this.Skin
        Hra.lineWidth = this.LineWidth
        Hra.moveTo(this.Pozice1, this.Vyska)
        Hra.lineTo(this.Pozice2, this.Vyska)
        Hra.stroke()
    }

}



const Plosina_2 = new Plosina(200, 200, 500, 20, '#2b2b2b', 'non_set' )


