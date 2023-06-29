import React, {useEffect, useState} from 'react';
import '../../styles/Popup-Menu-Style.css'
import '../../styles/Page-Candidate.css'
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import moment, {duration, Duration} from 'moment';
import handleToken from "../../scripts/CookiesToken";
import {formatStageType} from "../../scripts/utils";
import {useHistory, useParams} from "react-router";

const PageCandidateTasks = () => {

    interface Stage {
        name: string;
        id: string;
        deadline: Date;
        result: string;
        additional: null;
        type: string;
        duration: Duration;
    }

    interface Vacancy {
        responseId: string;
        responseStatus: string;
        creationDate: string;
        vacancyName: string;
        stages: Stage[];
        vacancyId: string;
    }

    const [usersChallenge, setUsersChallenge] = useState<any[]>([])
    const fetchDataVacancyCards = () => {
        fetch('/api/userInfo/getUsersResponses?userId=' + handleToken())
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsersChallenge(data)
            })
    }
    useEffect(() => {
        fetchDataVacancyCards()
    }, [])

    const history = useHistory();

    const navigateToPage = (responseId: string, stageId: string) => {
        history.push(`/test-solve/${responseId}/${stageId}`);
    };

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
                    {usersChallenge.map((challenge: Vacancy) => (
                        <div>
                            <div className="response-vacancy-header" key={challenge.vacancyId}>
                                <h1>{challenge.vacancyName}</h1>
                            </div>
                            <IonGrid style={{margin: "10px"}}>
                                <IonRow style={{marginLeft: "0px"}}>
                                    {challenge.stages.length === 0 ? (
                                        <div className="empty-stages-message">
                                            На данный момент по этой вакансии заданий нет
                                        </div>
                                    ) : (challenge.stages).map((stage: Stage) => (
                                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                                className="vacancy-cards-list" key={stage.id}>

                                            <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                                <IonCardHeader>
                                                    <IonCardTitle style={{fontWeight: 600}}>{stage.name}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonItem>
                                                        <IonLabel>Дедлайн</IonLabel>
                                                        <IonItem>{stage.deadline === null ? "Не установлен" : moment(stage.deadline).format('DD.MM.YY HH:mm')}</IonItem>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Тип</IonLabel>
                                                        <IonBadge color="warning"
                                                                  slot="end">{formatStageType(stage.type)}</IonBadge>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Время на прохождение:</IonLabel>
                                                        <IonBadge color="warning" slot="end">to-be-done</IonBadge>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Результат</IonLabel>
                                                        <IonLabel color="medium"
                                                                  slot="end"><i>to-be-done</i></IonLabel>
                                                    </IonItem>
                                                    <IonButton
                                                        expand="block"
                                                        fill="clear"
                                                        color="transparent"
                                                        style={{fontSize: "13px"}}
                                                        onClick={() => navigateToPage(stage.id, challenge.responseId)}
                                                    >Перейти к заданию</IonButton>
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