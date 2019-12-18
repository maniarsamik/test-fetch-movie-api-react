import React, { Component } from 'react';
import axios from "axios";

class FetchApiTestSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], searchMovie: '', movieName: '', movieYear: '' };

    }
    search = event => {
        event.preventDefault();
        axios
            .get(

                `https://www.omdbapi.com/?apikey=fc52ae74&s=${
                this.state.searchMovie
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ data: [] });
                    return;
                }
                const data = res.Search;
                this.setState({
                    data,
                });
            });
    };
    handleChange = event => {
        console.log(event.target.value)
        this.setState({
            searchMovie: event.target.value
        });
    };
    deleteMovie = (i) => {
        const list = this.state.data;
        list.splice(i, 1);
        this.setState({ data: list });
    }
    editMovie = (d, i) => {
        console.log("test");
    }

    render() {
        const ListData = this.state.data.map((d, i) =>
            <div className="col mb-4" key={i}>
                <div className="card h-100">
                    <img src={d.Poster} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{d.Title}</h5>
                        <p className="card-text"><small className="text-muted">{d.Year}</small></p>
                        <button className="btn btn-outline-secondary" onClick={() => this.editMovie(d, i)}>Edit</button>
                        <button className="btn btn-outline-secondary" onClick={() => this.deleteMovie(i)}>Delete</button>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="Main">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form className="input-group mb-3" onSubmit={this.search}>
                                <input type="text" className="form-control" ref="itemName" placeholder="Search for movies name" aria-describedby="button-addon2" onChange={this.handleChange} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bd-example">
                        <div className="row row-cols-1 row-cols-md-3">
                            {ListData}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FetchApiTestSearch;