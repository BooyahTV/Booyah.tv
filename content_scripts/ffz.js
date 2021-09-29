function showNotification(success, message) {
    var notification = $(`
        <div class="alert alert-${success ? 'success' : 'danger'}" role="alert">
        ${message}
    </div>`);
    $(".row").first().prepend(notification);

}

function initExtension() {
        
    setTimeout(() => {

        var baseurl = 'https://bapi.zzls.xyz/api'

        var username = $('.dropdown-toggle').last().text().trim()
        var emoteName = $("#emoticon").text().split(' ')[0]

        var emoteID = window.location.href.replace('https://www.frankerfacez.com/emoticon/', '').split('-')[0]

        var width = $('.light').children().first().next().find('img').css('width').replace('px','')
        var height = $('.light').children().first().next().find('img').css('height').replace('px','')


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

                console.log('has emote',hasEmote)

                if(hasEmote){
                    var button = $(`<button type="button" id="btv-button" class="btn btn-danger">Quitar de booyah.tv</button>`);

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
                        $('a.btn-large').parent().append(button);
                    }
                }else{
                    var button = $(`<button type="button" id="btv-button" class="btn btn-warning">Agregar a booyah.tv</button>`);

                    button.click(function () {
                        var newEmote = {
                            id: emoteID,
                            name: emoteName,
                            source: 'ffz',
                            width: width,
                            height: height
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
                        $('a.btn-large').parent().append(button);
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