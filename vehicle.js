let vehicleData = [];

let currentSort = "";
let sortAsc = true;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        vehicleData =
            getData(
                "vehicleData"
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
        addVehicle
    );

    document
    .getElementById("searchBox")
    .addEventListener(
        "keyup",
        searchVehicle
    );

    document
    .querySelectorAll("th[data-sort]")
    .forEach(th => {

        th.addEventListener(
            "click",
            () =>
            sortTable(
                th.dataset.sort
            )
        );

    });

    document
    .getElementById("updateBtn")
    .addEventListener(
        "click",
        updateVehicle
    );

    document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );

}

function addVehicle(){

    const item = {

        id: Date.now(),

        vehicleNo:
        document.getElementById(
            "vehicleNo"
        ).value,

        model:
        document.getElementById(
            "vehicleType"
        ).value,

        depot:
        document.getElementById(
            "depot"
        ).value,

        inspection:
        document.getElementById(
            "inspectionDate"
        ).value,

        status:
        document.getElementById(
            "vehicleStatus"
        ).value

    };

    vehicleData.push(item);

    saveData(
        "vehicleData",
        vehicleData
    );

    renderTable();

    clearForm();

}

function renderTable(
    data = vehicleData
){

    const tbody =
        document.getElementById(
            "vehicleTable"
        );

    let html = "";

    data.forEach(item => {

        html += `
        <tr>

            <td>${item.vehicleNo}</td>

            <td>${item.model}</td>

            <td>${item.depot}</td>

            <td>${item.inspection}</td>

            <td>
                ${statusBadge(item.status)}
            </td>

            <td>
                ${inspectionAlert(item.inspection)}
            </td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editVehicle(${item.id})">

                編集

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteVehicle(${item.id})">

                削除

                </button>

            </td>

        </tr>
        `;

    });

    tbody.innerHTML = html;

}

function statusBadge(status){

    switch(status){

        case "運用中":
            return '<span class="status status-normal">運用中</span>';

        case "点検中":
            return '<span class="status status-delay">点検中</span>';

        case "入場中":
            return '<span class="status status-deadhead">入場中</span>';

        case "運用停止":
            return '<span class="status status-stop">停止</span>';
    }

}

function inspectionAlert(date){

    const today =
        new Date();

    const target =
        new Date(date);

    const diff =
        Math.ceil(
            (target - today)
            /
            (1000*60*60*24)
        );

    if(diff <= 30){

        return `
        <span style="
            color:#F44336;
            font-weight:bold;">

            要検査

        </span>
        `;
    }

    if(diff <= 90){

        return `
        <span style="
            color:#FF9800;
            font-weight:bold;">

            期限接近

        </span>
        `;
    }

    return `
    <span
    style="
        color:#28A745">

        正常

    </span>
    `;
}

function deleteVehicle(id){

    if(!confirm("削除しますか？")){
        return;
    }

    vehicleData =
        vehicleData.filter(
            x => x.id !== id
        );

    saveData(
        "vehicleData",
        vehicleData
    );

    renderTable();

}

function editVehicle(id){

    const item =
        vehicleData.find(
            x => x.id === id
        );

    document.getElementById("editId").value = item.id;
    document.getElementById("editVehicleNo").value = item.vehicleNo;
    document.getElementById("editModel").value = item.model;
    document.getElementById("editDepot").value = item.depot;
    document.getElementById("editInspection").value = item.inspection;
    document.getElementById("editStatus").value = item.status;

    document
    .getElementById("editModal")
    .classList.add("show");

}

function updateVehicle(){

    const id =
        Number(
            document.getElementById("editId").value
        );

    vehicleData =
        vehicleData.map(item => {

            if(item.id === id){

                return {

                    ...item,

                    vehicleNo:
                    document.getElementById("editVehicleNo").value,

                    model:
                    document.getElementById("editModel").value,

                    depot:
                    document.getElementById("editDepot").value,

                    inspection:
                    document.getElementById("editInspection").value,

                    status:
                    document.getElementById("editStatus").value

                };

            }

            return item;

        });

    saveData(
        "vehicleData",
        vehicleData
    );

    renderTable();

    closeModal();

}

function searchVehicle(){

    const keyword =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered =
        vehicleData.filter(item =>

            item.vehicleNo.toLowerCase().includes(keyword)
            ||
            item.model.toLowerCase().includes(keyword)
            ||
            item.depot.toLowerCase().includes(keyword)

        );

    renderTable(filtered);

}

function sortTable(column){

    if(currentSort === column){

        sortAsc = !sortAsc;

    }else{

        currentSort = column;
        sortAsc = true;

    }

    vehicleData.sort((a,b)=>{

        if(sortAsc){

            return String(
                a[column]
            ).localeCompare(
                String(b[column]),
                "ja"
            );

        }

        return String(
            b[column]
        ).localeCompare(
            String(a[column]),
            "ja"
        );

    });

    renderTable();

}

function closeModal(){

    document
    .getElementById("editModal")
    .classList.remove("show");

}

function clearForm(){

    document.getElementById("vehicleNo").value="";
    document.getElementById("vehicleType").value="";
    document.getElementById("depot").value="";
    document.getElementById("inspectionDate").value="";
    document.getElementById("vehicleStatus").value="運用中";

}
