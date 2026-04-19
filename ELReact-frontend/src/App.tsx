import { useState } from "react";
import style from './App.module.css';

import Header from "./components/Header/Header";
import DbControl from "./components/DbControl";
import LearnPage from "./components/LearnPage/LearnPage";

function App() {

  const [currentPage, setCurrentPage] = useState('learn');

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return <LearnPage />;
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