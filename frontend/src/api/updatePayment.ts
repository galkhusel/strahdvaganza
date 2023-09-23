export const updatePayment = async (file: any, paymentID: number) => {

    const formData = new FormData();
    formData.append('jpg', file);
    
    return await fetch(`http://127.0.0.1:8000//ghouls_archives/eldritch_tribute_accountability/${paymentID}/eldritch_receipt`, {
        method: 'POST',
        body: formData,
      });
}