import './App.css';
import React from 'react'
import { Loader } from './Loader';
import debounce from 'lodash';



export default class App extends React.Component {
  state = {
    data: [],
    searchValue: "minsk",
    isLoading: false,
    isError: false,
    units: "metric",
  };
  
  getData = async(idToken, q, units) => {
     q = this.searchValue;
     units = this.units;
    idToken = process.env.REACT_APP_OPEN_WEATHER_TOKEN;
    fetch (`https://api.openweathermap.org/data/2.5/weather?appid=${idToken}&${q}${units}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
  
      throw new Error("не ок");
    })
    .then((data) => {
      this.setState({ data: data.main });
    })
    .catch(() => {
      this.setState({ isError: true });
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
  };  
  
  getDataDebounced = debounce(this.getData, 1500);

  componentDidMount () {
    this.getData();
  }

  componentDidUpdate (_, prevState) {
if (prevState.searchValue === this.state.searchValue) {
  return;
}

this.getDataDebounced (this.state.searchValue);
  }
  
    onSearchChange = ({target : {value}}) => {
      this.setState({searchValue: value})
    }
  
    render() {
     const {data, isLoading, searchValue,isError} = this.state;
      return (
        <div>
          <h2> Введите город </h2>
       <input value = {searchValue} onChange = {this.onSearchChange} />
       {isLoading && <Loader/>}
       {isError && !isLoading && <div> Что-то пошло не так</div>}
       {!isError && !isLoading && (
         <ul>
           {data.map((item) => (
             <li key = {item.id}>{item.name}</li>
           ))}
         </ul>
       )}

      </div>
      );
    }
  }
  
