import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import '../../styles/Page-Candidate.css'
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon, IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton, IonMenuToggle,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import {redirectToExternalSite} from "../../scripts/utils";

function HR5CreateVacancy() {

    const [vacancyName, setVacancyName] = useState('');
    const [vacancyWorkExperience, setVacancyWorkExperience] = useState('');
    const [vacancyStatus, setVacancyStatus] = useState('');
    const [vacancyDescription, setVacancyDescription] = useState('');
    const [vacancySphere, setVacancySphere] = useState('');

    const handleWorkExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyWorkExperience(event.target.value);
    };

    const handleVacancyStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyStatus(event.target.value);
    };

    const handleVacancySphere = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancySphere(event.target.value);
    };

    const handleVacancyDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancyDescription(event.target.value);
    };

    const handleVacancyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacancySphere(event.target.value);
    };

    async function submitVacancy() {
        try {
            const vacancyInfo = {
                name: vacancyName,
                description: vacancyDescription,
                workExperience: vacancyWorkExperience,
                vacancyStatus: vacancyStatus,
                sphere: vacancySphere,
            };

            const response = await fetch('/api/vacancy/createVacancy', {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(vacancyInfo),
            });

            if (response.ok) {
                redirectToExternalSite('/home')
                return response.json();
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


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

                <IonContent>

                    <IonGrid>
                        <IonRow>
                            <IonCol style={{padding: "0"}} size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3"
                                    sizeXl="2.5">

                                <IonItem lines="none" color="transparent">
                                    {/*<h1 style={{fontSize: "3vh", marginLeft: "0"}}>Backend разработчик на Java</h1>*/}
                                    <IonInput
                                        style={{marginTop: "20px", borderRadius: '20px'}}
                                        label="Введите название вакансии"
                                        labelPlacement="floating" fill="outline"
                                        placeholder="Введите название вакансии"
                                        onInput={(e: any) => handleVacancyName(e)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem lines="none" style={{paddingTop: "1vh"}} color="transparent">
                                    {/*<IonBadge color="warning" style={{fontSize: "3vh"}}>Опубликовано</IonBadge>*/}
                                </IonItem>
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
                                            <IonRadioGroup onClick={(e: any) => handleWorkExperience(e)}>
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
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Статус вакансии
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonRadioGroup onClick={(e: any) => handleVacancyStatus(e)}>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="OnModeration">На модерации</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="Opened">Доступная</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="Closed">Архивная</IonRadio>
                                                    <br/>
                                                </IonItem>
                                            </IonRadioGroup>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Сфера
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonRadioGroup onClick={(e: any) => handleVacancySphere(e)}>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="IT">IT</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="Education">Образование</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="Medicine">Медицина</IonRadio>
                                                    <br/>
                                                </IonItem>
                                            </IonRadioGroup>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <h1 style={{marginLeft: "40px"}}>Описание вакансии и требований</h1>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonItem>
                                        <IonTextarea placeholder="Описание" autoGrow={true}
                                                     style={{minHeight: "300px"}} onInput={(e: any) => handleVacancyDescription(e)}></IonTextarea>
                                    </IonItem>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton onClick={() => submitVacancy()}>
                        Создать вакансию
                    </IonButton>
                </IonContent>
            </IonPage>
        </>
    );
}

export default HR5CreateVacancy;