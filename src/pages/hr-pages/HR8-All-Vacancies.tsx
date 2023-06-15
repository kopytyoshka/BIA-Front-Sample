import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonItem,
    IonMenuButton,
    IonPage, IonRow, IonSearchbar, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenu from "../sidebar-menu/Popup-Menu";

const HR8AllVacancies = () => {
    return (
        <>
            <PopupMenu/>
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
                                <IonButton fill="outline">Добавить вакансию</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Backend-разработчик C#
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            Краткое описание
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Просмотреть вакансию
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Backend-разработчик C#
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            Краткое описание
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Просмотреть вакансию
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}

export default HR8AllVacancies;