import React, { useState } from "react";
import Footer from "./footer";
import HeaderChain from "./header/headerChain";
import MainChain from "./main/mainChain";
import NavbarChain from "./navbar/navbarChain";
import "./style.scss";
const Layout = (props) => {
  const [search, setSearch] = useState("");
  const [id, setId] = useState(0);
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="container-fuild">
        <div className="header">
          <HeaderChain setSearch={setSearch} />
        </div>
        <div className="content container">
          <div className="content ">
            <div className="side_bar">
              <NavbarChain setId={setId} setValue={setValue}/>
            </div>
            <div className="content-list">
              <MainChain searchAddress={search} id={id} value={value} />
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
