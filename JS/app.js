
const country_name_element = document.querySelector(".mesto .nazev");
const total_cases_element = document.querySelector(".pripad .hodnota");
const new_cases_element = document.querySelector(".pripad .nova-hodnota");
const recovered_element = document.querySelector(".vylecenych .hodnota");
const new_recovered_element = document.querySelector(".vylecenych .nova-hodnota");
const deaths_element = document.querySelector(".podlehlo .hodnota");
const new_deaths_element = document.querySelector(".podlehlo .nova-hodnota");

const ctx = document.getElementById("axes_line_chart").getContext("2d");


let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];


let country_code = "CZ";
let user_country;
meso_list.forEach((country) => {
  if (country.code == country_code) {
    user_country = country.name;
  }

});


function fetchData(country) {

  user_country = country;
  country_name_element.innerHTML = "Čekej ne?";

  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/confirmed",
      requestOptions

    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
      });


    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
      });


    updateUI();
  };



  
  if (user_country == "Czechia") {
    user_country = "Česko";
   }
   
  if (user_country == "Slovakia") {
    user_country = "Slovensko";
   }









  
  api_fetch(country);
}







fetchData(user_country);

function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {

  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases =
    total_recovered - recovered_list[recovered_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  country_name_element.innerHTML = user_country;

  total_cases_element.innerHTML = total_cases;
  new_cases_element.innerHTML = `+${new_confirmed_cases}`;
  recovered_element.innerHTML = total_recovered;
  new_recovered_element.innerHTML = `+${new_recovered_cases}`;
  deaths_element.innerHTML = total_deaths;
  new_deaths_element.innerHTML = `+${new_deaths_cases}`;

  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}


let nevim;
function axesLinearChart() {
  if (nevim) {
    nevim.destroy();
  }
  Chart.defaults.global.defaultFontFamily = 'Roboto Mono';
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultFontSize = 15;
  nevim = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Nakažených",
          data: cases_list,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Vyléčených",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#2ecc71",
          borderWidth: 1,
        },
        {
          label: "Podlehlo",
          data: deaths_list,
          fill: false,
          borderColor: "black",
          backgroundColor: "black",
          borderWidth: 1,
        },

      ],
      labels: formatedDates,
    },
    
      

    
      
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

const mesic = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září ",
  "Říjen",
  "Listopad",
  "Prosinec",
];

function formatDate(L) {
  let date = new Date(L);

  return `${date.getDate()} ${mesic[date.getMonth()]}`;
}