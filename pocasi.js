
const vyhledavac = document.querySelector("input[name=mesto]")
const HlavniTrida2 = document.getElementById('blok2')

const PocasiNazevMesta = document.getElementById('NazveMesta')
const PocasiPopisMesta = document.getElementById('Popis')
const PocasiTeplotaMesta = document.getElementById('HlavniTeplota')

const PocasiTeplotaNehlavni = document.getElementById('Teplota')
const PocasiMaxTeplota = document.getElementById('Teplota-max')
const PocasiMinTeplota = document.getElementById('Teplota-min')
const PocasiPocitTeplota = document.getElementById('Teplota-pocit')

const PocasiImg = document.getElementById('img')
const PocasiTlak = document.getElementById('Tlak')
const PocasiVlhkost = document.getElementById('Vlhkost')
const PocasiRychlostvetru = document.getElementById('Vitr')
const PocasiMraky = document.getElementById('Mraky')

const podblok = document.getElementById('podblok')
const loading = document.getElementById('loading')

document.addEventListener('keypress', (e) =>{
    if(e.key == 'Enter'){
        GetPocasi(vyhledavac.value)
        window.onload = loading.style.display ='table'
        podblok.style.display = 'none'
        HlavniTrida2.style.display = 'none'
    }
})
function GetPocasi(api){
    fetch(`https://viem.pinktube.eu/api/numax/jsemgay?api=${api}`)
        .then(res => res.json())
        .then((data) => {
            
            PocasiNazevMesta.innerHTML = data.name + ', ' + (data.sys.country).toLowerCase()
            PocasiPopisMesta.innerHTML = data.weather[0].description
            PocasiTeplotaMesta.innerHTML = data.main.temp + '°c'
            PocasiTeplotaNehlavni.innerHTML = "<span>Normál: </span>" + data.main.temp + '°c'
            PocasiMaxTeplota.innerHTML = "<span>Max: </span>" + data.main.temp_max + '°c'
            PocasiMinTeplota.innerHTML = "<span>Min: </span>" + data.main.temp_min + '°c'
            PocasiPocitTeplota.innerHTML = "<span>Pocit: </span>" + data.main.feels_like + '°c'
            PocasiTlak.innerHTML = "<span>Tlak: </span>" + data.main.pressure + "hPa"
            PocasiVlhkost.innerHTML = "<span>Vlhkost: </span>" + data.main.humidity + "%"
            PocasiMraky.innerHTML = '<span>Mraky: </span>' + data.clouds.all + "%"
            PocasiRychlostvetru.innerHTML = "<span>Vítr: </span>" + data.wind.speed + 'm/s'
            PocasiImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            window.onload = loading.style.display ='none'
            window.onload = HlavniTrida2.style.display = 'block'
            window.onload = podblok.style.display = 'block'
        })
}




// Abertamy
// Adamov
// Andělská Hora
// Aš
// Bakov nad Jizerou
// Bavorov
// Bečov nad Teplou
// Bechyně
// Bělá nad Radbuzou
// Bělá pod Bezdězem
// Bělčice
// Benátky nad Jizerou
// Benešov
// Benešov nad Ploučnicí
// Beroun
// Bezdružice
// Bílina
// Bílovec
// Blansko
// Blatná
// Blovice
// Blšany
// Bohumín
// Bohušovice nad Ohří
// Bochov
// Bojkovice
// Bor
// Borohrádek
// Borovany
// Boskovice
// Boží Dar
// Brandýs nad Labem-Stará Boleslav
// Brandýs nad Orlicí
// Brno
// Broumov
// Brtnice
// Brumov-Bylnice
// Bruntál
// Brušperk
// Břeclav
// Březnice
// Březová
// Březová nad Svitavou
// Břidličná
// Bučovice
// Budišov nad Budišovkou
// Budyně nad Ohří
// Buštěhrad
// Bystré
// Bystřice
// Bystřice nad Pernštejnem
// Bystřice pod Hostýnem
// Bzenec
// Cvikov
// Čáslav
// Čelákovice
// Černošice
// Černošín
// Černovice
// Červená Řečice
// Červený Kostelec
// Česká Kamenice
// Česká Lípa
// Česká Skalice
// Česká Třebová
// České Budějovice
// České Velenice
// Český Brod
// Český Dub
// Český Krumlov
// Český Těšín
// Dačice
// Dašice
// Děčín
// Desná
// Deštná
// Dobrovice
// Dobruška
// Dobřany
// Dobřichovice
// Dobříš
// Doksy
// Dolní Benešov
// Dolní Bousov
// Dolní Kounice
// Dolní Poustevna
// Domažlice
// Dubá
// Dubí
// Dubňany
// Duchcov
// Dvůr Králové nad Labem
// Františkovy Lázně
// Frenštát pod Radhoštěm
// Frýdek-Místek
// Frýdlant
// Frýdlant nad Ostravicí
// Fryšták
// Fulnek
// Golčův Jeníkov
// Habartov
// Habry
// Hanušovice
// Harrachov
// Hartmanice
// Havířov
// Havlíčkův Brod
// Hejnice
// Heřmanův Městec
// Hlinsko
// Hluboká nad Vltavou
// Hlučín
// Hluk
// Hodkovice nad Mohelkou
// Hodonín
// Holešov
// Holice
// Holýšov
// Hora Svaté Kateřiny
// Horažďovice
// Horní Benešov
// Horní Blatná
// Horní Bříza
// Horní Cerekev
// Horní Jelení
// Horní Jiřetín
// Horní Planá
// Horní Slavkov
// Horšovský Týn
// Hořice
// Hořovice
// Hostinné
// Hostivice
// Hostomice
// Hostouň
// Hoštka
// Hradec Králové
// Hradec nad Moravicí
// Hrádek
// Hrádek nad Nisou
// Hranice (okres Cheb)
// Hranice (okres Přerov)
// Hrob
// Hrochův Týnec
// Hronov
// Hrotovice
// Hroznětín
// Hrušovany nad Jevišovkou
// Hulín
// Humpolec
// Husinec
// Hustopeče
// Chabařovice
// Cheb
// Chlumec
// Chlumec nad Cidlinou
// Choceň
// Chodov
// Chomutov
// Chotěboř
// Chrast
// Chrastava
// Chropyně
// Chrudim
// Chřibská
// Chvaletice
// Chýnov
// Chyše
// Ivančice
// Ivanovice na Hané
// Jablonec nad Jizerou
// Jablonec nad Nisou
// Jablonné nad Orlicí
// Jablonné v Podještědí
// Jablunkov
// Jáchymov
// Janov
// Janovice nad Úhlavou
// Janské Lázně
// Jaroměř
// Jaroměřice nad Rokytnou
// Javorník
// Jemnice
// Jesenice (okres Rakovník)
// Jesenice (okres Praha-západ)
// Jeseník
// Jevíčko
// Jevišovice
// Jičín
// Jihlava
// Jilemnice
// Jílové
// Jílové u Prahy
// Jindřichův Hradec
// Jirkov
// Jiříkov
// Jistebnice
// Kadaň
// Kamenice nad Lipou
// Kamenický Šenov
// Kaplice
// Kardašova Řečice
// Karlovy Vary
// Karolinka
// Karviná
// Kasejovice
// Kašperské Hory
// Kaznějov
// Kdyně
// Kelč
// Kladno
// Kladruby
// Klášterec nad Ohří
// Klatovy
// Klecany
// Klimkovice
// Klobouky u Brna
// Kojetín
// Kolín
// Konice
// Kopidlno
// Kopřivnice
// Koryčany
// Kosmonosy
// Kostelec na Hané
// Kostelec nad Černými lesy
// Kostelec nad Labem
// Kostelec nad Orlicí
// Košťany
// Kouřim
// Kožlany
// Králíky
// Kralovice
// Kralupy nad Vltavou
// Králův Dvůr
// Kraslice
// Krásná Hora nad Vltavou
// Krásná Lípa
// Krásné Údolí
// Krásno
// Kravaře
// Krnov
// Kroměříž
// Krupka
// Kryry
// Kunovice
// Kunštát
// Kuřim
// Kutná Hora
// Kyjov
// Kynšperk nad Ohří
// Lanškroun
// Lanžhot
// Lázně Bělohrad
// Lázně Bohdaneč
// Lázně Kynžvart
// Ledeč nad Sázavou
// Ledvice
// Letohrad
// Letovice
// Libáň
// Libčice nad Vltavou
// Liběchov
// Liberec
// Libochovice
// Libušín
// Lipnice nad Sázavou
// Lipník nad Bečvou
// Lišov
// Litoměřice
// Litomyšl
// Litovel
// Litvínov
// Loket
// Lom
// Lomnice nad Lužnicí
// Lomnice nad Popelkou
// Loštice
// Loučná pod Klínovcem
// Louny
// Lovosice
// Luby
// Lučany nad Nisou
// Luhačovice
// Luže
// Lysá nad Labem
// Manětín
// Mariánské Lázně
// Mašťov
// Měčín
// Mělník
// Městec Králové
// Město Albrechtice
// Město Touškov
// Meziboří
// Meziměstí
// Mikulášovice
// Mikulov
// Miletín
// Milevsko
// Milovice
// Mimoň
// Miroslav
// Mirošov
// Mirotice
// Mirovice
// Mladá Boleslav
// Mladá Vožice
// Mnichovice
// Mnichovo Hradiště
// Mníšek pod Brdy
// Modřice
// Mohelnice
// Moravská Třebová
// Moravské Budějovice
// Moravský Beroun
// Moravský Krumlov
// Morkovice-Slížany
// Most
// Mšeno
// Mýto
// Náchod
// Nalžovské Hory
// Náměšť nad Oslavou
// Napajedla
// Nasavrky
// Nechanice
// Nejdek
// Němčice nad Hanou
// Nepomuk
// Neratovice
// Netolice
// Neveklov
// Nová Bystřice
// Nová Paka
// Nová Role
// Nová Včelnice
// Nové Hrady
// Nové Město na Moravě
// Nové Město nad Metují
// Nové Město pod Smrkem
// Nové Sedlo
// Nové Strašecí
// Nový Bor
// Nový Bydžov
// Nový Jičín
// Nový Knín
// Nymburk
// Nýrsko
// Nýřany
// Odolena Voda
// Odry
// Olešnice
// Olomouc
// Oloví
// Opava
// Opočno
// Orlová
// Osečná
// Osek
// Oslavany
// Ostrava
// Ostrov
// Otrokovice
// Pacov
// Pardubice
// Paskov
// Pec pod Sněžkou
// Pečky
// Pelhřimov
// Petřvald
// Pilníkov
// Písek
// Planá
// Planá nad Lužnicí
// Plánice
// Plasy
// Plesná
// Plumlov
// Plzeň
// Poběžovice
// Počátky
// Podbořany
// Poděbrady
// Podivín
// Pohořelice
// Police nad Metují
// Polička
// Polná
// Postoloprty
// Potštát
// Praha
// Prachatice
// Proseč
// Prostějov
// Protivín
// Přebuz
// Přelouč
// Přerov
// Přeštice
// Příbor
// Příbram
// Přibyslav
// Přimda
// Pyšely
// Rabí
// Radnice
// Rájec-Jestřebí
// Rajhrad
// Rakovník
// Ralsko
// Raspenava
// Rejštejn
// Rokycany
// Rokytnice nad Jizerou
// Rokytnice v Orlických horách
// Ronov nad Doubravou
// Rosice
// Rotava
// Roudnice nad Labem
// Rousínov
// Rovensko pod Troskami
// Roztoky
// Rožmberk nad Vltavou
// Rožďalovice
// Rožmitál pod Třemšínem
// Rožnov pod Radhoštěm
// Rtyně v Podkrkonoší
// Rudná
// Rudolfov
// Rumburk
// Rychnov nad Kněžnou
// Rychnov u Jablonce nad Nisou
// Rychvald
// Rýmařov
// Řevnice
// Říčany
// Sadská
// Sázava
// Seč
// Sedlčany
// Sedlec-Prčice
// Sedlice
// Semily
// Sezemice
// Sezimovo Ústí
// Skalná
// Skuteč
// Slaný
// Slatiňany
// Slavičín
// Slavkov u Brna
// Slavonice
// Slušovice
// Smečno
// Smiřice
// Smržovka
// Soběslav
// Sobotka
// Sokolov
// Solnice
// Spálené Poříčí
// Staňkov
// Staré Město (okres Šumperk)
// Staré Město (okres Uherské Hradiště)
// Stárkov
// Starý Plzenec
// Stod
// Stochov
// Strakonice
// Stráž nad Nežárkou
// Stráž pod Ralskem
// Strážnice
// Strážov
// Strmilov
// Stříbro
// Studénka
// Suchdol nad Lužnicí
// Sušice
// Světlá nad Sázavou
// Svitavy
// Svoboda nad Úpou
// Svratka
// Šenov
// Šlapanice
// Šluknov
// Špindlerův Mlýn
// Štěpánov
// Šternberk
// Štětí
// Štíty
// Štramberk
// Šumperk
// Švihov
// Tábor
// Tachov
// Tanvald
// Telč
// Teplá
// Teplice
// Teplice nad Metují
// Terezín
// Tišnov
// Toužim
// Tovačov
// Trhové Sviny
// Trhový Štěpánov
// Trmice
// Trutnov
// Třebechovice pod Orebem
// Třebenice
// Třebíč
// Třeboň
// Třemošná
// Třemošnice
// Třešť
// Třinec
// Turnov
// Týn nad Vltavou
// Týnec nad Labem
// Týnec nad Sázavou
// Týniště nad Orlicí
// Uherské Hradiště
// Uherský Brod
// Uherský Ostroh
// Uhlířské Janovice
// Unhošť
// Uničov
// Újezd u Brna
// Úpice
// Úsov
// Ústí nad Labem
// Ústí nad Orlicí
// Úštěk
// Úterý
// Úvaly
// Valašské Klobouky
// Valašské Meziříčí
// Valtice
// Vamberk
// Varnsdorf
// Vejprty
// Velešín
// Velká Bíteš
// Velká Bystřice
// Velké Bílovice
// Velké Hamry
// Velké Meziříčí
// Velké Opatovice
// Velké Pavlovice
// Velký Šenov
// Veltrusy
// Velvary
// Verneřice
// Veselí nad Lužnicí
// Veselí nad Moravou
// Veverská Bítýška
// Větřní
// Vidnava
// Vimperk
// Vítkov
// Vizovice
// Vlachovo Březí
// Vlašim
// Vodňany
// Volary
// Volyně
// Votice
// Vracov
// Vratimov
// Vrbno pod Pradědem
// Vrchlabí
// Vroutek
// Vsetín
// Všeruby
// Výsluní
// Vysoké Mýto
// Vysoké nad Jizerou
// Vysoké Veselí
// Vyškov
// Vyšší Brod
// Zábřeh
// Zákupy
// Zásmuky
// Zbiroh
// Zbýšov
// Zdice
// Zlaté Hory
// Zlín
// Zliv
// Znojmo
// Zruč nad Sázavou
// Zubří
// Žacléř
// Žamberk
// Žandov
// Žatec
// Ždánice
// Žďár nad Sázavou
// Ždírec nad Doubravou
// Žebrák
// Železná Ruda
// Železnice
// Železný Brod
// Židlochovice
// Žirovnice
// Žlutice
// Žulová