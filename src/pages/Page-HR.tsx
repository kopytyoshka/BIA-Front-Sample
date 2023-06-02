import React, {useEffect, useState} from 'react';
import '../styles/Page-HR.css'
import {
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonItem, IonLabel,
    IonMenuButton, IonMenuToggle,
    IonPage, IonRow, IonSearchbar, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenu from "./Popup-Menu-Candidate";
import {useHistory} from "react-router";

const PageHR = () => {

    const history = useHistory();

    const navigateToPage = (id: string) => {
        history.push(`/list-candidates/${id}`);
    };

    const [vacancy, setVacancy] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [name, setName] = useState('')

    const fetchData = () => {
        fetch("/api/vacancy/allVacancies")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
            })
    }

    const fetchUserData = () => {
        fetch("/api/userInfo/getUserInformation")
            .then(response => {
                return response.json()
            })
            .then(dataCandidate => {
                setImage(dataCandidate.image_url)
                setName(dataCandidate.name)
            })
    }

    useEffect(() => {
        fetchData()
        fetchUserData()
    }, [])

// function PageHR() {
    return (
        <>
            <PopupMenu/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        {/*<IonButtons slot="end">*/}
                        {/*    <IonMenuToggle>*/}
                        {/*        <IonItem lines="none" routerLink="/logout">*/}
                        {/*            <IonTitle>Выйти</IonTitle>*/}
                        {/*        </IonItem>*/}
                        {/*    </IonMenuToggle>*/}
                        {/*</IonButtons>*/}
                        <IonTitle>Главная страница</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">

                    <h1>Статистика по вакансиям</h1>

                    <IonGrid fixed={true} style={{margin: "0px"}}>
                        <IonRow style={{margin: "0px"}}>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4"
                                    className="vacancy-cards-list">
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonThumbnail slot="start">
                                                <img alt="Silhouette of mountains"
                                                     src={image}
                                                     style={{borderRadius: '16px'}}/>
                                            </IonThumbnail>
                                            <IonLabel>{name}</IonLabel>
                                        </IonItem>

                                        <IonItem routerLink="/">
                                            <IonBadge slot="start">11</IonBadge>
                                            <IonLabel>Активных вакансий</IonLabel>
                                        </IonItem>

                                        <IonItem routerLink="/">
                                            <IonBadge slot="start">11</IonBadge>
                                            <IonLabel>Новых заявок</IonLabel>
                                        </IonItem>

                                        <IonItem routerLink="/">
                                            <IonBadge slot="start">11</IonBadge>
                                            <IonLabel>Кандидатов в обработке</IonLabel>
                                        </IonItem>

                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid fixed={true} style={{margin: "0px"}}>
                        <IonRow style={{margin: "0px"}} className="search-and-vacansii">
                            <IonCol size="12" sizeXs="5" sizeSm="12" sizeMd="12" sizeLg="2">
                                <h1>Вакансия</h1>
                            </IonCol>
                            <IonCol size="12" sizeXs="7" sizeSm="12" sizeMd="12" sizeLg="4"
                                    className="vacancy-cards-list">
                                <div className="hr-card-vacansii-plus_button" style={{marginBottom: "20px"}}>
                                    <IonFab>
                                        <IonFabButton routerLink="/vacancy-page-for-hr" className="pic-size" style={{height: "34px", width: "34px"}}>
                                            <IonIcon icon="../images/add-outline.svg"></IonIcon>
                                        </IonFabButton>
                                    </IonFab>
                                </div>
                            </IonCol>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12"
                                    className="vacancy-cards-list">
                                <div className="search-button">
                                    <IonSearchbar searchIcon="../images/search-outline.svg"
                                                  placeholder="Поиск по названию"></IonSearchbar>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid style={{margin: "0px"}}>
                        <IonRow>
                            {vacancy.map(vac => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                        className="vacancy-cards-list" key={vac.id}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonLabel style={{fontWeight: 700}}>{vac.vacancyName}</IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonBadge slot="start" color={"success"}>{vac.vacancyStatus}</IonBadge>
                                                <IonBadge slot="end" color={"warning"}>{vac.workExperience}</IonBadge>
                                            </IonItem>
                                            <IonButton
                                                onClick={() => navigateToPage(vac.vacancyId)}
                                                 expand="block" fill="clear" color="transparent">Просмотреть
                                                кандидатов</IonButton>
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

export default PageHR;