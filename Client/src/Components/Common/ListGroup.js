import React from 'react';
import PropTypes from "prop-types";

const ListGroup = (props) => {

    const {genres, onItemSelect, selectedGenre, textProperty, valueProperty} = props
    return (
        <div>
            <ul className="list-group">
                {
                    genres.map(genre => <li onClick={() => onItemSelect(genre)} key={genre[valueProperty]} className={selectedGenre===genre ? "list-group-item active":"list-group-item"} style={{cursor: 'pointer'}}>
                        {genre[textProperty]}
                    </li>)
                }
            </ul>
        </div>
    );
};

ListGroup.defaultProps = {
    textProperty:'name',
    valueProperty: '_id'
}

ListGroup.propTypes = {
    genres: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
