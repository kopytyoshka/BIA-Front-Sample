import {Redirect, Route, Switch} from 'react-router-dom';
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
import PageCandidate from "./pages/candidate-pages/Page-Candidate";
import PageHR from "./pages/hr-pages/Page-HR";
import React, {useState} from "react";
import PageCandidateTasks from "./pages/candidate-pages/Page-Candidate-Tasks";
import PageCandidateTestForm from "./pages/candidate-pages/Page-Candidate-Test-Form";
import CandidateCardForHR from "./pages/hr-pages/Candidate-Card-For-HR";
import ListCandidates from "./pages/hr-pages/List-Of-Candidates";
import HR5CreateVacancy from "./pages/hr-pages/HR5-Create-Vacancy";
import MainPageByRole from "./scripts/MainPageLoader";
import Registration from "./pages/login-pages/Registration";
import Login from "./pages/login-pages/Login";
import HR6VacancyCardForView from "./pages/hr-pages/HR6-Vacancy-Card-For-View-For-HR";
import HR7EditVacancyCard from "./pages/hr-pages/HR7-Edit-Vacancy-Card";
import HR8AllVacancies from "./pages/hr-pages/HR8-All-Vacancies";
import handleToken from "./scripts/CookiesToken";
import PageCandidateVacancyList from "./pages/candidate-pages/Page-Candidate-Vacancy-List";
import pageCandidateVacancyInfo from "./pages/candidate-pages/Page-Candidate-Vacancy-Info";
import PageHRClosedTestCreate from "./pages/hr-pages/Page-HR-Closed-Test-Create";

const userRole = handleToken();
setupIonicReact();
const App: React.FC = () => (


    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/hr4-test-page">
                    <PageHRClosedTestCreate/>
                </Route>
                <Route exact path="/create-vacancy">
                    <HR5CreateVacancy/>
                </Route>
                <Route exact path="/register">
                    <Registration/>
                </Route>
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
                    <PageCandidateTestForm/>
                </Route>
                <Route exact path="/hr8-all-vacancies">
                    <HR8AllVacancies/>
                </Route>
                <Route exact path="/candidate-all-vacancies">
                    <PageCandidateVacancyList/>
                </Route>
                <Route path="/vacancy-card/:vacancyId" component={HR6VacancyCardForView} />
                <Route path="/login" component={Login}/>
                <Route path='/vacancy/:id' component={pageCandidateVacancyInfo}/>
                <Route path="/list-candidates/:id" component={ListCandidates}/>
                <Route path="/candidate-card/:id" component={CandidateCardForHR}/>
                <Route path="/edit-vacancy-card/:id" component={HR7EditVacancyCard}/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
