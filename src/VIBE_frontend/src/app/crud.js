function saveDataToLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function addDataToLocalStorage(newData) {
    const existingData = getDataFromLocalStorage();
    existingData.push(newData);
    saveDataToLocalStorage(existingData);
}

function modifyDataInLocalStorage(index, updatedData) {
    const existingData = getDataFromLocalStorage();
    existingData[index] = updatedData;
    saveDataToLocalStorage(existingData);
}
  
function deleteDataFromLocalStorage(index) {
    const existingData = getDataFromLocalStorage();
    existingData.splice(index, 1);
    saveDataToLocalStorage(existingData);
}
  
function getDataFromLocalStorage() {
    const dataString = localStorage.getItem('data');
    return dataString ? JSON.parse(dataString) : [];
}
/* Sample data
const initialData = [
  {
    username: "user1",
    event_message: "Message 1",
    image: [],
    clip: []
  },
  {
    username: "user2",
    event_message: "Message 2",
    image: [],
    clip: []
  }
];
saveDataToLocalStorage(initialData);
const storedData = getDataFromLocalStorage();
*/