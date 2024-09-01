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

function deleteAllDataFromLocalStorage() {
  localStorage.clear();
}

module.exports = {
  saveDataToLocalStorage,
  addDataToLocalStorage,
  modifyDataInLocalStorage,
  deleteDataFromLocalStorage,
  getDataFromLocalStorage,
  deleteAllDataFromLocalStorage
};