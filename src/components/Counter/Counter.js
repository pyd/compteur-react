import React from 'react';
import Progress from '../CircularProgressBar/index';
import styles from './Counter.module.css';

//TODO rename this component
/**
 * show a counter of the places in a hall
 * how many max, how many taken, how many free
 * ratio of taken places in %
 * 2 buttons to add or remove one unit
 * 
 */
export default class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.max = Number(props.max);
    // flag to skip execution of increment() when max is reached
    this.roomFull = false;
    // flag to skip execution of decrement() when 0 is reached
    this.roomEmpty = true;
    // count number of people in the hall
    this.state = {counter: 0};
    this.incrementBtn = React.createRef();  // use this.incrementBtn.current to get the element
    this.decrementBtn = React.createRef();
    this.resetBtn = React.createRef();
  }

  /**
   * add one to the counter
   * @param {*} e 
   * @returns 
   */
  increment(e) {

    e.preventDefault();
    // room is full, cannot add one, skip execution
    if (this.roomFull) return;
    
    // upade state
    let count = this.state.counter + 1;
    this.setState({counter: count});
    this.roomEmpty = false;

    // handle room limits
    if (count === this.max) {
      this.roomFull = true;
      this.incrementBtn.current.disabled = true;
    } else {
      this.decrementBtn.current.disabled = false;
    }
  }
  
  /**
   * remove one to the counter
   * @param {*} e 
   * @returns 
   */
  decrement(e) {
    //TODO move it to componentDidMount hook
    e.preventDefault();  
    // room is empty, cannot remove one, skiop execution
    if (this.roomEmpty) return;

    // upade state
    let count = this.state.counter - 1;
    this.setState({counter: count});
    this.roomFull = false;

    // handle room limits
    if (count === 0) {
      this.roomEmpty = true;
      this.decrementBtn.current.disabled = true;
    } else {
      this.incrementBtn.current.disabled = false;
    }
  }

  /**
   * set counter to 0
   */
  resetCounter() {
    this.setState({counter: 0});
  }

  componentDidMount() {
    this.incrementBtn.current.addEventListener('click', (e) => {
      this.increment(e);
    })
    this.decrementBtn.current.addEventListener('click', (e) => {
      this.decrement(e);
    })
    this.resetBtn.current.addEventListener('click', (e) => {
      e.preventDefault();
      this.resetCounter();
    })
  }

  /**
   * get the % of occupied sits with one decimal
   * @returns number
   */
  progress(decimal) {
    return (this.state.counter / this.max * 100).toFixed(decimal);
  }

  render() {
    return <div className={styles.counterContainer}>

      <header className={styles.counterHeader}>
        Compteur de places
      </header>
      
      <div className={styles.content}>

        <section className={styles.counters}>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Occupées</div>
            <div className={styles.countersValue}>{this.state.counter}</div>
          </div>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Libres</div>
            <div className={styles.countersValue}>{this.max - this.state.counter}</div>
          </div>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Total</div>
            <div className={styles.countersValue}>{this.max}</div>
          </div>
        </section>

        <div className={styles.main}>

          <div className={styles.progress}>
            <Progress
              strokeWidth="20"
              sqSize="160"
              percentage={this.progress(1)} />
              <button ref={this.resetBtn} className={styles.resetButton}>R</button>
          </div>

          <div className={styles.buttons}>
            <button ref={this.incrementBtn} className={styles.counterButton}>+</button>
            <button ref={this.decrementBtn} className={styles.counterButton}>-</button>
          </div>
          
        </div>

      </div>

    </div>
  }
}