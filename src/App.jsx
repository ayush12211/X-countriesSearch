import React, { useEffect, useState } from "react";

const XCountries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.log("error fetching : ", err);
      }
    }
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      
      <div style={{ width: "100%", textAlign: "center" }}>
        <input
          type="text"
          placeholder="searchCountries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "500px",
            padding: "12px",
            margin: "20px 0",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          paddingBottom: "40px",
        }}
      >
        {filteredCountries.map((country, index) => (
          <div
            className="countryCard" 
            key={index}
            style={{
              width: "180px",
              height: "180px",
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={country.flag}
              alt={country.name}
              style={{
                width: "80px",
                height: "60px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              {country.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default XCountries;
