import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
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
import {useHistory, useParams} from "react-router";

interface Question {
    question: string;
    stageId: string;
}

const CreateQuestion: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [doneQuestions, setDoneQuestions] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    interface StageParam {
        id: string;
    }

    const {id} = useParams<StageParam>();

    const handleCreateQuestion = () => {
        setQuestions((prevState) => [
            ...prevState,
            {
                question: '',
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


    const handleSaveQuestion = async (question: Question) => {
        try {
            const response = await fetch('/api/stage/addTask/open', {
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
        fetch("/api/stage/getQuestionsForCertainStage?stageId=" + id)
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
                                                <IonLabel position="floating">Вопрос</IonLabel>
                                                <IonTextarea
                                                    value={done.question} disabled
                                                ></IonTextarea>
                                            </IonItem>
                                            <IonItem>
                                                <IonButton slot="end" color="danger" onClick={() => handleDeleteQuestion(done.id)}>Удалить</IonButton>
                                            </IonItem>
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
                                            <IonTextarea
                                                placeholder="Введите вопрос здесь"
                                                value={question.question}
                                                onIonChange={(e: any) => handleInputChange(e, index, 'question')}
                                            ></IonTextarea>
                                            <IonButton onClick={() => handleSaveQuestion(question)}>Сохранить вопрос</IonButton>
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
