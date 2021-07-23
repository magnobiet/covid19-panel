import * as dayjs from 'dayjs';
import React, { Component } from 'react';
import Card from './components/card';
import Loader from './components/loader';

class App extends Component {

  state = {
    loading: true,
    data: []
  }

  formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
  }

  setFavicon(icon) {

    const favicon = document.querySelector(`head > link[rel='icon']`);
    const svgIcon = `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`.trim();

    favicon.setAttribute(`href`, `data:image/svg+xml,${svgIcon}`);

  }

  updateFavicon() {

    const toggleTime = 2000;
    const favicons = ['🦠', '🏥', '💉', '🧴', '😷', '💧', '🧼', '🤲'];
    let currentFavicon = 0;

    setInterval(() => {

      this.setFavicon(favicons[currentFavicon]);

      if (currentFavicon < favicons.length - 1) {
        currentFavicon++;
      } else {
        currentFavicon = 0;
      }

    }, toggleTime);

  }

  fetchData() {

    this.setState({ loading: true });

    const startDate = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
    const endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const endpoint = `https://api.covid19api.com/country/brazil?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`;

    fetch(endpoint, { method: 'GET', redirect: 'follow' })
      .then((response) => response.json())
      .then((response) => {

        const { Country, Date, Confirmed, Deaths, Recovered, Active } = response[0];
        const data = {
          Country,
          Date: dayjs(Date).format('DD/MM/YYYY'),
          Confirmed: this.formatNumber(Confirmed),
          Deaths: this.formatNumber(Deaths),
          Recovered: this.formatNumber(Recovered),
          Active: this.formatNumber(Active),
        };

        this.setState({ data, loading: false });

      })
      .catch((error) => console.log('error', error));

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    this.updateFavicon();

    return (

      <div className="flex flex-col content-center justify-center flex-wrap bg-gray-300 h-screen space-y-6">

        {this.state.loading ? <Loader /> : <>
          <span className="text-6xl text-center" role="img" aria-label="A red virus emoji" style={{ filter: 'hue-rotate(270deg)' }}>🦠</span>
          <Card data={this.state.data} />
        </>}

      </div>

    );

  }

}

export default App;
