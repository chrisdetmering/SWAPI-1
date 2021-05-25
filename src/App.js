import './App.css';
import axios from 'axios';
import React from 'react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Table from './components/Table.js';
import Pagination from './components/Pagination.js';
//..

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search:'',
      results:["placeholder"],
      currentIndex: 0,
      peopleCall:[
        'http://swapi.dev/api/people/?page=1',
        'http://swapi.dev/api/people/?page=2',
        'http://swapi.dev/api/people/?page=3',
        'http://swapi.dev/api/people/?page=4',
        'http://swapi.dev/api/people/?page=5',
        'http://swapi.dev/api/people/?page=6',
        'http://swapi.dev/api/people/?page=7',
        'http://swapi.dev/api/people/?page=8',
        'http://swapi.dev/api/people/?page=9',
      ],
      api:"http://swapi.dev/api/people/?page=1",
      error: "These aren't the droids you're looking for. Or anyone you are looking for, really. Try again."
    }
    this.getPlanets = this.getPlanets.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.getOtherData = this.getOtherData.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

  }

  handleChange(event){
    this.setState({search:event.target.value})
  }
  clearSearch(){
    this.setState({
      search:'',
      api:"http://swapi.dev/api/people/?page=1",
      currentIndex: 0,
    })
    if(this.state.api !== "http://swapi.dev/api/people/?page=1" || this.state.results.length === 0)
    this.getAPI(this.state.api);
  }

  userSearch(){
    let query = "http://swapi.dev/api/people/?search=" + this.state.search
    this.getAPI(query);
  }

 getPlanets = async(character) =>{
    const planet = character.homeworld;
    const response = await axios.get(planet);
    character.homeworld = response.data.name
  }
  getSpecies = async (character) =>{
    if(character.species.length === 0){
      character.species = "Human";
    } else {
      const response = await axios.get(character.species);
      character.species = response.data.name
    }
  }
  getOtherData = async (characters) => {
    if (characters.length === 0){
      this.setState({results:[]})
    }
    for (const character of characters) {
      await this.getPlanets(character);
      await this.getSpecies(character);
      this.setState({
        results:[...characters]
      })
    }
  }
  getAPI = (url) => {
    axios.get(url)
    .then((response) => this.getOtherData(response.data.results))
  }

  prevPage = () =>{
    if(this.state.currentIndex > 0 && this.state.results.length > 0){
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
      this.getAPI(this.state.peopleCall[this.state.currentIndex])
    }
  }

  pageSelect = (url, number) => {
     this.setState({
       currentIndex: number
     })
     this.getAPI(url)
  }

  nextPage = (number) =>{
    if(this.state.currentIndex < 8 && this.state.results.length > 0){
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
      this.getAPI(this.state.peopleCall[this.state.currentIndex])
    }
  }

  
  componentDidMount() {
    this.getAPI(this.state.api)
  }

  render(){

    return (
      <div className="container">
        <Header/>
        <Search 
          value={this.state.search}
          userSearch={this.userSearch}
          clearSearch={this.clearSearch}
          handleChange={this.handleChange}
        />
        <Table
          results={this.state.results}
        />          
        <p>{this.state.results.length === 0  ? this.state.error : ''}</p>
        <Pagination 
          prevPage = {this.prevPage}
          results = {this.state.results}
          peopleCall = {this.state.peopleCall}
          pageSelect = {this.pageSelect}
          nextPage = {this.nextPage}
        />
      </div>
    );
  }

}


export default App;
