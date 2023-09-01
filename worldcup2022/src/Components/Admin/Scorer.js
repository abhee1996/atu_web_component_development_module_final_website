import axios from "axios";
import React, { Component } from "react";
import { fetchURL } from "../../url";

class Scorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerByTeam: [],
      teams: "",
      teamId: "",
      scorer: [],
      aTeam: [],
      hTeam: [],
      playerName: "",
      aplayerName: "",
      hplayerName: "",
      aTscorers: { matchNumber: "", teamID: "", playerID: "", playerName: "" },
      hTscorers: { matchNumber: "", teamID: "", playerID: "", playerName: "" },
    };
    this.fetchplayerById = this.fetchplayerById.bind(this);
    this.fetchDataById = this.fetchDataById.bind(this);
    this.saveHandle = this.saveHandle.bind(this);
  }
  fetchDataById = async (id) => {
    var adminfx = `${fetchURL}/admin/fixture/${id}`;
    try {
      const { data } = await axios.get(adminfx);
      this.setState({ scorer: data });
    } catch (err) {
      console.log(err);
    }
  };
  saveHandle = async () => {
    var scrr = `${fetchURL}/admin/scorer/post`;
    try {
      const { scorer, playerByTeam, playerName, aTeam, hTeam } = this.state;

      const { matchNumber, aTeamScore, hTeamScore } =
      this?.props?.location?.query;
      let f = { matchNumber, playerName };

      await axios.post(scrr, this.state.scorers).then(() => {
       
        this.setState({
          matchNumber: '',
          teamID: "",
          playerID: "",
          playerName: "", 
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  fetchplayerById = async (atId, hTId) => {
    var playerbyatId = `${fetchURL}/admin/playerbycountry/${atId}`;
    var playerbyhTId = `${fetchURL}/playerbycountry/${hTId}`;
    try {
      const atres = await axios.get(playerbyatId);
      this.setState({ aTeam: atres.data });
      const hres = await axios.get(playerbyhTId);
      this.setState({ hTeam: hres.data });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const { matchNumber, aTeamID, hTeamID } = this?.props?.location?.query;

    this.fetchDataById(matchNumber);
    this.fetchplayerById(aTeamID, hTeamID);
  }

  render() {
    const { scorer, playerByTeam, aTeam, hTeam } = this.state;
    return (
      <div>
        <div style={styles.fixtureHeading}>Scorer</div>
        <table>
          <thead>
            {scorer?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <th style={styles.th}>{item.aTeam}</th>
                  <th style={styles.th}>{item.hTeam}</th>
                </tr>
              );
            })}
          </thead>

          <tbody>
            <td style={styles.th}>
              <select
                style={styles.scSelect}
                onChange={(e) => {
                  this.setState({ playerName: e.target.value });
                }}
              >
                <option>{"All"}</option>

                {aTeam?.map((val, idx) => {
                  return (
                    <option key={idx} value={val.ID}>
                      {val?.plyName} {`(${val.abbrev})`}
                    </option>
                  );
                })}
              </select>
            </td>

            <td style={styles.th}>
              <select
                style={styles.scSelect}
                onChange={(e) => {
                  this.setState({ playerName: e.target.value });
                }}
              >
                <option value={0}>{"All"}</option>

                {hTeam?.map((val, idx) => {
                  return (
                    <option key={idx} value={val.ID}>
                      {val?.plyName} {`(${val.abbrev})`}
                    </option>
                  );
                })}
              </select>
            </td>
          </tbody>
          <tbody>
            <td colSpan={2} style={styles.colth}>
              <button onClick={this.saveHandle}>Save</button>
            </td>
          </tbody>
        </table>
      </div>
    );
  }
}
const styles = {
  fixtureHeading: { display: "flex", fontSize: 28, fontWeight: "bolder" },

  th: {
    border: "1px solid black",
    padding: 5,
    width: 200,
  },
  colth: {
    border: "1px solid black",
    padding: 5,
    width: 100,
  },
  inputss: {
    width: 50,
    height: 50,
    border: "none",
  },
  scSelect: {
    width: "100%",
  },
  tbl: {
    border: "1px solid black",
  },
  flagImg: {
    border: "1px solid gray",
    padding: 2,
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Scorer;
