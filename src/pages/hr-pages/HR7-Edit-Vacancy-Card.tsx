import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonMenuButton,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useParams} from "react-router";
import {redirectToExternalSite} from "../../scripts/utils";

interface RouteParams {
    id: string
}

function HR7EditVacancyCard(){

    const [vacancyName, setVacancyName] = useState('');
    const [vacancyWorkExperience, setVacancyWorkExperience] = useState('');
    const [vacancyStatus, setVacancyStatus] = useState('');
    const [vacancyDescription, setVacancyDescription] = useState('');
    const [vacancySphereType, setVacancySphereType] = useState('');
    const [vacancy, setVacancy] = useState<any>([]);
    const [defaultStatus, setDefaultStatus] = useState('');
    const [defaultWorkExp, setDefaultWorkExp] = useState('');
    const [defaultSphere, setDefaultSphere] = useState('');
    const {id} = useParams<RouteParams>();

    const handleVacancyName = (e: any) => {
        setVacancy((prevVacancy: any) => ({
            ...prevVacancy,
            vacancyName: e.target.value
        }));
    };

    const handleVacancyDescription = (e: any) => {
        setVacancy((prevVacancy: any) => ({
            ...prevVacancy,
            description: e.target.value
        }));
    };

    const handleVacancyWorkExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyWorkExperience(event.target.value);
    };

    const handleVacancyStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyStatus(event.target.value);
    };

    const handleVacancySphereType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancySphereType(event.target.value);
    };

    async function saveVacancy() {
        try {
            const vacancyData = {
                vacancyId: id,
                name: vacancy.vacancyName,
                description: vacancy.description,
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
                redirectToExternalSite(`/vacancy-card/${id}`)
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
                setVacancy(data)
                setDefaultStatus(data.vacancyStatus)
                setDefaultWorkExp(data.workExperience)
                setDefaultSphere(data.sphere)
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
                    <IonGrid>
                        <IonRow>
                            <IonCol style={{padding: "0"}} size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3"
                                    sizeXl="2.5">
                                <IonItem lines="none" color="transparent">
                                    <IonInput
                                        style={{marginTop: "20px", fontSize: '20px'}}
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
                                        <IonRadioGroup
                                            // value={vacancy.vacancyStatus}
                                            onIonChange={(e: any) => handleVacancyStatus(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="OnModeration">На
                                                    модерации</IonRadio>
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
                                        <IonRadioGroup
                                            // value={vacancy.workExperience}
                                            onIonChange={(e: any) => handleVacancyWorkExperience(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="WithoutExperience">Нет
                                                    опыта</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="CoupleOfYears">1-2
                                                    года</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="MoreTwoYears">Больше двух
                                                    лет</IonRadio>
                                            </IonItem>
                                        </IonRadioGroup>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Сфера вакансии
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRadioGroup
                                            // value={vacancy.sphere}
                                            onIonChange={(e: any) => handleVacancySphereType(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between"
                                                          value="IT">IT</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between"
                                                          value="Medicine">Медицина</IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between"
                                                          value="Education">Образование</IonRadio>
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
                                            onIonChange={(e: any) => handleVacancyDescription(e)}>
                                        </IonTextarea>
                                    </IonItem>
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