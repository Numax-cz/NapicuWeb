ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
var editor2 = ace.edit("editor2");
var editor3 = ace.edit("editor3");
editor.getSession().setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    
</body>
</html>`)
editor2.getSession().setValue(`body{
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
}`)
editor3.getSession().setValue(`function main(){

}`)



// editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/html");
editor2.getSession().setMode("ace/mode/css");
editor3.getSession().setMode("ace/mode/javascript");

editor3.setOptions({
    fontSize: '12pt',

})
editor2.setOptions({
    fontSize: '12pt',
})
editor.setOptions({
    fontSize: '12pt',
    
})

function newFunction() {
    ma = L;
    console.log(ma);
}

function Code(){
  var html = editor.getValue()
  var htmlcss = editor2.getValue()
  var htmljs = editor3.getValue()
  var frame = document.getElementById("TextInput").contentWindow.document;
  var CSS = "<style>"+htmlcss+"</style>"
  var JS = "<scr"+"ipt>"+htmljs+"</scr"+"ipt>"
  HtmlCssJs = html+CSS+JS
  frame.open();
  frame.write(HtmlCssJs);
  frame.close();
}

var Button = document.querySelector('input[name=darkMod]')
var ButtonCss = document.querySelector('input[name=cssMod]')
var buttonJs = document.querySelector('input[name=jsMod]')
var Cerna = ('CernaPyco')
var Bejla = ('BejlaPyco')
var SusenkyVole =document.cookie.split(';').map(cookie => cookie.split('=')).reduce((L, [key, value]) => ({...L, [key.trim()]: decodeURIComponent(value)}), {})
var BarvaMode = SusenkyVole.darkmod
if (BarvaMode == Cerna){
    document.getElementById('ButtonID').checked = true;
    document.documentElement.setAttribute('MoreCerna', Cerna) 
    editor.setTheme("ace/theme/twilight");
    editor2.setTheme("ace/theme/twilight");
    editor3.setTheme("ace/theme/twilight");

}else{
    document.getElementById('ButtonID').checked = false;
    document.documentElement.setAttribute('MoreCerna', Bejla) 
    editor.setTheme();
    editor2.setTheme();
    editor3.setTheme();
}

Button.addEventListener('change', function(){
    if(this.checked){
        document.documentElement.setAttribute('MoreCerna', Cerna)
        cookies = document.cookie = `darkmod=${Cerna}`;
        editor.setTheme("ace/theme/twilight");
        editor2.setTheme("ace/theme/twilight");
        editor3.setTheme("ace/theme/twilight");
    }else{
        document.documentElement.setAttribute('MoreCerna', Bejla)
        cookies = document.cookie = `darkmod=${Bejla}`;
        editor.setTheme();
        editor2.setTheme();
        editor3.setTheme();
    }
})

ButtonCss.addEventListener('change', function(){
    if (this.checked){
        document.getElementById('editor').style.display = 'block'
        document.getElementById('editor2').style.display = 'block'
        document.getElementById('editor').style.height = '50%'
        document.getElementById('editor2').style.height = '50%'
        document.getElementById('editor3').style.display = 'none'     
    }else{
        document.getElementById('editor').style.height = '100%'
        document.getElementById('editor2').style.display = 'none'
        document.getElementById('editor3').style.display = 'none'
    }
})

buttonJs.addEventListener('change', function(){
    if (this.checked){
        document.getElementById('editor').style.height = '33%'
        document.getElementById('editor2').style.height = '33%'
        document.getElementById('editor3').style.height = '33%'
        document.getElementById('editor2').style.display = 'block'
        document.getElementById('editor3').style.display = 'block'
    } else{
        document.getElementById('editor').style.height = '100%'
        document.getElementById('editor2').style.height = '50%'
        document.getElementById('editor2').style.display = 'none'
        document.getElementById('editor3').style.display = 'none'
    }
})
function MoreStahujNeco(){
    var L = document.createElement('a')
    L.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HtmlCssJs))
    L.setAttribute('download', "NaPicuEditor.html")
    L.style.display = 'none'
    L.click()
    document.body.appendChild(L)
}

var FajrfoxProblem = typeof InstallTrigger !== 'undefined';
if (FajrfoxProblem == true){
    document.getElementById('editor').style.display = 'none'
    document.getElementById('editor2').style.display = 'none'
    document.getElementById('editor3').style.display = 'none'
    document.getElementById('TextInput').style.display = 'none'
    document.getElementById('MenuSettID').style.display = 'none'
    document.getElementById('error').style.display = 'block'

}
