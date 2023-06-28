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

function HR5CreateVacancy() {

    const [vacancyName, setVacancyName] = useState('');

    async function submitVacancy() {
        try {
            const userInput = { /* Construct the user input object */ };

            const response = await fetch('/api/vacancy/createVacancy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInput),
            });

            if (response.ok) {
                const responseData = await response.json();
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
                                        onIonChange={(e: any) => setVacancyName(e)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem lines="none" style={{paddingTop: "1vh"}} color="transparent">
                                    <IonBadge color="warning" style={{fontSize: "3vh"}}>Опубликовано</IonBadge>
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
                                            <IonRadioGroup>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="dogs">Нет опыта</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="cats">1-3 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="turtles">4-5 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="fish">Больше 5</IonRadio>
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
                                            <IonRadioGroup>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="dogs">Нет опыта</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="cats">1-3 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="turtles">4-5 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="fish">Больше 5</IonRadio>
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
                                            <IonRadioGroup>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="dogs">IT</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="cats">Образование</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="turtles">Медицина</IonRadio>
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
                                                     style={{height: "300px"}}></IonTextarea>
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

export default HR5CreateVacancy;