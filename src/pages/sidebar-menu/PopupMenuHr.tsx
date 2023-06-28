import React from 'react';
import '../Home.css';
import {
    IonBadge,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel, IonList,
    IonMenu,
    IonMenuButton, IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {nullifyAllCookies, openExternalSite} from "../../scripts/utils";

function PopupMenuHr() {

    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Платформа</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-no-padding">
                    <IonList>
                        <IonMenuToggle>
                            <IonItem routerLink="/home">
                                <IonIcon src="../images/pulse-outline.svg" slot="start"></IonIcon>
                                <IonLabel>Главная страница</IonLabel>
                            </IonItem>
                            <IonItem routerLink="/hr8-all-vacancies">
                                <IonIcon src="../images/ice-cream-outline.svg" slot="start"></IonIcon>
                                <IonLabel>Все вакансии</IonLabel>
                            </IonItem>
                            <IonItem onClick={() => openExternalSite('/statistic')}>
                                <IonIcon src="../images/calendar-number-outline.svg" slot="start"></IonIcon>
                                <IonLabel>Статистика</IonLabel>
                            </IonItem>
                            <IonItem routerLink="/vacancy-page-for-hr">
                                <IonIcon src="../images/add-circle-outline.svg" slot="start"></IonIcon>
                                <IonLabel>Создать вакансию</IonLabel>
                            </IonItem>

                            <IonItem className="ion-padding-top">
                                <IonLabel className="ion-padding-top">Дополнительно</IonLabel>
                            </IonItem>
                            <IonItem routerLink="/">
                                <IonIcon src="../images/terminal-outline.svg" slot="start"></IonIcon>
                                <IonLabel>Поддержка</IonLabel>
                            </IonItem>
                            <IonMenuToggle>
                                <IonItem routerLink="/login">
                                    <IonIcon src="../images/terminal-outline.svg" slot="start"></IonIcon>
                                    <IonLabel onClick={nullifyAllCookies}>Выйти</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
        </>
    );
}

export default PopupMenuHr;