import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenu = ({ listId, handleSelect }) => {
    return (
        <>
            <label htmlFor="selectId">
                <span className='visually-hidden'>Select List ID</span>
            </label>
            <select value={listId} onChange={handleSelect} id='selectId'>
                <option value=''>All</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </select>
        </>
    );
};

DropdownMenu.propTypes = {
    listId: PropTypes.string,
    handleSelect: PropTypes.func
}

export default DropdownMenu;