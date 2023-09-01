import axios from "axios";
import React, { useState } from "react";
import { fetchURL } from "../../url";


const Routes = () => {
  const [jsonData, setJsonData] = useState();

  const fetchTeamData = async () => {
    const team = `${fetchURL}/teams/`;
    try {
      const teamsres = await axios.get(team);
      var dt = JSON.stringify(teamsres?.data);
      setJsonData(dt);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPlayerData = async () => {
    var players = `${fetchURL}/players`;
    try {
      const res = await axios.get(players);
      var dt = JSON.stringify(res?.data);

      setJsonData(dt);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTodayMatch = async () => {
    const today = `${fetchURL}/today-matches/`;
    try {
      const res = await axios.get(today);
      var dt = JSON.stringify(res?.data);
      setJsonData(dt);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMatch = async (id) => {
    const today = `${fetchURL}/matches/${id}`;
    try {
      const res = await axios.get(today);
      var dt = JSON.stringify(res?.data);
      setJsonData(dt);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          <h1>Routes Page</h1>
        </div>
        <div>
          {/* router table */}
          <table style={styles.tbl}>
            <thead style={styles.th}>
              <tr>
                <th style={styles.th}>route</th>
                <th style={styles.th}>discription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.th}>
                  <button onClick={() => fetchTeamData()}>./players</button>
                </td>
                <td style={styles.th}>get teams</td>
              </tr>
              <tr>
                <td style={styles.th}>
                  <button onClick={() => fetchPlayerData()}>./teams</button>
                </td>
                <td style={styles.th}>get players</td>
              </tr>
              <tr>
                <td style={styles.th}>
                  <button onClick={() => fetchTodayMatch()}>./today</button>
                </td>
                <td style={styles.th}>get today matches</td>
              </tr>
              <tr>
                <td style={styles.th}>
                  <button onClick={() => fetchMatch(1)}>./matchs/1</button>
                </td>
                <td style={styles.th}>get match 1 details</td>
              </tr>
            </tbody>
          </table>
          {/* JSON Viewer */}
          <hr style={styles.hr} />
          <div style={styles.jsonview}>
            <div>
              <p>JSON Viewer</p>
            </div>
          </div>
          <div>
            <div style={{ width: 500, height: 400, overflowY: "scroll" }}>
              {jsonData}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Routes;
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
  jsonview: {
    padding: 5,
    paddingTop: 0,
    paddingLeft: 10,
    borderBottom: "1px solid black",
    display: "flex",
  },
};
