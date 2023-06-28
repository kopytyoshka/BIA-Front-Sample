import React, {useEffect, useState} from 'react';
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useHistory, useParams} from "react-router";
import {formatStageType, formatWorkExperience, formatWorkStatus} from "../../scripts/utils";

const PageHRVacancyCardView = () => {
    interface VacancyParam {
        vacancyId: string;
    }

    const [vacancy, setVacancy] = useState<any>([])
    const {vacancyId} = useParams<VacancyParam>();
    const [activeResponses, setActiveResponses] = useState<any>([])
    const [newStageType, setNewStageType] = useState('');
    const [stages, setStages] = useState<any[]>([])
    const history = useHistory();

    const handleStageRedactor = (id: string) => {
        fetch('/api/stage/getStageById?stageId=' + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.type == "CloseTest") history.push(`/close-test-editor/${id}`);
                if (data.type == "OpenTest") history.push(`/open-test-editor/${id}`);
            })
    };
    const handeNewStageType = (event: any) => {
        setNewStageType(event.target.value);
    };


    const fetchVacancyData = () => {
        fetch('/api/vacancy/getVacancyInfo?vacancyId=' + vacancyId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
                console.log(vacancy)
            })
    }

    async function deleteStage(stageId: string) {
        try {
            const stage = {
                stageId: stageId,
                vacancyId: vacancyId,
            }
            let response = await fetch("/api/vacancy/deleteStageInVacancy", {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(stage)
            });

            if (response.ok) {
                fetchStagesData();
            } else if (response.status === 403) {
                console.log('АШИПКА 403')
            } else {
                console.log('АШИПКА НЕИЗВЕСТНА')
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    const fetchStagesData = () => {
        fetch('/api/vacancy/getVacancyStages?vacancyId=' + vacancyId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setStages(data)
            })
    }

    const fetchDataActiveResponses = () => {
        fetch("/api/response/countAllResponsesForVacancy?vacancyId=" + vacancyId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setActiveResponses(data)
                console.log(data)
            })
    }

    const navigateToPage = (id: string) => {
        history.push(`/edit-vacancy-card/${id}`);
    };

    async function addNewStage() {

        let vacancy = {
            stageType: newStageType,
            vacancyId: vacancyId,
        };

        try {
            let response = await fetch("/api/stage/createTestStageInVacancy", {
                method: 'POST',
                headers: {
                    'Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(vacancy)
            });

            if (response.ok) {
                fetchStagesData();
            } else if (response.status === 403) {
                console.log('АШИПКА 403')
            } else {
                console.log('АШИПКА НЕИЗВЕСТНА')
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    useEffect(() => {
        fetchStagesData()
        fetchVacancyData()
        fetchDataActiveResponses()
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
                        <IonTitle>Вакансия</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <h1 style={{marginLeft: "20px"}}>{vacancy.vacancyName}</h1>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Информация о вакансии
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end"
                                                      color={
                                                          vacancy.vacancyStatus === "Opened" ? "success" :
                                                              vacancy.vacancyStatus === "OnModeration" ? "warning" :
                                                                  "danger"
                                                      }>
                                                {formatWorkStatus(vacancy.vacancyStatus)}</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            Опыт работы
                                            <IonBadge slot="end" color={
                                                vacancy.workExperience === "WithoutExperience" ? "success" :
                                                    vacancy.workExperience === "MoreTwoYears" ? "danger" :
                                                        "warning"
                                            }>
                                                {formatWorkExperience(vacancy.workExperience)}</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            Отклики
                                            <IonBadge slot="end" color={"primary"}>{activeResponses.num}</IonBadge>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton
                                    onClick={() => navigateToPage(vacancyId)}
                                    fill="outline">
                                    Редактировать
                                </IonButton>
                                <IonButton fill="outline">В архив</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="8">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>Описание</IonCardHeader>
                                    <IonCardContent>
                                        {vacancy.description}
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            {stages.map(stage => (
                                <IonCol>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonTitle>
                                                {stage.name}
                                            </IonTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonText>
                                                    Дедлайн
                                                </IonText>
                                                <IonText slot="end">
                                                    {stage.deadline}
                                                </IonText>
                                            </IonItem>
                                            <IonItem>
                                                Тип
                                                <IonBadge slot="end"
                                                          color={"#f0b330"}>{formatStageType(stage.type)}</IonBadge>
                                            </IonItem>
                                            <IonItem>
                                                <IonText>
                                                    Результат
                                                </IonText>
                                                <IonText slot="end">
                                                    to-be-done
                                                </IonText>
                                            </IonItem>
                                            <IonButton onClick={() => handleStageRedactor(stage.id)}
                                                       expand="block" fill="clear" color="transparent">Редактировать
                                                вопросы
                                            </IonButton>
                                            <IonButton id="present-alert"
                                                       expand="block" fill="clear" color="transparent"
                                                       onClick={() => deleteStage(stage.id)}>Удалить
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                            <IonCol>
                                <IonCard style={{borderRadius: '20px', marginTop: '120px', maxWidth: '300px'}}>
                                    <IonCardContent>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent"
                                            onClick={() => addNewStage()}>Добавить этап
                                        </IonButton>
                                        <IonSelect
                                            interface="popover"
                                            placeholder="Выберите значение"
                                            style={{
                                                marginTop: '10px',
                                                width: '100%',
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                alignContent: 'center',
                                                flexWrap: 'wrap',
                                            }}
                                            value={newStageType}
                                            onIonChange={handeNewStageType}
                                        >
                                            <IonSelectOption value="Interview">Интервью</IonSelectOption>
                                            <IonSelectOption value="OpenTest">Открытые вопросы</IonSelectOption>
                                            <IonSelectOption value="CloseTest">Закрытые вопросы</IonSelectOption>
                                        </IonSelect>

                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
}

export default PageHRVacancyCardView;