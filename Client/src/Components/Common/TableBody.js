import React, {Component} from 'react';
import _ from 'lodash'

class TableBody extends Component {
    render() {
        const {data, columns} = this.props
        return (
            <tbody>
            {
                data.map((item, indx) =>
                    <tr key={indx}>
                        {columns.map((column, index) =>
                            <td key={index}>{this.renderCell(item, column)}</td>
                        )}
                    </tr>
                )
            }
            </tbody>
        );
    }

    renderCell = (item, column) => {
        if (column.content) return column.content(item)
        return _.get(item, column.path)
    }

}

export default TableBody;
