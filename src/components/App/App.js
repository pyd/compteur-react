import logo from './logo.svg';
import styles from './App.module.css';
import Counter from '../Counter/Counter';

//TODO utiliser une classe à la place d'une fonction
function App() {
  return (
    <div id={styles.app}> 
        <header className={styles.appHeader}>
            <img src={logo} className={styles.logo} alt="react logo" />
            <p className={styles.description}>
            Component : Compteur d'occupation d'une salle
            </p>    
        </header> 
        <div className={styles.main}>
            <div className={styles.componentContainer}><Counter max="12" /></div>
        </div>
    </div>   
  );
}

export default App;
