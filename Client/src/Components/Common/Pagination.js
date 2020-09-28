import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

const Pagination = (props) => {

    const {itemCount, pageSize, onPageChange, currentPage} = props
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount === 1) return null

    let pages = _.range(1, pageCount+1)

    return (
        
        <div className='mt-5'>
            <nav>
                <ul className="pagination">
                    {
                        pages.map(page =>{
                            return <li style={{cursor: 'pointer'}} key={page} className={page === currentPage ? 'page-item active': 'page-item'}>
                                <a onClick={() => onPageChange(page)} className="page-link">{page}</a>
                            </li>
                        })
                    }
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
