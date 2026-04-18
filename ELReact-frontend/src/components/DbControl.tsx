import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/items';

interface Sentence {
  id: number;
  sentence: string;
  translate: string;
  lessonNumber: string;
}

function DbControl() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [selectedIndices, setSelectedIndices] = useState('');
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterLesson, setFilterLesson] = useState('');
  
  // State для формы добавления
  const [newSentence, setNewSentence] = useState({
    sentence: '',
    translate: '',
    lessonNumber: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  // Загружаем все предложения
  const loadSentences = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      setSentences(data);
    } catch (error) {
      setError('Ошибка загрузки данных');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSentences();
  }, []);

  // Добавление нового предложения
  const handleAddSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError('');
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSentence),
      });
      
      if (!response.ok) throw new Error('Ошибка при добавлении');
      
      // Очищаем форму
      setNewSentence({ sentence: '', translate: '', lessonNumber: '' });
      // Перезагружаем список
      await loadSentences();
      
      alert('Предложение успешно добавлено!');
    } catch (error) {
      setError('Не удалось добавить предложение');
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  // Получить предложения по индексам
  const fetchSentencesByIndices = async () => {
    setLoading(true);
    setError('');
    
    const indices = selectedIndices.split(',').map(i => parseInt(i.trim()));
    
    try {
      const response = await fetch(`${API_URL}/by-indices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ indices }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setFilteredSentences(data);
    } catch (error) {
      setError('Ошибка получения данных по индексам');
    } finally {
      setLoading(false);
    }
  };

  const getUniqueLessons = () => {
    const lessons = new Set(sentences.map(s => s.lessonNumber));
    return Array.from(lessons).sort();
  };

  const getFilteredByLesson = () => {
    if (!filterLesson) return sentences;
    return sentences.filter(s => s.lessonNumber === filterLesson);
  };

  const displayedSentences = filterLesson ? getFilteredByLesson() : sentences;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📚 Изучение английского языка</h1>
      
      {error && <div style={{ color: 'red', margin: '10px 0', padding: '10px', backgroundColor: '#ffeeee', borderRadius: '5px' }}>{error}</div>}
      
      {/* Форма добавления нового предложения */}
      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
        <h3>➕ Добавить новое предложение</h3>
        <form onSubmit={handleAddSentence}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Предложение на английском"
              value={newSentence.sentence}
              onChange={(e) => setNewSentence({...newSentence, sentence: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Перевод на русский"
              value={newSentence.translate}
              onChange={(e) => setNewSentence({...newSentence, translate: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Номер урока (например: Lesson 1)"
              value={newSentence.lessonNumber}
              onChange={(e) => setNewSentence({...newSentence, lessonNumber: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={isAdding}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
          >
            {isAdding ? 'Добавление...' : 'Добавить предложение'}
          </button>
        </form>
      </div>
      
      {/* Фильтр по урокам */}
      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Фильтр по урокам:</h3>
        <select 
          value={filterLesson} 
          onChange={(e) => setFilterLesson(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value="">Все уроки</option>
          {getUniqueLessons().map(lesson => (
            <option key={lesson} value={lesson}>{lesson}</option>
          ))}
        </select>
        {filterLesson && (
          <button onClick={() => setFilterLesson('')} style={{ padding: '5px 10px' }}>
            Сбросить фильтр
          </button>
        )}
      </div>
      
      {/* Статистика */}
      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <strong>📊 Статистика:</strong> Всего предложений: {sentences.length}, 
        Уроков: {getUniqueLessons().length}
      </div>
      
      {/* Таблица всех предложений */}
      <div style={{ margin: '20px 0', overflowX: 'auto' }}>
        <h3>Все предложения ({displayedSentences.length}):</h3>
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <tr>
                <th>Индекс</th>
                <th>ID</th>
                <th>Урок</th>
                <th>Предложение (English)</th>
                <th>Перевод (Russian)</th>
              </tr>
            </thead>
            <tbody>
              {displayedSentences.map((sentence, index) => (
                <tr key={sentence.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td>{index}</td>
                  <td>{sentence.id}</td>
                  <td>{sentence.lessonNumber}</td>
                  <td style={{ fontStyle: 'italic' }}>{sentence.sentence}</td>
                  <td>{sentence.translate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Получение по индексам */}
      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h3>🔍 Получить предложения по индексам:</h3>
        <input 
          type="text" 
          placeholder="Например: 0,2,4"
          value={selectedIndices}
          onChange={(e) => setSelectedIndices(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button 
          onClick={fetchSentencesByIndices} 
          disabled={loading}
          style={{ padding: '8px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Получить
        </button>
        
        {filteredSentences.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>📖 Выбранные предложения:</h4>
            {filteredSentences.map((sentence, idx) => (
              <div key={idx} style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}>
                <strong>Урок {sentence.lessonNumber}:</strong><br />
                <span style={{ fontStyle: 'italic', color: '#2196F3' }}>{sentence.sentence}</span><br />
                <span style={{ color: '#666' }}>{sentence.translate}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DbControl;