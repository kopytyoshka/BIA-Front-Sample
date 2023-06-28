import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonInput, IonItem,
    IonMenuButton,
    IonPage, IonRow, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useParams} from "react-router";

interface RouteParams {
    id: string
}

const HR7EditVacancyCard = () => {
    const [vacancyName, setVacancyName] = useState('');

    const [handlerMessage, setHandlerMessage] = useState('');
    const [roleMessage, setRoleMessage] = useState('');
    const [vacancy, setVacancy] = useState<any>([]);
    const { id } = useParams<RouteParams>();

    const fetchVacancyData = () => {
        fetch("/api/vacancy/getVacancyInfo?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchVacancyData()
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
                        <IonTitle>Вакансия</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    {/*<h1 style={{marginLeft: "20px"}}>{vacancy.vacancyName}</h1>*/}
                    <IonGrid>
                        <IonRow>
                            <IonCol style={{padding: "0"}} size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3"
                                    sizeXl="2.5">
                                <IonItem lines="none" color="transparent">
                                    {/*<IonInput*/}
                                    {/*    style={{borderRadius: '20px'}}*/}
                                    {/*    label={vacancy.vacancyName}*/}
                                    {/*    labelPlacement="floating"*/}
                                    {/*    fill="outline"*/}
                                    {/*    placeholder="Введите название вакансии"*/}
                                    {/*    onIonChange={(e: any) => setVacancyName(e)}>*/}
                                    {/*</IonInput>*/}
                                    <IonInput
                                        style={{marginTop: "20px"}}
                                        // autoCapitalize="string"
                                        fill="outline"
                                        labelPlacement="floating"
                                        value={vacancy.vacancyName}
                                        onIonChange={(e: any) => setVacancyName(e)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Информация о вакансии
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end" color={"warning"}>На модерации</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            Опыт работы
                                            <IonBadge slot="end" color={"danger"}>Без опыта</IonBadge>
                                        </IonItem>
                                        <IonItem routerLink="/">
                                            Этапы
                                            <IonIcon slot="end" icon="../images/chevron-forward-outline.svg"></IonIcon>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton fill="outline">Сохранить</IonButton>
                                <IonButton fill="outline">Отменить</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="8">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonItem>
                                        <IonTextarea placeholder="Описание" autoGrow={true} style={{height: "300px"}}></IonTextarea>
                                    </IonItem>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Тестирование
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonText>
                                                До какого числа
                                            </IonText>
                                            <IonText slot="end">
                                                30.07.2023
                                            </IonText>
                                        </IonItem>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end" color={"danger"}>Недоступно</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            <IonText>
                                                Результат
                                            </IonText>
                                            <IonText slot="end">
                                                max: 10
                                            </IonText>
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Перейти к заданию
                                        </IonButton>
                                        <IonButton id="present-alert"
                                                   expand="block" fill="clear" color="transparent">Удалить
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Тестирование
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonText>
                                                До какого числа
                                            </IonText>
                                            <IonText slot="end">
                                                30.07.2023
                                            </IonText>
                                        </IonItem>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end" color={"danger"}>Недоступно</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            <IonText>
                                                Результат
                                            </IonText>
                                            <IonText slot="end">
                                                max: 10
                                            </IonText>
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Перейти к заданию
                                        </IonButton>
                                        <IonButton id="present-alert"
                                                   expand="block" fill="clear" color="transparent">Удалить
                                        </IonButton>
                                        <IonAlert
                                            header="Вы действительно хотите удалить?"
                                            trigger="present-alert"
                                            buttons={[
                                                {
                                                    text: 'Отмена',
                                                    role: 'cancel',
                                                    handler: () => {
                                                        setHandlerMessage('Alert canceled');
                                                    },
                                                },
                                                {
                                                    text: 'Да',
                                                    role: 'confirm',
                                                    handler: () => {
                                                        setHandlerMessage('Alert confirmed');
                                                    },
                                                },
                                            ]}
                                            onDidDismiss={({ detail }) => setRoleMessage(`Dismissed with role: ${detail.role}`)}
                                        ></IonAlert>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard style={{borderRadius: '20px', marginTop: '120px'}}>
                                    <IonCardContent>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Добавить этап
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

export default HR7EditVacancyCard;