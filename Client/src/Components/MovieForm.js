import React from 'react';
import Form from "./Common/Form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import {getMovie, saveMovie} from "../services/movieService";

class MyComponent extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        error: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number In Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    }

    async populateGenre() {
        const {data: genres} = await getGenres()
        this.setState({genres});
    }

    async populateMovie() {

        try {
            const movieId = this.props.match.params.id
            if (movieId === 'new') return
            const {data: movie} = await getMovie(movieId)
            this.setState({data: this.mapToViewModel(movie)});
        } catch (error) {
            if (error.response && error.response.status === 404)
                this.props.history.replace('/page-not-found')
        }
    }

    async componentDidMount() {
        await this.populateGenre()
        await this.populateMovie()

    }

    render() {
        return (
            <div className='m-4'>
                <div className='m-4'>
                    <div className="row">
                        <div className='col-sm-4 offset-md-3'>
                            <h1 className='mb-4'>Movie Form</h1>
                            <form onSubmit={this.submitHandler}>
                                {this.renderInput('title', 'Title')}
                                {this.renderSelect('genreId', 'Genre Id', this.state.genres)}
                                {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                                {this.renderInput('dailyRentalRate', 'Rate')}
                                {this.renderButton('Save')}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = async () => {
        await saveMovie(this.state.data)
        this.props.history.push('/movies')
    }
};

export default MyComponent;
