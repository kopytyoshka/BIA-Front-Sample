import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid,
    IonHeader, IonIcon, IonImg, IonInput,
    IonItem, IonLabel, IonList,
    IonMenuButton,
    IonMenuToggle, IonModal, IonPage,
    IonRadio,
    IonRadioGroup, IonRow, IonTextarea, IonTitle, IonToast,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import "../../styles/Test-Form.css"
import {redirectToExternalSite} from "../../scripts/utils";
import jwtDecode from "jwt-decode";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState("")

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
            email: email,
            password: password,
        };

        try {
            let response = await fetch("/api/login/login", {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonLoginData)
            });

            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token;
                const expirationDate = new Date();  // Create a new Date object
                expirationDate.setDate(expirationDate.getDate() + 7);  // Set the expiration date to 7 days from now
                document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`
                redirectToExternalSite('/home');
            } else if (response.status === 403) {
                // Handle 403 Forbidden error
                setMessage('Неправильное имя пользователя или пароль. Попробуйте ещё раз!')
                // Display an error message or take appropriate action
                setShowErrorPopup(true);
            } else {
                // Handle other error codes
                setMessage('Произошла ошибка со стороны сервиса. Попробуйте позже.')
                // Display an error message or take appropriate action
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    return (
        <>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Войти в систему</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonToast
                    isOpen={showErrorPopup}
                    message={message}
                    onDidDismiss={() => setShowErrorPopup(false)}
                    duration={5000}
                />
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
                                       onClick={() => jsonLog()}>Войти</IonButton>
                            <IonItem lines="none" color="transparent">
                                <IonLabel slot="start">Нет аккаунта?</IonLabel>
                                <IonButton slot="end"
                                           onClick={() => redirectToExternalSite('/register')}>Зарегистрироваться</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonPage>
        </>
    );
}

export default Login;
