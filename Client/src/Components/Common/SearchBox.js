import React from 'react';
import Input from "./Input";

const SearchBox = ({value, onChange}) => {
    return (
       <div className='row'>
           <div className="col-sm-4">
               <Input name='query'
                      type='text'
                      placeholder='Search...'
                      value={value}
                      onChange={e => onChange(e.currentTarget.value)}
                      className='form-control my-3'
               />
           </div>
       </div>
    );
};

export default SearchBox;
