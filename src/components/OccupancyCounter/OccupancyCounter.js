import React from 'react';
import Progress from '../ProgressCircle/ProgressCircle.js';
import './main.css';

export default class OccupancyCounter extends React.Component {

  constructor(props) {
    super(props);
    this.max = props.max * 1;
    // flag
    this.roomFull = false;
    // flag
    this.roomEmpty = true;
    this.state = {counter: 0};
  }

  /**
   * add one to the number of occupied places 
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
      this.showWarningMessage('Room is full');
      this.addButton.disabled = true;
    } else {
      this.hideWarningMessage();
      this.rmButton.disabled = false;
    }
  }
  
  /**
   * remove one to the number of occupoed places
   * @param {*} e 
   * @returns 
   */
  decrement(e) {
    
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
      this.showWarningMessage('Room is empty');
      this.rmButton.disabled = true;
    } else {
      this.hideWarningMessage();
      this.addButton.disabled = false;
    }
  }
  
  componentDidMount() {
    this.warningMessage = document.querySelector('.places-counter .warning-msg');
    this.addButton = document.querySelector('.places-counter .add-btn');
    this.rmButton = document.querySelector('.places-counter .remove-btn');
    this.addButton.addEventListener('click', (e) => {
      this.increment(e);
    })
    this.rmButton.addEventListener('click', (e) => {
      this.decrement(e);
    })
    this.hideWarningMessage();
  }

  showWarningMessage(msg) {
    this.warningMessage.innerText = msg;
    this.warningMessage.style.display = 'block';
  }
  
  hideWarningMessage() {
    this.warningMessage.style.display = 'none';
  }

  /**
   * get the % of occupied sits with one decimal
   * @returns number
   */
  progress(decimal) {
    return (this.state.counter / this.max * 100).toFixed(decimal);
  }

  render() {
    return <div className="places-counter">
      <header class="title">
        Compteur de places
      </header>
      <section class="badges">
        <div className="item">
          <div class="label">Occupées</div>
          <div class="value">{this.state.counter}</div>
        </div>
        <div className="item">
          <div class="label">Libres</div>
          <div class="value">{this.max - this.state.counter}</div>
        </div>
        <div className="item">
          <div class="label">Total</div>
          <div class="value">{this.max}</div>
        </div>
      </section>
      <div class="content">
        <section className="progress">
          <Progress
            strokeWidth="10"
            sqSize="100"
            percentage={this.progress()} />
        </section>
        {/* <section className="progress">{this.progress(1)} %</section> */}
        <div className="buttons">
          <button className="add-btn">+</button>
          <button className="remove-btn">-</button>
        </div>
      </div>
      <div className="warning-msg">La salle est pleine</div>
      <p>add reset button</p>
    </div>
  }
}