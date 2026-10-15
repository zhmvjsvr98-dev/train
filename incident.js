let incidentData = [];

let currentSort = "";
let sortAsc = true;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        incidentData =
            getData(
                "incidentData"
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
        addIncident
    );

    document
    .getElementById("searchBox")
    .addEventListener(
        "keyup",
        searchIncident
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
        updateIncident
    );

    document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );

}

function addIncident(){

    const data = {

        id: Date.now(),

        datetime:
        document.getElementById(
            "incidentDate"
        ).value,

        category:
        document.getElementById(
            "incidentType"
        ).value,

        content:
        document.getElementById(
            "incidentContent"
        ).value,

        status:
        document.getElementById(
            "incidentStatus"
        ).value,

        level:
        document.getElementById(
            "incidentLevel"
        ).value

    };

    incidentData.push(data);

    saveData(
        "incidentData",
        incidentData
    );

    renderTable();

    clearForm();

}

function renderTable(data = incidentData){

    let html = "";

    data.forEach(item=>{

        html += `
        <tr>

            <td>${item.datetime}</td>

            <td>${item.category}</td>

            <td>${item.content}</td>

            <td>${statusBadge(item.status)}</td>

            <td>${levelBadge(item.level)}</td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editIncident(${item.id})">

                編集

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteIncident(${item.id})">

                削除

                </button>

            </td>

        </tr>
        `;

    });

    document
    .getElementById(
        "incidentTable"
    )
    .innerHTML = html;

}

function statusBadge(status){

    if(status==="対応中"){

        return `
        <span class="status status-delay">
        対応中
        </span>
        `;
    }

    if(status==="解決済"){

        return `
        <span class="status status-normal">
        解決済
        </span>
        `;
    }

    return `
    <span class="status status-normal">
    終了
    </span>
    `;
}

function levelBadge(level){

    switch(level){

        case "低":
            return '<span class="status status-normal">低</span>';

        case "中":
            return '<span class="status status-deadhead">中</span>';

        case "高":
            return '<span class="status status-delay">高</span>';

        case "重大":
            return '<span class="status status-stop">重大</span>';
    }

}

function deleteIncident(id){

    if(!confirm("削除しますか？")){
        return;
    }

    incidentData =
        incidentData.filter(
            x => x.id !== id
        );

    saveData(
        "incidentData",
        incidentData
    );

    renderTable();

}

function editIncident(id){

    const item =
        incidentData.find(
            x => x.id === id
        );

    document.getElementById("editId").value = item.id;
    document.getElementById("editDate").value = item.datetime;
    document.getElementById("editType").value = item.category;
    document.getElementById("editContent").value = item.content;
    document.getElementById("editStatus").value = item.status;
    document.getElementById("editLevel").value = item.level;

    document
    .getElementById(
        "editModal"
    )
    .classList.add(
        "show"
    );

}

function updateIncident(){

    const id =
        Number(
            document.getElementById(
                "editId"
            ).value
        );

    incidentData =
        incidentData.map(item=>{

            if(item.id===id){

                return{

                    ...item,

                    datetime:
                    document.getElementById("editDate").value,

                    category:
                    document.getElementById("editType").value,

                    content:
                    document.getElementById("editContent").value,

                    status:
                    document.getElementById("editStatus").value,

                    level:
                    document.getElementById("editLevel").value

                };

            }

            return item;

        });

    saveData(
        "incidentData",
        incidentData
    );

    renderTable();

    closeModal();

}

function searchIncident(){

    const keyword =
        document.getElementById(
            "searchBox"
        )
        .value
        .toLowerCase();

    const result =
        incidentData.filter(
            item =>
            item.content
            .toLowerCase()
            .includes(keyword)
        );

    renderTable(result);

}

function sortTable(column){

    if(currentSort===column){

        sortAsc=!sortAsc;

    }else{

        currentSort=column;
        sortAsc=true;

    }

    incidentData.sort((a,b)=>{

        if(sortAsc){

            return String(a[column]).localeCompare(
                String(b[column]),
                "ja"
            );
        }

        return String(b[column]).localeCompare(
            String(a[column]),
            "ja"
        );

    });

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

    document.getElementById("incidentDate").value="";
    document.getElementById("incidentContent").value="";
    document.getElementById("incidentStatus").value="対応中";
    document.getElementById("incidentLevel").value="低";

}