import { Card } from 'antd';

function CryptocurrencyCard(props) {
  const { currency } = props;
  const price = Math.round(currency.quote.USD.price);

  const ch24h = (
    <span>
    <span className="green-percent">
      {currency.quote.USD.percent_change_24h.toFixed(2)}%
    </span>

  </span>
  );

  function formatToTerra(value) {
    const terra = 1_000_000_000_000; // 10^12 (тера)
    const giga = 1_000_000_000;     // 10^9 (гига/миллиард)

    let formatted;
    let suffix;

    if (value >= terra) {
      // Для чисел >= 1 трлн: делим на тера, округляем до 2 знаков
      formatted = Math.round((value / terra) * 100) / 100;
      suffix = 'Т';
    } else if (value >= giga) {
      // Для чисел от 1 млрд до 1 трлн: делим на гига, округляем до 2 знаков
      formatted = Math.round((value / giga) * 100) / 100;
      suffix = 'B';
    } else {
      // Для чисел < 1 млрд: оставляем как есть
      formatted = value;
      suffix = '';
    }

    return `$${formatted}${suffix}`;
  }

// Использование:
  const capitalize = Math.round(currency.quote.USD.market_cap);
  const displayValue = formatToTerra(capitalize); // "1,76Т"

  return (
    <div>
      <Card title={
        <div className="flex items-center gap-3">
          <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
          <span>{currency.name}</span>
        </div>
      }
        style={{ width: 300, }}>
        <p>Текущая цена: {price}</p>
        <p>Изменение цены за 24 часа: {ch24h}</p>
        <p>Текущая капитализация: {displayValue}</p>
      </Card>
    </div>
  )
}

export default CryptocurrencyCard
