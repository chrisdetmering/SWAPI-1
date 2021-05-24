import './App.css';
import axios from 'axios';
import React from 'react';

//IN PROGRESS============
// Deliverables
  // The table should be limit results to 10 characters at a time
    //implying you should be able to more, but 10 at a time. 



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search:'',
      results:[],
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
        'http://swapi.dev/api/people/?page=10'
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
      api:"http://swapi.dev/api/people/?page=1"
    })
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

  
  componentDidMount() {
    this.getAPI(this.state.api)
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
                id="button-addon1"
                onClick={this.userSearch}
                >
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
                this.state.results.map(function(result, index){
                  return(
                    <tr key={index}>
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
          <p>{this.state.results.length === 0  ? this.state.error : ''}</p>
          <nav></nav>

        </main>
        <section id="pagination">
          {/* <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav> */}
        </section>
      </div>
    );
  }

}


export default App;
