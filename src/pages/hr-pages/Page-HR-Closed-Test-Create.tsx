import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonItem,
    IonTextarea,
    IonContent,
    IonPage,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonGrid,
    IonRow,
    IonCol, IonToast,
} from '@ionic/react';
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
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

const CreateQuestion: React.FC = () => {
    interface StageParam {
        id: string;
    }

    const [questions, setQuestions] = useState<Question[]>([]);
    const [doneQuestions, setDoneQuestions] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const {id} = useParams<StageParam>();

    const handleCreateQuestion = () => {
        setQuestions((prevState) => [
            ...prevState,
            {
                question: '',
                var1: '',
                var2: '',
                var3: '',
                var4: '',
                rightChoose: 0,
                stageId: id,
            },
        ]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Question) => {
        const {value} = event.target;
        setQuestions((prevState) =>
            prevState.map((question, i) =>
                i === index ? {...question, [field]: value} : question
            )
        );
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {value} = event.target;
        setQuestions((prevState) =>
            prevState.map((question, i) =>
                i === index ? {...question, rightChoose: parseInt(value, 10)} : question
            )
        );
    };

    const handleSaveQuestion = async (question: Question) => {
        try {
            const response = await fetch('/api/stage/addTask/close', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(question),
            });

            if (response.ok) {
                setMessage('Вопрос сохранен! При перезагрузе страницы он отобразится.')
                setShowPopup(true);
            } else {
                setMessage('Вопрос не получилось сохранить. Попробуйте ещё раз.')
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error occurred while saving the question:', error);
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
        let deletingQuestion = {
            stageId: id,
            questionId: questionId,
        }
        try {
            const response = await fetch('/api/stage/deleteQuestionFromStage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deletingQuestion),
            });

            if (response.ok) {
                fetchQuestions()
                setMessage('Вопрос удалён!')
                setShowPopup(true);
            } else {
                setMessage('Удалить вопрос не получилось :( Что-то пошло не так')
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error occurred while saving the question:', error);
        }
    };
    const fetchQuestions = () => {
        let stageInfo = {
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
            body: JSON.stringify(stageInfo),
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDoneQuestions(data)
                console.log(data)
            })
    }


    useEffect(() => {
        fetchQuestions()
    }, [])

    return (
        <>
            <PopupMenuHr/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Создание закрытого теста</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonToast
                    isOpen={showPopup}
                    message={message}
                    onDidDismiss={() => setShowPopup(false)}
                    duration={2000}
                />
                <IonContent>
                    <IonGrid style={{margin: "10px"}}>
                        <IonRow style={{marginLeft: "0px"}}>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                    className="vacancy-cards-list">
                                {doneQuestions.map(done => (
                                    <IonCard key={done.id} style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonLabel position="floating">Введите вопрос</IonLabel>
                                                <IonTextarea
                                                    value={done.question} disabled
                                                ></IonTextarea>
                                            </IonItem>
                                            <IonRadioGroup value={done.rightChoose.toString()}>
                                                <IonItem>
                                                    <IonLabel>Первый вариант:</IonLabel>
                                                    <IonRadio slot="start" value="1" disabled></IonRadio>
                                                    <IonTextarea
                                                        value={done.var1} disabled
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Второй вариант:</IonLabel>
                                                    <IonRadio slot="start" value="2" disabled></IonRadio>
                                                    <IonTextarea
                                                        value={done.var2} disabled
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Третий вариант:</IonLabel>
                                                    <IonRadio slot="start" value="3" disabled></IonRadio>
                                                    <IonTextarea
                                                        value={done.var3} disabled
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Четвертый вариант:</IonLabel>
                                                    <IonRadio slot="start" value="4" disabled></IonRadio>
                                                    <IonTextarea
                                                        value={done.var4} disabled
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonButton slot="end" color="danger"
                                                           onClick={() => handleDeleteQuestion(done.id)}>Удалить</IonButton>
                                            </IonRadioGroup>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonGrid style={{margin: "10px"}}>
                        <IonRow style={{marginLeft: "0px"}}>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="10" sizeXl="10"
                                    className="vacancy-cards-list">
                                {questions.map((question, index) => (
                                    <IonCard key={index} style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle
                                                style={{fontWeight: 600}}>{`Вопрос ${index + 1}`}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonLabel position="floating">Введите вопрос</IonLabel>
                                                <IonTextarea
                                                    value={question.question}
                                                    onIonChange={(e: any) => handleInputChange(e, index, 'question')}
                                                ></IonTextarea>
                                            </IonItem>
                                            <IonRadioGroup
                                                value={question.rightChoose.toString()}
                                                onIonChange={(e: any) => handleRadioChange(e, index)}
                                            >
                                                <IonItem>
                                                    <IonLabel>Первый вариант:</IonLabel>
                                                    <IonRadio slot="start" value="1"></IonRadio>
                                                    <IonTextarea
                                                        value={question.var1}
                                                        onIonChange={(e: any) => handleInputChange(e, index, 'var1')}
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Второй вариант:</IonLabel>
                                                    <IonRadio slot="start" value="2"></IonRadio>
                                                    <IonTextarea
                                                        value={question.var2}
                                                        onIonChange={(e: any) => handleInputChange(e, index, 'var2')}
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Третий вариант:</IonLabel>
                                                    <IonRadio slot="start" value="3"></IonRadio>
                                                    <IonTextarea
                                                        value={question.var3}
                                                        onIonChange={(e: any) => handleInputChange(e, index, 'var3')}
                                                    ></IonTextarea>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Четвертый вариант:</IonLabel>
                                                    <IonRadio slot="start" value="4"></IonRadio>
                                                    <IonTextarea
                                                        value={question.var4}
                                                        onIonChange={(e: any) => handleInputChange(e, index, 'var4')}
                                                    ></IonTextarea>
                                                </IonItem>
                                            </IonRadioGroup>
                                            <IonButton onClick={() => handleSaveQuestion(question)}>Сохранить
                                                вопрос</IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonButton onClick={handleCreateQuestion}>Добавить новый вопрос</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateQuestion;
