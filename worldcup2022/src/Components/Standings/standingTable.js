import React, { Component } from "react";

export class StandingTable extends Component {
  constructor(props) {
    super(props);
    //this.state = { standing: [], pld: "", scores:'' , standGroup:'' };
    // this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { standGroup, standing } = this.props;
    // if(standGroup !== undefined){
    //  // console.log('standGroup', standGroup)
    //   let arr = []

    //   for(let i=0;i<standing.length ;i++){
    //     arr.push(standGroup)
    //    // console.log('standGroup.aTeamScore hTeamScore', standGroup?.aTeamScore, standGroup?.hTeamScore)
    //     if(standGroup.hTeamID ===  standGroup.aTeamID ){
    //        // console.log('standGroup.aTeamScore hTeamScore', standGroup?.aTeamScore, standGroup?.hTeamScore)
    //     }
    //     console.log('arr', arr)
    //   }

    // }
  }
  render() {
    const { currentGroup, standing, state, standGroup } = this.props;

    return (
      <>
        {/* G-B */}
        <thead style={styles.th}>
          <tr>
            <th colSpan={7} style={styles.th}>
              {currentGroup}
            </th>
          </tr>
          <tr>
            <th style={styles.th}>POS</th>
            <th colSpan={1} style={styles.colth}>
              Name
            </th>
            <th style={styles.th}>Pld</th>
            <th style={styles.th}>GF</th>
            <th style={styles.th}>GA</th>
            <th style={styles.th}>GD</th>
            <th style={styles.th}>Pts</th>
          </tr>
        </thead>

        <tbody>
          {standing.map((a, i) => {
            return (
              <tr key={i}>
                {a.group === currentGroup ? (
                  <>
                    <th style={styles.th}>1</th>
                    <th colSpan={1} style={styles.colth}>
                      {a.name}-{a.abbrev}
                    </th>

                    <td style={styles.th}>{state.pld}</td>
                    <td style={styles.th}>7</td>
                    <td style={styles.th}>2</td>
                    <td style={styles.colth}>6</td>
                    <td style={styles.colth}>9</td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
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
export default StandingTable;
