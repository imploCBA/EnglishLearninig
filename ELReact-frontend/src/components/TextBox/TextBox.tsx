import style from './TextBox.module.css';

interface TextBoxProps{
    text: string;
    visable?: boolean;
}

const TextBox = ({text, visable = true}:TextBoxProps)=>{
    return (
        <div className={style.textBox}>
            {visable ? <p>{text}</p> : <p>Closed</p>}
        </div>
    );
};

export default TextBox;