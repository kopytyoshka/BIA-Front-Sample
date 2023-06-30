import '../../styles/Page-Candidate.css'
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from 'react';
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useHistory, useParams} from "react-router";

const ListCandidates = () => {
    interface RouteParams {
        id: string
    }

    const {id} = useParams<RouteParams>();
    const [candidate, setCandidate] = useState<any[]>([])
    const [data, setData] = useState<any>([]);

    const history = useHistory();

    const navigateToPage = (id: string) => {
        history.push(`/candidate-card/${id}`);
    };

    const fetchData = () => {
        fetch("/api/vacancy/getCandidatesByVacancy?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCandidate(data)
            })
    }

    const fetchVacancyData = () => {
        fetch("/api/vacancy/getVacancyInfo?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchData()
        fetchVacancyData()
    }, [])

    return (
        <>
            <PopupMenuHr/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Список кандидатов</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem color="transparent" lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                    <IonCard style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel>Вакансия</IonLabel>
                                                    <IonChip>
                                                        <IonIcon icon="../images/calendar-outline.svg"></IonIcon>
                                                        <IonLabel>{data.vacancyName}</IonLabel>
                                                    </IonChip>
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Прошел этап</IonLabel>
                                                    <IonList>
                                                        <IonItem>
                                                            <IonSelect aria-label="Fruit" interface="popover"
                                                                       placeholder="Выберите этап">
                                                                <IonSelectOption value="apples">Тест на знание
                                                                    Java</IonSelectOption>
                                                                <IonSelectOption value="oranges">Тест на знание
                                                                    C#</IonSelectOption>
                                                                <IonSelectOption value="bananas">Тест на знание
                                                                    C++</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonList>
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Получил результат</IonLabel>
                                                    <IonList>
                                                        <IonItem>
                                                            <IonSelect aria-label="Fruit" interface="popover"
                                                                       placeholder="Выберите результат">
                                                                <IonSelectOption value="apples">Больше
                                                                    5</IonSelectOption>
                                                                <IonSelectOption value="oranges">Больше
                                                                    10</IonSelectOption>
                                                                <IonSelectOption value="bananas">Больше
                                                                    15</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonList>
                                                </IonItem>
                                            </IonList>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonGrid style={{margin: "0px"}}>
                        <IonRow style={{margin: "0px"}}>
                            {candidate.map(can => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4" key={can.id}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonThumbnail slot="start">
                                                    <img className="candidate-image" alt="Silhouette of mountains"
                                                         src={can.image_url}/>
                                                </IonThumbnail>
                                                <IonLabel>{can.name}</IonLabel>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Статус заявки</IonLabel>
                                                <IonBadge color="warning">{can.responseStatus}</IonBadge>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Пройденный этап</IonLabel>
                                                <IonLabel color="medium" slot="end"><i>to-be-done</i></IonLabel>
                                            </IonItem>

                                            <IonButton
                                                onClick={() => navigateToPage(can.userId)}
                                                expand="block"
                                                fill="clear"
                                                color="transparent">
                                                Подробнее о кандидате
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
}

export default ListCandidates;