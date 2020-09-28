import React, {Component} from 'react';

class TableHeader extends Component {
    render() {

        const {columns} = this.props

        return (
            <thead>
            <tr>
                {
                    columns.map((column, index) =>
                        <th key={index} onClick={() => this.raiseSort(column.path)} style={{cursor: 'pointer'}}>
                            {column.label} {this.renderSortingIcon(column)}
                        </th>)
                }
            </tr>
            </thead>
        );
    }

    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn}

        if (path !== 'like' && path !== 'delete') {
            if (sortColumn.path === path) {
                sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc'
            } else {
                sortColumn.path = path;
                sortColumn.order = 'asc'
            }
            this.props.onSort(sortColumn)
        }
    }

    renderSortingIcon = (column) => {
        const {sortColumn} = this.props
        if (column.path !== 'like' && column.path !== 'delete') {
            if (column.path !== sortColumn.path) return null
            if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true"></i>

            return <i className="fa fa-sort-desc" aria-hidden="true"></i>
        }
    }
};


export default TableHeader;
