import React from "react";
import { IconContext } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <section className="container mb-5 my-5">
        <h1 className="navbar-brand text-center mb-2 fs-4">Chintanika</h1>
        <div className=" row text-center">
          <p className="col-1">
            <IconContext.Provider value={{ className: "top-react-icons m-2" }}>
              <FaLinkedin />
            </IconContext.Provider>
          </p>
          <p className="col-1">
            <IconContext.Provider value={{ className: "top-react-icons m-2" }}>
              <FaInstagram />
            </IconContext.Provider>
          </p>
          <p className="col-1">
            <IconContext.Provider value={{ className: "top-react-icons m-2" }}>
              <FaFacebook />
            </IconContext.Provider>
          </p>
        </div>
      </section>
    </>
  );
}

export default Footer;
