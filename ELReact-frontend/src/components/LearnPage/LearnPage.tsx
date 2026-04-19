import style from './LearnPage.module.css';
import Button from '../Button/Buttun';
import TextBox from '../TextBox/TextBox';

const LearnPage = () => {



  
  return (
    <div className={style.conteiner}>
      <h1>Learn Page</h1>
      <TextBox text='text text text ext text text text text text text  text text  text text text text text text text text text text'/>
      <TextBox text='text text text'/>
      <div>
        <Button text='Open' onClick={() => alert('open!')} />
        <Button text='Good' onClick={() => alert('next!')} />
        <Button text='Bad' onClick={() => alert('next!')} />
      </div>
    </div>
  );
};

export default LearnPage;