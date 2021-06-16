import "./App.css";
import React, { useState, useEffect } from "react";
import logo1 from "./images/logo1.png";
import logo2 from "./images/logo2.png";
import logo3 from "./images/logo3.png";

function App() {
  const [beers, updateBeers] = useState([]);
  const [submitSearch, setSubmitSearch] = useState("");

  useEffect(() => {
    const api_Url = "https://api.punkapi.com/v2/beers";
    fetch(api_Url)
      .then((response) => {
        return response.json();
      })
      .then((data) => updateBeers(data));
  }, []);

  const handleChange = (e) => {
    setSubmitSearch(e.target.value);
  };
  let filteredBeers = [];
  if (beers.length > 0) {
    filteredBeers = beers.filter((beers) =>
      beers.name.toLowerCase().includes(submitSearch.toLowerCase())
    );
  }

  return (
    <>
      <section className="header">
        <div>
          <img src={logo3} alt="" />
        </div>

        <form className="beerSearchInput">
          <input
            type="text"
            placeholder="Choose your beer..."
            className="submitSearch"
            onChange={handleChange}
          />
        </form>
      </section>

      {filteredBeers.map((beers) => {
        return (
          <section className="beerCard">
            <section className="text-copy">
              <h2>{beers.name} </h2>
              <h3>{beers.tagline}</h3>
              <br />
              <p>{beers.description}</p>
              <br />
              <h3>ABV:{beers.abv}</h3>
            </section>
            <img className="image" src={beers.image_url} alt="image" />
          </section>
        );
      })}
    </>
  );
}

export default App;
