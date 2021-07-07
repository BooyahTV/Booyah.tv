const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";

// twitch id grabed in https://api.twitch.tv/kraken/users?login={username} -h Accept = application/vnd.twitchtv.v5+json, Client-ID = cclk5hafv1i7lksfauerry4w7ythu2

const channels = [
  {
	twitchID: 149287198,
	booyahID: "T",
  },
  {
	twitchID: 68111739,
	booyahID: "63681555",
  },
];

var betterTTV = [];
var frankerFaceZ = [];

// Twitch.tv username colors

const colors = [
  "#002FA7",
  "#8a2be2",
  "#5f9ea0",
  "#E4717A",
  "#1e90ff",
  "#b22222",
  "#00FF00",
  "#ff69b4",
  "#ff4500",
  "#ff0000",
];

// find and replace all instances of an emote given the message and a regex rule.

function replaceEmote(msg, regex, url, title) {
  return msg.replace(
	regex,
	`<img title="${title}" class='moveimage' src='${url}'>`
  );
}

// remplaces all bettertTTV and frankerFaceZ emotes in a message.

function replaceEmotes(msg) {
  // BETTER TTV EMOTES

  for (let i = 0; i < betterTTV.length; i++) {
	var bttvRegex = new RegExp("\\b" + betterTTV[i].code + "\\b", "g");
	var bttvURL = `https://cdn.betterttv.net/emote/${betterTTV[i].id}/1x`;

	msg = replaceEmote(msg, bttvRegex, bttvURL, betterTTV[i].code);
  }

  // BETTER EMOTES EMOTES

  for (let i = 0; i < frankerFaceZ.length; i++) {
	var ffzRegex = new RegExp("\\b" + frankerFaceZ[i].name + "\\b", "g");
	var ffzURL = `https://cdn.frankerfacez.com/emote/${frankerFaceZ[i].id}/1`;
	
	msg = replaceEmote(msg, ffzRegex, ffzURL, frankerFaceZ[i].name);
  }

  return msg;
}
// remplace all emotes in message (bttv, ffz, D:,etc) with an image

function addEmotes(objective) {

	// reemplace the emote code with his corresponding code

	$(objective)
		.slice(-50)
		.not(":has(img)")
		.each(function () {
			var msg = $(this).html();

			msg = replaceEmote(msg, new RegExp("( |^)" + "&lt;3" + "\\b(?!&lt;3)", "g"), "https://static-cdn.jtvnw.net/emoticons/v1/9/1.0", "<3"); // harth <3
			msg = replaceEmote(msg,new RegExp("\\b" + "D:" + "( |$)", "g"),"https://cdn.betterttv.net/emote/55028cd2135896936880fdd7/1x","D:"); // D:
			msg = replaceEmotes(msg); // replace all betterttv and franker face z emotes

			//console.log('[result] ',msg)

			$(this).html(msg);
		});
}

function changeChatOnChange(e){

	for (var j = 0; j < e.target.childNodes.length; j++) {
		var components = e.target.childNodes[j];

		// change the username color
		var usernameContainer = components.childNodes[0].childNodes[0];

		var username = usernameContainer.childNodes[usernameContainer.childNodes.length - 1];

		var hash = username.innerText.charCodeAt(0);

		var color = "#ffffff";

		for (let i = 0; i < colors.length; i++) {
			if (hash % i === 0) {
				color = colors[i];
			}
		}
		
		username.style.color = color;

		// change the message content with its emotes

		var messageContent = components.childNodes[0].childNodes

		addEmotes(messageContent[messageContent.length - 1]);

	}
}

function watchChatChanges() {
	console.log('[BOOYAH.TV] Watching Chat Changes')

	document.getElementsByClassName("scroll-container")[0].removeEventListener('DOMNodeInserted', changeChatOnChange, true);

	document.getElementsByClassName("scroll-container")[0].addEventListener("DOMNodeInserted",changeChatOnChange,true);
}


function init(){

	var currentURL = window.location.href
	
	console.log("[BOOYAH.TV] CURRENT URL: "+currentURL)
	
	channels.forEach((channel) => {
		if (!currentURL.includes(channel.booyahID)) return;
	
		console.log( "[BOOYAH.TV] You are in " + channel.booyahID + " Channel.");
	
		console.log("[BOOYAH.TV] fetching betterttv for channel: ", betterTTVChannelBaseURL + channel.twitchID );
		console.log("[BOOYAH.TV] fetching frankerFaceZ for channel: ",frankerfaceZChannelBaseURL + channel.twitchID );
		
		Promise.all([
			fetch(globalBetterttvURL).then((value) => value.json()),
			fetch(betterTTVChannelBaseURL + channel.twitchID).then((value) => value.json() ),
			fetch(frankerfaceZChannelBaseURL + channel.twitchID).then((value) => value.json() ),
		])
		.then(([globalBetterttv, channelBetterttv, channelFrankerfaceZ]) => {
			betterTTV = betterTTV.concat(globalBetterttv);
	
			betterTTV = betterTTV.concat(channelBetterttv.channelEmotes);
			betterTTV = betterTTV.concat(channelBetterttv.sharedEmotes);
	
			frankerFaceZ = frankerFaceZ.concat(channelFrankerfaceZ.sets[Object.keys(channelFrankerfaceZ.sets)[0]].emoticons);
	
			console.log("[BOOYAH.TV] betterttv: ", betterTTV);
			console.log("[BOOYAH.TV] frankerFaceZ: ", frankerFaceZ);
			
		})
		.catch((err) => {
			console.log(err);
		});
	});
}
//todo: PONER EMOTES DE TWITCH.TV
emotePanelExist = false

function addEmotesPanel(){
	
	var currentURL = window.location.href
	channels.forEach((channel) => {
		if (!currentURL.includes(channel.booyahID)) return;
		console.log("[BOOYAH.TV] Emote panel added");
		emotePanelExist = true

		var btnHTML = `
		<div class="components-chat-menu-emotes theme-dark">
			<div class="toggle-btn" title="Emotes">
				<div class="components-icon components-icon-emotes">
					<div id="emotes-icon" onclick="
						if(document.getElementById('emoteList').style.display == 'inline-flex') {
							document.getElementById('emoteList').style.display = 'none';
						}
						else {
							document.getElementById('emoteList').style.display = 'inline-flex';
						}">
					</div>
				</div>
			</div>
		</div>`;

		
		var bttvHTML = ''

		betterTTV.forEach(emote => {
			bttvHTML += 
			`<div class="user" style="width:32px!important"> 
			<span class="components-chatbox-user-menu" 
				><div class="message-avatar components-avatar" style="background-color:transparent"> 
				<div onclick=
				 "var event = new Event('input', { bubbles: true });
				 var textbox = document.getElementsByClassName('components-input-element')[0]; 
				 textbox.value +='${emote.code} ';
				 textbox.focus();
				 textbox.scrollLeft = textbox.scrollWidth;
				 textbox.dispatchEvent(event);"
				 style=" border-radius: 0%!important" class="components-avatar-image-container" title="${emote.code}"> 
					<img 
					style="background-color:transparent"
					class="components-avatar-image" 
					alt="${emote.code}" 
					loading="lazy" 
					src="https://cdn.betterttv.net/emote/${emote.id}/1x" 
					/> 
				</div> 
				<div class="badge-container"></div> 
				</div> 
			</div> `
		})

		var ffzHTML = ''

		frankerFaceZ.forEach(emote => {
			ffzHTML += 
			`<div class="user" style="width:32px!important"> 
			<span class="components-chatbox-user-menu" 
				><div class="message-avatar components-avatar" style="background-color:transparent"> 
				<div onclick="  document.getElementsByTagName('textarea')[0].value  =  document.getElementsByTagName('textarea')[0].value  + '${emote.name} '" style=" border-radius: 0%!important" class="components-avatar-image-container" title="${emote.name}"> 
					<img 
					style="background-color:transparent"
					class="components-avatar-image" 
					alt="${emote.name}" 
					loading="lazy" 
					src="https://cdn.frankerfacez.com/emote/${emote.id}/1" 
					/> 
				</div> 
				<div class="badge-container"></div> 
				</div> 
			</div> `
		})

		var emotesHTML = 
			`<div class="  
			components-popover-container components-chat-menu-users-popover 
			theme-dark 
			" 
			id="emoteList"
			style=" 
			position: fixed; 
			top: 0px; 
			left: 0px; 
			transform: translate(0px, -300px); 
			overflow: hidden; 
			width: 100%; 
			max-height: 300px; 
			display:none;
			" 
		> 
			<div class="title"> 
			<span>Emotes</span 
			><span class="ccu">${betterTTV.length+1 + frankerFaceZ.length + 1 } emotes disponibles</span> 
			</div> 
			<div class="user-list-wrapper" data-infinite-scrollable="true"> 
			<div class="components-infinite-view has-data"> 
				<div> 
				<div class="title" style="padding: 12px 12px!important;">BetterTTV</div>
				${bttvHTML}
				<div class="title" style="padding: 12px 12px!important;">FrankerFaceZ</div>
				${ffzHTML}
				</div> 
			</div> 
			</div> 
		</div>`


		$('.btns-bar-chat').first().append(btnHTML);
		$('.components-chat-menu-users').first().append(emotesHTML);
	});
}

init()

var url = ''



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {
		console.log(request.url)
		
		if (url != request.url){
			var chatExist = setInterval(function() {
				if ($('.scroll-container').first().length) {
					console.log("[BOOYAH.TV] insert on reload");
			
					
					clearInterval(chatExist);
					
					watchChatChanges()
					
					setTimeout(function() {
						addEmotesPanel()
					},1000)
				}
			}, 1000);
		}
		url = request.url
	}
  })