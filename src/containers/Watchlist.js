import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';
 
import Navbar from '../components/Shared/Navbar/Navbar';
import Login from './Login';


class Watchlist extends Component {  
  constructor() {    
    super()
    this.state = {     
      watchlist: [],     
      list: [],
      baseURL: "http://image.tmdb.org/t/p/w185/",     
      
    }        
  }



  componentDidMount() {
    if (sessionStorage.getItem("user")) {
      fetch('https://safe-bayou-79396.herokuapp.com/watchlist', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: sessionStorage.getItem("user")
        })
      })
        .then(response => response.json())
        .then(list => {
          if (list) {

            list.forEach(id => {

              fetch('https://safe-bayou-79396.herokuapp.com/id', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: id.movieid,
                  username: sessionStorage.getItem("user")
                })
              })
                .then(response => response.json())
                .then(entry => {
                  this.setState({ watchlist: entry });
                })
            })
          }
        })
    }
  }  
  
  render() {         
    if (sessionStorage.getItem("user")) {
      const { watchlist, list, baseURL } = this.state;    
        if (watchlist.id) {
          list.push(watchlist);  
        }    
        return (  
          <div className="tc">      
            <Navbar></Navbar>
            <br />
            <br />
            <br />
            <br/>
            {list.length > 0 ?
              
              <MovieList movies={list} baseURL={baseURL} />
            
              : <p>Loading</p>
            }  
          </div>      
      
        );  
    }
    else {
      return (<Login></Login>);
    }
    
  }
}

export default Watchlist;



// this.props.$stateParams.username === sessionStorage.getItem("user") ?

  

//  </div>   
//  :  <Login></Login> 

