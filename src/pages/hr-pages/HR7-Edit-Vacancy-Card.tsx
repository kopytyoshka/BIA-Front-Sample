import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonInput, IonItem, IonLabel,
    IonMenuButton,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useParams} from "react-router";
import {formatSphereType, formatWorkExperience, formatWorkStatus} from "../../scripts/utils";

interface RouteParams {
    id: string
}

const HR7EditVacancyCard = () => {
    const [vacancyName, setVacancyName] = useState('');
    const [vacancy, setVacancy] = useState<any>([]);
    const [stages, setStages] = useState<any[]>([])
    const [selectedStatus, setSelectedStatus] = useState('');
    const { id } = useParams<RouteParams>();

    const handleVacancyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyName(event.target.value);
    };

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

    const fetchStages = () => {
        fetch('/api/vacancy/getVacancyStages?vacancyId=' + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setStages(data)
            })
    }

    useEffect(() => {
        fetchVacancyData()
        fetchStages()
        setSelectedStatus(vacancy.vacancyStatus);
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
                    <IonGrid>
                        <IonRow>
                            <IonCol style={{padding: "0"}} size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3"
                                    sizeXl="2.5">
                                <IonItem lines="none" color="transparent">
                                    <IonInput
                                        style={{marginTop: "20px", fontSize: '20px' }}
                                        fill="outline"
                                        labelPlacement="floating"
                                        value={vacancy.vacancyName}
                                        onIonChange={(e: any) => setVacancyName(e)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton fill="outline">Сохранить</IonButton>
                                <IonButton fill="outline">Отменить</IonButton>
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
                                            <IonBadge slot="end"
                                                      color={
                                                          vacancy.vacancyStatus === "Opened" ? "success" :
                                                              vacancy.vacancyStatus === "OnModeration" ? "warning" :
                                                                  "danger"
                                                      }>
                                                {formatWorkStatus(vacancy.vacancyStatus)}</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            Опыт работы
                                            <IonBadge slot="end" color={
                                                vacancy.workExperience === "WithoutExperience" ? "success" :
                                                    vacancy.workExperience === "MoreTwoYears" ? "danger" :
                                                        "warning"
                                            }>
                                                {formatWorkExperience(vacancy.workExperience)}</IonBadge>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Статус вакансии
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRadioGroup value={selectedStatus} onClick={(e: any)=> setSelectedStatus(e)}>
                                            <IonItem>
                                                <IonLabel>Активная</IonLabel>
                                                <IonRadio slot="start" value="IT" />
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Закрытая</IonLabel>
                                                <IonRadio slot="start" value="Medicine" />
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>В архиве</IonLabel>
                                                <IonRadio slot="start" value="Education" />
                                            </IonItem>
                                        </IonRadioGroup>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="8">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonItem>
                                        <IonTextarea
                                            value={vacancy.description}
                                            placeholder="Описание"
                                            autoGrow={true}
                                            style={{minHeight: "300px"}}>
                                        </IonTextarea>
                                    </IonItem>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            {stages.map(stage => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonTitle>
                                                {stage.name}
                                            </IonTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonText>
                                                    До какого числа
                                                </IonText>
                                                <IonText slot="end">
                                                    {stage.deadline}
                                                </IonText>
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
                                                expand="block" fill="clear" color="transparent">Редактировать задание
                                            </IonButton>
                                            <IonButton id="present-alert"
                                                       expand="block" fill="clear" color="transparent">Удалить
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                            {/*<IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">*/}
                            {/*    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>*/}
                            {/*        <IonCardHeader>*/}
                            {/*            <IonTitle>*/}
                            {/*                Тестирование*/}
                            {/*            </IonTitle>*/}
                            {/*        </IonCardHeader>*/}
                            {/*        <IonCardContent>*/}
                            {/*            <IonItem>*/}
                            {/*                <IonText>*/}
                            {/*                    До какого числа*/}
                            {/*                </IonText>*/}
                            {/*                <IonText slot="end">*/}
                            {/*                    30.07.2023*/}
                            {/*                </IonText>*/}
                            {/*            </IonItem>*/}
                            {/*            <IonItem>*/}
                            {/*                Статус*/}
                            {/*                <IonBadge slot="end" color={"danger"}>Недоступно</IonBadge>*/}
                            {/*            </IonItem>*/}
                            {/*            <IonItem>*/}
                            {/*                <IonText>*/}
                            {/*                    Результат*/}
                            {/*                </IonText>*/}
                            {/*                <IonText slot="end">*/}
                            {/*                    max: 10*/}
                            {/*                </IonText>*/}
                            {/*            </IonItem>*/}
                            {/*            <IonButton*/}
                            {/*                expand="block" fill="clear" color="transparent">Перейти к заданию*/}
                            {/*            </IonButton>*/}
                            {/*            <IonButton id="present-alert"*/}
                            {/*                       expand="block" fill="clear" color="transparent">Удалить*/}
                            {/*            </IonButton>*/}
                            {/*        </IonCardContent>*/}
                            {/*    </IonCard>*/}
                            {/*</IonCol>*/}
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