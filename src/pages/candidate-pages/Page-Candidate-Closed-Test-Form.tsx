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
import React, {useEffect, useState} from "react";
import "../../styles/Test-Form.css"
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import {useParams} from "react-router";
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
    const [checked, setChecked] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value);
    };

    interface RouteParams {
        id: string
    }

    const {id} = useParams<RouteParams>();


    const fetchQuestions = () => {
        let userStageInfo = {
            stageId: id,
            userId: handleToken(),
        }
        fetch("/api/stage/getQuestionsForCertainStage", {
            method: 'POST',
            headers: {
                'Origin': '*',
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userStageInfo),
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setQuestions(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    return (
        <>
            <PopupMenuCandidate/>
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


                {/*Questions*/}
                <IonGrid style={{margin: "10px"}}>
                    <IonRow style={{marginLeft: "0px"}}>
                        {/*Closed question*/}
                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                className="vacancy-cards-list">
                            {questions.map(question => (
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{fontWeight: 600}}>Вопрос 1</IonCardTitle>
                                    </IonCardHeader>
                                    <IonItem lines="none">{question.question}</IonItem>
                                    <IonList>
                                        <IonRadioGroup onClick={(e: any) => handleChange(e)}>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="1">{question.var1}</IonRadio>
                                                <br/>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="2">{question.var2}</IonRadio>
                                                <br/>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="3">{question.var3}</IonRadio>
                                                <br/>
                                            </IonItem>
                                            <IonItem>
                                                <IonRadio justify="space-between" value="4">{question.var4}</IonRadio>
                                                <br/>
                                            </IonItem>
                                        </IonRadioGroup>
                                    </IonList>
                                </IonCard>
                            ))}
                        </IonCol>
                        <IonItem>
                            <IonButton>Отправить результаты</IonButton>
                        </IonItem>
                        {/*Opened question*/}
                        {/*<IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"*/}
                        {/*        className="vacancy-cards-list">*/}
                        {/*    <IonCard style={{borderRadius: '20px'}}>*/}
                        {/*        <IonCardHeader>*/}
                        {/*            <IonCardTitle style={{fontWeight: 600}}>Вопрос 2</IonCardTitle>*/}
                        {/*        </IonCardHeader>*/}
                        {/*        <IonItem lines="none">Что сделать если мы выигарем хакатон?</IonItem>*/}
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
