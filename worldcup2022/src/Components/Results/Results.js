import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchURL } from "../../url";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { matchResults: [] };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData = async () => {
    const winResultUrl = `${fetchURL}/win-results/`;

    try {
      await axios.get(winResultUrl).then((res) => {
        this.setState({
          matchResults: res.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { matchResults } = this.state;
    return (
      <>
        <div>
          <div style={styles.fixtureHeading}>Results</div>
          <hr />
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
                </tr>
              </thead>
              <tbody>
                {matchResults?.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td style={styles.th}> {item.datetime}</td>
                      <td style={styles.th}>
                        <p>{item.round}</p>
                      </td>
                      <td style={styles.th}>{item.group}</td>
                      <td style={styles.th}>
                        {item?.aTeamID > 0 ? (
                          <>
                            <img
                              width={50}
                              height={30}
                              style={styles.flagImg}
                              src={require(`../../logos/${item?.aTeamID}.webp`)}
                            />
                          </>
                        ) : null}
                      </td>
                      <td style={styles.th}>{item.aTeam}</td>
                      <td style={styles.colth}>
                        <Link
                          to={{
                            pathname: `match-details/:${item.matchNumber}`,
                            query: {
                              item: item,
                              matchNumber: item?.matchNumber,
                              aTeamID: item?.aTeamID,
                              aTeam: item?.aTeam,
                              aTeamScore: item?.aTeamScore,
                              hTeamScore: item?.hTeamScore,
                              hTeam: item?.hTeam,
                              hTeamID: item?.hTeamID,
                              datetime: item?.datetime,
                            },
                          }}
                        >
                          {item.aTeamScore}
                        </Link>
                      </td>
                      <td style={styles.colth}><Link
                          to={{
                            pathname: `match-details/:${item.matchNumber}`,
                            query: {
                              item: item,
                              matchNumber: item?.matchNumber,
                              aTeamID: item?.aTeamID,
                              aTeam: item?.aTeam,
                              aTeamScore: item?.aTeamScore,
                              hTeamScore: item?.hTeamScore,
                              hTeam: item?.hTeam,
                              hTeamID: item?.hTeamID,
                              datetime: item?.datetime,
                            },
                          }}
                        >{item.hTeamScore}
                        </Link>
                        </td>
                      <td style={styles.th}>{item.hTeam}</td>
                      <td style={styles.th}>
                        {item?.aTeamID > 0 ? (
                          <>
                            <img
                              width={50}
                              height={30}
                              style={styles.flagImg}
                              src={require(`../../logos/${item?.hTeamID}.webp`)}
                            />
                          </>
                        ) : null}
                      </td>
                      <td style={styles.th}>{item.stadium}</td>
                    </tr>
                  );
                })}
              </tbody>
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
  },
  colth: {
    border: "1px solid black",
    padding: 10,
  },
  flagImg: {
    border: "1px solid gray",
    padding: 2,
  },

  tbl: {
    border: "1px solid black",
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Result;
