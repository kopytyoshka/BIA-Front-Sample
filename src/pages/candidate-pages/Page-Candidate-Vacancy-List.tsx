import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonInput, IonItem,
    IonLabel, IonList,
    IonMenuButton, IonPage, IonRadio, IonRadioGroup,
    IonRow, IonSearchbar, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import {useHistory} from "react-router";

export function formatWorkExperience(workExperience: string): string {
    return workExperience === "WithoutExperience" ? "Без опыта работы" :
        workExperience === "MoreTwoYears" ? "Более двух лет" :
            workExperience === "CoupleOfYears" ? "1-а года" :
                "not-documented"
}


function PageCandidateVacancyList() {

    const [vacancy, setVacancy] = useState<any[]>([])
    const fetchDataVacancies = () => {
        fetch("/api/vacancy/allVacanciesForUser")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
                console.log(vacancy)
            })
    }
    useEffect(() => {
        fetchDataVacancies()
    }, [])


    const history = useHistory();

    const handleItemClick = (id: string) => {
        history.push(`/vacancy/${id}`);
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
                        <IonTitle>Вакансии</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="5" sizeXs="12" sizeSm="5" sizeMd="5" sizeLg="5" sizeXl="6">
                                <IonSearchbar searchIcon="public/images/search-outline.svg"
                                              placeholder="Поиск по вакансиям"></IonSearchbar>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Опыт работы
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonRadioGroup>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="WithoutExperience">Без опыта</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="CoupleOfYears">1-2 года</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="MoreTwoYears">Больше двух лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                            </IonRadioGroup>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            {vacancy.map(vac => (

                                    <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                            className="vacancy-cards-list" key={vac.vacancyId}>
                                        <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}
                                                 onClick={() => handleItemClick(vac.vacancyId)}>
                                            <IonCardHeader>
                                                <IonCardTitle style={{fontWeight: 600}}>{vac.vacancyName}</IonCardTitle>
                                            </IonCardHeader>
                                            <IonItem>
                                                {vac.description.length > 150 ? vac.description.slice(0, 150) + '...' : vac.description}
                                            </IonItem>
                                            <IonItem>
                                                <IonBadge slot="end"
                                                          color={
                                                              vac.workExperience === "WithoutExperience" ? "success" :
                                                                  vac.workExperience === "MoreTwoYears" ? "danger" :
                                                                      "warning"
                                                          }>
                                                    {formatWorkExperience(vac.workExperience)}
                                                </IonBadge>
                                            </IonItem>
                                        </IonCard>
                                    </IonCol>
                                )
                            )}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageCandidateVacancyList;