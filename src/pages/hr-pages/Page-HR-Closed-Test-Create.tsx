import React, {useState} from 'react';
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
    IonCol,
} from '@ionic/react';
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useHistory, useParams} from "react-router";

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
    const [questions, setQuestions] = useState<Question[]>([]);

    interface StageParam {
        id: string;
    }

    const { id } = useParams<StageParam>();

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
                console.log('Question saved successfully');
            } else {
                console.log('Failed to save the question');
            }
        } catch (error) {
            console.error('Error occurred while saving the question:', error);
        }
    };

    return (
        <>
            <PopupMenuHr/>
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonMenuButton></IonMenuButton>
                            </IonButtons>
                            <IonTitle>Создание закрытого теста</IonTitle>
                        </IonToolbar>
                    </IonHeader>
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
                                            <IonButton onClick={() => handleSaveQuestion(question)}>Save
                                                question</IonButton>
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
