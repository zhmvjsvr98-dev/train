function initSampleData(){

    if(
        localStorage.getItem(
            "tomsInitialized"
        )
    ){
        return;
    }

    localStorage.setItem(
        "tomsInitialized",
        "true"
    );

    const trains = [

        {
            id:1,
            trainNo:"101M",
            formation:"E235-01",
            type:"快速",
            status:"正常",
            position:"東京",
            note:""
        },

        {
            id:2,
            trainNo:"205M",
            formation:"E231-09",
            type:"普通",
            status:"遅延",
            position:"秋葉原",
            note:"5分"
        },

        {
            id:3,
            trainNo:"315M",
            formation:"E233-03",
            type:"普通",
            status:"運休",
            position:"上野",
            note:"車両故障"
        }

    ];

    const timetable = [

        {
            id:1,
            trainNo:"101M",
            type:"快速",
            start:"東京",
            end:"新宿",
            departure:"08:00",
            arrival:"08:35"
        },

        {
            id:2,
            trainNo:"205M",
            type:"普通",
            start:"品川",
            end:"池袋",
            departure:"08:10",
            arrival:"08:55"
        }

    ];

    const delay = [

        {
            id:1,
            trainNo:"205M",
            minutes:5,
            time:"08:21",
            reason:"混雑",
            status:"遅延"
        }

    ];

    const incidents = [

        {
            id:1,
            datetime:"2026-01-01 08:20",
            category:"設備",
            content:"信号点検",
            status:"対応中"
        },

        {
            id:2,
            datetime:"2026-01-01 09:00",
            category:"車両",
            content:"故障対応",
            status:"解決済"
        }

    ];

    const vehicles = [

        {
            id:1,
            vehicleNo:"E235-01",
            model:"E235系",
            depot:"東京総合",
            inspection:"2026-12-31",
            status:"運用中"
        },

        {
            id:2,
            vehicleNo:"E231-09",
            model:"E231系",
            depot:"田町",
            inspection:"2026-11-10",
            status:"点検中"
        }

    ];

    localStorage.setItem(
        "trainData",
        JSON.stringify(trains)
    );

    localStorage.setItem(
        "timetableData",
        JSON.stringify(timetable)
    );

    localStorage.setItem(
        "delayData",
        JSON.stringify(delay)
    );

    localStorage.setItem(
        "incidentData",
        JSON.stringify(incidents)
    );

    localStorage.setItem(
        "vehicleData",
        JSON.stringify(vehicles)
    );

}