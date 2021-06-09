import { useState, useEffect } from 'react';

export const useFilter = ({ searchValue, listId, originalData}) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let dataList = [...originalData];

        const filterBySearchVal = (arr) => {
            return arr.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        };
        const filterByListId = (arr) => {
            return arr.filter((item) => item.listId === parseInt(listId, 10));
        };

        if (searchValue && listId) {
            dataList = filterBySearchVal(dataList);
            dataList = filterByListId(dataList);
            setFilteredData(dataList);
        } else if (searchValue) {
            dataList = filterBySearchVal(dataList);
            setFilteredData(dataList);
        } else if (listId) {
            dataList = filterByListId(dataList);
            setFilteredData(dataList);
        } else setFilteredData(originalData);
        
    }, [searchValue, listId, originalData])
    
    return [filteredData];
};