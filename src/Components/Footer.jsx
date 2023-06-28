import React from "react";

const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-wrapper">
        <span>&copy;{new Date().getFullYear()}</span>
        <p> All rights reserved</p>
      </div>
    </section>
  );
};

export default Footer;
