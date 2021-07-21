const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";

// twitch id grabed in https://api.twitch.tv/kraken/users?login={username} -h Accept = application/vnd.twitchtv.v5+json, Client-ID = cclk5hafv1i7lksfauerry4w7ythu2

var channel;

const channels = [
	{ // suwie
		twitchID: 191996164,
		booyahID: 71614581,
		offline: 'https://static-cdn.jtvnw.net/jtv_user_pictures/c33fa0bd-28e3-46f1-93cf-c33041d27517-channel_offline_image-1920x1080.jpeg'
	},
	{ // cristianghost
		twitchID: 149287198,
		booyahID: 71484262,
		chatroomID: 71061287,
		subsEmotes: [ 
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
				type: 'image',
				img: 'https://panels-images.twitch.tv/panel-149287198-image-05234ad8-c503-467c-bad5-9a963dd717d6',
				url: 'https://swd.cl/twitch/cristianghost/'
			},
			{
				type: 'image',
				img: 'https://panels-images.twitch.tv/panel-149287198-image-771b0c21-31cc-4213-8340-8d7a4a016539',
				url: 'https://streamelements.com/cristianghost/tip'
			},
			{
				type: 'image',
				img: 'https://panels-images.twitch.tv/panel-149287198-image-69a26a8d-aec9-409f-add8-6df53d73edd1',
				url: 'http://discord.gg/aweonasogang'
			},
			{
				type: 'html',
				html: `
				<div
					class="sc-AxjAm dGeTii default-panel"
					data-test-selector="channel_panel_test_selector"
					data-a-target="panel-7"
					>
					<img
						data-test-selector="image_test_selector"
						src="https://panels-images.twitch.tv/panel-149287198-image-a27899e7-0c17-41cd-93bd-c7a696788be4"
						alt="Contenido del panel"
					/>
					<div data-test-selector="description_test_selector">
						<div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset">
						<div class="panel-description">
							<ul>
							<li><strong>Tarjeta:</strong> GeForce RTX 3080 Trinity</li>
							<li><strong>Procesador:</strong> i9-10850K</li>
							<li><strong>Ram:</strong> 32 GB</li>
							<li><strong>Placa madre:</strong> Z490 AORUS Pro AX</li>
							<li><strong>Mouse:</strong> Logitech G502 Hero SE</li>
							<li>
								<strong>Teclado:</strong> SKYLOONG SK61 (Gateron Optical Brown)
							</li>
							<li><strong>Micrófono:</strong> Electro-voice RE20</li>
							<li><strong>Interfaz:</strong> GoXLR Mini</li>
							<li><strong>Cámara:</strong> Sony A5100</li>
							<li><strong>Lente:</strong> Sigma 16mm 1.4 DC</li>
							<li><strong>Audìfonos:</strong> Sennheiser 660s</li>
							<li><strong>AMP de Audífonos:</strong> FiiO E10K</li>
							<li><strong>Silla:</strong> Ergohuman (cuero)</li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					`
			}
		],
		offline: 'https://static-cdn.jtvnw.net/jtv_user_pictures/521c25d4-10d4-4d80-9c1a-79bed60e9f4f-channel_offline_image-1920x1080.jpeg'
	},
	{ // moai
		twitchID: 68111739, // 149287198
		booyahID: 63681555,
		offline: 'https://static-cdn.jtvnw.net/jtv_user_pictures/e4b0fa86-491f-441f-a219-daf76914dd69-channel_offline_image-1920x1080.jpeg'

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
  if (channel.subsEmotes) {
	for (let i = 0; i < channel.subsEmotes.length; i++) {
		var subRegex = new RegExp("\\b" + channel.subsEmotes[i].name + "\\b", "g");
		var subURL = `https://static-cdn.jtvnw.net/emoticons/v2/${channel.subsEmotes[i].id}/default/dark/1.0`;

		msg = replaceEmote(msg, subRegex, subURL, channel.subsEmotes[i].name);
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

	channels.forEach((currentChannel) => {
		// check if user is in channel or its chatroom (popup)
		if (!(currentURL.includes(currentChannel.booyahID) || currentURL.includes(currentChannel.chatroomID))) return;

		channel = currentChannel

		console.log( "[BOOYAH.TV] You are in " + currentChannel.booyahID + " Channel.");

		console.log("[BOOYAH.TV] fetching betterttv for channel: ", betterTTVChannelBaseURL + currentChannel.twitchID );
		console.log("[BOOYAH.TV] fetching frankerFaceZ for channel: ",frankerfaceZChannelBaseURL + currentChannel.twitchID );

		Promise.all([
			fetch(globalBetterttvURL).then((value) => value.json()),
			fetch(betterTTVChannelBaseURL + currentChannel.twitchID).then((value) => value.json() ),
			fetch(frankerfaceZChannelBaseURL + currentChannel.twitchID).then((value) => value.json() ),
		])
		.then(([globalBetterttv, channelBetterttv, channelFrankerfaceZ]) => {

			globalEmotes = [];
			channelEmotes = [];
			
			betterTTV = [];
			frankerFaceZ = [];

			betterTTV = betterTTV.concat(globalBetterttv);

			betterTTV = betterTTV.concat(channelBetterttv.channelEmotes);
			betterTTV = betterTTV.concat(channelBetterttv.sharedEmotes);

			globalEmotes = channelEmotes.concat(globalBetterttv)
			channelEmotes = channelEmotes.concat(channelBetterttv.channelEmotes)

			frankerFaceZ = frankerFaceZ.concat(channelFrankerfaceZ.sets[Object.keys(channelFrankerfaceZ.sets)[0]].emoticons);

			console.log("[BOOYAH.TV] betterttv: ", betterTTV);
			console.log("[BOOYAH.TV] frankerFaceZ: ", frankerFaceZ);

			console.log("[BOOYAH.TV] channelEmotes: ", channelEmotes);


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


function createEmoteHTML(name, url,width=null,height=null){
  var size = width ? `style="border-radius: 0%!important;width:${width}px!important;height:${height}px!important`: `style="border-radius: 0%!important;width:auto!important"`

  return `<div class="user" ${size}>
  <span class="components-chatbox-user-menu"  
    ><div class="message-avatar components-avatar" style="background-color:transparent">
    <div onclick="${sendEmotePayload(name)}"
     ${size} class="components-avatar-image-container" title="${name}">
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
	switch (panel.type) {
		case 'html':
			return panel.html
			
			break;
	
		case 'image':
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
		break;
	}
}


// button payloads

var toggleDonoPayload = `
var donations = document.getElementsByClassName('components-gifter-rank')[0];
if(donations.style.display =='none'){
	donations.style.display = ''
	document.querySelector('.views-channel .channel-content .gift-container .balance').style.display = '';
	document.querySelector('.views-channel .channel-content .gift-container .row').style.display = '';

	document.getElementById('hidebutton').innerHTML = 'Ocultar donaciones';
}


else{
	donations.style.display = 'none';
	document.querySelector('.views-channel .channel-content .gift-container .balance').style.display = 'none';
	document.querySelector('.views-channel .channel-content .gift-container .row').style.display = 'none';
	
	document.getElementById('hidebutton').innerHTML = 'Ver donaciones';
}`

// fold emote list

var foldPayload = `function fold(emoteList, list){
	var listElement = document.getElementById(list)
	console.log(emoteList)
	console.log(emoteList.children)
	console.log(emoteList.children[emoteList.children.lenght -1] )
	var foldElement = emoteList.children[2] 
	if(listElement.style.display =='none'){
		listElement.style.display = ''
		foldElement.innerHTML = 'V'

	}else{
		listElement.style.display = 'none'
		foldElement.innerHTML = '<'

	}
}`;

var script = document.createElement('script');
script.textContent = foldPayload;
(document.head||document.documentElement).appendChild(script);
script.remove();

function insertDOM(){
	console.log("[BOOYAH.TV] Emote panel added");

	// Donations

	
	var toggleDonoButtonHTML = `<div id="donobutton"><button onclick="${toggleDonoPayload}" id="hidebutton">Ocultar donaciones</button></div>`;
	
	if (!document.body.contains(document.getElementById("donobutton"))){
		$('.components-profile-card-right').first().append(toggleDonoButtonHTML);
	};

	// on send emote

	document.querySelector('.send-btn').addEventListener("click", function() {
		var emoteList = document.getElementById('emoteList')

		emoteList.style.display = 'none';
	});
	
	var currentURL = window.location.href

	channels.forEach((currentChannel) => {
		if (!currentURL.includes(currentChannel.booyahID) ) return;
		console.log("[BOOYAH.TV] Emote panel added");

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

		if (currentChannel.subsEmotes){
			currentChannel.subsEmotes.forEach(emote => {
				subHTML += createEmoteHTML(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
			})
		}
		globalEmotes.forEach(emote => {
			bttvHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
		})

		frankerFaceZ.forEach(emote => {
			ffzHTML += createEmoteHTML(emote.name, `https://cdn.frankerfacez.com/emote/${emote.id}/1`, emote.width, emote.height)
		})

		channelEmotes.forEach(emote => {
			channelHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
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
  				<div class="title emoteCategory" onclick="fold(this, 'twitch')"><div id="twitchicon"></div><span>Emoticonos de Twitch</span><span class="fold">V</span></div>
  				<div id="twitch">${twitchHTML} </div>
				${currentChannel.subsEmotes ? `<div class="title emoteCategory"  onclick="fold(this, 'subs')"><div id="twitchicon"></div><span>Emotes de subs</span><span class="fold"">V</span></div>` : ''}
				<div id="subs"> ${subHTML} </div>
  				<div class="title emoteCategory" onclick="fold(this, 'bttv')"><div id="bttvicon"></div><span>BetterTTV</span><span class="fold">V</span></div>
  				<div id="bttv"> ${bttvHTML} </div>
  				<div class="title emoteCategory" onclick="fold(this, 'channelEmotes')"><div id="ffzicon"></div><span>Emoticonos del canal</span><span class="fold">V</span></div>
  				<div id="channelEmotes">${channelHTML}
  				${ffzHTML} </div>
  				</div>
  			</div>
			</div>
		</div>`

		
		if (document.body.contains(document.getElementById("emoteList"))){
			document.getElementById("emoteList").remove();
		};

		$('.components-chat-menu-users').first().append(emotesHTML);

	//	document.getElementById("channelIcon").style.backgroundImage = `url(${document.querySelector('.channel-top-bar .components-avatar-image').src}`

	});
}



var url = ''

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {
		console.log('====================PAGE CHANGED====================')
        if (url != request.url){

            initExtension()
        }
        
        url = request.url
	}
})


function initExtension(){
	init()

	var currentURL = window.location.href

	// emotes ,chat colors, donations button
	var chatExist = setInterval(function() {
		if ($('.scroll-container').first().length) {
			console.log("[BOOYAH.TV] insert on reload");

			
			clearInterval(chatExist);

			insertDOM()
			
			watchChatChanges()

		}
	}, 3000);

	// offline

	var offlineExist = setInterval(function() {
		if ($('.views-channel-offline-layer').length) {
			console.log("[BOOYAH.TV] insert offline backround");

			clearInterval(offlineExist);
		
			channels.forEach((currentChannel) => {
				if (!currentURL.includes(currentChannel.booyahID) ) return;

				if (currentChannel.offline) {
			
					document.getElementsByClassName('views-channel-offline-layer')[0].innerHTML = '';
					document.getElementsByClassName('views-channel-offline-layer')[0].style.background = 'url("'+currentChannel.offline+'")'
					document.getElementsByClassName('views-channel-offline-layer')[0].style.backgroundSize = 'cover'
					
				}
			})
		
		}
	}, 3000);

	// panels 

	var panelsExist = setInterval(function() {
		if ($('.gift-container').first().length) {
			console.log("[BOOYAH.TV] insert panels");

			clearInterval(panelsExist);

			// delates the panels
			var panels = document.getElementsByClassName('default-panel');

			while (panels[0]) {
				panels[0].parentNode.removeChild(panels[0]);
			}

			// panels title

			if (!$('#panelsTitle').first().length) {
				$('.gift-container').first().append(`
					<div id="panelsTitle" class="components-tabs align-start size-big theme-tab desktop">
						<span class="tab-label tab-current">Paneles</span>
					</div>
					</br>
				`);
			}

			// Panels DOM
			channels.forEach((currentChannel) => {
				if (!currentURL.includes(currentChannel.booyahID) ) return;

				if (currentChannel.panels){
					var panelsHTML = ''

					currentChannel.panels.forEach(panel => {
						panelsHTML += createPanelHTML(panel)
					})

					$('.gift-container').first().append(panelsHTML);
				}
			})

		}
	}, 3000);
	

}

initExtension()

 // Let users close emote list with Escape.
document.addEventListener('keydown', (event) => {

	if ( event.code === 'Escape' ) {
		var emoteList = document.getElementById('emoteList')

		emoteList.style.display = 'none';
	}
});



