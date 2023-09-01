import axios from "axios";
import React, { Component } from "react";
import { fetchURL } from "../../url";

class Todays extends Component {
  constructor(props) {
    super(props);
    this.state = { todaysMatch: [] };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const today = `${fetchURL}/today-matches/`;
    try {
      await axios.get(today).then((res) => {
        this.setState({ todaysMatch: res.data });
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { todaysMatch } = this.state;
    return (
      <>
        <div>
          <div style={styles.TodayMatchHeading}>
            {todaysMatch.length == 0 ? "No Match today" : "Matches Today"}
          </div>
          <hr />
          {todaysMatch.length == 0 ? (
            <></>
          ) : (
            <>
              <div style={{ display: "inline", margin: "2px" }}>
                <table style={styles.tbl}>
                  <thead style={styles.th}>
                    <tr>
                      <th style={styles.th}>Date & Time</th>
                      <th style={styles.th}>Round</th>
                      <th style={styles.th}>Group</th>
                      <th style={styles.th}></th>
                      <th style={styles.th}></th>
                      <th colSpan={2} style={styles.th}></th>
                      <th style={styles.th}></th>
                      <th style={styles.th}></th>
                      <th style={styles.th}>Stadium</th>
                      <th style={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysMatch?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td style={styles.th}> {item.datetime}</td>

                          <td style={styles.th}>
                            <p>{item.round}</p>
                          </td>
                          <td style={styles.th}>{item.group}</td>
                          <td style={styles.th}>
                            <img
                              src={require(`../../logos/${item?.aTeamID}.webp`)}
                            />
                          </td>
                          <td style={styles.th}>{item.aTeam}</td>
                          <td style={styles.colth}>{item.aTeamScore}</td>
                          <td style={styles.colth}>{item.hTeamScore}</td>
                          <td style={styles.th}>{item.hTeam}</td>
                          <td style={styles.th}>
                            <img
                              src={require(`../../logos/${item?.hTeamID}.webp`)}
                            />
                          </td>
                          <td style={styles.th}>{item.stadium}</td>
                          <td style={styles.thStatus}>
                            {item.status.toUpperCase()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const styles = {
  TodayMatchHeading: {
    display: "flex",
  },
  th: {
    border: "1px solid black",
    padding: 10,
    width: 100,
  },
  thStatus: {
    border: "1px solid black",
    color: "red",
    fontWeight: "bold",
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
export default Todays;
