import { useState } from 'react';
import './App.css';

function App() {
  // Состояния с явно указанными типами
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('вариант 1');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [outputMessage, setOutputMessage] = useState<string>('');

  // Функция обновления сообщения
  const updateMessage = (): void => {
    let message = `Вы ввели: "${inputValue}". `;
    message += `Выбрано: ${selectedOption}. `;
    message += `Чекбокс ${isChecked ? 'включён' : 'выключен'}.`;
    setOutputMessage(message);
  };

  // Обработчики событий с типизированными параметрами
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    updateMessage();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
    updateMessage();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    updateMessage();
  };

  const handleButtonClick = (): void => {
    updateMessage();
  };

  return (
    <div className="container">
      <h2>Моя первая React-страница (TypeScript)</h2>

      <div className="form-group">
        <label>Текстовое поле:</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите что-нибудь..."
        />
      </div>

      <div className="form-group">
        <label>Выпадающий список:</label>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="вариант 1">Вариант 1</option>
          <option value="вариант 2">Вариант 2</option>
          <option value="вариант 3">Вариант 3</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Чекбокс
        </label>
      </div>

      <div className="form-group">
        <button onClick={handleButtonClick}>Обновить фразу</button>
      </div>

      <div className="output">
        <h3>Результат:</h3>
        <p>{outputMessage}</p>
      </div>
    </div>
  );
}

export default App;