import React, {useEffect, useState} from 'react';
import '../../styles/Page-HR.css'
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
import {useHistory} from "react-router";
import handleToken from "../../scripts/CookiesToken";
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {formatWorkExperience} from "../candidate-pages/Page-Candidate-Vacancy-List";

export function formatWorkStatus(vacancyStatus: string): string {
    return vacancyStatus === "Opened" ? "Активная" :
        vacancyStatus === "OnModeration" ? "На модерации" :
            vacancyStatus === "Closed" ? "В архиве" :
                "not-documented"
}

const PageHR = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([])

    const handleSearch = () => {
        fetch('/api/vacancy/vacancySpecification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ key: 'name', value: query, operation: 'LIKE' }]),
        })
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error(error));
    };

    const history = useHistory();

    const navigateToPage = (vacancyId: string) => {
        history.push(`/list-candidates/${vacancyId}`);
    };

    const [vacancy, setVacancy] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [activeVacancies, setActiveVacancies] = useState<any>([])
    const [activeResponses, setActiveResponses] = useState<any>([])

    const fetchData = () => {
        fetch("/api/vacancy/allVacanciesForHR")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
            })
    }

    const fetchDataActiveVacancies = () => {
        fetch("/api/vacancy/countActiveVacancies")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setActiveVacancies(data)
                console.log(data)
            })
    }

    const fetchDataActiveResponses = () => {
        fetch("/api/response/countActiveResponses")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setActiveResponses(data)
                console.log(data)
            })
    }

    const fetchUserData = () => {
        fetch("/api/userInfo/getUsersInfo?userId=" + handleToken())
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
        fetchDataActiveVacancies()
        fetchDataActiveResponses()
    }, [])

    useEffect(() => {
        handleSearch();
    }, [query]);

    const handleItemClick = (vacancyId: string) => {
        history.push(`/vacancy-card/${vacancyId}`);
    };

    return (
        <>
            <PopupMenuHr/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
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

                                        <IonItem>
                                            <IonBadge slot="start">{activeVacancies.num}</IonBadge>
                                            <IonLabel>Активных вакансий</IonLabel>
                                        </IonItem>

                                        <IonItem>
                                            <IonBadge slot="start">{activeResponses.num}</IonBadge>
                                            <IonLabel>Новых заявок</IonLabel>
                                        </IonItem>

                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid fixed={true} style={{margin: "0px"}}>
                        <IonRow style={{margin: "0px"}} className="search-and-vacansii">
                            <IonCol size="12" sizeXs="5" sizeSm="12" sizeMd="12" sizeLg="2">
                                <h1>Вакансии</h1>
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
                                {/*<div className="search-button">*/}
                                {/*    <IonSearchbar searchIcon="../images/search-outline.svg"*/}
                                {/*                  placeholder="Поиск по названию"></IonSearchbar>*/}
                                {/*</div>*/}

                                <div className="search-button">
                                    <IonSearchbar
                                        searchIcon="../images/search-outline.svg"
                                        placeholder="Поиск по названию"
                                        value={query ?? ''}
                                        onIonChange={e => setQuery(e.detail.value!)}
                                        // onChange={() => handleSearch()}
                                    ></IonSearchbar>
                                    {/*<IonButton onClick={handleSearch}>Поиск</IonButton>*/}

                                    {/*{results.map(result => (*/}
                                    {/*    */}
                                    {/*    <div key={result.vacancyId}>*/}
                                    {/*        <h3>{result.vacancyName}</h3>*/}
                                    {/*        <p>{result.description}</p>*/}

                                    {/*    </div>*/}
                                    {/*))}*/}
                                </div>

                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid style={{margin: "0px"}}>
                        <IonRow>
                            {results.map(vac => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                        className="vacancy-cards-list" key={vac.vacancyId}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonLabel style={{fontWeight: 700}}>{vac.vacancyName}</IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonBadge slot="start"
                                                          color={
                                                              vac.vacancyStatus === "Opened" ? "success" :
                                                                  vac.vacancyStatus === "OnModeration" ? "warning" :
                                                                      "danger"
                                                          }>
                                                    {formatWorkStatus(vac.vacancyStatus)}</IonBadge>
                                                <IonBadge slot="end"
                                                          color={
                                                              vac.workExperience === "WithoutExperience" ? "success" :
                                                                  vac.workExperience === "MoreTwoYears" ? "danger" :
                                                                      "warning"
                                                          }>
                                                    {formatWorkExperience(vac.workExperience)}</IonBadge>
                                            </IonItem>
                                            <IonButton
                                                onClick={() => navigateToPage(vac.vacancyId)}
                                                 expand="block" fill="clear" color="transparent">Просмотреть
                                                кандидатов</IonButton>
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

export default PageHR;