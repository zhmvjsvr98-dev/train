const STORAGE_KEYS = {

    trains: "trainData",
    timetable: "timetableData",
    delay: "delayData",
    incident: "incidentData",
    vehicle: "vehicleData"

};

function saveData(key,data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}

function getData(key){

    const data =
        localStorage.getItem(key);

    return data
        ? JSON.parse(data)
        : [];

}

function deleteData(
    key,
    id
){

    const data =
        getData(key);

    const filtered =
        data.filter(
            x => x.id !== id
        );

    saveData(
        key,
        filtered
    );

}

function updateData(
    key,
    id,
    newData
){

    const data =
        getData(key);

    const updated =
        data.map(item =>
            item.id === id
            ? newData
            : item
        );

    saveData(key,updated);

}

function addData(
    key,
    item
){

    const data =
        getData(key);

    data.push(item);

    saveData(key,data);

}