import logo from './logo.svg';
import './App.css';
import Counter from '../OccupancyCounter/OccupancyCounter.js'

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="react logo" />
        <p className="description">
          Component : Compteur d'occupation d'une salle
        </p>
      </header>
      <section id="content">
        <Counter max="12" />
      </section>
    </div>
  );
}

export default App;
