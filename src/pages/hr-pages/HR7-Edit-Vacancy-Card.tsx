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
import {formatSphereType, formatWorkExperience, formatWorkStatus, redirectToExternalSite} from "../../scripts/utils";

interface RouteParams {
    id: string
}

const HR7EditVacancyCard = () => {
    const [vacancyId, setVacancyId] = useState('');
    const [vacancyName, setVacancyName] = useState('');
    const [vacancyWorkExperience, setVacancyWorkExperience] = useState('');
    const [vacancyStatus, setVacancyStatus] = useState('');
    const [vacancyDescription, setVacancyDescription] = useState('');
    const [vacancySphereType, setVacancySphereType] = useState('');
    const [vacancy, setVacancy] = useState<any>([]);
    const [stages, setStages] = useState<any[]>([])
    const { id } = useParams<RouteParams>();

    const handleVacancyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyName(event.target.value);
    };

    const handleVacancyWorkExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyWorkExperience(event.target.value);
    };

    const handleVacancyStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyWorkExperience(event.target.value);
    };

    const handleVacancyDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyWorkExperience(event.target.value);
    };

    async function saveVacancy() {
        try {
            const vacancyData = {
                vacancyId: vacancyId,
                name: vacancyName,
                description: vacancyDescription,
                vacancyStatus: vacancyStatus,
                workExperience: vacancyWorkExperience,
                sphereType: vacancySphereType,
            };

            const response = await fetch('/api/vacancy/updateVacancyInfo', {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(vacancyData),
            });

            if (response.ok) {
                redirectToExternalSite('/home')
                return response.json();
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchVacancyData = () => {
        fetch("/api/vacancy/getVacancyInfo?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancyId(data.vacancyId)
                setVacancySphereType(data.sphereType)
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
                                        onIonChange={(e: any) => handleVacancyName(e)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton fill="outline" onClick={() => saveVacancy()}>Сохранить</IonButton>
                                <IonButton fill="outline">Отменить</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/*<IonGrid>*/}
                    {/*    <IonRow>*/}
                    {/*        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">*/}
                    {/*            <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>*/}
                    {/*                <IonCardHeader>*/}
                    {/*                    <IonTitle>*/}
                    {/*                        Информация о вакансии*/}
                    {/*                    </IonTitle>*/}
                    {/*                </IonCardHeader>*/}
                    {/*                <IonCardContent>*/}
                    {/*                    <IonItem>*/}
                    {/*                        Статус*/}
                    {/*                        <IonBadge slot="end"*/}
                    {/*                                  color={*/}
                    {/*                                      vacancy.vacancyStatus === "Opened" ? "success" :*/}
                    {/*                                          vacancy.vacancyStatus === "OnModeration" ? "warning" :*/}
                    {/*                                              "danger"*/}
                    {/*                                  }>*/}
                    {/*                            {formatWorkStatus(vacancy.vacancyStatus)}</IonBadge>*/}
                    {/*                    </IonItem>*/}
                    {/*                    <IonItem>*/}
                    {/*                        Опыт работы*/}
                    {/*                        <IonBadge slot="end" color={*/}
                    {/*                            vacancy.workExperience === "WithoutExperience" ? "success" :*/}
                    {/*                                vacancy.workExperience === "MoreTwoYears" ? "danger" :*/}
                    {/*                                    "warning"*/}
                    {/*                        }>*/}
                    {/*                            {formatWorkExperience(vacancy.workExperience)}</IonBadge>*/}
                    {/*                    </IonItem>*/}
                    {/*                </IonCardContent>*/}
                    {/*            </IonCard>*/}
                    {/*        </IonCol>*/}
                    {/*    </IonRow>*/}
                    {/*</IonGrid>*/}

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Статус вакансии
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRadioGroup onClick={(e: any) => handleVacancyStatus(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="OnModeration">На модерации</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="Opened">Доступная</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="Closed">Архивная</IonRadio>
                                            </IonItem>
                                        </IonRadioGroup>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Опыт работы
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRadioGroup  onClick={(e: any) => handleVacancyWorkExperience(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="WithoutExperience">Нет опыта</IonRadio>
                                                <br/>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="CoupleOfYears">1-2 года</IonRadio>
                                                <br/>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="MoreTwoYears">Больше двух лет</IonRadio>
                                                <br/>
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
                                            autoGrow={true}
                                            style={{minHeight: "300px"}}
                                            onInput={(e: any) => handleVacancyDescription(e)}>
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