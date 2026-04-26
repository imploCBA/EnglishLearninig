import type React from 'react';
import styles from './FilterBlock.module.css';
import Button from '../Button/Buttun';

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
        <select
            className={styles.select}
            value={filterVal}
            onChange={(e) => changeFilter(e.target.value)}
        >
            <option value="">All Lessons</option>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {filterVal && (
            <Button text="Reset Filter" onClick={() => changeFilter('') } type="button" />
        )}
    </div>
 );   
};

export default FilterBlock;

