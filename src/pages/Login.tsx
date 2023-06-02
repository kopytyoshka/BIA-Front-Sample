import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid,
    IonHeader, IonIcon, IonImg, IonInput,
    IonItem, IonLabel, IonList,
    IonMenuButton,
    IonMenuToggle, IonPage,
    IonRadio,
    IonRadioGroup, IonRow, IonTextarea, IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PopupMenuCandidate from "./Popup-Menu-Candidate";
import "../styles/Test-Form.css"

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };


    async function jsonLog() {
        let jsonLoginData = {
            username: email,
            password: password,
        }
        console.log(jsonLoginData)
        let loginBackData = JSON.stringify(jsonLoginData);
        fetch("/login", {
            // mode: "no-cors",
            method: 'POST',
            headers: {
                'Origin': '*',
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: loginBackData
        })
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                console.log(text);
            })
    }

    return (
        <>
            <PopupMenuCandidate/>
            <IonPage id="main-content">
                {/*Header and Timer*/}
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Войти в систему</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid style={{margin: "10px"}}>
                    <IonRow style={{marginLeft: "0px", maxWidth: "600px"}}>
                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                className="vacancy-cards-list" style={{marginLeft: "0px"}}>
                            <IonCard style={{borderRadius: '20px'}}>
                                <IonItem style={{margin: '30px 10px'}}>
                                    <IonInput style={{borderRadius: '20px'}}
                                              className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                              type="email"
                                              fill="solid"
                                              label="Email"
                                              labelPlacement="floating"
                                              helperText="Введите корректный e-mail"
                                              errorText="Неферный формат e-mail"
                                              onIonInput={(event) => validate(event)}
                                              onIonBlur={() => markTouched()}
                                              onInput={(e: any) => handleChangeEmail(e)}
                                    ></IonInput>
                                </IonItem>
                            </IonCard>
                            <IonCard style={{borderRadius: '20px'}}>
                                <IonItem style={{margin: '30px 10px'}}>
                                    <IonInput style={{borderRadius: '20px'}}
                                              type="password"
                                              fill="solid"
                                              label="Password"
                                              labelPlacement="floating"
                                              helperText="Введите пароль"
                                              errorText="Password"
                                              onIonBlur={() => markTouched()}
                                              counter={true}
                                              maxlength={20}
                                              minlength={6}
                                              onInput={(e: any) => handleChangePassword(e)}
                                    ></IonInput>
                                </IonItem>
                            </IonCard>
                            <IonButton expand="block" fill="clear" color="tertiary"
                                       onClick={() => jsonLog()} href={'/login'}>Войти</IonButton>
                            <IonItem lines="none" color="transparent">
                                <IonLabel slot="start">Нет аккаунта?</IonLabel>
                                <IonButton slot="end"
                                           color="tertiary">Зарегистрироваться</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonPage>
        </>
    );
}

export default Login;
