



function showNotification(success, message) {
    var notification = $(`
        <div class="alert alert-${success ? 'success' : 'danger'}" role="alert">
        ${message}
    </div>`);
    $(".theme-dark").first().prepend(notification);

}

function initExtension() {
        
    setTimeout(() => {

        var baseurl = 'https://bapi.zzls.xyz/api'

        var username = $('.mat-toolbar-single-row .username-container').text().trim()
        var emoteName = $('.mat-elevation-z2 .ml-2').text().split(' ')[1]
        var emoteID = window.location.href.replace('https://7tv.app/emotes/', '')

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
                    $(`<button id="btv-button" _ngcontent-serverapp-c145="" mat-button=""
                    class="mat-focus-indicator mx-1 mat-button mat-button-base ng-tns-c145-2 ng-star-inserted"
                    style="background-color: rgba(255, 20, 20, 0.65);"><span class="mat-button-wrapper">
                        <div _ngcontent-serverapp-c145="" class="d-inline-flex align-items-center" style="color: white;">
                            <div _ngcontent-serverapp-c145="" class="mx-1 ng-tns-c145-2"></div><span _ngcontent-serverapp-c145=""
                                class="ng-tns-c145-2">Quitar de booyah.tv</span>
                        </div>
                    </span><span matripple="" class="mat-ripple mat-button-ripple"></span><span
                        class="mat-button-focus-overlay"></span>
                </button>`);
                    button.click(function () {
                        fetch(baseurl + '/emotes/remove/' + username, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({id: emoteID})
                        }).then(response => {
                            
                            if(response.ok){
                                showNotification(true, `Emote <b>${emoteName}</b> Quitado correctamente del canal <b>${username}</b>`)
                            }else{
                                showNotification(false, `El Emote <b>${emoteName}</b> no se a Quitado correctamente del canal <b>${username}</b>`)
                            }

                        });
                    });

                    if(!$('#btv-button').length){
                        $('.section-content').first().children().last().append(button);
                    }
                }else{
                    var button = $(`<button id="btv-button" _ngcontent-serverapp-c145="" mat-button=""
                    class="mat-focus-indicator mx-1 mat-button mat-button-base ng-tns-c145-2 ng-star-inserted"
                    style="background-color: rgba(255, 193, 7, 0.65);"><span class="mat-button-wrapper">
                        <div _ngcontent-serverapp-c145="" class="d-inline-flex align-items-center" style="color: white;">
                            <div _ngcontent-serverapp-c145="" class="mx-1 ng-tns-c145-2"></div><span _ngcontent-serverapp-c145=""
                                class="ng-tns-c145-2">Agregar a Booyah.tv</span>
                        </div>
                    </span><span matripple="" class="mat-ripple mat-button-ripple"></span><span
                        class="mat-button-focus-overlay"></span>
                </button>`);

                    button.click(function () {
                        var newEmote = {
                            id: emoteID,
                            name: emoteName,
                            source: '7tv'
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
                        $('.section-content').first().children().last().append(button);
                    }
                }



            });




    }, 5000);
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