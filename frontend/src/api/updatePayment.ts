import defaultUrl from "../assets/constants";

export const updatePayment = async (file: any, paymentID: number) => {

    const formData = new FormData();
    formData.append('jpg', file);
    
    return await fetch(`${defaultUrl}//ghouls_archives/eldritch_tribute_accountability/${paymentID}/eldritch_receipt`, {
        method: 'POST',
        body: formData,
      });
}
