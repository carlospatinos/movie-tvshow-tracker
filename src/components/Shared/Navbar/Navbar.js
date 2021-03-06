import React from 'react';
import './Navbar.css';

import { UISref, UISrefActive } from '@uirouter/react'

function signout() {    
    sessionStorage.removeItem("user");
    document.location.reload();
}


const Navbar = () => {
    return (
        <div className = "navbar">                               
        <header className="custom-bg fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
                <nav className="f6 fw6 ttu tracked moviesheading">
            
                    <div class="dropdown">
                        <a class="dim dib mr3">Movies</a>
                        <div class="dropdown-content">
                        <UISrefActive class="active"><UISref to="upcoming"  params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Upcoming</a></UISref></UISrefActive> 
                        <UISrefActive class="active"><UISref to="toprated"  params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Top Rated</a></UISref></UISrefActive> 
                        <UISrefActive class="active"><UISref to="popular" params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Popular</a></UISref></UISrefActive> 
                        <UISrefActive class="active"><UISref to="nowPlaying"  params={{ username: sessionStorage.getItem("user") }}><a className="mr3">Now Playing</a></UISref></UISrefActive>   
                        </div>
                    </div>

                <div class="dropdown">
                    <a class="dim dib mr3">TV</a>
                    <div class="dropdown-content">                    
                            <UISrefActive class="active"><UISref to="TVpopular" params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Popular</a></UISref></UISrefActive>                     
                            <UISrefActive class="active"><UISref to="TVairingToday" params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Airing Today</a></UISref></UISrefActive>                     
                            <UISrefActive class="active"><UISref to="TVOnTheAir" params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">On The Air</a></UISref></UISrefActive>                     
                            <UISrefActive class="active"><UISref to="TVTopRated" params={{ username: sessionStorage.getItem("user") }}><a className="dib mr3">Top Rated</a></UISref></UISrefActive>                     
                    </div>
                    </div>
                
                <div class="dropdown">
                    <a class="dim dib mr3">Watchlist</a>
                    <div class="dropdown-content">                    
                            <UISrefActive class="active"><UISref to="watchlist" params={{ username: sessionStorage.getItem("user") }}><a className="link dim mr3">Movies</a></UISref></UISrefActive>
                            <UISrefActive class="active"><UISref to="TVwatchlist" params={{ username: sessionStorage.getItem("user") }}><a className="link dim mr3">TV</a></UISref></UISrefActive>
                    </div>
                </div>
           
                    
            
            {!sessionStorage.getItem("user") ?
            <span className = "loginDetails">            
                <UISrefActive class="active"><UISref to="login" params={{ username: sessionStorage.getItem("user") }}><a className="dim dib mr3">Sign In</a></UISref></UISrefActive> 
                <UISrefActive class="active"><UISref to="register" params={{ username: sessionStorage.getItem("user") }}><a className="dim dib mr3">Register</a></UISref></UISrefActive> 
            </span>     
            : <span className="loginDetails">
                <p className="dib mr3">Signed in as {sessionStorage.getItem("user")}</p>
                <a className="dim dib mr3" onClick={signout}>Sign Out</a>            
            </span> 
    }            
        </nav>
      </header>
        </div>
    );
};

export default Navbar;




// <a onClick={comingSoon} className="dim dib mr3" >Report Bug / Suggest Features</a> 


