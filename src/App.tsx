import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import PageCandidate from "./pages/Page-Candidate";
import PageHR from "./pages/Page-HR";
import React, {useState} from "react";
import PageCandidateTasks from "./pages/Page-Candidate-Tasks";
import CandidateTestForm from "./pages/Candidate-Test-Form";
import CandidateCardForHR from "./pages/Candidate-Card-For-HR";
import ListCandidates from "./pages/List-Of-Candidates";
import VacancyPageForHR from "./pages/Vacancy-Page-For-HR";
import MainPageByRole from "./scripts/MainPageLoader";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AllVacancyCards from "./pages/Page-HR";

setupIonicReact();
const App: React.FC = () => (




    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/vacancy-page-for-hr">
                    <VacancyPageForHR/>
                </Route>
                <Route exact path="/register">
                    <Registration/>
                </Route>
                {/*<Route exact path="/login">*/}
                {/*    <Login></Login>*/}
                {/*</Route>*/}
                <Route exact path="/home">
                    <MainPageByRole/>
                </Route>
                <Route exact path="/hr-page">
                    <PageHR/>
                </Route>
                <Route exact path="/candidate-tasks">
                    <PageCandidateTasks/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
                <Route exact path="/candidate-test">
                    <CandidateTestForm/>
                </Route>
                <Route path="/list-candidates/:id" component={ListCandidates} />
                <Route path="/candidate-card/:id" component={CandidateCardForHR} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
