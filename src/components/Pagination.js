import React from 'react';

const Pagination = props => {
    return(
        <section id="pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li 
                className="page-item page-link"
                onClick={props.prevPage}
              >
                Previous
              </li>
              {props.results.length !== 0 ? props.peopleCall.map((call, index) => {
                return(
                  <li
                    key={index} 
                    className="page-item page-link"
                    onClick={() => props.pageSelect(call, index)}
                  >
                    {index+1}
                  </li>
                )
              }) : 
                <li
                  className="page-item page-link"
                >
                  1
                </li>
              }
              
              <li 
                className="page-item page-link"
                onClick={props.nextPage}
                >
                  Next
              </li>
            </ul>
          </nav>
        </section>
    )

}

export default Pagination;