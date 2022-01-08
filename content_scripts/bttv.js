function showNotification(success, message) {
    var notification = $(`
        <div class="alert alert-${success ? 'success' : 'danger'}" role="alert">
        ${message}
    </div>`);
    $(".card.bg-dark").first().prepend(notification);

}

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

async function getUsername(token){
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(
        `https://id.twitch.tv/oauth2/validate`,
        params
    );
    const json = await response.json();
    return json.login;
}

function initExtension() {
        
    setTimeout(async () => {
        const token = await readLocalStorage(token);

        const isValidToken = await verifyToken(token);
        if (!isValidToken) return;

        var baseurl = 'https://bapi.zzls.xyz/api'

        var username = await getUsername(token);
        var emoteName = document.title.replace('BetterTTV - ','').split('by')[0].trim()
        var emoteID = window.location.href.replace('https://betterttv.com/emotes/', '')

        console.log(username, emoteName, emoteID)


 

        fetch(baseurl + '/emotes/' + username)
            .then(response => response.json())
            .then(data => {
                console.log(data.emotes)

                var hasEmote = false;
                
                for (let i = 0; i < data.emotes.length; i++) {
                    
                    if(data.emotes[i].name == emoteName) {
                        hasEmote = true;
                        break
                    }
                    
                }

                if(hasEmote){
                    var button = $(`<button type="button" id="btv-button" class="btn btn-outline-danger">Quitar de booyah.tv</button>`);

                    button.click(function () {
                        fetch(baseurl + '/emotes/remove/' + username, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({id: emoteID, token: token})
                        }).then(response => {
                            
                            if(response.ok){
                                showNotification(true, `Emote <b>${emoteName}</b> Quitado correctamente del canal <b>${username}</b>`)
                            }else{
                                showNotification(false, `El Emote <b>${emoteName}</b> no se a Quitado correctamente del canal <b>${username}</b>`)
                            }

                        });
                    });

                    if(!$('#btv-button').length){
                        $(".btn-outline-primary").parent().append(button);
                        $('small.text-muted').parent().prepend(button);
                        
                    }
                }else{
                    var button = $(`<button type="button" id="btv-button" class="btn btn-outline-warning">Agregar a booyah.tv</button>`);

                    button.click(function () {
                        var newEmote = {
                            id: emoteID,
                            name: emoteName,
                            source: 'bttv',
                            token: token
                        }

                        fetch(baseurl + '/emotes/add/' + username, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newEmote)
                        }).then(response => {
                            
                            if(response.ok){
                                showNotification(true, `Emote <b>${emoteName}</b> Añadido correctamente al canal <b>${username}</b>`)
                            }else{
                                showNotification(false, `El Emote <b>${emoteName}</b> no se a Añadido correctamente al canal <b>${username}</b>`)
                            }

                        });
                    });

                    if(!$('#btv-button').length){
                        $(".btn-outline-primary").parent().append(button);
                        $('small.text-muted').parent().prepend(button);
                    }
                }



            });




    }, 2000);
}



var url = window.location.href

initExtension()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {

        if (url != request.url){
			
			initExtension()
		}
		
		url = request.url
	}
})