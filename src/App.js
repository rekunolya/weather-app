import './App.css';
import React from 'react'
import { Loader } from './Loader';
import {debounce} from 'lodash';



export default class App extends React.Component {
  state = {
    data: [],
    searchValue: "minsk",
    isLoading: false,
    isError: false,
    units: "metric",
    isFound: true,
  };
  
  getData = async() => {
    let q = this.state.searchValue;
    let units = this.state.units;
    let idToken = "4ad2482850d740ddb7534475656fd360";
    alert(`https://api.openweathermap.org/data/2.5/weather?appid=${idToken}&q=${q}&units=${units}`)
    fetch (`https://api.openweathermap.org/data/2.5/weather?appid=${idToken}&q=${q}&units=${units}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
  
      throw new Error("не ок");
    })
    .then((data) => {
      this.setState({ data: data.main, isFound: true, isError:false });
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

this.getDataDebounced ("","minsk", "metric");
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
       {!isError && !isLoading && 
         
         data.temp
         
       }

      </div>
      );
    }
  }
  
