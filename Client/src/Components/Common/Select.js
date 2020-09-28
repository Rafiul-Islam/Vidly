import React from 'react';

const Select = ({name, label, options, error, ...rest}) => {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <select {...rest} name={name} className="form-control" id={name}>
                <option value='' disabled>--Select a genre--</option>
                {
                    options.map((option, index) => {
                        return <option key={index} value={option._id}>
                            {option.name}
                        </option>
                    })
                }
            </select>
            {
                error && <div className="alert alert-danger">{error}</div>
            }
        </div>
    );
};

export default Select;
