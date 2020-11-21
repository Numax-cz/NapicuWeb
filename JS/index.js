function morenula(L) {
    if (L < 10) {L = "0" + L};  
    return L;
  }
  const text1 = ["Co tu chceš jako? Chceš MMA? Tak pozdě večer?", "Čo ti šibe takto večer?", "Takto pozdě večer?", "To je na MMA tak pozdě večer!"]
  const nahoda1  = text1[Math.floor(Math.random() * text1.length)]
  const text2 = ["HA! more vstávat budeš!", "HA! nechtěl bych vstávat!"]
  const nahoda2  = text2[Math.floor(Math.random() * text2.length)]
  const text3 = ["Vstávat!!!", "Vstávej more", "Vstávat budeš!"]
  const nahoda3  = text3[Math.floor(Math.random() * text3.length)]
  const text4 = ["Žer!", "Nažer se jako!", "Žer! Nebo umřeš!"]
  const nahoda4  = text4[Math.floor(Math.random() * text4.length)]
  const text5 = ["Co tu chceš? Běž jíst!", "Dělé je oběd!", "Máš oběd!"]
  const nahoda5  = text5[Math.floor(Math.random() * text5.length)]
  const text6 = ["Co tu chceš jako? MMA?!", "Dáme MMA?", "chceš MMA?"]
  const nahoda6  = text6[Math.floor(Math.random() * text6.length)]
  const text7 = ["MMA?", "Beton", "Cihle", "Moravák", "Židle", "Stůl", "DDOS", "napicu.eu"]
  const nahoda7  = text7[Math.floor(Math.random() * text7.length)]
  const text8 = ["Dělé je Večerníček je!", "Večerníček!!!", "No běž se kókat na Večerníček!"]
  const nahoda8  = text8[Math.floor(Math.random() * text8.length)]
  const text9 = ["Ha! Večerníček ti skončil!", "Večerníček skončil :("]
  const nahoda9  = text9[Math.floor(Math.random() * text9.length)]
  const text10 = ["/time set night!", "NOC!", "HA tma jak v číči"]
  const nahoda10  = text10[Math.floor(Math.random() * text10.length)]
  const text11 = ["Spat běž!", "SPI!", "Spát budeš!!"]
  const nahoda11 = text11[Math.floor(Math.random() * text11.length)]

  function hodinyyyyyyyyy() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = morenula(m);
    s = morenula(s);
    document.getElementById('hodiny').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(hodinyyyyyyyyy, 1000);
    if (h < 5) {document.getElementById('zdarne-pop-text').innerHTML = nahoda1}
    if (h >= 5) {document.getElementById('zdarne-pop-text').innerHTML = nahoda2}
    if (h >= 7) {document.getElementById('zdarne-pop-text').innerHTML = nahoda3}
    if (h >= 9) {document.getElementById('zdarne-pop-text').innerHTML = nahoda4}
    if (h >= 11) {document.getElementById('zdarne-pop-text').innerHTML = nahoda5}
    if (h >= 13) {document.getElementById('zdarne-pop-text').innerHTML = nahoda6}
    if (h >= 16) {document.getElementById('zdarne-pop-text').innerHTML = nahoda7}
    if (h >= 18) {document.getElementById('zdarne-pop-text').innerHTML = nahoda8}
    if (h >= 19) {document.getElementById('zdarne-pop-text').innerHTML = nahoda9}
    if (h >= 21) {document.getElementById('zdarne-pop-text').innerHTML = nahoda10}
    if (h >= 22) {document.getElementById('zdarne-pop-text').innerHTML = nahoda11}
}
console.log("%c Co tu chceš jako? Chceš MMA? pojď do klece na MMA!", "color: white; font-weight: bold; background-color: blue; font-size: 40px");