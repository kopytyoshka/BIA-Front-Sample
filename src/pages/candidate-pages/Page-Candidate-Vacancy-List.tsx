import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonItem,
    IonLabel, IonList,
    IonMenuButton, IonPage, IonRadio, IonRadioGroup,
    IonRow, IonSearchbar,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import {warning} from "ionicons/icons";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";

const PageCandidateVacancyList = () => {
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
                            <IonCol size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3" sizeXl="4">
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
                                                    <IonRadio justify="space-between" value="dogs">Нет опыта</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="cats">1-3 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="turtles">4-5 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="fish">Больше 5</IonRadio>
                                                    <br/>
                                                </IonItem>
                                            </IonRadioGroup>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        {/*//TODO: фетч факансий*/}
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageCandidateVacancyList;