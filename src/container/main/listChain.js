import moment from "moment";
import React from "react";

const ListChain = ({
  handleGetContract,
  data,
  balances,
  hanleClickFilter,
  filter,
  isFilter,
}: props) => {
  const timeNow = new Date();
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return (
    <div>
      <div>
        <p>Last update:{moment(timeNow).format("DD-MM-YYY HH:mm:ss")}</p>
        <p>Fiat currency: USD</p>
        <h2 className="balance-title">
          Balances: <span>{balances.reduce(reducer).toFixed(2)}$</span>
        </h2>
        <div className="balance-filter">
          <ul className="balance-filter_list">
            {filter.map((item, index) => {
              return (
                <li
                  key={item.value}
                  className={
                    isFilter === index
                      ? "balance-filter_item active"
                      : "balance-filter_item"
                  }
                  onClick={() => hanleClickFilter(item, index)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Icon</th>
              <th scope="col">Token</th>
              <th scope="col">Symbol</th>
              <th scope="col">Contract</th>
              <th scope="col">Balance</th>
              <th scope="col">FiatValue</th>
              <th scope="col">NFTdata</th>
              <th scope="col">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.contract_name}>
                  <th scope="row">{index + 1}</th>
                  <td className="table-chain_item">
                    {item.logo_url !== undefined ? (
                      <img
                        style={{ width: 20 }}
                        src={item.logo_url}
                        alt={item.contract_ticker_symbol}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="table-chain_item">{item.contract_name}</td>
                  <td className="table-chain_item">
                    {item.contract_ticker_symbol}
                  </td>
                  <td className="table-chain_item">{item.contract_address}</td>
                  <td className="table-chain_item">
                    {item.balance / 1000000000000000000}
                  </td>
                  <td className="table-chain_item">
                    {item.quote.toFixed(2) + `$`}
                  </td>
                  <td className="table-chain_item"></td>
                  <td className="table-chain_item">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleGetContract(item)}
                    >
                      Get
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListChain;
