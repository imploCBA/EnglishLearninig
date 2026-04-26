import style from './Select.module.css';

interface SelectProps {
    defaultValue?: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
}

const Select: React.FC<SelectProps> = ({ defaultValue, value, onChange, options }) => {
    return (
        <select
            className={style.select}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value={""}>
                {defaultValue || "Select an option"}
            </option>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;