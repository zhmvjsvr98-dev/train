document.addEventListener("DOMContentLoaded", () => {

    initSampleData();

    const loginBtn =
        document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {

        localStorage.setItem(
            "tomsLogin",
            "true"
        );

        window.location.href =
            "pages/dashboard.html";

    });

});
``