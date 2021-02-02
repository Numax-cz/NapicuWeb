


var PocetSlov = 20
ApiSlov = `https://viem.pinktube.eu/api/slova?pocet=${PocetSlov}`
i = 0
a = 0

pocetchyb = 0
function api(){
    fetch(ApiSlov)
    .then(res => res.text())
    .then(data =>{
        slovo = JSON.parse(data)
        VetaGenerator()
    });
}
api()


function VetaGenerator(){

    Pozice = 0
    var TextPole = document.getElementById("TextPole")
    Veta = (slovo.join(" "))
    var SpanSet = Veta.split('').map((pismeno) =>{
        const PismenoSpan = document.createElement('span')
        PismenoSpan.innerHTML = pismeno
        TextPole.appendChild(PismenoSpan)
        return PismenoSpan
    })
    function Casovac(){
        Timestart = new Date()
        setInterval(function(){
            if((Pozice + 1)!== DelkaVety){
                TimeSe = Math.floor((new Date() - Timestart) / 1000)
                document.getElementById('time').innerText = TimeSe + 's'
                return TimeSe
            }
        },1000)
    }
    

   
    
    let zacatek = SpanSet[Pozice]
    zacatek.classList.add('kurzorpico')
    let DelkaVety = Veta.length

    startTime = () => Casovac()
    
    document.addEventListener('keydown', (e) =>{
       var Klavesa = e.key  

        if(Pozice + 1 !== DelkaVety){
            if(Klavesa === zacatek.innerText ){
                zacatek.classList.remove('kurzorpico')
                zacatek.classList.add('kurzorpicoDodelanomore')
                Pozice += 1
            
                i = 0
                zacatek = SpanSet[Pozice]
                zacatek.classList.add('kurzorpico')
            }else{
                if(Klavesa !== 'Shift' && Klavesa !== '(' && Klavesa !== ')' && Klavesa !== '/' && Klavesa !== 'Dead'){
                    zacatek.classList.add('kurvanedelejchybu') 
                    for(i = i; i < 1; i++){
                        pocetchyb +=1
                        document.getElementById('spatne').innerText =  pocetchyb
                    }
                }          
            }
            if(Pozice > 0 ){
                for (a = a; a < 1; a++){
                    startTime()
                } 
            }
        }else{
            if(Klavesa == zacatek.innerText){
                
                zacatek.classList.remove('kurzorpico')
                zacatek.classList.add('kurzorpicoDodelanomore')
                Minuty = TimeSe/60
                wpm = Math.floor(PocetSlov / Minuty)
                document.getElementById('cas').innerText = wpm
                document.getElementById('spatne').innerText =  pocetchyb
                document.getElementById('time').innerText = Minuty*60 + 's'
            }
        }
    })
}
