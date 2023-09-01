import axios from "axios";
import React, { Component } from "react";
import { fetchURL } from "../../url";
const stadiumlist = [
  { id: 1, stadiumName: "Ahmed Bin Ali Stadium" },
  { id: 2, stadiumName: "Al Bayt Stadium" },
  { id: 3, stadiumName: "Al jnoub Stadium" },
  { id: 4, stadiumName: "Al Thumama Stadium" },
  { id: 5, stadiumName: "Education City Stadium" },
  { id: 6, stadiumName: "Khalifa International Stadium" },
  { id: 7, stadiumName: "Lusail Stadium" },
  { id: 8, stadiumName: "Stadium 974" },
  { id: 9, stadiumName: "TBA" },
];
export class EditMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadium: "",

      team: [],
      aTeam: "",
      aTeamID: "",
      hTeam: "",
      hTeamID: "",
      aTeamScore: "",
      hTeamScore: "",
    };
    this.fetchData = this.fetchData.bind(this);
    this.editMatchData = this.editMatchData.bind(this);
  }
  fetchData = async () => {
    const teams = `${fetchURL}/teams/`;
    try {
      const teamsres = await axios.get(teams);
      this.setState({ team: teamsres.data });
    } catch (err) {
      console.log(err);
    }
  };

  editMatchData = async () => {
    const { matchNumber, aTeamScore, hTeamScore } =
      this?.props?.location?.query;
    const { aTeam, aTeamID, hTeam, hTeamID, stadium } = this.state;
    const editMatchURL = `${fetchURL}/admin/fixture/update/${matchNumber}`;
    let f = { aTeam, aTeamID, hTeam, hTeamID, stadium, aTeamScore, hTeamScore };
    try {
      await axios
        .put(editMatchURL, f)
        .then(() => {
          this.setState({
            aTeam: "",
            aTeamID: "",
            hTeam: "",
            hTeamID: "",
            stadium: "",
            aTeamScore: "",
            hTeamScore: "",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { team } = this.state;
    return (
      <div>
        <div style={styles.fixtureHeading}>Edit Match details</div>
        <div style={styles.edmatch}>
          <div>
            Team 1:
            <select
              style={styles.scSelect}
              onChange={(e) => {
                let value = e.target.value.split("-");
                this.setState({ aTeamID: value[0] });
                this.setState({ aTeam: value[1] });
              }}
            >
              <option>{"All"}</option>

              {team?.map((val, idx) => {
                return (
                  <option key={idx} value={`${val.ID}-${val.name}`}>
                    {val?.name} {`(${val.abbrev})`}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            Team 2:
            <select
              style={styles.scSelect}
              onChange={(e) => {
                let value = e.target.value.split("-");
                this.setState({ hTeamID: value[0] });
                this.setState({ hTeam: value[1] });
              }}
            >
              <option value={0}>{"All"}</option>

              {team?.map((val, idx) => {
                return (
                  <option key={idx} value={`${val.ID}-${val.name}`}>
                    {val?.name} {`(${val.abbrev})`}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            Stadium:
            <select
              style={styles.scSelect}
              onChange={(e) => {
                this.setState({ stadium: e.target.value });
              }}
            >
              <option value={0}>{"All"}</option>
              {stadiumlist?.map((val, idx) => {
                return (
                  <option key={idx} value={val.stadiumName}>
                    {val?.stadiumName}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={styles.colth}>
            <button onClick={this.editMatchData}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  fixtureHeading: { display: "flex", fontSize: 28, fontWeight: "bolder" },

  th: {
    border: "1px solid black",
    padding: 5,
    width: 60,
  },
  colth: {
    padding: 5,
    justifyContent: "center",
    display: "flex",
  },
  edmatch: {
    justifyContent: "center",
    alignItem: "center",
  },
  inputss: {
    width: 50,
    height: 50,
    border: "none",
  },
  scSelect: {
    width: "20%",

    justifyContent: "center",
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
export default EditMatch;
