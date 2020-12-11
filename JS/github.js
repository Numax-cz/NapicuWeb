var Button = document.querySelector('input[name=darkMod]')
Button.addEventListener('change', function(){
    if(this.checked){
        HejMorecasMoreAnimaceToToAsiMoznabude()
        document.documentElement.setAttribute('MoreCerna','CernaPyco')
    }else{
        HejMorecasMoreAnimaceToToAsiMoznabude()
        document.documentElement.setAttribute('MoreCerna','BejlaPyco')
    }
})
let HejMorecasMoreAnimaceToToAsiMoznabude = () => {
    document.documentElement.classList.add('moresmooooth');
    window.setTimeout(() => {
        document.documentElement.classList.remove('moresmooooth')
    }, 1000) 
}