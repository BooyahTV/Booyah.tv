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
	twitchID: 149287198, // 68111739
	booyahID: "63681555",
  },
];

var twitchEmotes = [
	{id:'425618', name: 'LUL'},
	{id:'160404', name: 'TehePelo'},
	{id:'120232', name: 'TriHard'},
	{id:'114836', name: 'Jebaited'},
	{id:'84608', name: 'cmonBruh'},
	{id:'81248', name: 'OSFrog'},
	{id:'58765', name: 'NotLikeThis'},
	{id:'55338', name: 'KappaPride'},
	{id:'28087', name: 'WutFace'},
	{id:'27602', name: 'BuddhaBar'},
	{id:'22639', name: 'BabyRage'},
	{id:'3792', name: 'ANELE'},
	{id:'86', name: 'BibleThump'},
	{id:'69', name: 'BloodTrail'},
	{id:'41', name: 'Kreygasm'},
	{id:'25', name: 'Kappa'},
];

var globalEmotes = [];
var channelEmotes = [];

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
  // TWITCH EMOTES

  for (let i = 0; i < twitchEmotes.length; i++) {
	var twitchRegex = new RegExp("\\b" + twitchEmotes[i].name + "\\b", "g");
	var twitchURL = `https://static-cdn.jtvnw.net/emoticons/v2/${twitchEmotes[i].id}/default/dark/1.0`;

	msg = replaceEmote(msg, twitchRegex, twitchURL, twitchEmotes[i].name);
  }
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
			msg = replaceEmote(msg,new RegExp("\\b" + ":tf:" + "( |$)", "g"),"https://cdn.betterttv.net/emote/54fa8f1401e468494b85b537/1x",":tf:"); // :tf:
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

			globalEmotes = channelEmotes.concat(globalBetterttv)
			channelEmotes = channelEmotes.concat(channelBetterttv.channelEmotes)

			frankerFaceZ = frankerFaceZ.concat(channelFrankerfaceZ.sets[Object.keys(channelFrankerfaceZ.sets)[0]].emoticons);

			console.log("[BOOYAH.TV] betterttv: ", betterTTV);
			console.log("[BOOYAH.TV] frankerFaceZ: ", frankerFaceZ);

		})
		.catch((err) => {
			console.log(err);
		});
	});
}

emotePanelExist = false

function toggleDonos(){
	var donations = document.getElementsByClassName("components-gifter-rank")[0];
					if(donations.style.display =="none") donations.style.display = ""
					else donations.style.display = "none";
}

function addEmotesPanel(){

	var currentURL = window.location.href
	channels.forEach((channel) => {
		if (!currentURL.includes(channel.booyahID)) return;
		console.log("[BOOYAH.TV] Emote panel added");
		emotePanelExist = true

		toggleDonos()

		var emoteButtonHTML = `
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


		var toggleDonoPayload = `
		var donations = document.getElementsByClassName('components-gifter-rank')[0];
		if(donations.style.display =='none'){
			donations.style.display = ''
			document.getElementById('hidebutton').innerHTML = 'Ocultar donaciones';
		}
		else{
			donations.style.display = 'none';
			document.getElementById('hidebutton').innerHTML = 'Ver donaciones';
		}`


		var toggleDonoButtonHTML = `<div><button onclick="${toggleDonoPayload}" id="hidebutton">Ver Donaciones</button></div>`;


		var twitchHTML = ''

		twitchEmotes.forEach(emote => {
			twitchHTML +=
			`<div class="user" style="width:32px!important">
			<span class="components-chatbox-user-menu"
				><div class="message-avatar components-avatar" style="background-color:transparent">
				<div onclick=
				 "var event = new Event('input', { bubbles: true });
				 var textbox = document.getElementsByClassName('components-input-element')[0];
				 textbox.value +='${emote.name} ';
				 textbox.focus();
				 textbox.scrollLeft = textbox.scrollWidth;
				 textbox.dispatchEvent(event);"
				 style=" border-radius: 0%!important" class="components-avatar-image-container" title="${emote.name}">
					<img
					style="background-color:transparent"
					class="components-avatar-image"
					alt="${emote.name}"
					loading="lazy"
					src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0"
					/>
				</div>
				<div class="badge-container"></div>
				</div>
			</div> `
		})


		var bttvHTML = ''

		globalEmotes.forEach(emote => {
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
			`<div class="user" style="width:${emote.width}px;height:${emote.height}px">
			<span style="width:${emote.width}px;height:${emote.height}px" class="components-chatbox-user-menu"
				><div class="message-avatar components-avatar" style="background-color:transparent">
				<div  style="width:${emote.width}px;height:${emote.height}px;border-radius: 0%!important" onclick="  document.getElementsByTagName('textarea')[0].value  =  document.getElementsByTagName('textarea')[0].value  + '${emote.name} '" class="components-avatar-image-container" title="${emote.name}">
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

		var channelHTML = ''

		channelEmotes.forEach(emote => {
			channelHTML +=
			`<div class="user" style="width:32px!important">
			<span class="components-chatbox-user-menu"
				><div class="message-avatar components-avatar" style="background-color:transparent">
				<div onclick="  document.getElementsByTagName('textarea')[0].value  =  document.getElementsByTagName('textarea')[0].value  + '${emote.code} '" style=" border-radius: 0%!important" class="components-avatar-image-container" title="${emote.name}">
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
			><span class="ccu">${betterTTV.length+1 + frankerFaceZ.length + 1 + twitchEmotes.length + 1 } emotes disponibles</span>
			</div>
			<div class="user-list-wrapper" data-infinite-scrollable="true">
			<div class="components-infinite-view has-data" style="text-align: center;">
				<div>
				<div class="title" style="padding: 12px 12px!important;"><div id="twitchicon"></div><span class="titletxt">Emoticonos de Twitch</span></div>
				${twitchHTML}
				<div class="title" style="padding: 12px 12px!important;"><div id="bttvicon"></div><span class="titletxt">BetterTTV</span></div>
				${bttvHTML}
				<div class="title" style="padding: 12px 12px!important;"><div id="ffzicon"></div><span class="titletxt">Emoticonos del canal</span></div>
				${channelHTML}
				${ffzHTML}
				</div>
			</div>
			</div>
		</div>`

		$('.components-profile-card-right').first().append(toggleDonoButtonHTML);

		$('.btns-bar-chat').first().append(emoteButtonHTML);
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
