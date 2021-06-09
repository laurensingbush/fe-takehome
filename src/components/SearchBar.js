import React from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ searchValue, setSearchValue }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} aria-label='search-form'>
            <label htmlFor="search-input">
                <span className='visually-hidden'>Search Table</span>
            </label>
            <div className='search-container'>
                <BiSearch className='search-icon' />
                <input 
                    type="text" 
                    aria-label='search input'
                    id='search-input'
                    className='search-input'
                    value={searchValue}
                    onChange={handleChange}
                    placeholder='Search by name'
                    autoComplete='off'
                />
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func
}

export default SearchBar;