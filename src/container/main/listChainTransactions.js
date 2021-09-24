import moment from "moment";
import React from "react";

const ListChainTransactions = ({ dataListContact, copyToClipBoard }: props) => {
  return (
    <div>
      <h2 className="transactions-title">Transactions</h2>
      <table className="table-transaction table">
        <thead className="thead-dark">
          <tr>
            <th className="table-transaction-lable" scope="col">
              #
            </th>
            <th className="table-transaction-lable" scope="col">
              Timestamp
            </th>
            <th className="table-transaction-lable" scope="col">
              Tx hash
            </th>
            <th className="table-transaction-lable" scope="col">
              From
            </th>
            <th className="table-transaction-lable" scope="col"></th>
            <th className="table-transaction-lable" scope="col">
              To
            </th>
            <th className="table-transaction-lable" scope="col">
              Value
            </th>
          </tr>
        </thead>
        {dataListContact.map((item, index) => {
          return (
            <tbody key={item.block_height}>
              {item.transfers.map((transfers) => {
                return (
                  <tr key={transfers.contract_name}>
                    <th scope="row">{index + 1}</th>
                    <td className="table-transaction_item">
                      {moment(transfers.block_signed_at).format(
                        "DD-MM-YYY HH:mm:ss"
                      )}
                    </td>

                    <td
                      className="table-transaction_item hover"
                      onClick={() => copyToClipBoard(transfers.tx_hash)}
                    >
                      {transfers.tx_hash}
                    </td>
                    <td
                      className="table-transaction_item hover"
                      onClick={() => copyToClipBoard(transfers.from_address)}
                    >
                      {transfers.from_address}
                    </td>
                    <td
                      className={
                        transfers.transfer_type === "IN"
                          ? "table-transaction_item item_in"
                          : "table-transaction_item item_out"
                      }
                    >
                      {transfers.transfer_type}
                    </td>
                    <td
                      className="table-transaction_item hover"
                      onClick={() => copyToClipBoard(transfers.to_address)}
                    >
                      {transfers.to_address}
                    </td>
                    <td className="table-transaction_item">
                      {`${transfers.delta / 1000000000000000000} ${" "} ${
                        transfers.contract_ticker_symbol
                      }`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default ListChainTransactions;
