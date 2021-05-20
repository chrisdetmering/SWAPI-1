import './App.css';
import axios from 'axios';
import React from 'react';

//IN PROGRESS============
// Deliverables
  // The home page should have a table of star wars character
  // Each row should contain the character’s:
      // Name
      // Birth date
      // Height
      // Mass
      // Homeworld
      // Species
  // The table should automatically populate when opening the home page
  // The table should be limit results to 10 characters at a time
  // There should be a single input element for searching a specific user

//DONE=================

  //http://swapi.dev/api/people/?search=NAME === search on partial query, but need to learn to refine.
  //http://swapi.dev/api/people === everybody, but returns only 10
  //http://swapi.dev/api/people/?page={$'integer'} === one of nine pages of characters
let API = "http://swapi.dev/api/people/?page=1"


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      results:[]
    }
  }
  
  
  componentDidMount() {
    axios.get(API)
    .then(response => {
      // console.log(response.data.results);
      this.setState({
        results:[...response.data.results]
      })
      this.state.results.forEach((char)=>console.log(char.name))
    })
    .catch(error => {
      console.log(error);
    });
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

            </tbody>
          </table>

        </main>
        <section id="pagination"></section>
      </div>
    );
  }

}


export default App;
