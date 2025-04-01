import React, { useState, useDeferredValue } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/reducers/searchSlice';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        dispatch(setSearchQuery(value));
      };
    
  return (
    <TextField
      label="Search Pokemon"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;