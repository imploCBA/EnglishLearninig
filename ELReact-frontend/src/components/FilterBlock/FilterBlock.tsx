import type React from 'react';
import styles from './FilterBlock.module.css';
import Button from '../Button/Buttun';
import Select from '../Select/Select';

interface FilterBlockProps {
    header: string;
    changeFilter: (value: string) => void;
    filterVal: string;
    options?: string[];
}

const FilterBlock:React.FC<FilterBlockProps> = ({ header = "", filterVal, changeFilter, options }) => {

 return (
    <div className={styles.filter}>
        <h2>{header}</h2>
        <Select
            defaultValue='All Lessons'
            value={filterVal}
            onChange={changeFilter}
            options={options || undefined}
        />
        {filterVal && (
            <Button text="Reset Filter" onClick={() => changeFilter('') } type="button" />
        )}
    </div>
 );   
};

export default FilterBlock;

