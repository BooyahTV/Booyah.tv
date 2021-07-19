const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";

// twitch id grabed in https://api.twitch.tv/kraken/users?login={username} -h Accept = application/vnd.twitchtv.v5+json, Client-ID = cclk5hafv1i7lksfauerry4w7ythu2

var currentChannel;

const channels = [
  {
  	twitchID: 149287198,
  	booyahID: "T",
	  
},
{
	twitchID: 68111739, // 149287198
	booyahID: "63681555",
	subEmotes: [ // for test
		{name: 'cristianSerotonina',id: '303892010'},
		{name: 'cristianNormie',id: '303891994'},
		{name: 'cristianPicardia',id: '303891853'},
		{name: 'cristianPog',id: '303891704'},
		{name: 'cristianL',id: '303511499'},
		{name: 'cristianAYAYA',id: '303307414'},
		{name: 'cristianEpico',id: '302211115'},
		{name: 'cristianBAN',id: '301078636'},
		{name: 'cristianSad',id: '301077023'},
		{name: 'cristianUWU',id: '301076947'},
		{name: 'cristianCursed',id: '301076882'},
		{name: 'cristianM',id: '1933721'},
		{name: 'cristianLUL',id: '1933714'},
		{name: 'cristianPelao',id: '1733212'},
		{name: 'cristianPou',id: '1494247'},
		{name: 'cristianChupAYAYA',id: '1178616'},
		{name: 'cristianPecky',id: '306756023'},
		{name: 'cristianWaton',id: '306756092'},
		{name: 'cristianAweonaso',id: '306756484'}
	],

	panels: [
		{
			img: 'https://panels-images.twitch.tv/panel-149287198-image-05234ad8-c503-467c-bad5-9a963dd717d6',
			url: 'https://swd.cl/twitch/cristianghost/'
		},
		{
			img: 'https://panels-images.twitch.tv/panel-149287198-image-771b0c21-31cc-4213-8340-8d7a4a016539',
			url: 'https://streamelements.com/cristianghost/tip'
		}
	]
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

  
  // SUB EMOTES
  if (currentChannel) {
	for (let i = 0; i < currentChannel.subEmotes.length; i++) {
		var subRegex = new RegExp("\\b" + currentChannel.subEmotes[i].name + "\\b", "g");
		var subURL = `https://static-cdn.jtvnw.net/emoticons/v2/${currentChannel.subEmotes[i].id}/default/dark/1.0`;

		msg = replaceEmote(msg, subRegex, subURL, currentChannel.subEmotes[i].name);
	}
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
			msg = replaceEmote(msg,new RegExp(":tf:", "g"),"https://cdn.betterttv.net/emote/54fa8f1401e468494b85b537/1x",":tf:"); // :tf:
			msg = replaceEmotes(msg); // replace all twitch, sub emotes, betterttv and franker face z emotes

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

function toggleDonos(){
	var donations = document.getElementsByClassName("components-gifter-rank")[0];
	
	if(donations.style.display =="none"){
		donations.style.display = ""
	}
	else{
		donations.style.display = "none";
	} 
}

function sendEmotePayload(emoteName){

  return `
  // https://github.com/facebook/react/issues/10135
  const textarea = document.getElementsByTagName('textarea')[0]
  function setNativeValue(element, value) {
	const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {}
	const prototype = Object.getPrototypeOf(element)
	const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}

	if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
	  prototypeValueSetter.call(element, value)
	} else if (valueSetter) {
	  valueSetter.call(element, value)
	} else {
	  throw new Error('The given element does not have a value setter')
	}
  }
  setNativeValue(textarea, document.getElementsByTagName('textarea')[0].value +'${emoteName} ')
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
`
}


function createEmoteHTML(name, url){
  return `<div class="user" style="width:32px!important">
  <span class="components-chatbox-user-menu"
    ><div class="message-avatar components-avatar" style="background-color:transparent">
    <div onclick="${sendEmotePayload(name)}"
     style=" border-radius: 0%!important" class="components-avatar-image-container" title="${name}">
      <img
      style="background-color:transparent"
      class="components-avatar-image"
      alt="${name}"
      loading="lazy"
      src="${url}"
      />
    </div>
    <div class="badge-container"></div>
    </div>
  </div> `
}

function createPanelHTML(panel){
	return `<div
	class="sc-AxjAm dGeTii default-panel"
	data-test-selector="channel_panel_test_selector"
	data-a-target="panel-1"
  >
	<a
	  data-test-selector="link_url_test_selector"
	  class="ScCoreLink-udwpw5-0 FXIKh tw-link"
	  rel="noopener noreferrer"
	  target="_blank"
	  href="${panel.url}"
	  ><img
		data-test-selector="image_test_selector"
		src="${panel.img}"
		alt="Contenido del panel"
	/></a>
  </div>
  
  `
}


function addEmotesPanel(){

	// delates the panels
	var panels = document.getElementsByClassName('default-panel');

	while (panels[0]) {
		panels[0].parentNode.removeChild(panels[0]);
	}

	// Donations

	toggleDonos()

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


	var toggleDonoButtonHTML = `<div id="donobutton"><button onclick="${toggleDonoPayload}" id="hidebutton">Ver Donaciones</button></div>`;
	
	if (!document.body.contains(document.getElementById("donobutton"))){
		$('.components-profile-card-right').first().append(toggleDonoButtonHTML);
	};

	var currentURL = window.location.href

	channels.forEach((channel) => {
		if (!currentURL.includes(channel.booyahID)) return;
		console.log("[BOOYAH.TV] Emote panel added");

		currentChannel = channel

		// Emote List

		var emoteButtonHTML = `
		<div id="emoteButton" class="components-chat-menu-emotes theme-dark">
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

		if (!document.body.contains(document.getElementById("emoteButton"))){
			$('.btns-bar-chat').first().append(emoteButtonHTML);
		};

		// Emote list DOM

		var twitchHTML = ''
		var subHTML = ''
		var bttvHTML = ''
		var ffzHTML = ''
		var channelHTML = ''

		twitchEmotes.forEach(emote => {
			twitchHTML += createEmoteHTML(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
		})

		if (currentChannel.subEmotes){
			currentChannel.subEmotes.forEach(emote => {
				subHTML += createEmoteHTML(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
			})
		}
		globalEmotes.forEach(emote => {
			bttvHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
		})

		frankerFaceZ.forEach(emote => {
			ffzHTML += createEmoteHTML(emote.name, `https://cdn.frankerfacez.com/emote/${emote.id}/1`)
		})

		channelEmotes.forEach(emote => {
			channelHTML += createEmoteHTML(emote.name, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
		})

		var emoteCount = betterTTV.length+1 + frankerFaceZ.length + 1 + twitchEmotes.length + 1

		var emotesHTML =
			`<div class="
			components-popover-container components-chat-menu-users-popover
			theme-dark"
			id="emoteList">
			<div class="title">
			<span>Emotes</span
			><span class="ccu">${ emoteCount } emotes disponibles</span>
			</div>
			<div class="user-list-wrapper" data-infinite-scrollable="true">
			<div class="components-infinite-view has-data" style="text-align: center;">
				<div>
  				<div class="title emoteCategory"><div id="twitchicon"></div><span>Emoticonos de Twitch</span></div>
  				${twitchHTML}
				${ currentChannel.subEmotes ? '<div class="title emoteCategory"><div id="twitchicon"></div><span>Emotes de subs</span></div>' : ''}
  				${subHTML}
  				<div class="title emoteCategory"><div id="bttvicon"></div><span>BetterTTV</span></div>
  				${bttvHTML}
  				<div class="title emoteCategory"><div id="ffzicon"></div><span>Emoticonos del canal</span></div>
  				${channelHTML}
  				${ffzHTML}
  				</div>
  			</div>
			</div>
		</div>`


		if (document.body.contains(document.getElementById("emoteList"))){
			document.getElementById("emoteList").remove();
		};

		$('.components-chat-menu-users').first().append(emotesHTML);

		// Panels DOM

		if (currentChannel.panels){
			var panelsHTML = ''

			currentChannel.panels.forEach(panel => {
				panelsHTML += createPanelHTML(panel)
			})



			$('.gift-container').first().append(panelsHTML);
		}



	});
}

init()

var url = ''



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {
		console.log('====================PAGE CHANGED====================')

		if (url != request.url){
			var chatExist = setInterval(function() {
				if ($('.scroll-container').first().length) {
					console.log("[BOOYAH.TV] insert on reload");


					clearInterval(chatExist);

					addEmotesPanel()
					
					watchChatChanges()

				}
			}, 3000);
		}
		url = request.url
	}
  })

 // Let users close emote list with Escape.
document.addEventListener('keydown', (event) => {
	console.log('keydown event\n\n' + 'key: ' + event.key);

	if ( event.code === 'Escape' ) {
		var emoteList = document.getElementById('emoteList')

		emoteList.style.display = 'none';
	}
});