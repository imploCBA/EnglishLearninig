import style from './Header.module.css';

interface HeaderProps {
    setPage: (page: string) => void;
}

const Header = ({ setPage }: HeaderProps) => {
    return (
    <header className={style.header}>
        <h1 className={style.logo}>📚ELReact</h1>
        <nav className={style.nav}>
            <p className={style.btn} onClick={() => setPage('learn')}>Learn</p>
            <p className={style.btn} onClick={() => setPage('database')}>DataBase</p>
        </nav>
    </header>);
};

export default Header;