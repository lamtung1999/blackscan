import React, { useState } from "react";
import { Link } from "react-router-dom";
import allchain from "../../asset/image/allchain.png";

const HeaderChain = (props) => {
  const [search, setSearch] = useState("");
  const handleClickSearch = () => {
    setSearch("");
    props.setSearch(search);
    localStorage.setItem("address", JSON.stringify(search));
    // let follow = JSON.parse(localStorage.getItem("listAddress")) || [];
    // const filterList = follow.find((x) => x.listAddress === search);
    // if (filterList) {
    // } else if (search !== "") {
    //   follow.push({ listAddress: search });
    //   localStorage.setItem("listAddress", JSON.stringify(follow));
    // }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-4 header-logo">
          <Link to="/">
            <img className="logo" src={allchain} alt="LOGO" />
          </Link>
        </div>
        <div className="col-8 header-search">
          <input
            className="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className="btn btn-outline-secondary"
            type="button"
            value="Get Data"
            onClick={handleClickSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderChain;
