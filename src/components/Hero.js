import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../assets/shoe-main.jpeg";
// import heroBcg2 from "../assets/hero-bcg-2.jpeg";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Be in your <br /> comfort zone
        </h1>
        <p>
          Discover comfort and style in every step. Our collection combines
          fashion with function, ensuring both trendiness and ease. Step
          confidently into your day with our carefully curated footwear.
        </p>
        <Link to="/products" className="btn hero-btn">
          SHop now
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="nice table" className="main-img" />
        {/* <img src={heroBcg2} alt="person working" className="accent-img" /> */}
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
      z-index: 2;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container {
      display: block;
      position: relative;
    }
    @property --rotate {
      syntax: "<angle>";
      initial-value: 132deg;
      inherits: false;
    }

    // .img-container::after {
    //   content: "";
    //   position: absolute;
    //   inset: 0;
    //   left: -1%;
    //   width: 102%;
    //   height: 100%;
    //   scale: 1.03;
    //   background-image: linear-gradient(var(--rotate), #5eead4, #ffa800);
    //   border-radius: var(--radius);
    //   animation: spin 2.5s linear infinite;
    // }
    // @keyframes spin {
    //   0% {
    //     --rotate: 0deg;
    //   }
    //   100% {
    //     --rotate: 360deg;
    //   }
    // }
    .img-container::before {
      z-index: 3;
      content: "Limited Edition Coming Soon";
      position: absolute;
      width: 50%;
      height: 15%;
      background: var(--clr-fade);
      color: white;
      bottom: -3%;
      left: -18%;
      border-radius: var(--bradius);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      // font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
      font-size: 1.25rem;
      letter-spacing: 1.2px;
      font-weight: bold;
      animation: blink 3.5s ease-in infinite;
    }

    @keyframes blink {
      0% {
        filter: hue-rotate(0deg);
      }
      50% {
        filter: hue-rotate(360deg);
      }
      100% {
        filter: hue-rotate(0deg);
      }
    }
  }
`;

export default Hero;
