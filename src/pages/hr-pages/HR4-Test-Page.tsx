import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol, IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonMenuToggle,
    IonModal,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import "../../styles/Test-Form.css"
import PopupMenu from "../sidebar-menu/Popup-Menu";
import {car} from "ionicons/icons";

function HR4TestPage() {
    interface CardForClosedQ {
        id: number;
        question: string;
        v1: string;
        v2: string;
        v3: string;
        v4: string;
    }

    interface CardForOpenQ {
        id: number;
        question: string;
    }

    const [checked, setChecked] = React.useState("");
    const [cardsForClosedQ, setCardsForCloseQ] = useState<CardForClosedQ[]>([]);
    const [cardsForOpenQ, setCardsForOpenQ] = useState<CardForOpenQ[]>([]);
    const [questionClosed, setQuestionClosed] =  React.useState("");
    const [answerVariant1, setAnswerVariant1] = React.useState("");
    const [answerVariant2, setAnswerVariant2] = React.useState("");
    const [answerVariant3, setAnswerVariant3] = React.useState("");
    const [answerVariant4, setAnswerVariant4] = React.useState("");

    // const handleChangeQuestionClosed = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuestionClosed(event.target.value);
    // };
    //
    // const handleChangeAnswerVariant1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAnswerVariant1(event.target.value);
    // };
    //
    // const handleChangeAnswerVariant2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAnswerVariant2(event.target.value);
    // };
    //
    // const handleChangeAnswerVariant3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAnswerVariant3(event.target.value);
    // };
    //
    // const handleChangeAnswerVariant4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAnswerVariant4(event.target.value);
    // };

    const addCloseQuestion = (cardId: number, inputValue: string) => {
        const updatedCards = [...cardsForClosedQ];
        updatedCards[cardId].question = inputValue;
        setCardsForCloseQ(updatedCards);
    };

    const addCloseAnswerVar1 = (cardId: number, inputValue: string) => {
        const updatedCards = [...cardsForClosedQ];
        updatedCards[cardId].v1 = inputValue;
        setCardsForCloseQ(updatedCards);
    };

    const addCloseAnswerVar2 = (cardId: number, inputValue: string) => {
        const updatedCards = [...cardsForClosedQ];
        updatedCards[cardId].v2 = inputValue;
        setCardsForCloseQ(updatedCards);
    };

    const addCloseAnswerVar3 = (cardId: number, inputValue: string) => {
        const updatedCards = [...cardsForClosedQ];
        updatedCards[cardId].v3 = inputValue;
        setCardsForCloseQ(updatedCards);
    };

    const addCloseAnswerVar4 = (cardId: number, inputValue: string) => {
        const updatedCards = [...cardsForClosedQ];
        updatedCards[cardId].v4 = inputValue;
        setCardsForCloseQ(updatedCards);
    };

    // Save button click handler
    const saveCardCloseQ = () => {
        // Combine cards and inputs data
        const dataToSave = {
            question: questionClosed,
            v1: answerVariant1,
            v2: answerVariant2,
            v3: answerVariant3,
            v4: answerVariant4
        };

        // Send POST request to server
        fetch('/api/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Data saved successfully!', data);
            })
            .catch(error => {
                // Handle any error that occurred during the request
                console.error('Error saving data:', error);
            });
    };

    const handleDeleteForClosedQ = (cardId: number) => {
        const updatedCards = cardsForClosedQ.filter((card) => card.id !== cardId);
        setCardsForCloseQ(updatedCards);
    };

    const handleDeleteForOpenQ = (cardId: number) => {
        const updatedCards = cardsForOpenQ.filter((card) => card.id !== cardId);
        setCardsForOpenQ(updatedCards);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value);
    };
    console.log(checked);

    const handleButtonClickClosed = () => {
        const newCard: CardForClosedQ = {id: Date.now(), question: '', v1: '', v2: '', v3: '', v4: ''};
        setCardsForCloseQ([...cardsForClosedQ, newCard]);
    };

    const handleButtonClickOpened = () => {
        const newCard: CardForOpenQ = {id: Date.now(), question: ''};
        setCardsForOpenQ([...cardsForOpenQ, newCard]);
    };

    return (
            <>
                <PopupMenu/>
                <IonPage id="main-content">
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

                    <IonContent>

                    <h1 style={{marginLeft: "30px"}}>
                        Варианты задания
                    </h1>

                    <h4 style={{marginLeft: "30px"}}>
                        Выберите дедлайн и время выполнения теста
                    </h4>

                    <IonItem lines="none" color="transparent" style={{marginLeft: "30px"}}>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="datetime"></IonDatetime>
                        </IonModal>
                    </IonItem>


                    <IonGrid style={{margin: "10px"}}>
                        <IonRow style={{marginLeft: "0px"}}>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="6">
                                <IonButton fill="outline" onClick={handleButtonClickClosed}>Добавить закрытый вопрос</IonButton>
                                <IonButton fill="outline" onClick={handleButtonClickOpened}>Добавить открытый вопрос</IonButton>
                                {cardsForOpenQ.map((cardForOpenQ) => (
                                    <IonCard key={cardForOpenQ.id} style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle>
                                                <IonInput aria-label="Primary input" color="primary" placeholder="Введите вопрос"></IonInput>
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonButton fill="outline" onClick={() => handleDeleteForOpenQ(cardForOpenQ.id)}>Удалить</IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                                {cardsForClosedQ.map((card) => (
                                    <IonCard key={card.id} style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle>
                                                <IonInput aria-label="Primary input"
                                                          color="primary"
                                                          placeholder="Введите вопрос"
                                                          onInput={(e: any) => addCloseQuestion(card.id, e)}/>
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonList>
                                                <IonRadioGroup>
                                                    <IonItem>
                                                        <IonInput
                                                            aria-label="Primary input"
                                                            color="primary"
                                                            placeholder="Введите вариант"
                                                            onInput={(e: any) => addCloseAnswerVar1(card.id, e)}/>

                                                    </IonItem>
                                                    <IonItem>
                                                        <IonInput
                                                            aria-label="Primary input"
                                                            color="primary"
                                                            placeholder="Введите вариант"
                                                            onInput={(e: any) => addCloseAnswerVar2(card.id, e)}/>

                                                    </IonItem>
                                                    <IonItem>
                                                        <IonInput
                                                            aria-label="Primary input"
                                                            color="primary"
                                                            placeholder="Введите вариант"
                                                            onInput={(e: any) => addCloseAnswerVar3(card.id, e)}/>

                                                    </IonItem>
                                                    <IonItem>
                                                        <IonInput
                                                            aria-label="Primary input"
                                                            color="primary"
                                                            placeholder="Введите вариант"
                                                            onInput={(e: any) => addCloseAnswerVar4(card.id, e)}/>

                                                    </IonItem>
                                                </IonRadioGroup>
                                            </IonList>
                                            <IonButton fill="outline">Сохранить</IonButton>
                                            <IonButton fill="outline" onClick={() => handleDeleteForClosedQ(card.id)}>Удалить</IonButton>
                                            <IonButton fill="outline" onClick={saveCardCloseQ}>Save</IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    </IonContent>
                </IonPage>
            </>
        );
    }
export default HR4TestPage;


