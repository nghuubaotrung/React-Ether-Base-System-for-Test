import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    const MyContract = window.web3.eth.contract ([
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newState",
				"type": "string"
			}
		],
		"name": "setState",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSecret",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getState",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "you_awesome",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

    this.state = {
      ContractInstance: MyContract.at('0x3ef910a7761995f2a44f2dfeaf3da9444b832a63'),
      contractState: ''
    }
    this.querySecret = this.querySecret.bind(this);
    this.queryContractState = this.queryContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind (this);
  }

  querySecret () {
    const { getSecret } = this.state.ContractInstance;

    getSecret ((err, secret) => {
      if (err) console.error('An error occured:::', err);
      console.log('This is our contract secret:::', secret);
    })
  }

  queryContractState () {
    const { getState } = this.state.ContractInstance;

    getState ((err, state) => {
      if (err) console.error('An error occured:::', err);
      console.log('This is our contract state:::', state);
    })
  }

  handleContractStateSubmit (event) {
    event.preventDefault ();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState (
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract state is changing.');
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Base System for React Ether Test</h1>
        </header>
        <br />
        <br />
        <button onClick={ this.querySecret }> Querry Smart Contract Secret </button>
        <br />
        <button onClick={ this.queryContractState }> Querry Smart Contract State </button>
        <br />
        <br />
        <br />
        <form onSubmit={ this.handleContractStateSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new state..."
            value ={ this.state.contractState }
            onChange={ event => this.setState ({ contractState: event.target.value }) } />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

export default App;
