const loginUrl = "https://localhost/login"; // cambiar por url de la pagina que hagas vos (en la aplicacion de twitch tiene que estar exactamente esta url)
const clientId = "npnnjnv3yyqoh0qcdx8andwqktx3d3"; // cambiar por tu id de la aplicacion registrada en https://dev.twitch.tv/console/

(async () => {
    const token = await readLocalStorage("token").catch((error) =>
        console.log(error)
    );

    const isValidToken = token ? await verifyToken(token) : false;

    if (!isValidToken) {
        deleteToken();
        // verificar si el token es valido tarda un poco por la api de twitch
        // entonces si no es valido lo borramos asi no tenemos que volver a verificar
        // cada vez que abramos el popup

        addLoginButton();
        document
            .getElementById("loginButton")
            .addEventListener("click", openLoginTab);
    } else {
        addLogoutButton();
        document
            .getElementById("logoutButton")
            .addEventListener("click", logout);
    }
})();

async function readLocalStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                reject();
            } else {
                resolve(result[key]);
            }
        });
    });
}

async function verifyToken(token) {
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(
        `https://id.twitch.tv/oauth2/validate`,
        params
    );
    console.log(response);
    return response.ok;
}

// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-implicit-code-flow
function openLoginTab() {
    chrome.tabs.create({
        active: true,
        url: `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&force_verify=true&redirect_uri=${loginUrl}&scope=`,
    });
}

function logout() {
    window.close();
    deleteToken()
}

function deleteToken(){
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

function addLoginButton() {
    const target = document.getElementById("buttons");

    const loginButton = document.createElement("button");
    loginButton.type = "button";
    loginButton.id = "loginButton";
    loginButton.classList.add("btn", "btn-primary");
    loginButton.innerHTML =
        '<img src="./resources/icons/twitch.png" width="24px">login</img>';

    target.appendChild(loginButton);
}

function addLogoutButton() {
    const target = document.getElementById("buttons");

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.id = "logoutButton";
    logoutButton.classList.add("btn", "btn-danger");
    logoutButton.innerText = "Logout";

    target.appendChild(logoutButton);
}
