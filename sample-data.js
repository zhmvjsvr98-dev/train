(function(){

if(localStorage.getItem("toms_initialized")){
return;
}

const trainData=[

{
trainNo:"1201",
formation:"E233-1001",
type:"快速",
status:"運行中",
location:"東京→神田",
remark:""
},

{
trainNo:"1203",
formation:"E233-1002",
type:"各停",
status:"遅延",
location:"秋葉原→上野",
remark:"3分遅延"
},

{
trainNo:"1205",
formation:"E233-1003",
type:"快速",
status:"運行中",
location:"品川→渋谷",
remark:""
},

{
trainNo:"1207",
formation:"E233-1004",
type:"各停",
status:"運休",
location:"車庫",
remark:"故障"
}

];

const timetableData=[

{
trainNo:"1201",
type:"快速",
start:"東京",
end:"高尾",
departure:"14:00",
arrival:"15:20"
},

{
trainNo:"1203",
type:"各停",
start:"東京",
end:"立川",
departure:"14:10",
arrival:"15:25"
}

];

const delayData=[

{
trainNo:"1203",
minutes:3,
time:"14:05",
reason:"乗客対応",
status:"遅延"
}

];

const incidentData=[

{
datetime:"2026-10-01 14:20",
category:"車両故障",
content:"E233系モーター異常",
status:"対応中"
},

{
datetime:"2026-10-01 13:10",
category:"遅延",
content:"信号確認",
status:"解決済"
}

];

const vehicleData=[

{
vehicleNo:"E233-1001",
model:"E233系1000番台",
depot:"東京総合車両センター",
inspection:"2027-03-01",
status:"運用中"
},

{
vehicleNo:"E233-1002",
model:"E233系1000番台",
depot:"東京総合車両センター",
inspection:"2027-05-15",
status:"運用中"
}

];

localStorage.setItem(
"trainData",
JSON.stringify(trainData)
);

localStorage.setItem(
"timetableData",
JSON.stringify(timetableData)
);

localStorage.setItem(
"delayData",
JSON.stringify(delayData)
);

localStorage.setItem(
"incidentData",
JSON.stringify(incidentData)
);

localStorage.setItem(
"vehicleData",
JSON.stringify(vehicleData)
);

localStorage.setItem(
"toms_initialized",
"true"
);

})();