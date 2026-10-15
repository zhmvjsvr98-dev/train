let delayData = [];

let currentSort = "";
let sortAsc = true;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        delayData =
            getData(
                "delayData"
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
        addDelay
    );

    document
    .getElementById("searchBox")
    .addEventListener(
        "keyup",
        searchData
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
    .getElementById("updateBtn")
    .addEventListener(
        "click",
        updateRecord
    );

    document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );

}

function addDelay(){

    const record = {

        id: Date.now(),

        trainNo:
        document.getElementById(
            "trainNo"
        ).value,

        minutes:
        document.getElementById(
            "delayMinutes"
        ).value,

        time:
        document.getElementById(
            "occurredTime"
        ).value,

        reason:
        document.getElementById(
            "reason"
        ).value,

        status:
        document.getElementById(
            "status"
        ).value

    };

    delayData.push(record);

    saveData(
        "delayData",
        delayData
    );

    syncTrainStatus(
        record.trainNo,
        record.status
    );

    renderTable();

    clearForm();

}

function syncTrainStatus(
    trainNo,
    status
){

    const trains =
        getData(
            "trainData"
        );

    trains.forEach(train=>{

        if(
            train.trainNo ===
            trainNo
        ){

            if(status==="運休"){

                train.status =
                "運休";

            }

            else if(status==="遅延"){

                train.status =
                "遅延";

            }

            else{

                train.status =
                "正常";

            }

        }

    });

    saveData(
        "trainData",
        trains
    );

}

function renderTable(
    data=delayData
){

    const table =
        document.getElementById(
            "delayTable"
        );

    let html = "";

    data.forEach(item=>{

        html += `
        <tr>

            <td>
                ${item.trainNo}
            </td>

            <td>
                ${item.minutes}
                分
            </td>

            <td>
                ${item.time}
            </td>

            <td>
                ${item.reason}
            </td>

            <td>

                ${statusBadge(
                    item.status
                )}

            </td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editRecord(${item.id})">

                編集

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteRecord(${item.id})">

                削除

                </button>

            </td>

        </tr>
        `;

    });

    table.innerHTML =
        html;

}

function statusBadge(status){

    switch(status){

        case "運行中":

            return `
            <span class="status status-normal">
            運行中
            </span>
            `;

        case "遅延":

            return `
            <span class="status status-delay">
            遅延
            </span>
            `;

        case "運休":

            return `
            <span class="status status-stop">
            運休
            </span>
            `;

    }

}

function deleteRecord(id){

    if(!confirm(
        "削除しますか？"
    )){
        return;
    }

    delayData =
        delayData.filter(
            x => x.id !== id
        );

    saveData(
        "delayData",
        delayData
    );

    renderTable();

}

function editRecord(id){

    const item =
        delayData.find(
            x => x.id === id
        );

    document.getElementById(
        "editId"
    ).value =
    item.id;

    document.getElementById(
        "editTrainNo"
    ).value =
    item.trainNo;

    document.getElementById(
        "editMinutes"
    ).value =
    item.minutes;

    document.getElementById(
        "editTime"
    ).value =
    item.time;

    document.getElementById(
        "editReason"
    ).value =
    item.reason;

    document.getElementById(
        "editStatus"
    ).value =
    item.status;

    document
    .getElementById(
        "editModal"
    )
    .classList.add(
        "show"
    );

}

function updateRecord(){

    const id =
        Number(
            document
            .getElementById(
                "editId"
            ).value
        );

    delayData =
        delayData.map(item=>{

            if(item.id===id){

                const updated = {

                    ...item,

                    trainNo:
                    document
                    .getElementById(
                        "editTrainNo"
                    ).value,

                    minutes:
                    document
                    .getElementById(
                        "editMinutes"
                    ).value,

                    time:
                    document
                    .getElementById(
                        "editTime"
                    ).value,

                    reason:
                    document
                    .getElementById(
                        "editReason"
                    ).value,

                    status:
                    document
                    .getElementById(
                        "editStatus"
                    ).value

                };

                syncTrainStatus(
                    updated.trainNo,
                    updated.status
                );

                return updated;

            }

            return item;

        });

    saveData(
        "delayData",
        delayData
    );

    renderTable();

    closeModal();

}

function searchData(){

    const keyword =
        document
        .getElementById(
            "searchBox"
        )
        .value
        .toLowerCase();

    const result =
        delayData.filter(
            item =>

            item.trainNo
            .toLowerCase()
            .includes(keyword)

            ||

            item.reason
            .toLowerCase()
            .includes(keyword)

        );

    renderTable(result);

}

function sortTable(column){

    if(currentSort===column){

        sortAsc =
        !sortAsc;

    }else{

        currentSort =
        column;

        sortAsc = true;

    }

    delayData.sort(
        (a,b)=>{

            if(sortAsc){

                return String(
                    a[column]
                ).localeCompare(
                    String(
                        b[column]
                    ),
                    "ja"
                );

            }

            return String(
                b[column]
            ).localeCompare(
                String(
                    a[column]
                ),
                "ja"
            );

        }
    );

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

function clearForm(){

    document.getElementById(
        "trainNo"
    ).value="";

    document.getElementById(
        "delayMinutes"
    ).value="";

    document.getElementById(
        "occurredTime"
    ).value="";

    document.getElementById(
        "reason"
    ).value="";

    document.getElementById(
        "status"
    ).value="運行中";

}