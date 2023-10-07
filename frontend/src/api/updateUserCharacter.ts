import defaultUrl from "../assets/constants";

export const updateUserCharacter = async (classID: string, itemID: string, name: string, file: any, characterId: number) => {

    const formData = new FormData();
    formData.append('ClassID', classID);
    formData.append('ItemID', itemID);
    formData.append('Name', name);
    if (file) {
        formData.append('pdf', file);
    }
    return await fetch(`${defaultUrl}//ghouls_archives/spectral_manifestation/hero/${characterId}`, {
        method: 'PUT',
        body: formData,
      });
}
