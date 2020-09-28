import React, {Component} from 'react';
import {deleteMovie, getMovies} from "../services/movieService";
import {getGenres} from "../services/genreService";
import Pagination from "./Common/Pagination";
import {paginate} from "../Utils/Paginate";
import ListGroup from "./Common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from 'lodash'
import {Link} from "react-router-dom";
import SearchBox from "./Common/SearchBox";
import {toast} from "react-toastify";

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        searchQuery: '',
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'},
    }

    async componentDidMount() {
        const {data} = await getGenres()
        const genres = [{_id: "", name: 'All Genres'}, ...data]
        const {data: movies} = await getMovies()
        this.setState({
            movies,
            genres
        });
    }

    render() {

        const {length: count} = this.state.movies
        const {pageSize, currentPage, movies: allMovies, genres: allGenres, selectedGenre, sortColumn, searchQuery} = this.state
        const {user} = this.props

        // if (count === 0)
        //     return <div><p className='lead'>There are no movies in database!</p></div>

        const {totalCount, data} = this.getPageData();

        return (
            <div className="row text-center m-5">
                <div className="col-md-2 text-left">
                    <ListGroup genres={allGenres} selectedGenre={selectedGenre}
                               onItemSelect={this.onListItemsSelectHandler}/>
                </div>
                <div className="col-md-8 text-left">
                    <div>
                        {user &&
                        <Link className='btn btn-sm btn-primary mb-4' to='movies/new'>
                            New Movie
                        </Link>}
                        <div className='mb-4 ml-2'>
                            <span>Showing {totalCount} movies in the database</span>
                        </div>
                        <SearchBox value={searchQuery} onChange={this.searchHandler}/>
                        <MoviesTable movies={data} onSort={this.sortHandler} onLike={this.likeHandler}
                                     onDelete={this.deleteHandler} sortColumn={sortColumn}/>
                        <Pagination itemCount={totalCount} pageSize={pageSize} currentPage={currentPage}
                                    onPageChange={this.onPageChangeHandler}/>
                    </div>
                </div>
            </div>
        );
    }

    deleteHandler = async (movie) => {
        let originalMovieList = this.state.movies
        let movies = originalMovieList.filter(m => {
            return m._id !== movie._id
        })
        this.setState({
            movies: movies
        });

        try {
            await deleteMovie(movie._id)
        } catch (error) {
            if (error.response && error.response.status === 404)
                toast.error("This movie is already deleted")
            this.setState({movies: originalMovieList});
        }
    }
    likeHandler = (movie) => {
        let movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movie}
        movies[index].liked = !movies[index].liked
        this.setState({movies});
    }
    onPageChangeHandler = (page) => {
        this.setState({currentPage: page});
    }
    onListItemsSelectHandler = (genre) => {
        this.setState({selectedGenre: genre, searchQuery: '', currentPage: 1});
    }
    sortHandler = (sortColumn) => {
        this.setState({sortColumn});
    }
    searchHandler = (query) => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }
    getPageData = () => {
        const {pageSize, currentPage, sortColumn, selectedGenre, searchQuery, movies: allMovies} = this.state

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
        }
        const sortedMovies = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sortedMovies, currentPage, pageSize)

        return {totalCount: filtered.length, data: movies}
    }
}

export default Movies;
