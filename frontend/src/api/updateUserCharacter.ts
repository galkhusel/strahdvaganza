export const updateUserCharacter = async (classID: string, itemID: string, name: string, file: any, characterId: number) => {

    const formData = new FormData();
    formData.append('ClassID', classID);
    formData.append('ItemID', itemID);
    formData.append('Name', name);
    if (file) {
        formData.append('pdf', file);
    }
    return await fetch(`http://35.203.51.152:10000//ghouls_archives/spectral_manifestation/hero/${characterId}`, {
        method: 'PUT',
        body: formData,
      });
}
