import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Api.css";

function Apifetch() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("error in fetching data", error);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <input
          className="search-box"
          type="text"
          value={search}
          placeholder="search by name..."
          onChange={handleChange}
        ></input>
      </div>

      {data.data ? (
        <ul>
          {data.data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.first_name.toLowerCase().includes(search);
            })
            .map((item) => (
              <li className="box" key={item.id}>
                <div className="id">{item.id}</div>
                <img src={item.avatar} alt="avatar"></img>
                <div className="name">{item.first_name}</div>
              </li>
            ))}
        </ul>
      ) : (
        <p>loading data...</p>
      )}
    </div>
  );
}

export default Apifetch;
