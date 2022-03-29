import React from "react";

class PlacesCounter extends React.Component {

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

  render() {
    return <div className="places-counter">
      <h2>Compteur de places</h2>
      <div>Nombre de places max: {this.max}</div>
      <div>Nombre de places utilisées: {this.state.counter}</div>
      <div className="warning-msg">La salle est pleine</div>
      <button className="add-btn">+</button>
      <button className="remove-btn">-</button>
    </div>
  }
}

export default PlacesCounter;