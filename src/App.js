import './App.css';
import React from 'react'
import { Loader } from './Loader';
import { debounce } from 'lodash';
import { TableWeather } from './TableWeather';

function weatherWithFetch(comp, fetchData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
     
        const { fetchData } = this.props
        fetchData(fetch, props) 
    }

    getDataDebounced = debounce(this.getData, 1500);

    componentDidMount() {
      this.getData();
    }
    componentDidUpdate(_, prevState) {
      if (prevState.searchValue === this.state.searchValue) {
        return;
      }

      this.getDataDebounced("", "minsk", "metric");
    }

    onSearchChange = ({ target: { value } }) => {
      this.setState({ searchValue: value })
    }

    render() {
  return <Weather/>
    }
  }

}



export default class Weather extends React.Component {
  state = {
    data: [],
    searchValue: "minsk",
    isLoading: false,
    isError: false,
    units: "metric",
    isFound: true,
  };

  getData = async () => {
    let q = this.state.searchValue;
    let units = this.state.units;
    let idToken = process.env.REACT_APP_OPEN_WEATHER_TOKEN;
    //alert(`https://api.openweathermap.org/data/2.5/weather?appid=${idToken}&q=${q}&units=${units}`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${idToken}&q=${q}&units=${units}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error("не ок");
      })
      .then((data) => {
        this.setState({ data: data.main, isFound: true, isError: false });
      })
      .catch(() => {
        this.setState({ isError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
render() {
  const { data, isLoading, searchValue, isError } = this.state;
  return (
    <div>
      <h2> Введите город </h2>
      <input value={searchValue} onChange={this.onSearchChange} />
      {isLoading && <Loader />}
      {isError && !isLoading && <div> Что-то пошло не так</div>}
      {!isError && !isLoading && (

        <TableWeather data={data} />
      )

      }

    </div>
  );
}

}

const weatherApiUrl = '';
export const WeatherComponent = weatherWithFetch(Weather, weatherApiUrl)
