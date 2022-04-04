import { render, screen } from '@testing-library/react';
import Counter from './Counter';

// mock of a child component
const mockCircularProgressBar = jest.fn();
jest.mock('../CircularProgressBar', () => (props) => {
  mockCircularProgressBar(props);
  return <mock-childCOmponent />;
})

describe('check component initial state', () => {
  
  // the props.max value will change in each test
  let randomMax = 0
  
  beforeEach(() => {
    randomMax = Math.floor(Math.random() * 150).toString(); // random 1 - 150   
  })

  test('when props.name is set the name element displays it', () => {
    const name = "Salle des pas perdus";
    const {container} = render(<Counter max={randomMax} name={name}/>);
    expect(container.querySelector('[data-test="hall-name"]').textContent).toMatch(name);
  })

  test('when props.name is not set the name element displays the default "Salle de XX places"', () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="hall-name"]').textContent).toMatch("Salle de " + randomMax + " places");
  })
  
  test('when props.taken is set to some value, the taken counter has this value', () => {
    const {container} = render(<Counter max="10" taken="7" />);
    expect(container.querySelector('[data-test="taken-count"]').textContent).toBe('7');
  })

  test('when props.taken is set to some value, the free counter is (max - taken)', () => {
    const {container} = render(<Counter max="10" taken="7" />);
    expect(container.querySelector('[data-test="free-count"]').textContent).toBe('3');
  })
  
  test("the value displayed by the 'max counter' comes from props.max", () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="max-count"]').textContent).toBe(randomMax);
  })
  
  test("the value displayed by the 'free counter' is equal to the max count", () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="free-count"]').textContent).toBe(randomMax);
  })
  
  test("the value displayed by the 'taken counter' is 0", () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="taken-count"]').textContent).toBe('0');
  })
  
  test("'0.0' is passed as initial value to the child component 'CircularProgressBar'", () => {
    render(<Counter max={randomMax} />);
    expect(mockCircularProgressBar).toHaveBeenCalledWith(
      expect.objectContaining({
        percentage: "0.0",
      })
      );
    })
    
    test("the button to increment the couter is enabled", () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="btn-add"]')).toBeEnabled();
  })
  
  test("the button to decrement the couter is disabled", () => {
    const {container} = render(<Counter max={randomMax} />);
    expect(container.querySelector('[data-test="btn-rm"]')).toBeDisabled();
  })
});

describe('check click on the increment button', () => {

  // the props.max value will change in each test
  let randomMax = 0
  // let container = null
  
  beforeEach(() => {
    randomMax = Math.floor(Math.random() * 100).toString();
  })
  
  test("the value displayed by the 'max counter' remains the same", () => {
    const {container} = render(<Counter max={randomMax} />);
    container.querySelector('[data-test="btn-add"]').click();
    expect(container.querySelector('[data-test="max-count"]').textContent).toBe(randomMax);
  })
  
  test("the value displayed by the 'free counter' is reduced by one", () => {
    const {container} = render(<Counter max="45" taken="10"/>);
    container.querySelector('[data-test="btn-add"]').click();
    expect(container.querySelector('[data-test="free-count"]').textContent).toBe("34");
  })
  
  test("the value displayed by the 'taken counter' is incremented by one", () => {
    const max = "100";
    const taken = "28";
    const {container} = render(<Counter max={max} taken={taken} />);
    container.querySelector('[data-test="btn-add"]').click();
    expect(container.querySelector('[data-test="taken-count"]').textContent).toBe((Number(taken)+1).toString());
  })
  
  test("the child component 'CircularProgressBar' is refreshed with the new percentage", () => {
    const calculatePercentage = ((1 / randomMax) * 100).toFixed(1);
    const {container} = render(<Counter max={randomMax} />);
    container.querySelector('[data-test="btn-add"]').click();
    expect(mockCircularProgressBar).toHaveBeenCalledWith(
      expect.objectContaining({
        percentage: calculatePercentage.toString()
      })
    );
  })
    
  test('the add button is disabled if there hall is full', () => {
    const {container} = render(<Counter max="20" taken="19" />);
    container.querySelector('[data-test="btn-add"]').click();
    expect(container.querySelector('[data-test="btn-add"]')).toBeDisabled;
  })
  
  test('the remove button is enabled if it was disabled i.e. the counter was at 0', () => {
    const {container} = render(<Counter max="20" />);
    expect(container.querySelector('[data-test="btn-rm"]')).toBeDisabled; // because counter is 0
    container.querySelector('[data-test="btn-add"]').click();
    expect(container.querySelector('[data-test="btn-rm"]')).toBeEnabled;
  })
})

describe('check click on the decrement button', () => {

  test("the value displayed by the 'max counter' remains the same", () => {
    const {container} = render(<Counter max="114" taken="31" />);
    container.querySelector('[data-test="btn-rm"]').click();
    expect(container.querySelector('[data-test="max-count"]').textContent).toBe("114");
  })

  test("the value displayed by the 'taken counter' is decremented by one", () => {
    const {container} = render(<Counter max="20" taken="10"/>);
    expect(container.querySelector('[data-test="taken-count"]').textContent).toBe("10");
    container.querySelector('[data-test="btn-rm"]').click();
    expect(container.querySelector('[data-test="taken-count"]').textContent).toBe("9");
  })

  test("the value displayed by the 'free counter' is incremented by one", () => {
    const {container} = render(<Counter max="50" taken="25"/>);
    expect(container.querySelector('[data-test="free-count"]').textContent).toBe("25");
    container.querySelector('[data-test="btn-rm"]').click();
    expect(container.querySelector('[data-test="free-count"]').textContent).toBe("26");
  })

  test("the child component 'CircularProgressBar' is refreshed with the new percentage", () => {
    const {container} = render(<Counter max="10" taken="7" />);
    const calculatePercentage = ((7 / 10) * 100).toFixed(1);
    container.querySelector('[data-test="btn-rm"]').click();
    expect(mockCircularProgressBar).toHaveBeenCalledWith(
      expect.objectContaining({
        percentage: calculatePercentage.toString()
      })
    );
  })

  test.skip('the decrement button is disabled if counter min is reached', () => {

  })
  test.skip('the increment button is disabled if counter max is reached', () => {
    // put it in teste related to increment button
  })
})