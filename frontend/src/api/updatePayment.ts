export const updatePayment = async (file: any, paymentID: number) => {

    const formData = new FormData();
    formData.append('jpg', file);
    
    return await fetch(`https://strahdvaganza-backend.onrender.com//ghouls_archives/eldritch_tribute_accountability/${paymentID}/eldritch_receipt`, {
        method: 'POST',
        body: formData,
      });
}