var nevim = new Date('Dec 24, 2021 00:00:00').getTime();
setInterval(function(){
    var cas = new Date().getTime()
    cn = nevim - cas;
    var sekundy = 1000;
    var minuty = sekundy * 60;
    var hodiny = minuty * 60;
    var dny = hodiny * 24;
            
    var d = Math.floor(cn / (dny));
    var h = Math.floor((cn % (dny)) / (hodiny)) ;
    var m = Math.floor((cn % (hodiny)) / (minuty));
    var s = Math.floor((cn % (minuty)) / sekundy);

    document.getElementById('Dny').innerHTML = d; 
    document.getElementById('Hodiny').innerHTML = h;
    document.getElementById('Minuty').innerHTML = m;
    document.getElementById('Sekundy').innerHTML = s;
}, 1000);



var hudba = document.getElementById('hudba');
function HratHudbu(){
    hudba.play();
}