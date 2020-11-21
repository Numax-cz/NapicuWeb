
const api = {
    key: "9f7913914b03b001c0cca319edf16901",
    api_url: "https://api.openweathermap.org/data/2.5/"
}
  
const hledani = document.querySelector('.hledaciBox');
hledani.addEventListener('keypress', klavesa);
function klavesa(L) {
    if (L.keyCode == 13) {
      pocasi(hledani.value);
    }
}
  
function pocasi (mestoAP) {
    fetch(`${api.api_url}weather?q=${mestoAP}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(display);
}
  
function display (weather) {
    console.log(weather)
    var mesto = document.querySelector('.mesto')
    mesto.innerText = `${weather.name}`

    
    var dat = new Date();
    
    var datum = document.querySelector('.datum')
    datum.innerText = datumy(dat)
}
function datumy (date) {
    const měsíce = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"]
    const dny = ["Neděle", "Pondělí", " Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]

    var den = dny[date.getDay()]
    var datum = date.getDate()
    var měsíc = měsíce[date.getMonth()]
    var rok = date.getFullYear();
    
    return `${den} ${datum} - ${měsíc} ${rok}`
}
