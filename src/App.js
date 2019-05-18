import React from 'react';
import logo from '../src/media/BTC_Logo.svg';
import './App.css';
import $ from '../node_modules/jquery';
import './style/css/app.css'; 

const AppContext = React.createContext();

class AppProvider extends React.Component {
  
  constructor(){
    super();

    this.state = { 
      number : 10,
    }    
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  render() {
      return <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    }
  }

class App extends React.Component {
  constructor(props){
    super(props);
    this.cryptoChanged = this.cryptoChanged.bind(this);
    this.getCurrenciesValue = this.getCurrenciesValue.bind(this);

    this.state = {
      usd: 0,
      gbp: 0,
      eur: 0,
      cny: 0
    };
  }

  componentDidMount(){
    $.when(this.getCurrenciesValue("BTC")).then(function successHandler(data){
      this.setState ({
        usd: data.BTC.USD,
        gbp: data.BTC.GBP,
        eur: data.BTC.EUR,
        cny: data.BTC.CNY
      });
    }.bind(this),function errorHandler(){
      console.log('Ajax call failed')
    });
  }

  cryptoChanged(event){
    var selectedCrypto = event.target.value;
    $.when(this.getCurrenciesValue(selectedCrypto)).then(function successHandler(data){
      if(selectedCrypto === "BTC"){
        this.setState({
          usd: data.BTC.USD,
          gbp: data.BTC.GBP,
          eur: data.BTC.EUR,
          cny: data.BTC.CNY
        })
      }
      if(selectedCrypto === "ETH"){
        this.setState({
          usd: data.ETH.USD,
          gbp: data.ETH.GBP,
          eur: data.ETH.EUR,
          cny: data.ETH.CNY
        })
      }
      if(selectedCrypto === "XMR"){
        this.setState({
          usd: data.XMR.USD,
          gbp: data.XMR.GBP,
          eur: data.XMR.EUR,
          cny: data.XMR.CNY
        })
      }
      if(selectedCrypto === "LTC"){
        this.setState({
          usd: data.LTC.USD,
          gbp: data.LTC.GBP,
          eur: data.LTC.EUR,
          cny: data.LTC.CNY
        })
      }
      if(selectedCrypto === "ZEC"){
        this.setState({
          usd: data.ZEC.USD,
          gbp: data.ZEC.GBP,
          eur: data.ZEC.EUR,
          cny: data.ZEC.CNY
        })
      }
      if(selectedCrypto === "XRP"){
        this.setState({
          usd: data.XRP.USD,
          gbp: data.XRP.GBP,
          eur: data.XRP.EUR,
          cny: data.XRP.CNY
        })
      }
      if(selectedCrypto === "EOS"){
        this.setState({
          usd: data.EOS.USD,
          gbp: data.EOS.GBP,
          eur: data.EOS.EUR,
          cny: data.XRP.CNY
        })
      }
      if(selectedCrypto === "BCH"){
        this.setState({
          usd: data.BCH.USD,
          gbp: data.BCH.GBP,
          eur: data.BCH.EUR,
          cny: data.BCH.CNY
        })
      }
    }.bind(this),function errorHandler(){
      console.log('Ajax call failed')
    });
  }

  getCurrenciesValue(crypto){
    var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XMR,LTC,ZEC,XRP,EOS,BCH&tsyms=USD,EUR,GBP,CNY";

    return $.ajax({
        dataType:'json',
        type: 'GET',
        url: url,
      });
  }

  render(){
    return (
      <AppProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="main">
            <select onChange={this.cryptoChanged}>
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="XMR">Monero</option>
              <option value="LTC">Litecoin</option>
              <option value="ZEC">Zcash</option>
              <option value="XRP">Ripple</option>
              <option value="EOS">EOS</option>
              <option value="BCH">Bitcoin Cash</option>
            </select>
            <hr/>
            <div id="currency-panel">
              <div className="currency">USD: <input readOnly id="usd-input" value={this.state.usd}/></div>
              <div className="currency">GBP: <input readOnly id="gbp-input" value={this.state.gbp}/></div>
              <div className="currency">EUR: <input readOnly id="eur-input" value={this.state.eur}/></div>
              <div className="currency">CNY: <input readOnly id="cny-input" value={this.state.cny}/></div>
            </div>
          </div>
        </header>
      </div>
      </AppProvider>
    );
  }
}

export default App;
