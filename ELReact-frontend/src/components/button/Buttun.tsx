import React from 'react';
import style from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type: "button"|"submit";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type }) => {
  return (
    <button onClick={onClick} className={style.btn} type={type}>
      {text}
    </button>
  );
};

export default Button;