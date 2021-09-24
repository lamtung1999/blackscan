import React, { useEffect, useState } from "react";
import api from "../../service";
import "./style.scss";
export type chainNav = {
  chain_id: number,
  db_schema_name: string,
  is_testnet: Boolean,
  label: String,
  logo_url: String,
  name: string,
};

const listExhange = [
  {
    value: "uniswap_v1",
    name: "uniswap v1",
    logo_url:
      "https://static.debank.com/image/project/logo_url/uniswap2/87a541b3b83b041c8d12119e5a0d19f0.png",
  },
  {
    value: "uniswap_v2",
    name: "uniswap v2",
    logo_url:
      "https://static.debank.com/image/project/logo_url/uniswap2/87a541b3b83b041c8d12119e5a0d19f0.png",
  },
  {
    value: "balancer",
    name: "balancer",
    logo_url:
      "https://s3-us-west-2.amazonaws.com/acf-uploads/Image_4kLvxDcihi.png",
  },
  {
    value: "pancakeswap",
    name: "pancakeswap",
    logo_url:
      "https://static.debank.com/image/project/logo_url/bsc_pancakeswap/a4e035cf4495755fddd5ebb6e5657f63.png",
  },
];

const NavbarChain = (props) => {
  const index_chain = JSON.parse(localStorage.getItem("index_chain"));
  const index_exchange = JSON.parse(localStorage.getItem("index_exchange"));
  const [data, setData] = useState([]);
  const [isActionChain, setActionChain] = useState(index_chain);
  const [isActionExchange, setActionExchange] = useState(index_exchange);
  useEffect(() => {
    const fetchListChain = async () => {
      try {
        const response = await api.getList();
        const result = await response.data.items;
        setData(result);
      } catch (error) {
        console.log("Faild to fetch list chain");
      }
    };
    fetchListChain();
  }, []);
  const hanleClickList = (item, index) => {
    const idx = item.chain_id;
    props.setId(idx);
    props.setValue("")
    window.localStorage.setItem("id_List_Chain", idx ? idx : 0);
    setActionExchange(-1);
    localStorage.setItem("index_exchange", -1);
    if (data[index]) {
      localStorage.setItem("index_chain", index);
      setActionChain(index);
    }
  };
  const handleListExhange = (item, index) => {
    props.setValue(item.value)
    setActionChain(-1);
    localStorage.setItem("index_chain", -1);
    if (listExhange[index]) {
      localStorage.setItem("index_exchange", index);
      localStorage.setItem("value_exchange", item.value);
      setActionExchange(index);
    }
  };
  return (
    <div>
      <div>
        <h2 className="listChain-title">List chains</h2>
        <ul className="listChain">
          {data.map((item: chainNav, index) => {
            return (
              <div key={item.chain_id}>
                {item.is_testnet ? (
                  ""
                ) : (
                  <li
                    onClick={() => hanleClickList(item, index)}
                    className={
                      isActionChain === index
                        ? "listChain-item active"
                        : "listChain-item"
                    }
                  >
                    <img
                      style={{ width: "20px" }}
                      src={item.logo_url}
                      alt={item.db_schema_name}
                    />
                    <span> {item.name}</span>
                  </li>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h2 className="listExchange-title">List exchanges</h2>
        <ul className="listExchange">
          {listExhange.map((item, index) => {
            return (
              <li
                key={item.value}
                onClick={() => handleListExhange(item, index)}
                className={
                  isActionExchange === index
                    ? "listExchange-item active"
                    : "listExchange-item"
                }
              >
                <img
                  style={{ width: "20px" }}
                  src={item.logo_url}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nav-info">
        <div className="nav-info_powerer">
          -------------------------------------------------- <br />
          POWERED BY <span>COVALENT</span> | <span>KHIM</span> |{" "}
          <span>FEEDBACK</span>
          <br />
          --------------------------------------------------
        </div>
        <div className="nav-info-donate">
          <span className="nav-info-btn-donate">Donate</span>
          <span>
            <br />
            ETH, USDT, BSC (BEP20), ERC20 TOKEN: <br/>
          </span>
          <span>0xdEb66f454D05C4C39C9b0E57b7cB60AcDf2Ef44c</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarChain;
