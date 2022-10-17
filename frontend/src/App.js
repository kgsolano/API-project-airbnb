// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotBrowser from "./components/Spots/SpotBrowser";
import SpotDetail from "./components/Spots/SpotDetail";
import AddSpot from "./components/Spots/AddSpot";
import { getAllSpots } from "./store/spots";
import EditSpotForm from "./components/Spots/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSpots())
  }, [dispatch]);

  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/spots/new">
            <AddSpot />
          </Route>
          <Route exact path="/">
            <SpotBrowser />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetail />
            <EditSpotForm />
          </Route>
          {/* <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
