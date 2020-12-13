var nevím = new Date('Dec 24, 2020 00:00.00').getTime();
function novejrokpico(){
    var čas = new Date().getTime()
        cn = nevím - čas;
        var sekundy = 1000;
        var minuty = sekundy * 60;
        var hodiny = minuty * 60;
        var dny = hodiny * 24;
        
        var d = Math.floor(cn / (dny));
        var h = Math.floor((cn % (dny)) / (hodiny)) ;
        var m = Math.floor((cn % (hodiny)) / (minuty));
        var s = Math.floor((cn % (minuty)) / sekundy);

        document.getElementById('Dny').innerText = d; 
        document.getElementById('Hodiny').innerText = h;
        document.getElementById('Minuty').innerText = m;
        document.getElementById('Sekundy').innerText = s;



       
}
setInterval(function(){novejrokpico();},1000)  


















var hudba = document.getElementById('hudba').play();
function HratHudbu(){
    hudba.play();
}