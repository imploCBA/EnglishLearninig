import style from './TextBox.module.css';

interface TextBoxProps{
    text: string;
}

const TextBox = ({text}:TextBoxProps)=>{
    return (
        <div className={style.textBox}>
            <p>{text}</p>
        </div>
    );
};

export default TextBox;