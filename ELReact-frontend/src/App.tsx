import DbControl from "./components/DbControl";
import style from './App.module.css';
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {

  const [currentPage, setCurrentPage] = useState('learn');

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return <p>Learn Page</p>;
      case 'database':
        return <DbControl />;
    }
  };


  return (
    <>
      <Header setPage={setCurrentPage} />
      <div className={style.conteiner}>
        {renderPage()}
      </div>
    </>
  );
}

export default App;