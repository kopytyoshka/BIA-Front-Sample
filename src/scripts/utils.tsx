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


