import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchURL } from "../../url";
  class Admin extends Component {
   constructor(props) {
     super(props);
     this.state = {
       fixture: [],
       aTeamScore: "",
       hTeamScore: "",
       status: "",
       aTeamScoreArr: [],
       hTeamScoreArr: [],
       statusAr: [],
     };
     this.fetchData = this.fetchData.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
   fetchData = async () => {
     const fxture = `${fetchURL}/admin/fixture/`;
     try {
       await axios.get(fxture).then((res) => {
         const { data } = res;
         let trray = [];
         let tArray = [];
         let statusArray = [];
         for (var i = 0; i < data.length; i++) {
           const ats = data[i].aTeamScore;
           trray.push(ats);
           const hts = data[i].hTeamScore;
           tArray.push(hts);
           const stats = data[i].status;
           statusArray.push(stats);
         }

         this.setState({
           fixture: data,
           aTeamScore: trray,
           hTeamScore: tArray,
           statusAr: statusArray,
         });
       });
     } catch (err) {
       console.log(err);
     }
   };

   handleSubmit = async (id) => {
     const { fixture } = this.state;

     const updatefxture = `${fetchURL}/admin/fixture/update/scores/${id}`;
     let hTeamScore;
     let aTeamScore;
     let status;
     fixture.map((e, idx) => {
       hTeamScore = Array.isArray(this.state.hTeamScore)
         ? this.state.hTeamScore[idx]
         : this.state.hTeamScore;
       aTeamScore = Array.isArray(this.state.aTeamScore)
         ? this.state.aTeamScore[idx]
         : this.state.aTeamScore;
       status = Array.isArray(this.state.status)
         ? this.state.status[idx]
         : this.state.status;
     });
     let st = { hTeamScore, aTeamScore, status };
     axios
       .put(updatefxture, st)
       .then(() => {
         this.setState({
           hTeamScore: "",
           aTeamScore: "",
           status: "",
         });
       })
       .catch((err) => {
         console.log("err update teams scores value", err);
       });
   };

   componentDidMount() {
     this.fetchData();
   }
   render() {
     const {
       fixture,
       aTeamScoreArr,
       aTeamScore,
       hTeamScoreArr,
       hTeamScore,
       statusAr,
       status,
     } = this.state;
     return (
       <>
         <div>
           <div style={styles.fixtureHeading}>Admin Dashboard</div>
           <hr />
           <div style={{ display: "inline", margin: "2px" }}>
           <p style={{fontSize:8}}>my update scores in input fields are working but on change of both values if single value change it send empty string like ' ' causes data not update.  </p>

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
                   <th style={styles.th}></th>
                   <th style={styles.th}></th>
                   <th style={styles.th}></th>
                 </tr>
               </thead>
               <tbody>
                 {fixture?.map((item, idx) => {
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
                         <input
                           style={styles.inputss}
                           id="aTeamScore"
                           name="aTeamScore"
                           type="text"
                          
                           onChange={(e) => {
                             this.setState({
                               ...aTeamScore,
                               [e.target.name]: e.target.value,
                             });
                           }}
                           value={aTeamScore[idx]}
                         />
                       </td>
                       <td style={styles.colth}>
                         <input
                           id="hTeamScore"
                           name="hTeamScore"
                           type="text"
                           style={styles.inputss}
                           onChange={(e) => {
                             this.setState({
                               ...hTeamScore,
                               [e.target.name]: e.target.value,
                             });
                           }}
                           value={hTeamScore[idx]}
                         />
                       </td>
                       <td style={styles.th}>{item.hTeam}</td>
                       <td style={styles.th}>
                         {item?.hTeamID > 0 ? (
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
                       <td style={styles.th}>
                         <div className="d-flex">
                           <input
                             id={idx}
                             type="radio"
                             value="fixture"
                             name={status[idx]}
                             checked={
                               status[idx] === "fixture" ? true : false
                             }
                             onChange={(e) => {
                               this.setState({ status: e.target.value });
                             }}
                           />
                           Fixture
                           <input
                             id={idx + 1}
                             type="radio"
                             value="result"
                             name={status[idx]}
                             checked={
                               status[idx] === "result" ? true : false
                             }
                             onChange={(e) => {
                               this.setState({ status: e.target.value });
                             }}
                           />
                           result
                           <input
                             id={idx + 2}
                             type="radio"
                             value="live"
                             name={status[idx]}
                             checked={
                               status[idx] === "live" ? true : false
                             }
                             onChange={(e) => {
                               this.setState({ status: e.target.value });
                             }}
                           />
                           live
                         </div>
                       </td>
                       <td style={styles.th}>
                         <button
                           onClick={(e) => this.handleSubmit(item?.matchNumber)}
                         >
                           update
                         </button>
                       </td>
                       <td style={styles.th}>
                         <Link
                           to={{
                             pathname: `/admin/edit-match/${item?.matchNumber}`,
                             query: {
                               item: item,
                               matchNumber: item?.matchNumber,
                               aTeamID: item?.aTeamID,
                               aTeamScore: item?.aTeamScore,
                               hTeamScore: item?.hTeamScore,
                               hTeamID: item?.hTeamID,
                             },
                           }}
                         >
                           Edit Match
                         </Link>
                       </td>
                       <td style={styles.th}>
                         <Link
                           to={{
                             pathname: `/admin/scorer/${item?.matchNumber}`,
                             query: {
                               item: item,
                               matchNumber: item?.matchNumber,
                               aTeamID: item?.aTeamID,
                               aTeamScore: item?.aTeamScore,
                               hTeamScore: item?.hTeamScore,
                               hTeamID: item?.hTeamID,
                             },
                           }}
                         >
                           Scorers
                         </Link>
                       </td>
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
  fixtureHeading: { display: "flex", fontSize: 28, fontWeight: "bolder" },
  th: {
    border: "1px solid black",
    padding: 5,
    width: 70,
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
  tbl: {
    border: "1px solid black",
  },
  flagImg: {
    border: "1px solid gray",
    padding: 2,
  },
  hr: { marginLeft: 4, marginRight: 3 },
};
export default Admin;

// const target = e.target;
// const value =
// status[idx] == "result"
//     ? target.checked
//     : target.value;
// const name = target.name;

// this.setState({
//   [name]: value,
// });