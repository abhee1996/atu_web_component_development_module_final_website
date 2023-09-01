import axios from "axios";

import React, { Component } from "react";
import { fetchURL } from "../../url";
import StandingTable from "./standingTable";

const Groups = [
  "Group A",
  "Group B",
  "Group C",
  "Group D",
  "Group E",
  "Group F",
  "Group G",
  "Group H",
];
class Standing extends Component {
  constructor(props) {
    super(props);
    this.state = { standing: [], pld: "", scores:'' , standGroup:'' };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchstandingById = async (id) => {
    try {
      var standingByIdURL = `${fetchURL}/standingbyid/${id}`;

      const { data } = await axios.get(standingByIdURL);
      this.setState({ pld: data });
    } catch (err) {
      console.log(err);
    }
  };
  fetchData = async () => {
    const stand = `${fetchURL}/standing/`;
    try {
      const res = await axios.get(stand);
      this.setState({
        standing: res.data,
      });
      for (var i = 0; i < res?.data?.length; i++) {
        if (res?.data[i]?.ID !== undefined) {
          var standingByIdURL = `${fetchURL}/standingbyid/${res?.data[i]?.ID}`;
          const { data } = await axios.get(standingByIdURL);
          if (data && data?.length !== undefined) {
            let pldArr = [];
            var list;
            for (let j = data?.length; j <= data?.length ; j++) {
              list = [...data];
              pldArr += list;
            }
            this.setState({
              pld: data?.length,
            });
              this.setState({
                standGroup: data,
              });
            
           
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { standing,standGroup } = this.state;

    return (
      <>
        <div>
          <div style={styles.fixtureHeading}>Standing</div>
          <hr />
          <div style={{ display: "inline", margin: "2px" }}>
            <table>
              {/* G A */}
              <StandingTable
              standGroup={standGroup}
                currentGroup={Groups[0]}
                standing={standing}
                state={this.state}
              />
              {/* G-B */}
              <StandingTable
              standGroup={standGroup}
                currentGroup={Groups[1]}
                standing={standing}
                state={this.state}
              />
              {/* GC */}
              <StandingTable
                currentGroup={Groups[2]}
                standing={standing}
                state={this.state}
              />
              {/* GD */}
              <StandingTable
                currentGroup={Groups[3]}
                standing={standing}
                state={this.state}
              />

              {/* GE */}
              <StandingTable
                currentGroup={Groups[4]}
                standing={standing}
                state={this.state}
              />

              {/* GF */}
              <StandingTable
                currentGroup={Groups[5]}
                standing={standing}
                state={this.state}
              />

              {/* G-G */}
              <StandingTable
                currentGroup={Groups[6]}
                standing={standing}
                state={this.state}
              />
              {/* GH */}
              <StandingTable
                currentGroup={Groups[7]}
                standing={standing}
                state={this.state}
              />
            </table>
          </div>
        </div>
      </>
    );
  }
}

const styles = {
  fixtureHeading: { display: "flex" },
  th: {
    border: "1px solid black",
    padding: 10,
    width: 100,
  },
  colth: {
    border: "1px solid black",
    padding: 10,
    width: 100,
  },
  tbl: {
    border: "1px solid black",
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Standing;
