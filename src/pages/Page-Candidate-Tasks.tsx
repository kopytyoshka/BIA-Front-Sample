import React, {useEffect, useState} from 'react';
import '../styles/Popup-Menu-Style.css'
import '../styles/Page-Candidate.css'
import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonItem, IonLabel, IonList,
    IonMenuButton, IonMenuToggle,
    IonPage, IonRow, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenuCandidate from "./Popup-Menu-Candidate";
import moment from 'moment';
import {AddToCalendarButton} from 'add-to-calendar-button-react';
import {openExternalSite, redirectToExternalSite} from "../scripts/utils";

interface Stage {
    name: string;
    id: string;
    deadline: Date;
    result: string;
    additional: null;
    state: string;
}

interface Vacancy {
    responseStatus: string;
    creationDate: string;
    vacancyName: string;
    stages: Stage[];
    vacancyId: string;
}

interface Props {
    data: Vacancy[];
}

const PageCandidateTasks = () => {


    const [usersChallenge, setUsersChallenge] = useState<any[]>([])
    const fetchDataVacancyCards = () => {
        fetch('/api/userInfo/getUsersResponses')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsersChallenge(data)
                console.log(data)
            })
    }
    useEffect(() => {
        fetchDataVacancyCards()
    }, [])


    return (
        <>
            <PopupMenuCandidate/>

            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Мои Задания</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {usersChallenge.map((chell: Vacancy) => (
                        <div>
                            <div className="response-vacancy-header" key={chell.vacancyId}>
                                <h1>{chell.vacancyName}</h1>
                            </div>
                            <IonGrid style={{margin: "10px"}}>
                                <IonRow style={{marginLeft: "0px"}}>
                                    {(chell.stages).map((stage: Stage) => (
                                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                                className="vacancy-cards-list" key={stage.id}>
                                            <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                                <IonCardHeader>
                                                    <IonCardTitle style={{fontWeight: 600}}>{stage.name}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonItem>
                                                        <IonLabel>Дедлайн</IonLabel>
                                                        <IonItem>{moment(stage.deadline).format('DD.MM.YY HH:mm')}</IonItem>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Статус</IonLabel>
                                                        <IonBadge color="warning" slot="end">{stage.state}</IonBadge>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Результат</IonLabel>
                                                        <IonLabel color="medium"
                                                                  slot="end"><i>{stage.result}</i></IonLabel>
                                                    </IonItem>
                                                    <IonButton expand="block" fill="clear" color="transparent"
                                                               style={{fontSize: "13px"}}>Перейти к
                                                        заданию</IonButton>
                                                    <IonButton expand="block" fill="clear" color="transparent"
                                                               style={{fontSize: "13px"}}
                                                               onClick={() => openExternalSite('https://calendar.google.com/calendar/u/0/r/eventedit?text=${stage.name}'+
                                                                   `&dates=${moment(stage.deadline).subtract(1, 'hour').format('YYYYMMDDTHHmmssZ')}/${moment(stage.deadline).format('YYYYMMDDTHHmmssZ')}`+
                                                                   '&details=ID этапа: ${stage.id} ')}>Добавить в
                                                        календарь</IonButton>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                        </div>
                    ))}
                </IonContent>
            </IonPage>
        </>
    );
}

export default PageCandidateTasks;