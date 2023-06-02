
import React, {useEffect, useState} from 'react';
import '../styles/Page-HR.css'
import {
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonItem, IonLabel, IonList,
    IonMenu,
    IonMenuButton,
    IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenu from "./Popup-Menu";
import {useParams} from "react-router";

interface Stage {
    name: string;
    id: string;
    deadline: Date;
    result: string;
    additional: null;
    state: string;
}

interface Vacancy {
    responseStatus: string;
    creationDate: string;
    vacancyName: string;
    stages: Stage[];
    vacancyId: string;
}


interface RouteParams {
    id: string;
}

const CandidateCardForHR = () => {
    const { id } = useParams<RouteParams>();
    const [candidate, setCandidate] = useState<any[]>([])
    const [otkilk, setOtklik] = useState<any[]>([])

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const fetchDataOtkliki = () => {
        fetch("/api/userInfo/getUsersResponses?userId=" + id)
            .then(response => {
                return response.json()
            })
            .then(dataOtklik => {
                setOtklik(dataOtklik)
            })
    }

    const fetchData = () => {
        fetch("/api/userInfo/getUsersInfo?userId=" + id)
            .then(response => {
                return response.json()
            })
            .then(dataCandidate => {
                setCandidate(dataCandidate)
                setPhoneNumber(dataCandidate.phoneNumber)
                setEmail(dataCandidate.email)
                setName(dataCandidate.name)
                setImage(dataCandidate.image_url)
            })
    }

    useEffect(() => {
        fetchData()
        fetchDataOtkliki()
    }, [])

    return (
        <>
            <PopupMenu/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Личные данные кандидата</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonGrid className="candidate-data">
                        <IonRow>
                            <IonCol>
                                <IonThumbnail className="candidate-image-thumbnail">
                                    <img className="candidate-image" alt="Silhouette of mountains"
                                         src={image}/>
                                </IonThumbnail>
                            </IonCol>

                                <IonCol className="candidate-card">
                                    <IonCard className="ion-no-margin" style={{borderRadius: '20px', width: "40vh"}}>
                                        <IonCardHeader>
                                            <IonCardTitle>{name}</IonCardTitle>
                                            <IonCardSubtitle>Информация:</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel>Телефон</IonLabel>
                                                    <IonLabel slot="end">{phoneNumber}</IonLabel>
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Почта</IonLabel>
                                                    <IonLabel slot="end">{email}</IonLabel>
                                                </IonItem>
                                            </IonList>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>

                        </IonRow>
                    </IonGrid>

                    <IonCol style={{marginLeft: "40px"}}>
                        <IonText style={{fontSize: "30px"}}>Активные отклики</IonText>
                    </IonCol>
                    <IonGrid>


                            {otkilk.map(otk => (
                                <IonRow>
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4" key={otk.id}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle>{otk.vacancyName}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            {/*{(otk.stages).map((stage: Stage) => (*/}
                                            {/*    <IonItem>*/}
                                            {/*        <IonLabel>Последний пройденный этап</IonLabel>*/}
                                            {/*        <IonBadge color="warning">{stage.name}</IonBadge>*/}
                                            {/*    </IonItem>*/}
                                            {/*    )*/}
                                            {/*)}*/}
                                            <IonItem>
                                                <IonLabel>Последний пройденный этап</IonLabel>
                                                <IonBadge color="warning">Тест на знание Java</IonBadge>
                                            </IonItem>
                                            {/*<IonItem>*/}
                                            {/*    <IonLabel>Статус отклика</IonLabel>*/}
                                            {/*    <IonBadge color="warning">to-be-realised</IonBadge>*/}
                                            {/*</IonItem>*/}

                                            <IonItem routerLink="/">
                                                <IonLabel>Тест</IonLabel>
                                                <IonIcon icon="../images/chevron-forward-outline.svg" slot="end"></IonIcon>
                                            </IonItem>
                                            <IonItem routerLink="/">
                                                <IonLabel>Результаты этапов</IonLabel>
                                                <IonIcon icon="../images/chevron-forward-outline.svg" slot="end"></IonIcon>
                                            </IonItem>


                                            <IonButton expand="block" fill="clear" color="transparent">
                                                <IonList>
                                                    <IonItem>
                                                        <IonSelect interface="popover" placeholder="Назначить этап">
                                                            <IonSelectOption value="apples">Интервью</IonSelectOption>
                                                            <IonSelectOption value="oranges">Тестирование</IonSelectOption>
                                                        </IonSelect>
                                                    </IonItem>
                                                </IonList>
                                            </IonButton>

                                            <IonButton expand="block" fill="clear" color="transparent">
                                                <IonList>
                                                    <IonItem>
                                                        <IonSelect interface="popover" placeholder="Выдать результат">
                                                            <IonSelectOption value="apples">Назначить предложение</IonSelectOption>
                                                            <IonSelectOption value="oranges">Отказ</IonSelectOption>
                                                        </IonSelect>
                                                    </IonItem>
                                                </IonList>
                                            </IonButton>

                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                </IonRow>
                                ))}
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}

export default CandidateCardForHR;