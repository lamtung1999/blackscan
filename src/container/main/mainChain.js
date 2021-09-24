import React, { useEffect, useState } from "react";
import api from "../../service";
import ListChain from "./listChain";
import ListChainTransactions from "./listChainTransactions";
import "./style.scss";

const filter = [
  { value: 10, name: "10" },
  { value: 20, name: "20" },
  { value: 50, name: "50" },
  { value: 100, name: "100" },
  { value: 200, name: "all" },
];

const MainChain = ({ setSearchChain, value, searchAddress }: props) => {
  const [data, setData] = useState([]);
  const [dataListContact, setDataListContact] = useState([]);
  const [dataExchange, setDataExchange] = useState([]);
  const itemId = JSON.parse(localStorage.getItem("id_List_Chain"));
  const limit_filter = JSON.parse(localStorage.getItem("limit_filter"));
  const itemSearch = JSON.parse(localStorage.getItem("address"));
  const index_filter = JSON.parse(localStorage.getItem("index_filter"));
  const [limit, setLimit] = useState(limit_filter ? limit_filter : 20);
  const [isFilter, setIsFilter] = useState(index_filter ? index_filter : 1);
  const [itemContract, setItemContract] = useState("");
  const [search, setSearch] = useState(itemSearch);
  const [id, setId] = useState(itemId ? itemId : 0);
  let listAddress = JSON.parse(localStorage.getItem("listAddress"));
  const [dataListAddress, setdataListAddress] = useState(
    listAddress ? listAddress : []
  );
  const balances = data.map((x) => x.quote);

  useEffect(() => {
    if (itemId || itemSearch) {
      setSearch(itemSearch);
      setId(itemId);
    }
  }, [itemId, itemSearch]);

  useEffect(() => {
    let follow = JSON.parse(localStorage.getItem("listAddress")) || [];
    const filterList = follow.find((x) => x.listAddress === itemSearch);
    if (filterList) {
    } else if (itemSearch !== "") {
      follow.push({ listAddress: itemSearch });
      localStorage.setItem("listAddress", JSON.stringify(follow));
    }
    setdataListAddress(follow);
  }, [itemSearch]);

  useEffect(() => {
    const fetchListChain = async () => {
      try {
        const params = {
          limit: parseInt(limit),
          nft: true,
        };
        const response = await api.getListChain(id, search, params);
        if (response.code === 501) {
          setData([]);
          setDataExchange([]);
        } else {
          const result = response.data.items;
          setData(result);
          setDataExchange([]);
        }
      } catch (error) {
        console.log("Faild to fetch list chain");
      }
    };
    fetchListChain();
  }, [id, limit, search]);

  useEffect(() => {
    if (itemContract !== undefined) {
      const fetchListItemChain = async () => {
        try {
          const response = await api.getTransfersChain(
            id,
            search,
            limit,
            itemContract
          );
          const result = response.data.items;

          setDataListContact(result);
        } catch (error) {
          console.log("Faild to fetch list chain");
        }
      };
      fetchListItemChain();
    }
  }, [id, itemContract, limit, search]);

  useEffect(() => {
    if (value) {
      setData([]);
      const fetchListExchange = async () => {
        try {
          const response = await api.getListExChange(id, search, value);
          const result =
            response.data.uniswap_v1.balances ||
            response.data.uniswap_v2.balances ||
            response.data.balancer.balances ||
            response.data.pancakeswap.balances;
          setDataExchange(result);
        } catch (error) {
          console.log("Faild to fetch list chain");
        }
      };
      fetchListExchange();
    }
  }, [id, search, value]);
  const handleGetContract = (item) => {
    const contract_address = item.contract_address;
    setItemContract(contract_address);
  };
  const copyToClipBoard = (item) => {
    navigator.clipboard.writeText(item);
    alert(`Copied: ${item}`);
  };
  const hanleClickFilter = (item, index) => {
    setLimit(item.value);
    localStorage.setItem("limit_filter", item.value);
    if (filter[index]) {
      localStorage.setItem("index_filter", index);
      setIsFilter(index);
    }
  };

  const handleClose = (item, index) => {
    try {
      const dataIndex = dataListContact.indexOf(
        (items) => items.listAddress === item.listAddress
      );
      if (dataIndex) {
        listAddress.splice(index, 1);
        setdataListAddress(listAddress);
        localStorage.setItem("listAddress", JSON.stringify(listAddress));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSearch = (item) => {
    localStorage.setItem("address", JSON.stringify(item.listAddress));
    setSearch(item.listAddress);
  };

  return (
    <div>
      <div className="listAddress-list">
        {dataListAddress.length > 0
          ? dataListAddress.map((item, index) => (
              <div className="listAddress-item" key={index}>
                <span onClick={() => handleAddSearch(item)}>
                  {item.listAddress}
                </span>
                <span
                  className="listAddress-close"
                  onClick={() => handleClose(item, index)}
                >
                  x
                </span>
              </div>
            ))
          : ""}
      </div>
      {/* {dataExchange.length > 0 ? "hello" : "hi"} */}
      {data && data.length > 0 ? (
        <>
          <ListChain
            filter={filter}
            handleGetContract={handleGetContract}
            data={data}
            balances={balances}
            hanleClickFilter={hanleClickFilter}
            isFilter={isFilter}
          />
        </>
      ) : (
        ""
      )}

      {dataListContact.length > 0 ? (
        <ListChainTransactions
          dataListContact={dataListContact}
          copyToClipBoard={copyToClipBoard}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MainChain;
