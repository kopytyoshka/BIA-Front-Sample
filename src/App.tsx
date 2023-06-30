import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
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
import PageHR from "./pages/hr-pages/Page-HR";
import PageCandidateTasks from "./pages/candidate-pages/Page-Candidate-Tasks";
import CandidateCardForHR from "./pages/hr-pages/Candidate-Card-For-HR";
import ListCandidates from "./pages/hr-pages/Page-HR-List-Of-Candidates";
import PageHRCreateVacancy from "./pages/hr-pages/Page-HR-Create-Vacancy";
import MainPageByRole from "./scripts/MainPageLoader";
import Registration from "./pages/login-pages/Registration";
import Login from "./pages/login-pages/Login";
import PageHRVacancyCardView from "./pages/hr-pages/Page-HR-Vacancy-Card-View";
import HR7EditVacancyCard from "./pages/hr-pages/HR7-Edit-Vacancy-Card";
import PageHRAllVacancies from "./pages/hr-pages/Page-HR-All-Vacancies";
import PageCandidateVacancyList from "./pages/candidate-pages/Page-Candidate-Vacancy-List";
import pageCandidateVacancyInfo from "./pages/candidate-pages/Page-Candidate-Vacancy-Info";
import pageHRClosedTestCreate from "./pages/hr-pages/Page-HR-Closed-Test-Create";
import pageHROpenedTestCreate from "./pages/hr-pages/Page-HR-Opened-Test-Create";
import React from "react";
import pageCandidateClosedTestForm from "./pages/candidate-pages/Page-Candidate-Closed-Test-Form";

setupIonicReact();
const App: React.FC = () => (


    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/create-vacancy"><PageHRCreateVacancy/></Route>
                <Route exact path="/register"><Registration/></Route>
                <Route exact path="/home"><MainPageByRole/></Route>
                <Route exact path="/hr-page"><PageHR/></Route>
                <Route exact path="/candidate-tasks"><PageCandidateTasks/></Route>
                <Route exact path="/"><Redirect to="/home"/></Route>
                <Route exact path="/hr8-all-vacancies"><PageHRAllVacancies/></Route>
                <Route exact path="/candidate-all-vacancies"><PageCandidateVacancyList/></Route>
                <Route path="/open-test-editor/:id" component={pageHROpenedTestCreate}/>
                <Route path="/close-test-editor/:id" component={pageHRClosedTestCreate}/>
                <Route path="/vacancy-card/:vacancyId" component={PageHRVacancyCardView}/>
                <Route path="/login" component={Login}/>
                <Route path='/test-solve/:id/:responseId' component={pageCandidateClosedTestForm}/>
                <Route path='/vacancy/:id' component={pageCandidateVacancyInfo}/>
                <Route path="/list-candidates/:id" component={ListCandidates}/>
                <Route path="/candidate-card/:id" component={CandidateCardForHR}/>
                <Route path="/edit-vacancy-card/:id" component={HR7EditVacancyCard}/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
