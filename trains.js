let trainData = [];

let currentSort = "";
let sortAsc = true;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        trainData =
            getData(
                "trainData"
            );

        renderTable();

        initializeEvents();

    }
);

function initializeEvents(){

    document
    .getElementById("addTrainBtn")
    .addEventListener(
        "click",
        addTrain
    );

    document
    .getElementById("searchBox")
    .addEventListener(
        "keyup",
        searchTrain
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
        updateTrain
    );

}

function addTrain(){

    const train = {

        id: Date.now(),

        trainNo:
        document.getElementById(
            "trainNo"
        ).value,

        formation:
        document.getElementById(
            "formation"
        ).value,

        type:
        document.getElementById(
            "trainType"
        ).value,

        status:
        document.getElementById(
            "status"
        ).value,

        position:
        document.getElementById(
            "position"
        ).value,

        note:
        document.getElementById(
            "note"
        ).value

    };

    trainData.push(train);

    saveData(
        "trainData",
        trainData
    );

    renderTable();

    clearForm();
}

function renderTable(
    list=trainData
){

    const tbody =
        document.getElementById(
            "trainTable"
        );

    let html = "";

    list.forEach(train=>{

        html += `
        <tr>

            <td>
                ${train.trainNo}
            </td>

            <td>
                ${train.formation}
            </td>

            <td>
                ${train.type}
            </td>

            <td>
                ${getStatusBadge(
                    train.status
                )}
            </td>

            <td>
                ${train.position}
            </td>

            <td>
                ${train.note}
            </td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editTrain(${train.id})">

                編集

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteTrain(${train.id})">

                削除

                </button>

            </td>

        </tr>
        `;

    });

    tbody.innerHTML =
        html;

}

function getStatusBadge(status){

    switch(status){

        case "正常":

            return `
            <span class="status status-normal">
            正常
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

        case "回送":

            return `
            <span class="status status-deadhead">
            回送
            </span>
            `;

        default:
            return status;
    }

}

function deleteTrain(id){

    if(!confirm("削除しますか？")){
        return;
    }

    trainData =
        trainData.filter(
            x => x.id !== id
        );

    saveData(
        "trainData",
        trainData
    );

    renderTable();

}

function editTrain(id){

    const data =
        trainData.find(
            x => x.id === id
        );

    document
    .getElementById(
        "editId"
    ).value = data.id;

    document
    .getElementById(
        "editTrainNo"
    ).value = data.trainNo;

    document
    .getElementById(
        "editFormation"
    ).value = data.formation;

    document
    .getElementById(
        "editType"
    ).value = data.type;

    document
    .getElementById(
        "editStatus"
    ).value = data.status;

    document
    .getElementById(
        "editPosition"
    ).value = data.position;

    document
    .getElementById(
        "editNote"
    ).value = data.note;

    document
    .getElementById(
        "editModal"
    )
    .classList.add(
        "show"
    );

}

function updateTrain(){

    const id =
        Number(
            document
            .getElementById(
                "editId"
            ).value
        );

    trainData =
        trainData.map(item=>{

            if(item.id === id){

                return {

                    ...item,

                    trainNo:
                    document.getElementById(
                        "editTrainNo"
                    ).value,

                    formation:
                    document.getElementById(
                        "editFormation"
                    ).value,

                    type:
                    document.getElementById(
                        "editType"
                    ).value,

                    status:
                    document.getElementById(
                        "editStatus"
                    ).value,

                    position:
                    document.getElementById(
                        "editPosition"
                    ).value,

                    note:
                    document.getElementById(
                        "editNote"
                    ).value

                };

            }

            return item;

        });

    saveData(
        "trainData",
        trainData
    );

    renderTable();

    closeModal();

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

function searchTrain(){

    const keyword =
        document
        .getElementById(
            "searchBox"
        )
        .value
        .toLowerCase();

    const filtered =
        trainData.filter(
            item =>

            item.trainNo
            .toLowerCase()
            .includes(keyword)

            ||

            item.formation
            .toLowerCase()
            .includes(keyword)

            ||

            item.position
            .toLowerCase()
            .includes(keyword)
        );

    renderTable(
        filtered
    );

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

    trainData.sort(
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

function clearForm(){

    document.getElementById(
        "trainNo"
    ).value="";

    document.getElementById(
        "formation"
    ).value="";

    document.getElementById(
        "trainType"
    ).value="";

    document.getElementById(
        "note"
    ).value="";

    document.getElementById(
        "status"
    ).value="正常";

    document.getElementById(
        "position"
    ).value="東京";

}