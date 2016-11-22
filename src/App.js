import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var classNames = require('classnames');

var randomlyGenerateArray = (size) => {
  var array = [];
  while (array.length < size) {
    var newNumber = Math.floor((Math.random() * 1000) + 1);
    if (array.length === 0 || array.indexOf(newNumber) === -1) {
      array.push(newNumber);
    }
  }
  return array.sort(function(a,b){return a - b});
}

var searchArray = randomlyGenerateArray(400);

var iterations;
var low;
var high;
var mid;
var testItem;
var binaryTimeout;
var sequentialTimeout;

var binarySearch = {
  name: "Binary Search",
  description: "A search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array; if they are unequal, the half in which the target cannot lie is eliminated and the search continues on the remaining half until it is successful."
}

var sequentialSearch = {
  name: "Sequential Search",
  description: "A search algorithm that finds the position of a target value within a sorted array. It sequentially checks each element of the list for the target value until a match is found or until all the elements have been searched."
}


class App extends Component {
  constructor(){
    super();
    this.state = { 
      index: "",
      low: 0,
      high: searchArray.length - 1,
      testItem: "",
      target: "",
      targetFound: false,
      iterations: 0,
      searchNumber: searchArray[Math.floor((Math.random() * 400) + 1)],
      searchAlgorithm: binarySearch,
      regularActive: true,
      slowActive: false,
      fastActive: false,
      intervalSpeed: 1000,
      isRunning: false
    }
  }
  
  sequentialSearch() {
    if (iterations === 0 ) {
        testItem = 0;
    }

    sequentialTimeout = setTimeout(() => {
      low = this.state.low;
      high = this.state.high;
      testItem = this.state.testItem;
      iterations ++;
      this.setState({
        low: low,
        high: high,
        index: testItem,
        testItem: testItem,
        iterations: iterations
      });
      
      if (searchArray[this.state.testItem] !== this.state.searchNumber && this.state.isRunning === true) {
        low ++;
        testItem ++;
        this.setState({ low: low, testItem: testItem, index: testItem });
        this.sequentialSearch();
      } else {
        this.setState({ target: testItem, high: testItem, targetFound: true, isRunning: false});
      }
    }, this.state.intervalSpeed);
  }
  
  binarySearch() {
    binaryTimeout = setTimeout(() => {
      low = this.state.low;
      high = this.state.high;
      iterations ++;
      mid = Math.floor((low + high) / 2);
      this.setState({ 
        low: low,
        high: high,
        target: mid,
        testItem: mid,
        index: mid,
        iterations: iterations
      });
      
      if (searchArray[this.state.testItem] !== this.state.searchNumber && this.state.isRunning === true) {
        if (this.state.searchNumber < searchArray[this.state.testItem]) {
            high = mid;
        } else {
            low = mid;
        }
        mid = Math.floor((low + high) / 2);
        this.setState({ high: high, low: low, testItem: mid });
        this.binarySearch();
      } else {
        this.setState({ target: mid, targetFound: true, isRunning: false});
      }
    }, this.state.intervalSpeed);
    
  }
  
  clearSearch() {
    searchArray = randomlyGenerateArray(400);
    this.setState({ 
      low: 0,
      high: searchArray.length - 1,
      testItem: "",
      iterations: 0,
      targetFound: false,
      searchNumber: searchArray[Math.floor((Math.random() * 400) + 1)],
      isRunning: false
    });
    iterations = 0;
    clearTimeout(binaryTimeout);
    clearTimeout(sequentialTimeout);
  }
  
  startBinarySearch() {
    this.clearSearch();
    this.setState({ isRunning: true });
    this.binarySearch();
    this.setState({ searchAlgorithm: binarySearch });
  }
  
  startSequentialSearch() {
    this.clearSearch();
    this.setState({ isRunning: true });
    this.sequentialSearch();
    this.setState({ searchAlgorithm: sequentialSearch });
  }
  
  clickRegularButton() {
    if (this.state.regularActive === false) {
      this.setState({ 
        regularActive: true,
        slowActive: false,
        fastActive: false,
        intervalSpeed: 1000
      });
    }
  }
  
 clickSlowButton() {
    if (this.state.slowActive === false) {
      this.setState({ 
        slowActive: true,
        regularActive: false,
        fastActive: false,
        intervalSpeed: 2000
      });
    }
  }
  
  clickFastButton() {
    if (this.state.fastActive === false) {
      this.setState({ 
        fastActive: true,
        regularActive: false,
        slowActive: false,
        intervalSpeed: 200
      });
    }
  }
   
  render() {
    var regularSpeedClass = classNames({
      'button-size': true,
      'speed-button': true,
      'active-btn': this.state.regularActive
    });
    
    var slowSpeedClass = classNames({
      'button-size': true,
      'speed-button': true,
      'active-btn': this.state.slowActive
    });
    
    var fastSpeedClass = classNames({
      'button-size': true,
      'speed-button': true,
      'active-btn': this.state.fastActive
    });
    
    
    return (
      <div>
        <div className="nav-bar">
          <h5 id="nav-title">Visual Algorithms</h5>
        </div>
        <section className="side-bar-section">
          <div className="algorithm-info">
            <p id="algorithm-name"><strong>Algorithm: </strong>{ this.state.searchAlgorithm.name }</p>
            <p id="description">Description: { this.state.searchAlgorithm.description }</p>
          </div>
          <div className="iteration-info-container">
            <div className="iteration-info">
              <p className="iteration-info-item">Target Item <span> { this.state.searchNumber }</span></p>
              <p className="iteration-info-item">Iterations <span> { this.state.iterations }</span></p>
              <p className="iteration-info-item">Minimum index <span>{ this.state.low }</span></p>
              <p className="iteration-info-item">Maximum index <span>{ this.state.high }</span></p>
              <p className="iteration-info-item">Item located at index <span>{ this.state.index }</span></p>
            </div>
          </div>
        </section>
        <section className="grid-section">
          <div className="buttons">
            <button className='button-size sequential-search-button' onClick={ this.startSequentialSearch.bind(this) }>Sequential Search</button>
            <button className='button-size binary-search-button' onClick={ this.startBinarySearch.bind(this) }>Binary Search</button>
            <div className="speed-buttons">
              <button className={ slowSpeedClass } onClick={ this.clickSlowButton.bind(this) }>Slow</button>
              <button className={ regularSpeedClass } onClick={ this.clickRegularButton.bind(this) }>Regular</button>
              <button className={ fastSpeedClass } onClick={ this.clickFastButton.bind(this) }>Fast</button>
            </div>
          </div>
          <div className="grid-container">
            <div className="grid">
              { searchArray.map((number, index) => {
                var inSearchArea = index >= this.state.low && index <= this.state.high;
                var isTestItem = index === this.state.testItem && this.state.targetFound === false;
                var isHighOrLow = index === this.state.low || index === this.state.high;
                var isTargetItem = index === this.state.target && this.state.targetFound === true;
                if (this.state.targetFound === false) {
                  if (!inSearchArea) {
                    return <div className="grid-item not-in-remaining-elements">{ number }</div>;
                  } else if (isHighOrLow) {
                    return <div className="grid-item high-or-low-element">{ number }</div>;
                  } else if (isTestItem) {
                    return <div className="grid-item target-element">{ number }</div>;
                  } else {
                    return <div className="grid-item in-remaining-elements">{ number }</div>;
                  }
                } else {
                    if (isTargetItem) {
                      return <div className="grid-item target-element">{ number }</div>;
                    } else {
                      return <div className="grid-item not-in-remaining-elements">{ number }</div>;
                    }
                }
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;

