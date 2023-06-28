import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRadio, IonRadioGroup, IonLabel, IonItem, IonTextarea } from '@ionic/react';

interface Question {
    question: string;
    var1: string;
    var2: string;
    var3: string;
    var4: string;
    rightChoose: number;
}

const CreateQuestion: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        question: '',
        var1: '',
        var2: '',
        var3: '',
        var4: '',
        rightChoose: 1,
    });

    const handleCreateQuestion = () => {
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            question: '',
            var1: '',
            var2: '',
            var3: '',
            var4: '',
            rightChoose: 1,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCurrentQuestion((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLIonRadioGroupElement>) => {
        setCurrentQuestion((prevState) => ({
            ...prevState,
            rightChoose: parseInt(event.target.value, 10),
        }));
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
        <div>
            <IonButton onClick={handleCreateQuestion}>Create New Question</IonButton>
            {questions.map((question, index) => (
                <IonCard key={index}>
                    <IonCardHeader>
                        <IonCardTitle>{`Question ${index + 1}`}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating">Question</IonLabel>
                            <IonTextarea name="question" value={question.question} onIonChange={(e: any) => handleInputChange(e)}></IonTextarea>
                        </IonItem>
                        <IonRadioGroup value={question.rightChoose.toString()} onIonChange={(e: any) => handleInputChange(e)}>
                            <IonItem>
                                <IonLabel>Variant 1</IonLabel>
                                <IonRadio slot="start" value="1"></IonRadio>
                                <IonTextarea name="var1" value={question.var1} onIonChange={(e: any) => handleInputChange(e)}></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Variant 2</IonLabel>
                                <IonRadio slot="start" value="2"></IonRadio>
                                <IonTextarea name="var2" value={question.var2} onIonChange={(e: any) => handleInputChange(e)}></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Variant 3</IonLabel>
                                <IonRadio slot="start" value="3"></IonRadio>
                                <IonTextarea name="var3" value={question.var3} onIonChange={(e: any) => handleInputChange(e)}></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Variant 4</IonLabel>
                                <IonRadio slot="start" value="4"></IonRadio>
                                <IonTextarea name="var4" value={question.var4} onIonChange={(e: any) => handleInputChange(e)}></IonTextarea>
                            </IonItem>
                        </IonRadioGroup>
                        <IonButton onClick={() => handleSaveQuestion(question)}>Save question</IonButton>
                    </IonCardContent>
                </IonCard>
            ))}
        </div>
    );
};

export default CreateQuestion;
