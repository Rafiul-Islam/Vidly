import React, {Component} from 'react';
import Like from "./Common/Like";
import Table from "./Common/Table";
import {Link} from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {path: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>}
    ]


    deleteButtonVisibility = {
        path: 'delete',
        content: movie => <button onClick={() => this.props.onDelete(movie)} className='btn btn-danger'>Delete</button>
    }

    constructor() {
        super();
        const user = auth.getCurrentUser()
        if (user && user.isAdmin)
            this.columns.push(this.deleteButtonVisibility)

    }

    render() {
        const {movies, onSort, sortColumn} = this.props
        return (
            <Table data={movies} columns={this.columns} sortColumn={sortColumn} onSort={onSort}/>
        );
    }
}


export default MoviesTable;

