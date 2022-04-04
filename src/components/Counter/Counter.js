import React from 'react';
import Progress from '../CircularProgressBar/index.js';
import styles from './Counter.module.css';

/**
 * This is a counter of the number of places in a hall
 * 3 counters for total, free and taken places 
 * a child component to display a circular progress bar around the ratio of taken places in %
 * a button (+) to increment the number of the taken places
 * a button (-) to decrement the number of the taken places
 * a button to reset (free all places)
 * 
 * @props
 * max : max number of places in this hall            required
 * taken : number of the taken places in this hall    default to '0'
 * name : the name of the hall                        default to 'Salle de XX places'
 */
export default class Counter extends React.Component {

  static defaultProps = {
    taken: '0',
    name: ''
  }

  constructor(props) {
    super(props);

    this.max = Number(props.max);

    if (this.props.name === '') {
      this.name = 'Salle de ' + this.max + ' places';
    } else {
      this.name = this.props.name;
    };
    // flag to skip execution of increment() when max is reached
    this.roomFull = false;
    // flag to skip execution of decrement() when 0 is reached
    this.roomEmpty = true;
    // count number of people in the hall
    this.state = {taken: Number(props.taken)};
    this.incrementBtn = React.createRef();  // use this.incrementBtn.current to get the element
    this.decrementBtn = React.createRef();
    this.resetBtn = React.createRef();
  }

  /**
   * add one to the count of the taken places
   */
  increment() {

    // room is full, cannot add one, skip execution
    if (this.roomFull) return;
    
    // upade state
    let newTaken = this.state.taken + 1;
    this.setState({taken: newTaken});

    // 
    this.roomEmpty = false;

    // handle room limits
    if (newTaken === this.max) {
      this.roomFull = true;
      this.incrementBtn.current.disabled = true;
    } else {
      this.decrementBtn.current.disabled = false;
    }
  }
  
  /**
   * remove one to the count of the taken places
   */
  decrement() {
    
    // room is empty, cannot remove one, skiop execution
    if (this.roomEmpty) return;

    // upade state
    let newTaken = this.state.taken - 1;
    this.setState({taken: newTaken});
    this.roomFull = false;

    // handle room limits
    if (newTaken === 0) {
      this.roomEmpty = true;
      this.decrementBtn.current.disabled = true;
    } else {
      this.incrementBtn.current.disabled = false;
    }
  }

  /**
   * reset this component to its default state when counter is 0
   */
  reset() {
    this.setState({taken: 0});
    this.roomFull = false;
    this.roomEmpty = true;
    this.incrementBtn.current.disabled = false;
    this.decrementBtn.current.disabled = true;
  }

  componentDidMount() {
    this.incrementBtn.current.addEventListener('click', (e) => {
      e.preventDefault();  
      this.increment();
    })
    this.decrementBtn.current.addEventListener('click', (e) => {
      e.preventDefault();  
      this.decrement();
    })
    if (this.roomEmpty) {
      this.decrementBtn.current.disabled = true;
    }
    this.resetBtn.current.addEventListener('click', (e) => {
      e.preventDefault();
      this.reset();
    })
  }

  /**
   * get the % of occupied sits with one decimal
   * @returns number
   */
  progress(decimal) {
    return (this.state.taken / this.max * 100).toFixed(decimal);
  }

  render() {
    return <div className={styles.counterContainer}>

      <header className={styles.counterHeader}>
        <span data-test="hall-name">
          {this.name}
        </span>
      </header>
      
      <div className={styles.content}>
        <section className={styles.counters}>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Occupées</div>
            <div className={styles.countersValue} data-test="taken-count">{this.state.taken}</div>
          </div>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Libres</div>
            <div className={styles.countersValue} data-test="free-count">{this.max - this.state.taken}</div>
          </div>
          <div className={styles.countersItem}>
            <div className={styles.countersLabel}>Total</div>
            <div className={styles.countersValue} data-test="max-count">{this.max}</div>
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
            <button ref={this.incrementBtn} className={styles.counterButton} data-test="btn-add">+</button>
            <button ref={this.decrementBtn} className={styles.counterButton} data-test="btn-rm">-</button>
          </div>
          
        </div>

      </div>

    </div>
  }
}