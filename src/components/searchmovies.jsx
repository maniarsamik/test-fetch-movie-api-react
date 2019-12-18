import React, { Component } from 'react';
import axios from "axios";
import MovieCard from './moviecard'

class SearchMovies extends Component {
    constructor(props) {
        super(props);
        this.state = { moviesList: ['tt2294629'], searchTerm: '' };
    }

    search = event => {
        event.preventDefault();
        axios
            .get(
                
                `https://www.omdbapi.com/?apikey=fc52ae74&s=${
                this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };
    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;
        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a movie"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        <i className="fa fa-search" />
                    </button>
                </form>
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                        <p>
                            Couldn't find any movie. Please search again using
                            another search criteria.
                    </p>
                    )}
            </div>
        );
    }

}



export default SearchMovies;
