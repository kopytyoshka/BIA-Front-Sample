import React, {useEffect, useState} from 'react';
import '../../styles/Popup-Menu-Style.css'
import '../../styles/Page-Candidate.css'
import {
    IonBadge,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import handleToken from "../../scripts/CookiesToken";

function PageCandidate() {

    const [response, setResponse] = useState<any[]>([])
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('')

    const fetchDataResponses = () => {
        fetch('/api/userInfo/getUsersResponses?userId=' + handleToken())
            .then(response => {
                return response.json()
            })
            .then(data => {
                setResponse(data)
            })
    }

    const fetchUserData = () => {
        fetch("/api/userInfo/getUsersInfo?userId=" + handleToken())
            .then(response => {
                return response.json()
            })
            .then(dataCandidate => {
                setPhoneNumber(dataCandidate.phoneNumber)
                setEmail(dataCandidate.email)
                setName(dataCandidate.name)
                setImage(dataCandidate.image_url)
            })
    }

    useEffect(() => {
        fetchUserData()
        fetchDataResponses()
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
                        <IonTitle>Личные Данные</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="candidate-data">
                        <IonThumbnail className="candidate-image-thumbnail">
                            <img className="candidate-image" alt="Silhouette of mountains"
                                 src={image}/>
                        </IonThumbnail>
                        <div className="candidate-card">
                            <IonCard className="ion-no-margin" style={{borderRadius: '20px'}}>
                                <IonCardHeader>
                                    <IonCardTitle>{name}</IonCardTitle>
                                    <IonCardSubtitle>Информация:</IonCardSubtitle>
                                </IonCardHeader>
                                <IonList no-lines>
                                    <IonItem lines="none">
                                        <IonItem slot="start" className="email-description-card">Почта</IonItem>
                                        <IonItem slot="end">{email}</IonItem>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonItem slot="start" className="phone-description-card">Телефон</IonItem>
                                        <IonItem slot="end">{phoneNumber}</IonItem>
                                    </IonItem>
                                </IonList>
                            </IonCard>
                        </div>
                    </div>

                    <div className="response-vacancy-header">
                        <h1>Отклики</h1>
                    </div>

                    <IonGrid style={{margin: "10px"}}>
                        <IonRow style={{marginLeft: "0px"}}>
                            {response.map(response => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                        className="vacancy-cards-list">
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle
                                                style={{fontWeight: 600}}>{response.vacancyName}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonList no-lines>
                                            <IonItem lines="none">
                                                <IonItem>
                                                    <IonLabel>Дата подачи:</IonLabel>
                                                    <IonItem lines="none" slot="end">{response.creationDate}</IonItem>
                                                </IonItem>
                                            </IonItem>
                                            <IonItem lines="none">
                                                <IonItem lines="none" slot="start">Статус:</IonItem>
                                                <IonBadge slot="start"
                                                          color="primary">{response.responseStatus}</IonBadge>
                                            </IonItem>
                                        </IonList>
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

export default PageCandidate;