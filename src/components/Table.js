import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';

const Table = ({ filteredData, listId, setListId }) => {

    const handleSelect = (e) => {
        setListId(e.target.value);
    };

    return (
        <table aria-label='data-table'>
            <thead>
                <tr>
                    <th className='first-header'>
                        List ID
                        <DropdownMenu listId={listId} handleSelect={handleSelect} />
                    </th>
                    <th className='second-header'>ID</th>
                    <th className='third-header'>Name</th>
                </tr>
            </thead>
            <tbody>
                {filteredData && filteredData.map((item) => (
                    <tr key={item.id} data-testid='data-row'>
                        <td>{item.listId}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr> 
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    filteredData: PropTypes.array,
    listId: PropTypes.string,
    setListId: PropTypes.func
}

export default Table;