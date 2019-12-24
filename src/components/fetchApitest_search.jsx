import React, { Component } from 'react';
import axios from "axios";
import styled from 'styled-components';
class FetchApiTestSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], searchMovie: '', movieName: '', movieYear: '', top: -100, singleMovie:{}, };

    }
    search = event => {
        event.preventDefault();
        axios.get(`https://www.omdbapi.com/?apikey=fc52ae74&s=${
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
        this.setState({
            searchMovie: event.target.value
        });
    };
    deleteMovie = (i) => {
        const list = this.state.data;
        list.splice(i, 1);
        this.setState({
            data: list, top: 16,
        }, () => {
            setTimeout(() => {
                this.setState({
                    top: -100,
                });
            }, 3000);
        });
    }
    openDeleteModal = (d) => {
        console.log(d);
        this.setState({singleMovie:d})
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
                        <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.openDeleteModal(d)}>Delete</button>
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
                                <input type="text" className="form-control" placeholder="Search for movies name" aria-describedby="button-addon2" onChange={this.handleChange} />
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
                <DeleteNotification top={this.state.top}>Deleted {this.state.singleMovie.Title} Movie from List</DeleteNotification>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure want to delete "{this.state.singleMovie.Title}" Movie from list?
                            </div>
                            <div className="modal-footer" style={{ backgroundColor: 'red', color: 'white' }}>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={() => this.deleteMovie(this.state.singleMovie.imdbID)} data-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const DeleteNotification = styled.div`background-color: #ff0000; color: white; padding: 16px; position: absolute; top: ${props => props.top}px; right: 16px; z-index: 999; transition: top 0.5s ease;`;
export default FetchApiTestSearch;