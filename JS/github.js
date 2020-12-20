var Button = document.querySelector('input[name=darkMod]')
var Cerna = ('CernaPyco')
var Bejla = ('BejlaPyco')
var SusenkyVole =document.cookie.split(';').map(cookie => cookie.split('=')).reduce((L, [key, value]) => ({...L, [key.trim()]: decodeURIComponent(value)}), {})
var BarvaMode = SusenkyVole.darkmod
if (BarvaMode == Cerna){
    document.getElementById('ButtonID').checked = true;
    document.documentElement.setAttribute('MoreCerna', Cerna) 
}else{
    document.getElementById('ButtonID').checked = false;
    document.documentElement.setAttribute('MoreCerna', Bejla) 
}

Button.addEventListener('change', function(){
    if(this.checked){
        HejMorecasMoreAnimaceToToAsiMoznabude()
        document.documentElement.setAttribute('MoreCerna', Cerna)
        cookies = document.cookie = `darkmod=${Cerna}`;
    }else{
        HejMorecasMoreAnimaceToToAsiMoznabude()
        document.documentElement.setAttribute('MoreCerna', Bejla)
        cookies = document.cookie = `darkmod=${Bejla}`;
    }
})
let HejMorecasMoreAnimaceToToAsiMoznabude = () => {
    document.documentElement.classList.add('moresmooooth');
    window.setTimeout(() => {
        document.documentElement.classList.remove('moresmooooth')
    }, 1000) 
}


