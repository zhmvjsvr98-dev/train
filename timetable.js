let timetableData = [];
let currentSort = "";
let sortAsc = true;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        timetableData =
            getData(
                "timetableData"
            );

        renderTable();

        initializeEvents();

    }
);

function initializeEvents(){

    document
    .getElementById("addBtn")
    .addEventListener(
        "click",
        addTimetable
    );

    document
    .getElementById("searchInput")
    .addEventListener(
        "keyup",
        searchTable
    );

    document
    .querySelectorAll(
        "th[data-sort]"
    )
    .forEach(th=>{

        th.addEventListener(
            "click",
            ()=>sortTable(
                th.dataset.sort
            )
        );

    });

    document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeModal
    );

    document
    .getElementById(
        "updateBtn"
    )
    .addEventListener(
        "click",
        updateTimetable
    );

}

function addTimetable(){

    const item = {

        id: Date.now(),

        trainNo:
        document.getElementById(
            "trainNo"
        ).value,

        type:
        document.getElementById(
            "trainType"
        ).value,

        start:
        document.getElementById(
            "startStation"
        ).value,

        end:
        document.getElementById(
            "endStation"
        ).value,

        departure:
        document.getElementById(
            "departureTime"
        ).value,

        arrival:
        document.getElementById(
            "arrivalTime"
        ).value

    };

    timetableData.push(item);

    saveData(
        "timetableData",
        timetableData
    );

    renderTable();

    clearForm();

}

function renderTable(data=timetableData){

    const table =
        document.getElementById(
            "timetableTable"
        );

    let html = "";

    data.forEach(item=>{

        html += `

        <tr>

            <td>${item.trainNo}</td>

            <td>${item.type}</td>

            <td>${item.start}</td>

            <td>${item.end}</td>

            <td>${item.departure}</td>

            <td>${item.arrival}</td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editTimetable(${item.id})">

                編集

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteTimetable(${item.id})">

                削除

                </button>

            </td>

        </tr>

        `;

    });

    table.innerHTML = html;

}

function deleteTimetable(id){

    if(!confirm(
        "削除しますか？"
    )){
        return;
    }

    timetableData =
        timetableData.filter(
            x => x.id !== id
        );

    saveData(
        "timetableData",
        timetableData
    );

    renderTable();

}

function editTimetable(id){

    const item =
        timetableData.find(
            x => x.id === id
        );

    document.getElementById(
        "editId"
    ).value = item.id;

    document.getElementById(
        "editTrainNo"
    ).value = item.trainNo;

    document.getElementById(
        "editType"
    ).value = item.type;

    document.getElementById(
        "editStart"
    ).value = item.start;

    document.getElementById(
        "editEnd"
    ).value = item.end;

    document.getElementById(
        "editDeparture"
    ).value = item.departure;

    document.getElementById(
        "editArrival"
    ).value = item.arrival;

    document
    .getElementById(
        "editModal"
    )
    .classList.add(
        "show"
    );

}

function updateTimetable(){

    const id =
        Number(
            document
            .getElementById(
                "editId"
            ).value
        );

    timetableData =
        timetableData.map(item=>{

            if(item.id===id){

                return {

                    ...item,

                    trainNo:
                    document
                    .getElementById(
                        "editTrainNo"
                    ).value,

                    type:
                    document
                    .getElementById(
                        "editType"
                    ).value,

                    start:
                    document
                    .getElementById(
                        "editStart"
                    ).value,

                    end:
                    document
                    .getElementById(
                        "editEnd"
                    ).value,

                    departure:
                    document
                    .getElementById(
                        "editDeparture"
                    ).value,

                    arrival:
                    document
                    .getElementById(
                        "editArrival"
                    ).value

                };

            }

            return item;

        });

    saveData(
        "timetableData",
        timetableData
    );

    closeModal();

    renderTable();

}

function closeModal(){

    document
    .getElementById(
        "editModal"
    )
    .classList.remove(
        "show"
    );

}

function searchTable(){

    const keyword =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();

    const filtered =
        timetableData.filter(
            item =>

            item.trainNo
            .toLowerCase()
            .includes(keyword)

            ||

            item.start
            .toLowerCase()
            .includes(keyword)

            ||

            item.end
            .toLowerCase()
            .includes(keyword)
        );

    renderTable(
        filtered
    );

}

function sortTable(column){

    if(currentSort===column){

