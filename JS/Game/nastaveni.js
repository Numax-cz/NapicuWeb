document.getElementById('Nastaveni-Zvuky').style.display = 'none' 
document.getElementById('mobile').style.display = 'none'
document.getElementById('MenuButtonID').style.display = 'none'
document.getElementById('Nastaveni').style.display = 'none'
document.getElementById('GameOver').style.display = 'none'




if(navigator.userAgent.toLowerCase().match(/mobile/i)) { 
 document.getElementById('MenuButtonID').style.display = 'none'
 document.getElementById('mobile').style.display = 'table'
 document.getElementById('HlavniMenu').style.display = 'none'
 document.getElementById('loading').style.display = 'none'
 document.querySelector('canvas').style.display = 'none'
 PotvrzeniMobil = true
}

function Nastaveni(){
  document.getElementById('Nastaveni').style.display = 'table'
  document.getElementById('mobile').style.display = 'none'
  document.getElementById('loading').style.display = 'none'
  document.querySelector('canvas').style.display = 'none'
  document.getElementById('MenuButtonID').style.display = 'none'
}
function NastaveniExit(){
  document.getElementById('Nastaveni').style.display = 'none'
  document.getElementById('mobile').style.display = 'none'
  document.getElementById('loading').style.display = 'none'
  document.querySelector('canvas').style.display = 'block'
  document.getElementById('MenuButtonID').style.display = 'block'
}
function NastaveniZvuky(){
  document.getElementById('informace').style.display = 'none'
  document.getElementById('Nastaveni-Zvuky').style.display = 'inline'


}
function NastaveniInformace(){
  document.getElementById('Nastaveni-Zvuky').style.display = 'none'
  document.getElementById('informace').style.display = 'block'
}
function GameOver(){
  document.getElementById('Nastaveni').style.display = 'none'
  document.getElementById('mobile').style.display = 'none'
  document.getElementById('loading').style.display = 'none'
  document.querySelector('canvas').style.display = 'none'
  document.getElementById('MenuButtonID').style.display = 'none'
  document.getElementById('GameOver').style.display = 'table'
}
function EndTutorial(){
  document.getElementById('HlavniMenu').style.display = 'none'
  PotvrzeniStartuHry = false
  Player.src = './Img/jonanekxd.webp'
}


function RestartGame(){
  document.getElementById('GameOver').style.display = 'none'
  document.querySelector('canvas').style.display = 'block'
  Plechovka.x = PoziceSpawnPlechaceX
  Plechovka.y = PoziceSpawnPlechaceY

  Objekt.x = PoziceSpawnHraceX
  Objekt.y = PoziceSpawnHraceY
  Objekt.RychlostY = 0
  Objekt.RychlostX = 0
  PotvrzeniStartuHry = false
}


