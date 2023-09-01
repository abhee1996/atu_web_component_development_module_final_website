import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchURL } from "../../url";

const Players = () => {
  const [playerByTeam, setPlayerByTeam] = useState();
  const [teams, setTeams] = useState();
  const [teamId, setTeamId] = useState(0);

  useEffect(() => {
    fetchplayerById(teamId);
  }, []);
  const fetchplayerById = async (id) => {
    var playerbyteamId = `${fetchURL}/playerbycountry/${id}`;
    try {
      const { data } = await axios.get(playerbyteamId);
      setPlayerByTeam(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const teams = `${fetchURL}/teams/`;
    const fetchData = async () => {
      try {
        const teamsres = await axios.get(teams);
        setTeams(teamsres.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div style={styles.playersHeading}>
          <h1>All players Page</h1>
        </div>
        <div style={{ display: "flex", margin: 15 }}>
          <span>
            Team Filter :
            <select
              onChange={(e) => {
                setTeamId(e.target.value);
                fetchplayerById(e.target.value);
              }}
            >
              <option value={0}>{"All"}</option>

              {teams?.map((val, idx) => {

                return (
                    <option key={idx} value={val.ID}>{val?.name}  {`(${val.abbrev})`}</option>
                );
              })}
            </select>
          </span>
        </div>
        <hr />
        <div style={{ display: "inline", margin: "2px" }}>
          <table style={styles.tbl}>
            <thead style={styles.th}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Team</th>
              </tr>
            </thead>
            <tbody>
              <>
                {playerByTeam?.map((item, index) => {
                  return (
                      <tr key={index}>
                        <td style={styles.th}>
                          {item.plyName} (#{item.plySqNum})
                        </td>

                        <td style={styles.th}>
                          <p>
                            <img
                              width={50}
                              height={30}
                              src={require(`../../logos/${item?.abbrev}.webp`)}
                            />
                            {item?.name} ({item?.abbrev})
                          </p>
                        </td>
                      </tr>
                  );
                })}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
const styles = {
  playersHeading: { display: "flex", borderBottom: "1px solid black" },
  th: {
    border: "1px solid black",
    padding: 10,
    width: 180,
  },
  tbl: {
    border: "1px solid black",
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Players;
