import React, { useEffect, useState } from "react";

const XCountries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://xcountries-backend.labs.crio.do/all");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.log("error fetching : ", err);  
      }
    }
    fetchCountries();
  }, []);

  // FILTER COUNTRIES
   const filteredCountries = countries.filter((country) => {
    const name = country.name || ""; // fallback if undefined
    const searchText = search || ""; // ensure search is string
    return name.toLowerCase().includes(searchText.toLowerCase());
  }); 

  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <input
          type="text"
          placeholder="searchCountries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "600px",
            padding: "12px",
            margin: "20px 0",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #090101ff",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => {
            return (
              <div
                key={index}
                className="countryCard"   
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "150px",
                  height:"150px",
                  textAlign: "center",
                  background: "white",
                  // boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
                <h3 style={{ fontSize: "16px" }}>{country.name}</h3>
              </div>
            );
          })
        ) : (
          <p>No results found</p> 
        )}
      </div>
    </>
  );
};

export default XCountries;
