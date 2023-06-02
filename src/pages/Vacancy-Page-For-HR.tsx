import PopupMenu from "./Popup-Menu";
import '../styles/Page-Candidate.css'
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
    IonIcon,
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
import React from "react";
function VacancyPageForHR() {
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
                        <IonTitle>Вакансия</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonGrid>
                        <IonRow>
                            <IonCol style={{padding: "0"}} size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3" sizeXl="2.5">
                                <IonItem lines="none" color="transparent">
                                    <h1 style={{fontSize: "3vh", marginLeft: "0"}}>Backend разработчик на Java</h1>
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
                            <IonCol size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3" sizeXl="4">
                                <IonSearchbar searchIcon="public/images/search-outline.svg"
                                              placeholder="Выбор параметров"></IonSearchbar>
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
                        </IonRow>
                    </IonGrid>

                    <h1 style={{marginLeft: "40px"}}>Описание вакансии и требований</h1>

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
                            <IonCol size="1" sizeXs="6" sizeSm="6" sizeMd="6" sizeLg="3" sizeXl="2">
                                <IonButton expand="block" fill="clear" color="transparent" style={{margin: "0px"}}>
                                    <IonList style={{padding: "0px"}}>
                                        <IonItem>
                                            <IonSelect interface="popover" placeholder="Добавить этап">
                                                <IonSelectOption value="apples">Интервью</IonSelectOption>
                                                <IonSelectOption value="oranges">Тестирование</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonButton>
                            </IonCol>
                            <IonCol size="1" sizeXs="6" sizeSm="6" sizeMd="6" sizeLg="3" sizeXl="2">
                                <IonButton expand="block" fill="clear" color="transparent">
                                    <IonList style={{padding: "0px"}}>
                                        <IonItem>
                                            <IonSelect interface="popover" placeholder="Добавить существующий этап">
                                                <IonSelectOption value="apples">Интервью</IonSelectOption>
                                                <IonSelectOption value="oranges">Тестирование</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <h1 style={{marginLeft: "40px"}}>Этапы отбора</h1>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardContent>
                                        <IonItem routerLink="/">
                                            Анкета
                                        </IonItem>
                                        <IonItem routerLink="/">
                                            Тест
                                        </IonItem>
                                        <IonItem routerLink="/">
                                            Интервью
                                        </IonItem>
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

export default VacancyPageForHR;