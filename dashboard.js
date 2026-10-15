document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStatistics();

        renderRouteMap();

        loadNotices();

        loadIncidents();

    }
);

/* ======================================
   統計情報
====================================== */

function loadStatistics(){

    const trains =
        getData("trainData");

    const vehicles =
        getData("vehicleData");

    const incidents =
        getData("incidentData");

    const runningCount =
        trains.filter(
            train =>
                train.status === "正常"
        ).length;

    const delayCount =
        trains.filter(
            train =>
                train.status === "遅延"
        ).length;

    const stopCount =
        trains.filter(
            train =>
                train.status === "運休"
        ).length;

    const inspectionCount =
        vehicles.filter(
            vehicle =>
                vehicle.status === "点検中"
        ).length;

    const emergencyCount =
        incidents.filter(
            incident =>
                incident.level === "重大" &&
                incident.status === "対応中"
        ).length;

    const runningEl =
        document.getElementById(
            "runningCount"
        );

    if(runningEl){
        runningEl.innerText =
            runningCount;
    }

    const delayEl =
        document.getElementById(
            "delayCount"
        );

    if(delayEl){
        delayEl.innerText =
            delayCount;
    }

    const stopEl =
        document.getElementById(
            "stopCount"
        );

    if(stopEl){
        stopEl.innerText =
            stopCount;
    }

    const vehicleEl =
        document.getElementById(
            "vehicleCount"
        );

    if(vehicleEl){
        vehicleEl.innerText =
            inspectionCount;
    }

    const emergencyEl =
        document.getElementById(
            "emergencyCount"
        );

    if(emergencyEl){
        emergencyEl.innerText =
            emergencyCount;
    }

}

/* ======================================
   路線マップ
====================================== */

function renderRouteMap(){

    const stations = [

        "東京",
        "神田",
        "秋葉原",
        "上野",
        "日暮里",
        "池袋",
        "新宿",
        "渋谷",
        "品川"

    ];

    const trains =
        getData(
            "trainData"
        );

    const map =
        document.getElementById(
            "routeMap"
        );

    if(!map){
        return;
    }

    let html = "";

    stations.forEach(station=>{

        const train =
            trains.find(
                item =>
                    item.position === station
            );

        let color =
            "#1E88E5";

        let icon =
            "fa-location-dot";

        let trainNo =
            "";

        if(train){

            icon =
            "fa-train";

            trainNo =
            train.trainNo;

            switch(
                train.status
            ){

                case "正常":

                    color =
                    "#28A745";
                    break;

                case "遅延":

                    color =
                    "#FF9800";
                    break;

                case "運休":

                    color =
                    "#F44336";
                    break;

                case "回送":

                    color =
                    "#1E88E5";
                    break;

            }

        }

        html += `

        <div class="station">

            <i
            class="fa-solid ${icon}"
            style="
                color:${color};
                font-size:28px;">

            </i>

            <div
            style="
                margin-top:10px;
                font-weight:bold;">

                ${station}

            </div>

            <div
            style="
                font-size:12px;
                margin-top:5px;">

                ${trainNo}

            </div>

        </div>

        `;

    });

    map.innerHTML =
        html;

}

/* ======================================
   お知らせ
====================================== */

function loadNotices(){

    const list =
        document.getElementById(
            "noticeList"
        );

    if(!list){
        return;
    }

    const trains =
        getData(
            "trainData"
        );

    const incidents =
        getData(
            "incidentData"
        );

    let html = "";

    /* 遅延・運休 */

    trains.forEach(train=>{

        if(
            train.status ===
            "遅延"
        ){

            html += `

            <li style="
                padding:10px;
                border-bottom:1px solid #233d62;
                color:#FF9800;">

                ⚠ 列車
                ${train.trainNo}
                が遅延しています

            </li>

            `;

        }

        if(
            train.status ===
            "運休"
        ){

            html += `

            <li style="
                padding:10px;
                border-bottom:1px solid #233d62;
                color:#F44336;">

                ❌ 列車
                ${train.trainNo}
                は運休中です

            </li>

            `;

        }

    });

    /* インシデント */

    incidents
    .filter(
        item =>
            item.status === "対応中"
    )
    .forEach(item=>{

        let color =
            "#FF9800";

        if(
            item.level === "重大"
        ){
            color =
                "#F44336";
        }

        html += `

        <li style="
            padding:10px;
            border-bottom:1px solid #233d62;
            color:${color};">

            【${item.level}】

            ${item.category}

            :

            ${item.content}

        </li>

        `;

    });

    if(html === ""){

        html = `

        <li
        style="
            padding:10px;">

            現在お知らせはありません

        </li>

        `;

    }

    list.innerHTML =
        html;

}

/* ======================================
   インシデント一覧
====================================== */

function loadIncidents(){

    const incidents =
        getData(
            "incidentData"
        );

    const table =
        document.getElementById(
            "incidentTable"
        );

    if(!table){
        return;
    }

    let html = "";

    incidents.forEach(item=>{

        let statusClass =
            "status-normal";

        if(
            item.status ===
            "対応中"
        ){

            statusClass =
                "status-delay";

        }

        let levelColor =
            "#28A745";

        switch(
            item.level
        ){

            case "中":

                levelColor =
                "#1E88E5";
                break;

            case "高":

                levelColor =
                "#FF9800";
                break;

            case "重大":

                levelColor =
                "#F44336";
                break;

        }

        html += `

        <tr>

            <td>
                ${item.datetime}
            </td>

            <td>
                ${item.category}
            </td>

            <td>
                ${item.content}
            </td>

            <td>

                <span
                class="
                status
                ${statusClass}">

                ${item.status}

                </span>

            </td>

            <td>

                <span style="
                    color:${levelColor};
                    font-weight:bold;">

                    ${item.level}

                </span>

            </td>

        </tr>

        `;

    });

    table.innerHTML =
        html;

}