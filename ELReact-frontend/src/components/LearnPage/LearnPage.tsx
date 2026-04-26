import { useState, useEffect } from "react";
import style from './LearnPage.module.css';
import Button from '../Button/Buttun';
import TextBox from '../TextBox/TextBox';
import FilterBlock from "../FilterBlock/FilterBlock";

const API_URL = 'http://localhost:8080/api/items';

interface Sentence {
  id: number;
  sentence: string;
  translate: string;
  lessonNumber: string;
}

const LearnPage = () => {

  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [sentence, setSentence] = useState('Loading');
  const [translate, setTranslate] = useState('Loading');
  const [filterLesson, setFilterLesson] = useState('');
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>([]);

  const loadSentences = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      setSentences(data);
      setFilteredSentences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSentences();
  }, []);

  const open = ()=>{
    setAnswer(true);
  }

  const next = ()=>{
    if (loading){
      const id: number = Math.floor(Math.random() * filteredSentences.length);
      
      setSentence(filteredSentences[id].sentence);
      setTranslate(filteredSentences[id].translate);
    }
    setAnswer(false);
  }

  const getUniqueLessons = () => {
    const lessons = new Set(sentences.map(s => s.lessonNumber));
    return Array.from(lessons).sort();
  };

  useEffect(() => {
    if (filterLesson)
      setFilteredSentences(sentences.filter(s => s.lessonNumber === filterLesson));
      next();
  }, [filterLesson]);

  
  return (
    <div className={style.conteiner}>
      <h1>Learn Page</h1>
      <FilterBlock 
        header="Filter by Lesson"
        filterVal={filterLesson}
        changeFilter={setFilterLesson}
        options={getUniqueLessons()}
        />
      <TextBox text={translate}/>
      <TextBox text={sentence} visable={answer}/>
      <div className={style.btnCont}>
        <Button text='Open' onClick={open} type="button" />
        <Button text='Bad' onClick={next} type="button" />
        <Button text='Good' onClick={next} type="button" />
      </div>
    </div>
  );
};

export default LearnPage;