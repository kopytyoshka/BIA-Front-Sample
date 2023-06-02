import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid,
    IonHeader, IonIcon, IonImg, IonInput,
    IonItem, IonLabel, IonList,
    IonMenuButton,
    IonMenuToggle, IonPage,
    IonRadio,
    IonRadioGroup, IonRoute, IonRouterLink, IonRow, IonTextarea, IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";
import PopupMenuCandidate from "./Popup-Menu-Candidate";
import "../styles/Test-Form.css"
import {openExternalSite, redirectToExternalSite} from "../scripts/utils";

function Registration() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
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


    async function jsonReg() {
        if (validateEmail(email) && password != "" && name != "" && phone != "") {
            let jsonRegisterData = {
                email: email,
                password: password,
                name: name,
                phoneNumber: phone,
            }
            console.log(JSON.stringify(jsonRegisterData));
            await fetch("/api/user/registrationUser", {
                // mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonRegisterData)
            })
                .then(function (response) {
                    return response.text();
                })
                .then(function (text) {
                    console.log(text);
                })
            window.location.assign('/login');
        }
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
                        <IonTitle>Регистрация</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
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
                                                  errorText="Неверный формат e-mail"
                                                  onInput={(e: any) => handleChangeEmail(e)}
                                                  onIonInput={(event) => validate(event)}
                                                  onIonBlur={() => markTouched()}
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
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonItem style={{margin: '30px 10px'}}>
                                        <IonInput style={{borderRadius: '20px'}}
                                                  fill="solid"
                                                  label="Name"
                                                  labelPlacement="floating"
                                                  helperText="Введите имя"
                                                  onIonBlur={() => markTouched()}
                                                  counter={true}

                                                  onInput={(e: any) => handleChangeName(e)}
                                        ></IonInput>
                                    </IonItem>
                                </IonCard>
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonItem style={{margin: '30px 10px'}}>
                                        <IonInput style={{borderRadius: '20px'}}
                                                  fill="solid"
                                                  label="Phone"
                                                  labelPlacement="floating"
                                                  helperText="Введите номер телефона"
                                                  onIonBlur={() => markTouched()}
                                                  counter={true}

                                                  onInput={(e: any) => handleChangePhone(e)}
                                        ></IonInput>
                                    </IonItem>
                                </IonCard>
                                <IonButton onClick={() => jsonReg()} expand="block" fill="clear"
                                           color="tertiary">Зарегистрироваться</IonButton>
                                <IonItem lines="none" color="transparent">
                                    <IonLabel slot="start">Уже есть аккаунт?</IonLabel>
                                    <IonButton slot="end" color="tertiary"
                                               onClick={() => redirectToExternalSite('/login')}>Войти</IonButton>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Registration;
