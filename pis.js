const TextPole = document.getElementById("TextPole")
ApiSlov = 'https://viem.pinktube.eu/api/slova?pocet=80'
var PocetSlov = 80

i = 0
pocetchyb = 0
fetch(ApiSlov)
    .then(res => res.text())
    .then(data =>{
        slovo = JSON.parse(data)
        VetaGenerator()
        

        
    });


function VetaGenerator(){
   Veta = (slovo.join(" "))
    


    const SpanSet = Veta.split('').map((pismeno) =>{
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
            }
        },1000)
    }


    

    

    let Pozice = 0
    let zacatek = SpanSet[Pozice]
    zacatek.classList.add('kurzorpico')
    let DelkaVety = Veta.length

    document.addEventListener('keydown', (e) =>{
        if((Pozice + 1)!== DelkaVety){
            Klavesa = e.key


            if(Klavesa === zacatek.innerText && (Pozice + 1)!== DelkaVety){
                zacatek.classList.remove('kurzorpico')
                zacatek.classList.add('kurzorpicoDodelanomore')
                Pozice += 1
                i = 0
                zacatek = SpanSet[Pozice]
                zacatek.classList.add('kurzorpico')
            }else{
                if(e.key !== 'Shift' && e.key !== '(' && e.key !== ')' && e.key !== '/'){
                    zacatek.classList.add('kurvanedelejchybu') 
                    for(i = i; i < 1; i++){
                        pocetchyb +=1
                    }
                } 
                      
            }
            if (Pozice < 1){
                Casovac()
            }
            

            
            
        
            if (DelkaVety == (Pozice + 1)){
                wpm = Math.floor(PocetSlov / (TimeSe/60))     
                document.getElementById('cas').innerText = wpm
            }
        }
    })


}