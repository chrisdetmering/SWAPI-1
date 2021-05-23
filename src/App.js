import './App.css';
import axios from 'axios';
import React from 'react';

//IN PROGRESS============
// Deliverables
  // The table should be limit results to 10 characters at a time
    //implying you should be able to more, but 10 at a time. 
  // There should be a single input element for searching a specific user


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search:'',
      results:[],
      api:"http://swapi.dev/api/people/?page=1"
    }
    this.getPlanets = this.getPlanets.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.getOtherData = this.getOtherData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

  }

  handleChange(event){
    this.setState({search:event.target.value})
    console.log(this.state.search);
  }
  clearSearch(){
    this.setState({
      search:'',
      api:"http://swapi.dev/api/people/?page=1"
    })
    axios.get(this.state.api)
    .then((response) => this.getOtherData(response.data.results))
    console.log("called it")
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
    for (const character of characters) {
      await this.getPlanets(character);
      await this.getSpecies(character);
      this.setState({
        results:[...characters]
      })
    }
  }

  
  componentDidMount() {
    axios.get(this.state.api)
    .then((response) => this.getOtherData(response.data.results))
  }

  render(){

    return (
      <div className="container">
        <header className="App-header">
          <h1>SWAPI</h1>
          <p>A New Hope</p>
        </header>

        <section id="search" >
          <form>
            <div className="input-group mb-3">
              <button 
                className="btn btn-primary" 
                type="button" 
                id="button-addon1">
                  Search
              </button>
              <button 
                className="btn btn-secondary" 
                type="button" 
                id="button-addon1"
                onClick={this.clearSearch}
                >
                  Clear
              </button>

              <input 
                type="text" 
                name="name"
                className="form-control" 
                placeholder="May the force be with you" aria-label="Example text with button addon" aria-describedby="button-addon1"
                value={this.state.search}
                onChange={this.handleChange}
                >  
              </input>
            </div>
          </form>
        </section>
        <main>
          <table className="table table-striped table-dark table-hover" >
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth date</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Homeworld</th>
                <th>Species</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.results.map(function(result){
                  return(
                    <tr>
                      <td>{result.name}</td>
                      <td>{result.birth_year}</td>
                      <td>{result.height}</td>
                      <td>{result.mass}</td>
                      <td>{result.homeworld}</td>
                      <td>{result.species}</td>
                    </tr>
                  )
                })

              }
            </tbody>
          </table>

        </main>
        <section id="pagination"></section>
      </div>
    );
  }

}


export default App;
