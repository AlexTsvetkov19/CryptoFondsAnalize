import React, { useEffect } from 'react';
import { Menu, Spin } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard.jsx';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [currencies, setCurrencies] = React.useState([]);
  const [currencyID, setCurrencyID] = React.useState(1);
  const [currencyData, setCurrencyData] = React.useState(null);

  const fetchCurrencies = () => {
    axios.get('http://localhost:8081/cryptocurrencies').then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        getItem('Список криптовалют', 'g1', null,
          currenciesResponse.map(c => {
            return {label: c.name, key: c.id}
          }),
          "group"
        )
      ]
      setCurrencies(menuItems)
    })
  }

  const fetchCurrency = () => {
    axios.get(`http://localhost:8081/cryptocurrencies/${currencyID}`).then(r => {
      setCurrencyData(r.data)
    })
  }


  useEffect(() => {
    fetchCurrencies()
  }, []);

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency()
  },  [currencyID]);


  const onClick = e => {
    setCurrencyID(e.key)
  };
  return (
    <div className="flex ">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size={"large"}/>}
      </div>
    </div>
  );
};
export default App;