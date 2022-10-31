import { async } from "regenerator-runtime";

function main() {
//chart
var xValues = [];
var yValues = [];
generateData("x * 2 + 7", 0, 10, 0.5);
console.log('sss');
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      pointRadius: 1,
      borderColor: "rgba(255,0,0,0.5)",
      data: yValues
    }]
  },    
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "y = x * 2 + 7",
      fontSize: 16
    }
  }
});
function generateData(value, i1, i2, step = 1) {
  for (let x = i1; x <= i2; x += step) {
    yValues.push(eval(value));
    xValues.push(x);
  }
}

//Global Data
  const getCovid = async () => {
    try {
      const response = await fetch('https://covid19.mathdro.id/api');
      const responseJson = await response.json();

      if (responseJson.error){
        showResponseMessage(responseJson.message);
      }else{
        renderCovidConfirm(JSON.stringify(responseJson.confirmed.value));
        renderCovidRecover(JSON.stringify(responseJson.recovered.value));
        renderCovidDeath(JSON.stringify(responseJson.deaths.value));
        renderCovidDate(responseJson.lastUpdate);
      }
    } catch (error) {
      showResponseMessage(error);
    }
  }

  const renderCovidConfirm = (covids) => {
      document.querySelector('#globalConfirm').innerHTML= covids;
  };

  const renderCovidRecover = (covids) => {
    document.querySelector('#globalRecover').innerHTML= covids;
  };

  const renderCovidDeath = (covids) => {
    document.querySelector('#globalDeath').innerHTML= covids;
  };

  const renderCovidDate = (covids) => {
    let dateFormat = new Date(covids);
    let date = dateFormat.getDate();
    let month = dateFormat.getMonth();
    let year = dateFormat.getFullYear();
    document.querySelector('#globalDate').innerHTML= `${date}-${month}-${year}`;
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {
    getCovid();
  });


}

export default main;