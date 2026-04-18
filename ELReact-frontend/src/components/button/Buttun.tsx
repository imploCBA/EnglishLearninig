import React from 'react';
import style from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={style.btn}>
      {text}
    </button>
  );
};

export default Button;