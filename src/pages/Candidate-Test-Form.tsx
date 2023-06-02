import {
    IonBadge,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid,
    IonHeader, IonIcon, IonImg, IonInput,
    IonItem, IonLabel, IonList,
    IonMenuButton,
    IonMenuToggle, IonPage,
    IonRadio,
    IonRadioGroup, IonRow, IonTextarea, IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import PopupMenuCandidate from "./Popup-Menu-Candidate";
import "../styles/Test-Form.css"
import PopupMenu from "./Popup-Menu";

function CandidateTestForm() {

    const [checked, setChecked] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value);
    };
    console.log(checked);


    return (
        <>
            <PopupMenu/>
            <IonPage id="main-content">
                {/*Header and Timer*/}
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonMenuToggle>
                                <IonItem lines="none">
                                    <img src={"../images/alarm-outline.svg"} alt="timer"/>
                                    <IonItem>Время</IonItem>
                                </IonItem>
                            </IonMenuToggle>
                        </IonButtons>
                        <IonTitle>Тест на позицию штука пука</IonTitle>
                    </IonToolbar>
                </IonHeader>


                {/*Questions*/}
                <IonGrid style={{margin: "10px"}}>
                    <IonRow style={{marginLeft: "0px"}}>
                        {/*Closed question*/}
                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                className="vacancy-cards-list">
                            <IonCard style={{borderRadius: '20px'}}>
                                <IonCardHeader>
                                    <IonCardTitle style={{fontWeight: 600}}>Вопрос 1</IonCardTitle>
                                </IonCardHeader>
                                <IonItem lines="none">Что сделать если мы выигарем хакатон?</IonItem>
                                <IonList>
                                    <IonRadioGroup onClick={(e: any) => handleChange(e)}>
                                        <IonItem>
                                            <IonRadio justify="space-between" value="dogs">Dogs</IonRadio>
                                            <br/>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio justify="space-between" value="cats">Cats</IonRadio>
                                            <br/>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio justify="space-between" value="turtles">Turtles</IonRadio>
                                            <br/>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio justify="space-between" value="fish">Fish</IonRadio>
                                            <br/>
                                        </IonItem>
                                    </IonRadioGroup>
                                </IonList>
                            </IonCard>
                        </IonCol>
                        {/*Opened question*/}
                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                className="vacancy-cards-list">
                            <IonCard style={{borderRadius: '20px'}}>
                                <IonCardHeader>
                                    <IonCardTitle style={{fontWeight: 600}}>Вопрос 2</IonCardTitle>
                                </IonCardHeader>
                                <IonItem lines="none">Что сделать если мы выигарем хакатон?</IonItem>
                                <IonItem>
                                    <IonTextarea autoGrow={true} placeholder="Введите ваш ответ здесь"
                                                 onInput={(e: any) => handleChange(e)}></IonTextarea>
                                </IonItem>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonPage>
        </>
    );
}

export default CandidateTestForm;
