import './App.css';
import axios from 'axios';
import React from 'react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Table from './components/Table.js';
import Pagination from './components/Pagination.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      results: [],
      currentPage: 1,
      api: "https://swapi.dev/api/people/?page=1",
      error: "These aren't the droids you're looking for. Or anyone you are looking for, really. Try again."
    }
    this.getPlanet = this.getPlanet.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.setHomeWorldAndSpecies = this.setHomeWorldAndSpecies.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    this.getCharacters(this.state.api)
  }

  handleChange(event) {
    this.setState({ search: event.target.value })
  }

  clearSearch() {
    this.setState({ search: '' })
  }

  userSearch() {
    this.getCharacters(`https://swapi.dev/api/people/?search=${this.state.search}`);
  }

  getPlanet = async (character) => {
    const planet = String(character.homeworld).replace("http", "https");
    const response = await axios.get(planet);
    return response.data.name
  }
  getSpecies = async (character) => {
    if (character.species.length === 0) {
      return "Human";
    } else {
      const response = await axios.get(String(character.species).replace("http", "https"));
      return response.data.name
    }
  }
  setHomeWorldAndSpecies = async (characters) => {
    if (characters.length === 0) {
      this.setState({ results: [] })
    }
    for (const character of characters) {
      character.homeworld = await this.getPlanet(character);
      character.species = await this.getSpecies(character);
    }

    this.setState({
      results: [...characters]
    })
  }
  getCharacters = (url) => {
    axios.get(url)
      .then((response) => this.setHomeWorldAndSpecies(response.data.results))
  }


  handlePageChange = pageNum => {
    if (pageNum < 1 || pageNum > 9) return;
    this.setState({ currentPage: pageNum })
    this.getCharacters(`https://swapi.dev/api/people/?page=${pageNum}`)
  }


  render() {

    return (
      <div className="container">
        <Header />
        <Search
          value={this.state.search}
          userSearch={this.userSearch}
          clearSearch={this.clearSearch}
          handleChange={this.handleChange}
        />
        <Table
          results={this.state.results}
        />
        <p>{this.state.results.length === 0 && this.state.error}</p>
        <Pagination
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }

}


export default App;
