import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonItem, IonLabel,
    IonMenuButton,
    IonPage, IonRow, IonSearchbar, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useHistory} from "react-router";

const HR8AllVacancies = () => {
    const [vacancy, setVacancy] = useState<any[]>([])
    const history = useHistory();
    const fetchAllVacancies = () => {
        fetch("/api/vacancy/allVacanciesForHR")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
            })
    }

    const handleItemClick = (vacancyId: string) => {
        history.push(`/vacancy-card/${vacancyId}`);
    };

    useEffect(() => {
        fetchAllVacancies()
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
                        <IonTitle>Все вакансии</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3" sizeXl="4">
                                <IonSearchbar searchIcon="public/images/search-outline.svg"
                                              placeholder="Выбор параметров"></IonSearchbar>
                            </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton
                                    routerLink="/create-vacancy"
                                    fill="outline">
                                    Добавить вакансию
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            {vacancy.map(vac => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                    <IonCard style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonTitle>
                                                {vac.vacancyName}
                                            </IonTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                {vac.description}
                                            </IonItem>
                                            <IonButton
                                                onClick={() => handleItemClick(vac.vacancyId)}
                                                expand="block" fill="clear" color="transparent">Просмотреть
                                                вакансию</IonButton>
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

export default HR8AllVacancies;