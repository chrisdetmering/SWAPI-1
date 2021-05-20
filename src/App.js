import './App.css';
import axios from 'axios';
import React from 'react';

//IN PROGRESS============
// Deliverables
  // The table should be limit results to 10 characters at a time
    //implying you should be able to more, but 10 at a time. 
  // There should be a single input element for searching a specific user

let API = "http://swapi.dev/api/people/?page=1"



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      results:[]
    }
    this.getPlanets = this.getPlanets.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.getOtherData = this.getOtherData.bind(this);
    
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
    axios.get(API)
    .then((response) => this.getOtherData(response.data.results))
  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <h1>SWAPI</h1>
          <p>A New Hope</p>
        </header>
        <section id="search"></section>
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
