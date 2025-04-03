import React, {useState} from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/reducers/filterSlice';

const Filter: React.FC = () => {
        const [filterText, setFilterText] = useState('');
        const dispatch = useDispatch();
    
        const handleFilterChange = (event: SelectChangeEvent<string>) => {
            const selectedFilter = event.target.value;
            setFilterText(selectedFilter);
            dispatch(setFilter(selectedFilter));
        }

  return (
    <FormControl fullWidth>
      <InputLabel id="filter-select-label">Filter by</InputLabel>
      <Select
        labelId="filter-select-label"
        value={filterText}
        onChange={handleFilterChange}
        label="Filter by"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="favorites">Favorites</MenuItem>
        <MenuItem value="non-favorites">Non-Favorites</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Filter;