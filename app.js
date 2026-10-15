document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkLogin();

        initializeClock();

        initializeLogout();

    }
);

function checkLogin(){

    const login =
        localStorage.getItem(
            "tomsLogin"
        );

    if(!login){

        window.location.href =
            "../index.html";

    }

}

function initializeLogout(){

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    if(!logoutBtn){
        return;
    }

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "tomsLogin"
            );

            window.location.href =
                "../index.html";

        }
    );

}

function initializeClock(){

    const clock =
        document.getElementById(
            "currentTime"
        );

    if(!clock){
        return;
    }

    const updateClock = () => {

        const now =
            new Date();

        clock.innerHTML =
            now.toLocaleString(
                "ja-JP"
            );

    };

    updateClock();

    setInterval(
        updateClock,
        1000
    );

}