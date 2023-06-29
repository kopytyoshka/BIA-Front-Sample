import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonHeader,
    IonItem,
    IonList,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../../styles/Test-Form.css";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import { useParams } from "react-router";
import handleToken from "../../scripts/CookiesToken";

interface Question {
    question: string;
    var1: string;
    var2: string;
    var3: string;
    var4: string;
    rightChoose: number;
    stageId: string;
}

function PageCandidateClosedTestForm() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const { id } = useParams<{ id: string }>();

    const fetchQuestions = () => {
        let userStageInfo = {
            stageId: id,
            userId: handleToken(),
        };
        fetch("/api/stage/getQuestionsForCertainStage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userStageInfo),
        })
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setAnswers(new Array(data.length).fill('0'));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleChange = (questionIndex: number, selectedAnswer: string) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = selectedAnswer;
            return updatedAnswers;
        });
    };

    const sendAnswers = () => {
        const data = {
            stageId: id,
            customerId: handleToken(),
            answers: answers
        };

        fetch("/api/stageResult/saveUserAnswersToStage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <>
            <PopupMenuCandidate />
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonMenuToggle>
                                <IonItem lines="none">
                                    <img src={"../images/alarm-outline.svg"} alt="timer" />
                                    <IonItem>Время</IonItem>
                                </IonItem>
                            </IonMenuToggle>
                        </IonButtons>
                        <IonTitle>Тест на позицию штука пука</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {/* Questions */}
                <IonGrid style={{ margin: "10px" }}>
                    <IonRow style={{ marginLeft: "0px" }}>
                        {/* Closed question */}
                        <IonCol
                            size="12"
                            sizeXs="12"
                            sizeSm="12"
                            sizeMd="12"
                            sizeLg="10"
                            sizeXl="10"
                            className="vacancy-cards-list"
                        >
                            {questions.map((question, index) => (
                                <IonCard style={{ borderRadius: '20px' }} key={index}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{ fontWeight: 600 }}>
                                            Вопрос {index + 1}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonItem lines="none">{question.question}</IonItem>
                                    <IonList>
                                        <IonRadioGroup
                                            value={answers[index]}
                                            onIonChange={e => handleChange(index, e.detail.value)}
                                        >
                                            <IonItem>
                                                <IonRadio justify="space-between" value="1">
                                                    {question.var1}
                                                </IonRadio>
                                                <br />
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="2">
                                                    {question.var2}
                                                </IonRadio>
                                                <br />
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="3">
                                                    {question.var3}
                                                </IonRadio>
                                                <br />
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="4">
                                                    {question.var4}
                                                </IonRadio>
                                                <br />
                                            </IonItem>
                                        </IonRadioGroup>
                                    </IonList>
                                </IonCard>
                            ))}
                        </IonCol>
                        <IonItem>
                            <IonButton onClick={sendAnswers}>Отправить результаты</IonButton>
                        </IonItem>
                        {/* Opened question */}
                        {/*<IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"*/}
                        {/*        className="vacancy-cards-list">*/}
                        {/*    <IonCard style={{borderRadius: '20px'}}>*/}
                        {/*        <IonCardHeader>*/}
                        {/*            <IonCardTitle style={{fontWeight: 600}}>Вопрос 2</IonCardTitle>*/}
                        {/*        </IonCardHeader>*/}
                        {/*        <IonItem lines="none">Что сделать если мы выиграем хакатон?</IonItem>*/}
                        {/*        <IonItem>*/}
                        {/*            <IonTextarea autoGrow={true} placeholder="Введите ваш ответ здесь"*/}
                        {/*                         onInput={(e: any) => handleChange(e)}></IonTextarea>*/}
                        {/*        </IonItem>*/}
                        {/*    </IonCard>*/}
                        {/*</IonCol>*/}
                    </IonRow>
                </IonGrid>
            </IonPage>
        </>
    );
}

export default PageCandidateClosedTestForm;
