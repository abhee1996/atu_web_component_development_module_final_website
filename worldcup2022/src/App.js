import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import PageNotFound from "./pageNotFound.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Teams from "./Components/Teams/teams";
import Players from "./Components/Players/Players";
import Todays from "./Components/Todaymatches/Todays";
import Fixtures from "./Components/Fixtures/Fixtures";
import Result from "./Components/Results/Results";
import Standing from "./Components/Standings/Standings";
import Login from "./Components/Login/Login";
import Routes from "./Components/Routes/Routes";
import Footer from "./Components/footer/footer";
import matchResult from "./Components/Results/matchResult";
import Admin from "./Components/Admin/Admin";
import Scorer from "./Components/Admin/Scorer";
import EditMatch from "./Components/Admin/EditMatch";

function App() {


  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Routes} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/todays-matches/" component={Todays} />
            <Route path="/fixture" component={Fixtures} />
            <Route path="/match-result" component={Result} />
            <Route path="/admin/scorer/:id" component={Scorer} />
            <Route path="/admin/edit-match/:id" component={EditMatch} />
            <Route path="/match-details/" component={matchResult} />
            <Route path="/standing" component={Standing} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
