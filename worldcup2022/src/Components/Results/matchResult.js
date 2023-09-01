import axios from "axios";
import React, { Component } from "react";
import { fetchURL } from "../../url";

class matchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { matchNum: this.props.match.params.Detail, playerName: "" };
    this.fetchMatchDetailData = this.fetchMatchDetailData.bind(this);
  }

  fetchMatchDetailData = async (num) => {
    const winResultUrl = `${fetchURL}/win-results/detail/${num}`;

    try {
      await axios.get(winResultUrl).then(({data}) => {
        this.setState({
          matchResults: data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.fetchMatchDetailData(this.state.matchNum);
  }

  render() {
    const {  playerName } = this.state;
    const {
      matchNumber,
      aTeamID,
      aTeam,
      aTeamScore,
      hTeamScore,
      hTeamID,
      hTeam,
      datetime,
      
    } = this?.props?.location?.query;
    return (
      <div>
        Match Result Details
        <div>
          date: <span>{datetime}</span>
        </div>
        <div>
          
          <span >
            {aTeam} |
            {aTeamID > 0 ? (
              <>
                <img
                  width={50}
                  height={30}
                  style={styles.flagImg}
                  src={require(`../../logos/${aTeamID}.webp`)}
                />
              </>
            ) : null}
          </span>
          <span style={styles.scoreValStyle}>{aTeamScore}</span>- <span style={styles.scoreValStyle}>{hTeamScore} </span>
          <span>
            {hTeamID > 0 ? (
              <>
                <img
                  width={50}
                  height={30}
                  style={styles.flagImg}
                  src={require(`../../logos/${hTeamID}.webp`)}
                />
              </>
            ) : null}
            |{hTeam}
          </span>
        </div>
        <div>
          {playerName || "No player displayed"}
          <span></span>
        </div>
      </div>
    );
  }
}
const styles={
  flagImg:{
    border:'1px solid gray',
    padding:2,
    width:30,
    height:20,
  },
  scoreValStyle:{
    padding:10,
    fontSize:30,
    fontWeight:"bold"
  }
}
export default matchResult;
