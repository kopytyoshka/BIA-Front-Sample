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
import {redirectToExternalSite} from "../../scripts/utils";
import handleToken from "../../scripts/CookiesToken";


function PageCandidateVacancyInfo() {

    interface VacancyParam {
        id: string;
    }

    const { id } = useParams<VacancyParam>();
    const [data, setData] = useState<any>([]);



    async function Response() {
        let makeResponseData = {
            userId: handleToken(),
            vacancyId: id,
        };

        try {
            let response = await fetch("/api/userInfo/createResponseForUser", {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(makeResponseData)
            });

            if (response.ok) {
                redirectToExternalSite('/home');
            } else if (response.status === 403) {
                console.log('АШИПКА 403')
            } else {
                console.log('АШИПКА НЕИЗВЕСТНА')
            }
        } catch (error) {
            console.error('Error', error);
        }
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
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonItem>
                                                <IonLabel>Сфера:</IonLabel>
                                                <IonBadge slot="end"
                                                          color={"warning"}>
                                                    {data.sphere}
                                                </IonBadge>
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
                                       style={{paddingLeft: "10px"}} onClick={Response}>Откликнуться</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageCandidateVacancyInfo;