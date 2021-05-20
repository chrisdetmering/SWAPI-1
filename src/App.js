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
  // There should be a single page (Home page)
  // Uses the swapi.dev API to pull in data
let API = "https://swapi.dev/api/people"

class App extends React.Component{
  componentDidMount() {
    axios.get(API)
    .then(response => {
      console.log(response.data);
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
          <table>
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
          </table>

        </main>
        <section id="pagination"></section>
      </div>
    );
  }

}


export default App;
