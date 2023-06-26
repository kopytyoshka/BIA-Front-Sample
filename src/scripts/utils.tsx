export const  redirectToExternalSite = (url: string) => {
    window.location.href = url;
    // or
    // window.open(url, '_blank');
};

export const openExternalSite = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener');
    if (newWindow) {
        newWindow.opener = null;
    }
};

export function formatWorkExperience(workExperience: string): string {
    return workExperience === "WithoutExperience" ? "Без опыта" :
        workExperience === "MoreTwoYears" ? "Более двух лет" :
            workExperience === "CoupleOfYears" ? "1-2 года" :
                "not-documented"
}

export function formatWorkStatus(vacancyStatus: string): string {
    return vacancyStatus === "Opened" ? "Активная" :
        vacancyStatus === "OnModeration" ? "На модерации" :
            vacancyStatus === "Closed" ? "В архиве" :
                "not-documented"
}

