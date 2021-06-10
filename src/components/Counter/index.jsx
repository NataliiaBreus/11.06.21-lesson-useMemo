import React, { useState, useEffect, Component, PureComponent } from 'react';
import Button from '../Button';
import ControlledNumInput from '../ControlledNumInput';

import style from './Counter.module.sass';

class Counter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0,
      isIncrement: true,
      isAutoClick: false,
      delay: 1000,
      clicksPerSecond: 1,
      timer: null,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.step === nextProps.step;
  }

  tick = () => {
    if (!this.state.isAutoClick) return;
    setTimeout(this.tick, this.state.delay);
    this.handleCount();
  };

  toggleMode = () => this.setState({ isIncrement: !this.state.isIncrement });
  toggleAutoClick = () => {
    const { isAutoClick } = this.state;
    if (!isAutoClick) setTimeout(this.tick, this.state.delay);
    this.setState({ isAutoClick: !isAutoClick });
  };

  handleCount = () => {
    const { isIncrement, counter } = this.state;
    const { step } = this.props;
    this.setState({
      counter: isIncrement ? counter + step : counter - step,
    });
  };

  handleChangeDelay = newValue => {
    this.setState({
      clicksPerSecond: newValue,
      delay: 1000 / newValue,
    });
  };

  render () {
    console.log('render');
    const {
      isIncrement,
      counter,
      clicksPerSecond,
      handleChangeDelay,
      isAutoClick,
    } = this.state;
    const countButtonCaption = isIncrement ? 'Increment' : 'Decrement';
    return (
      <>
        <div className={style.container}>
          <div>Counter:{counter}</div>
          <ControlledNumInput
            caption='Количество нажатий в секунду (Press Enter)'
            value={clicksPerSecond}
            setValue={handleChangeDelay}
            min={1}
            max={1000}
          />
          <p>Auto click mode: {isAutoClick ? 'Enabled' : 'Disabled'}</p>
          <div className={style.controls}>
            <Button onClick={this.toggleMode}>Change mode</Button>
            <Button onClick={this.handleCount}>{countButtonCaption}</Button>
            <Button onClick={this.toggleAutoClick}>Auto click</Button>
          </div>
        </div>
      </>
    );
  }
}

/*
function Counter (props) {
  const { step } = props;
  console.log('render');

  const toggleMode = () => setIsIncrement(!isIncrement);
  const toggleAutoClick = () => setIsAutoClick(!isAutoClick);

  const handleCount = () =>
    isIncrement ? setCounter(counter + step) : setCounter(counter - step);

  const handleChangeDelay = newValue => {
    setClicksPerSecond(newValue);
    setDelay(1000 / newValue);
  };

  const [counter, setCounter] = useState(0);
  const [isIncrement, setIsIncrement] = useState(true);
  const [isAutoClick, setIsAutoClick] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [clicksPerSecond, setClicksPerSecond] = useState(1);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isAutoClick) {
      setTimer(setTimeout(handleCount, delay));
    }
  }, [isIncrement, isAutoClick, delay, step, counter]);

  useEffect(() => {
    clearTimeout(timer);
  }, [isIncrement, delay, step, isAutoClick]);

  const countButtonCaption = isIncrement ? 'Increment' : 'Decrement';
  return (
    <>
      <div className={style.container}>
        <div>Counter:{counter}</div>
        <ControlledNumInput
          caption='Количество нажатий в секунду (Press Enter)'
          value={clicksPerSecond}
          setValue={handleChangeDelay}
          min={1}
          max={1000}
        />
        <p>Auto click mode: {isAutoClick ? 'Enabled' : 'Disabled'}</p>
        <div className={style.controls}>
          <Button onClick={toggleMode} caption={'Change mode'} />
          <Button onClick={handleCount} caption={countButtonCaption} />
          <Button onClick={toggleAutoClick} caption='Auto click' />
        </div>
      </div>
    </>
  );
}*/
export default Counter;
