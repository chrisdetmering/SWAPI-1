import React from 'react';

const Table = props => {
    return(
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
            props.results.map(function(result, index){
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
    )

}

export default Table;