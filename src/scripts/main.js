import { async } from "regenerator-runtime";

const main = async () => {
//chart
  const getGlobalCart = async () => {
    let currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const monthEnd = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dateStart = `${year}-${month}-${day}`;
    const dateEnd = `${year}-${monthEnd}-${day}`;
    try {
      const response = await fetch(`https://api.covid19api.com/world?from=${dateStart}&to=${dateEnd}`)
      const responseJson = await response.json();

      if(responseJson.error){
        showResponseMessage(responseJson.message);
      }else{
        renderCovidCart(responseJson);
      }
    } catch (error) {
      showResponseMessage(error);
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

  const renderCovidCart = (covids) => {
    let confirm = [];
    let death = [];
    covids.forEach(covid => {
        confirm.push(eval(covid.NewConfirmed));
        death.push(eval(covid.NewDeaths));
    });
    const arrConfirm = confirm;
    const arrDeath = death;

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth();
    let monthEnd = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let monthEndOf = '';
    if(monthEnd == 10 || monthEnd == 11 || monthEnd == 12){
      monthEndOf = monthEnd;
    }else{
      monthEndOf = '0'+monthEnd;
    }

    let monthOf = '';
    if(month == 10 || month == 11 || month == 12){
      monthOf = month;
    }else{
      monthOf = '0'+month;
    }

    const dateStart = `${year}-${monthOf}-${day}`;
    const dateEnd = `${year}-${monthEndOf}-${day}`;
    let listDate = [];
    let startDate = dateStart;
    let endDate = dateEnd;
    let dateMove = new Date(startDate);
    var strDate = startDate;

    while (strDate < endDate){
      var strDate = dateMove.toISOString().slice(0,10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);
    };

    let date = listDate;
    let data = arrConfirm;
    var ctx = document.getElementById("myChart-cases-covid");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          { 
            data: data,
            label: "World New Cases",
            borderColor: "#3e95cd",
            fill: false
          },
        ]
      }
    });

    var dataDeath = arrDeath;
    var ctx = document.getElementById("myChart-death-covid");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          { 
            data: dataDeath,
            label: "World New Cases",
            borderColor: "#c45850",
            fill: false
          },
        ]
      }
    });

  }
  

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
    getGlobalCart();
  });

}

export default main;