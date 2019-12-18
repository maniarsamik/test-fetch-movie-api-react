import React, { Component } from 'react';


class FetchApiTest extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], };
    }
    

    componentDidMount() {
        fetch("https://www.omdbapi.com/?s=dil&apikey=fc52ae74")
            .then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    data: findresponse.Search,
                })
            })
    }

    render() {
        const ListData = this.state.data.map((d, key) =>
            <div className="col mb-4">
                <div className="card h-100">
                    <img src={d.Poster} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{d.Title}</h5>
                        <p className="card-text"><small className="text-muted">{d.Year}</small></p>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="container">
                <div className="bd-example">
                    <div className="row row-cols-1 row-cols-md-3">
                        {ListData}
                    </div>
                </div>
            </div>
        );
    }
}
export default FetchApiTest;