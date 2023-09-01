import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchURL } from "../../url";

const Teams = () => {
  const [teams, setTeams] = useState();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    var d = `${fetchURL}/teams`;
    const fetchData = async () => {
      try {
        const res = await axios.get(d);
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const sortingData = (col) => {
    if (sort === "ASC") {
      const sorted = [...teams].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTeams(sorted);
      setSort("DSC");
    } else if (sort === "DSC") {
      const sorted = [...teams].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTeams(sorted);
      setSort("ASC");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid black" }}>
        <h1>All teams Page</h1>
      </div>

      <div style={{ display: "inline", margin: "2px" }}>
        <table style={styles.tbl}>
          <thead style={styles.th}>
            <tr>
              <th style={styles.th}>Flags</th>

              <th  style={styles.th}>
                Name | <button onClick={() => sortingData("name")}>sort</button>
              </th>
              <th  style={styles.th}>
                Group | <button onClick={() => sortingData("group")}>sort</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((item , i) => {
              return (
                
                  <tr key={i}>
                    <td style={styles.th}>
                      <img
                        src={require(`../../logos/${item.ID}.webp`)}
                        width={50}
                        height={30}
                      />
                    
                    </td>

                    <td style={styles.th}>
                      <p>{item.name} </p>
                    </td>
                    <td style={styles.th}>{item.group}</td>
                  </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const styles = {
  th: {
    border: "1px solid black",
    padding: 10,
    width: 100,
  },
  tbl: {
    border: "1px solid black",
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Teams;
