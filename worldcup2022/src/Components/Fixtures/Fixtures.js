import axios from "axios";
import React, { Component } from 'react'
import { fetchURL } from "../../url";

 class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = { fixture: [] };
    this.fetchData = this.fetchData.bind(this);
  }
   fetchData = async () => {
    const fxture = `${fetchURL}/fixture/`;
    try {
      await axios.get(fxture).then((res)=>{
        this.setState({fixture:res?.data})
      })
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    const {fixture} = this.state;
    return (
      <>
        <div>
          <div style={styles.fixtureHeading}>Fixtures</div>
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
                {fixture?.map((item, idx) => {

                  return (
                    
                      <tr  key={idx}>
                        <td style={styles.th}> {item.datetime}</td>
                        <td style={styles.th}>
                          <p>{item.round}</p>
                        </td>
                        <td style={styles.th}>{item.group}</td>
                        <td style={styles.th}>
                        {item?.aTeamID >0 ? <>
                            <img width={50} height={30} style={styles.flagImg}
                            src={require(`../../logos/${item?.aTeamID}.webp`)}
                          />
                          </>: null}
                        </td>
                        <td style={styles.th}>{item.aTeam}</td>
                        <td style={styles.colth}>{item.aTeamScore}</td>
                        <td style={styles.colth}>{item.hTeamScore}</td>
                        <td style={styles.th}>{item.hTeam}</td>
                        <td style={styles.th}>
                          {item?.hTeamID >0 ? <>
                            <img width={50} height={30} style={styles.flagImg}
                            src={require(`../../logos/${item?.hTeamID}.webp`)}
                          />
                          </>: null}
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
  flagImg:{
    border:'1px solid gray',
    padding:2
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Fixtures;
