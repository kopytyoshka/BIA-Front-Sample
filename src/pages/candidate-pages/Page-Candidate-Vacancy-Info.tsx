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
import {formatWorkExperience} from "./Page-Candidate-Vacancy-List";


function PageCandidateVacancyInfo() {

    interface VacancyParam {
        id: string;
    }

    const { id } = useParams<VacancyParam>();
    const [data, setData] = useState<any>([]);

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
                                        <IonCardTitle style={{fontWeight: 600}}>{data.vacancyName}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonList no-lines>
                                        <IonItem lines="none">
                                            <IonItem>
                                                <IonLabel>Опыт работы</IonLabel>
                                                <IonBadge slot="end"
                                                          color={
                                                              data.workExperience === "WithoutExperience" ? "success" :
                                                                  data.workExperience === "MoreTwoYears" ? "danger" :
                                                                      "warning"
                                                          }>
                                                    {formatWorkExperience(data.workExperience)}
                                                </IonBadge>
                                            </IonItem>
                                            <IonItem lines="none">
                                                {'Сфера работы:' + data.sphere}
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
                                    <IonItem lines="none" style={{textAlign: "justify"}}>{data.description}</IonItem>
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