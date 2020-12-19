ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");

// editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/html");
document.getElementById("editor");

editor.setOptions({
    fontSize: '12pt',
})
function Code(){
  var html = editor.getValue()
  var frame = document.getElementById("TextInput").contentWindow.document;
  frame.open();
  frame.write(html);
  frame.close();
}



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
        editor.setTheme("ace/theme/twilight");

    }else{
        HejMorecasMoreAnimaceToToAsiMoznabude()
        document.documentElement.setAttribute('MoreCerna', Bejla)
        cookies = document.cookie = `darkmod=${Bejla}`;
        editor.setTheme();

    }
})
let HejMorecasMoreAnimaceToToAsiMoznabude = () => {
    document.documentElement.classList.add('moresmooooth');
    window.setTimeout(() => {
        document.documentElement.classList.remove('moresmooooth')
    }, 1000) 
}


