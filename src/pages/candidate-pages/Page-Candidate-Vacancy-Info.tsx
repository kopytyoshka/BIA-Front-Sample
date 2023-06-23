import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonItem,
    IonLabel, IonList,
    IonMenuButton, IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {warning} from "ionicons/icons";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import {useParams} from "react-router";


function PageCandidateVacancyInfo() {

    interface VacancyParam {
        id: string;
    }

    const { id } = useParams<VacancyParam>();
    const [data, setData] = useState(null);

    const fetchVacancyData = () => {
        fetch("/api/vacancy/getCandidatesByVacancy?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
                console.log(data)
            })
    }
    useEffect(() => {
        fetchVacancyData()
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
                        <IonTitle>Вакансия</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid style={{margin: "10px"}}>
                        <IonRow style={{marginLeft: "0px"}}>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                    className="vacancy-cards-list">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{fontWeight: 600}}>Информация о вакансии</IonCardTitle>
                                    </IonCardHeader>
                                    <IonList no-lines>
                                        <IonItem lines="none">
                                            <IonItem>
                                                <IonLabel>Опыт работы</IonLabel>
                                                <IonItem lines="none" slot="end">100 лет</IonItem>
                                            </IonItem>
                                        </IonItem>
                                    </IonList>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow style={{marginLeft: "0px"}}>
                            <IonCard style={{borderRadius: '20px', maxWidth: '1000px'}}>
                                <IonCardHeader>
                                    <IonCardTitle style={{fontWeight: 600}}>Описание вакансии</IonCardTitle>
                                </IonCardHeader>
                                <IonList no-lines>
                                    <IonItem lines="none" style={{textAlign: "justify"}}>Lorem ipsum dolor sit amet,
                                        consectetur adipiscing
                                        elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam
                                        consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula
                                        varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet
                                        turpis sed blandit. Integer pretium massa eu faucibus interdum.Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipiscing
                                        elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam
                                        consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula
                                        varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet
                                        turpis sed blandit. Integer pretium massa eu faucibus interdum.Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipiscing
                                        elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam
                                        consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula
                                        varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet
                                        turpis sed blandit. Integer pretium massa eu faucibus interdum.</IonItem>
                                </IonList>
                            </IonCard>
                        </IonRow>
                        <IonRow>
                            <IonButton fill="outline" color="danger"
                                       style={{paddingLeft: "10px"}}>Откликнуться</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageCandidateVacancyInfo;