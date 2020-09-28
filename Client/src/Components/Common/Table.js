import React from 'react';
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = (props) => {
    const {data: movies, sortColumn, columns, onLike, onDelete, onSort} = props
    return (
        <table className="table table-bordered">
            <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn}/>
            <TableBody data={movies} columns={columns} onLike={onLike} onDelete={onDelete}/>
        </table>
    );
};

export default Table;
