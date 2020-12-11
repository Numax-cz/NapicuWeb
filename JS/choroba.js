const ApiTechRomu = "https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.json";
const ApiTechRomu2 = "https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json";

//Classy kam se vkladaji mrdoviny a číčoviny!!!!!!!
const Celkove_Nakazeni_Hodnota = document.querySelector(".pripad .hodnota");
const Celkove_Nakazeni_Nova_Hodnota = document.querySelector(".pripad .nova-hodnota");
const Celkove_Vylecenych_Hodnota = document.querySelector(".vylecenych .hodnota");
const Celkove_Vylecenych_Nova_Hodnota = document.querySelector(".vylecenych .nova-hodnota");
const Celkove_Podlehlo_Hodnota = document.querySelector(".podlehlo .hodnota");
const Celkove_Podlehlo_Nova_Hodnota = document.querySelector(".podlehlo .nova-hodnota");


fetch(ApiTechRomu)
    .then((data) => data.json())
    .then((apiData) => {
        Celkove_Nakazeni_Hodnota.innerHTML = apiData.data[0].potvrzene_pripady_celkem;
        Celkove_Nakazeni_Nova_Hodnota.innerHTML = "+" + apiData.data[0].potvrzene_pripady_vcerejsi_den;
        Celkove_Vylecenych_Hodnota .innerHTML = apiData.data[0].vyleceni;
        Celkove_Podlehlo_Hodnota.innerHTML = apiData.data[0].umrti;
    })
fetch(ApiTechRomu2)
    .then((data2) => data2.json())
    .then((apiData2) => {
        Celkove_Vylecenych_Nova_Hodnota.innerHTML = "+" + (apiData2.data[apiData2.data.length -1].kumulativni_pocet_vylecenych - apiData2.data[apiData2.data.length -2].kumulativni_pocet_vylecenych);
        Celkove_Podlehlo_Nova_Hodnota.innerHTML = "+" + (apiData2.data[apiData2.data.length -1].kumulativni_pocet_umrti - apiData2.data[apiData2.data.length -2].kumulativni_pocet_umrti);
        const Nakazenych = [];
        const Vylecenych = [];
        const Chciplo = [];
        const Datum = [];


        for(i = (apiData2.data.length - 30); i < apiData2.data.length; i++){
            Nakazenych.push(apiData2.data[i].kumulativni_pocet_nakazenych);
            Vylecenych.push(apiData2.data[i].kumulativni_pocet_vylecenych);
            Chciplo.push(apiData2.data[i].kumulativni_pocet_umrti);
            Datum.push(apiData2.data[i].datum);
        }
        const graph = document.getElementById('GraphPico').getContext('2d');
        Chart.defaults.global.defaultFontColor = 'white';
        Chart.defaults.global.defaultFontSize = 15;
        Chart.defaults.global.defaultFontFamily = 'Montserrat';
        const ChorobaGraph = new Chart(graph, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: "Nakažených",
                        data: Nakazenych,
                        fill: false,
                        borderColor: "#c0392b",
                        backgroundColor: "#c0392b",
                        borderWidth: 1,
                    },
                    {
                        label: "Vyléčených",
                        data: Vylecenych,
                        fill: false,
                        borderColor: "#2ecc71",
                        backgroundColor: "#2ecc71",
                        borderWidth: 1,
                    },
                    {
                        label: "Podlehlo",
                        data: Chciplo,
                        fill: false,
                        borderColor: "black",
                        backgroundColor: "black",
                        borderWidth: 1,
                    },
                ],
                labels: Datum,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    })


console.log("Dobrý den, naši vědci dle hardcore výzkumů zjistili, že nejspíše jste pa***. A chceme se vás zeptat zda s tím něco hodláte udělat. Hm?")