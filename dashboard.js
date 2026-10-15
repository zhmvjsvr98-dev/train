document.addEventListener(
"DOMContentLoaded",
initDashboard
);

function initDashboard(){

loadSummary();

loadTrainMap();

loadIncidents();

}

function loadSummary(){

const trains=
StorageManager.load(
"trainData"
);

let running=0;
let delay=0;
let cancel=0;

trains.forEach(train=>{

if(train.status==="運行中")
running++;

if(train.status==="遅延")
delay++;

if(train.status==="運休")
cancel++;

});

document.getElementById(
"runningCount"
).textContent=running;

document.getElementById(
"delayCount"
).textContent=delay;

document.getElementById(
"cancelCount"
).textContent=cancel;

document.getElementById(
"inspectionCount"
).textContent=
StorageManager.load(
"vehicleData"
).length;

}

function loadTrainMap(){

const container=
document.getElementById(
"trainMap"
);

const trains=
StorageManager.load(
"trainData"
);

let html="";

trains.forEach(train=>{

let cls="status-normal";

if(train.status==="遅延")
cls="status-delay";

if(train.status==="運休")
cls="status-cancel";

html+=`
<div class="train-item">

<div class="${cls}">
🚆 ${train.trainNo}
</div>

<div>
${train.location}
</div>

</div>
`;

});

container.innerHTML=html;

}

function loadIncidents(){

const incidents=
StorageManager.load(
"incidentData"
);

const table=
document.getElementById(
"incidentTable"
);

let html="";

incidents.forEach(item=>{

html+=`
<tr>

<td>
${item.datetime}
</td>

<td>
${item.category}
</td>

<td>
${item.status}
</td>

</tr>
`;

});

table.innerHTML=html;

}