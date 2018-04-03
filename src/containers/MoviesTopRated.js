import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';

 import Options from "../components/Movies/Options/Options";
import Navbar from '../components/Shared/Navbar/Navbar';


class Movies extends Component {  
  constructor() {    
    super()
    this.state = {
      baseURL: "http://image.tmdb.org/t/p/w185/",           
      topRated: [],      
      genres: [],
      genreList: [],     
      watchlistIds: [],
      watchedIds: []
      
    }        
  }


  componentDidMount() {  

    this.getWatchlist(); 
    this.getWatched(); 

    fetch('https://safe-bayou-79396.herokuapp.com/genres')
    .then(response => response.json())
      .then(genre => { 
        this.setState({genreList: genre.genres, genres: genre});           
            
            fetch('https://safe-bayou-79396.herokuapp.com/topRated')
              .then(response => response.json())
              .then(mov => { this.setState({ topRated: this.addingGenres(mov, genre) })})    
      })  
      
  }

  addingGenres = (mov, genre) => {
    mov.forEach(m => {                          
      m.genres = m.genre_ids.map(id => {                        
        id = genre.genres.find(g => {
          return (g.id === id);
        }).name;
        return id;
      })            
    });           
    return mov;
  }

  onSortingChange = (event) => {      
    if (event.target.value === "rating") {      
    
      this.sortRating(this.state.topRated);    
      this.setState({ topRated: this.state.topRated })
      
    }
    else if (event.target.value === "date") {
      
      this.sortDates(this.state.topRated);    
      this.setState({ topRated: this.state.topRated })
      
    }
  }

    sortRating = function (arrays) {      
      arrays.sort(function (a, b) {        
        return b.vote_average - a.vote_average;
      });
    }
    sortDates = function (arrays) {      
      arrays.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }
    

  onSearchTextChange = (event)=> {   
    
    var search = event.target.value;    
    fetch('https://safe-bayou-79396.herokuapp.com/search', {method:'post',  headers: {'Content-Type' : 'application/json'},body: JSON.stringify({searchMovies: search})})
    .then(response => response.json())
      .then(mov => {
        this.setState({
            topRated: this.addingGenres(mov, this.state.genres)          
        })
      })    
    .catch(err => console.log(err))
  }

  onGenreChange = (event => {        
    var movieGenres = [];
    console.log(this.state.topRated)
    this.state.topRated.forEach(m => {      
      if (Object.values(m.genre_ids).includes(Number(event.target.value))) {
        movieGenres.push(m);
      }      
    });
    if (movieGenres.length > 0)
    {
      this.setState({ topRated: movieGenres })      
    }        
    else
      alert("No movies in that genre");
  })

  getWatchlist = () => {
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
          this.setState({ watchlistIds: list });          
        }
      })
  }  

  getWatched = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/watched', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: sessionStorage.getItem("user")
      })
    })
      .then(response => response.json())
      .then(list => {
        if (list) {
          this.setState({ watchedIds: list });          
        }
      })
  }  

   
  render() {         
    const { topRated, baseURL, genreList,watchlistIds,  watchedIds} = this.state;
    
    return (        
      
        <div>      
          <Navbar></Navbar>
          <div className="tc"> 
            <Options onOptionChange={this.onOptionChange}
              onSortingChange={this.onSortingChange}
              onSearchTextChange={this.onSearchTextChange}
              genreList = {genreList}
            onGenreChange={this.onGenreChange} />  
            <h1>Top Rated Movies</h1>
          {!sessionStorage.getItem("user") ? <div style={{ "background": "red", "color": "white"}}>Your are not signed in</div> : <div></div>}
          {topRated.length > 0 ?
            <MovieList movies={topRated} baseURL={baseURL} opt="Movies" watchlistIds={watchlistIds} watchedIds={watchedIds}/>          
              : <p>Loading</p>
              }
          </div>   
        </div>           
    );
  }
}

export default Movies;

