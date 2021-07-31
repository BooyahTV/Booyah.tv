const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";


// twitch id grabed in https://api.twitch.tv/kraken/users?login={username} -h Accept = application/vnd.twitchtv.v5+json, Client-ID = cclk5hafv1i7lksfauerry4w7ythu2

var channel;
var donations;

const channels = [
  {
    //puvloo
    twitchID: 474990645,
    booyahID: 62813927,
	chatroomID: 62474863,
    bttv: false,
    ffz: false,
    subsEmotes: [
      { name: "puvlooPOG", id: "305388833" },
      { name: "puvlooFRUTA", id: "304379794" },
      { name: "puvlooCOMBO1", id: "304379754" },
      { name: "puvlooROSAS", id: "304379852" },
      { name: "puvlooCORAZON", id: "304379724" },
      { name: "puvlooCHI", id: "304379655" },
      { name: "puvlooDINERO", id: "304379268" },
      { name: "puvlooBATMAN", id: "304369130" },
      { name: "puvlooBEBESAD", id: "304368803" },
      { name: "puvlooOjo", id: "303233509" },
      { name: "puvlooSLEEP", id: "302293141" },
      { name: "puvlooWhat", id: "302189921" },
      { name: "puvlooMonkey", id: "305612040" },
      { name: "puvlooAsco", id: "306362105" },
      { name: "puvlooAJJA", id: "306362177" },
      { name: "puvlooZADDY", id: "306362216" },
      { name: "puvlooMrLimpio", id: "306362342" },
      { name: "puvlooPreocupado", id: "306362344" },
    ],
  },
  {
    //donsebastian
    twitchID: 38108090,
    booyahID: "donsebastian",
	chatroomID: 13037025,
    bttv: true,
    ffz: true,
    panels: [
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-0"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/DonSebastian_M"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-b9deeb77-e4d7-45fb-9fd3-c710f564ca6f" alt="Contenido del panel"></a></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-1"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/donsebastian_m/"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-fac9000f-2e62-46e9-9609-6bb0a4ba13c7" alt="Contenido del panel"></a></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/xHebHaHCHL"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-fe9a2dbe-147a-4b21-9ad3-b60bfcf712de" alt="Contenido del panel"></a></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-3"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://steamcommunity.com/tradeoffer/new/?partner=41366819&amp;token=pWEPdp5z"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-57bd901c-8318-4bef-a549-be772eb16c27" alt="Contenido del panel"></a></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://streamlabs.com/donsebastianlive"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-72c73c1e-3fca-40ba-a79f-39d89a446ea8" alt="Contenido del panel"></a><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p>Si quieres puedes donar, es totalmente opcional y solo tendran mi agradecimiento eterno &lt;3. Esto ayuda a mejorar el stream.</p></div></div></div></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-6"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-7cfc6f5d-2297-4b0f-bde1-68d37257c629" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p>De Rancagua, Chile, streams casi todos los dias. Reacciones, jugar y politica.</p></div></div></div></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-5"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="http://www.flow.cl/btn.php?token=1ljjapn"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-20c471a6-9349-45c6-99b9-8c2735d3f8ad" alt="Contenido del panel"></a><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p>Si quieres donar en moneda local lo puedes hacer por Pagos WebPay, tarjetas de casas comerciales y pagos en comercios habilitados.</p></div></div></div></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-7"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-b9ee181a-a081-4ceb-8e6b-3ef97c0aea55" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p>•Procesador: Intel i5 10400.</p><p>•RAM: 16GB, DDR4, 2666 MHz.</p><p>•Video: Nvidia Asus OC RTX 2060 6GB.</p><p>•Motherboard: Asus Tuf Gaming B460M-Plus.</p><p>•SSD1: Western Digital blue NVME 1TB.</p><p>•SSD2: Crucial BX500 480 GB.</p><p>•HDD: Western Digital Blue 1TB.</p><p>•Mouse: Logitech G302.</p><p>•Teclado: Logitech G710+.</p><p>•Audifonos: Sennheiser HD 400S.</p><p>•WebCam: Logitech C920 HD Pro.</p><p>•Microfono: BM800 + Samson S • Phantom</p></div></div></div></div>`,
      },
      {
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-8"><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://discord.io/donsebastian"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-38108090-image-3809013e-289f-495d-a694-ecf0beb3f27d" alt="Contenido del panel"></a><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p>¡Se parte de la comunidad! Aunque no seas sub, compartimos bellos memes y momentos profundos</p></div></div></div></div>`,
      },
    ],
  },
  {
    // suwie
    twitchID: 191996164,
    booyahID: 71614581,
	chatroomID: 71191348,
    bttv: true,
    ffz: true,
  },
  {
    // cristianghost
    twitchID: 149287198,
    booyahID: 71484262,
    chatroomID: 71061287,
    bttv: true,
    ffz: true,
    subsBadges: [
      "5eb60657-af78-4a2b-97f5-eda2d4cf47e6", // 1 mes
    ],
    subsEmotes: [
      { name: "cristianSerotonina", id: "303892010" },
      { name: "cristianNormie", id: "303891994" },
      { name: "cristianPicardia", id: "303891853" },
      { name: "cristianPog", id: "303891704" },
      { name: "cristianL", id: "303511499" },
      { name: "cristianAYAYA", id: "303307414" },
      { name: "cristianEpico", id: "302211115" },
      { name: "cristianBAN", id: "301078636" },
      { name: "cristianSad", id: "301077023" },
      { name: "cristianUWU", id: "301076947" },
      { name: "cristianCursed", id: "301076882" },
      { name: "cristianM", id: "1933721" },
      { name: "cristianLUL", id: "1933714" },
      { name: "cristianPelao", id: "1733212" },
      { name: "cristianPou", id: "1494247" },
      { name: "cristianChupAYAYA", id: "1178616" },
      { name: "cristianPecky", id: "306756023" },
      { name: "cristianWaton", id: "306756092" },
      { name: "cristianAweonaso", id: "306756484" },
    ],

    panels: [
      {
        // cuenta rut dono
        type: "image",
        img: "https://panels-images.twitch.tv/panel-149287198-image-05234ad8-c503-467c-bad5-9a963dd717d6",
        url: "https://swd.cl/twitch/cristianghost/",
      },
      {
        // paypal dono
        type: "image",
        img: "https://panels-images.twitch.tv/panel-149287198-image-771b0c21-31cc-4213-8340-8d7a4a016539",
        url: "https://streamelements.com/cristianghost/tip",
      },
      {
        // discord
        type: "image",
        img: "https://panels-images.twitch.tv/panel-149287198-image-69a26a8d-aec9-409f-add8-6df53d73edd1",
        url: "http://discord.gg/aweonasogang",
      },
      {
        // instagram
        type: "image",
        img: "https://panels-images.twitch.tv/panel-149287198-image-b9bbf71c-1121-4e8a-92a5-47843aacd384",
        url: "https://www.instagram.com/cristianghostnzalez/",
      },
      {
        // twiter
        type: "image",
        img: "https://panels-images.twitch.tv/panel-149287198-image-810ac60c-6e19-4e2c-b0b3-e21a01db912c",
        url: "https://twitter.com/CristianGhost_",
      },
      {
        // canal secundario
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-6"><h3 data-test-selector="title_test_selector" class="sc-AxirZ ScTitleText-sc-1gsen4-0 hUUiQw tw-title">Canal secundario!</h3><a data-test-selector="link_url_test_selector" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UCjk1aSSyCg5KOmzoIn34r1Q"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-149287198-image-db91318f-0990-4521-a39d-5310b095eed3" alt="Contenido del panel"></a></div>`,
      },
      {
        // contacto
        type: "html",
        html: `<div class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-9"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-149287198-image-92d1e342-5384-496e-81a9-f669cdbf042d" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxjAm ScTypeset-xkayed-0 AhGCy tw-typeset"><div class="panel-description"><p><em>cristianghost@rift-agency.com</em>, <strong>intentaré responder lo más rápido posible!</strong></p></div></div></div></div>`,
      },

      {
        // spects
        type: "html",
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
					`,
      },
    ],
  },
  {
    // moai
    twitchID: 68111739, // 149287198
    booyahID: 63681555,
    chatroomID: 63325494,
    bttv: true,
    ffz: true,
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

// forsenE, etc
var globalChannelEmotes = [
	{id:'521050', name: 'forsenE'},
	{id:'116051', name: 'forsen1'},
	{id:'116052', name: 'forsen2'},
	{id:'emotesv2_2f9a36844b054423833c817b5f8d4225', name: 'forsenPls'},
	{url:'https://zzls.xyz/booyah.tv/1x.png', name: 'YEAHBUTBOOYAHTV'}
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

var bannedWords = [
	'nigga',
	'niga',
	'nigger',
	'niger',
	'maricon',
	'violar',
	'viole',
	'violé',
]

// find and replace all instances of an emote given the message and a regex rule.

function replaceEmote(msg, regex, url, title) {

  return msg.replace(
	regex,
	`<img title="${title}" class='emote' src='${url}'>`
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
  // GLOBAL CHANNEL EMOTES

  for (let i = 0; i < globalChannelEmotes.length; i++) {
	var globalChannelEmotesRegex = new RegExp("\\b" + globalChannelEmotes[i].name + "\\b", "g");
	var globalChannelEmotesURL = ''
	if (globalChannelEmotes[i].id){
		globalChannelEmotesURL = `https://static-cdn.jtvnw.net/emoticons/v2/${globalChannelEmotes[i].id}/default/dark/1.0`;
	}else{
		globalChannelEmotesURL	= globalChannelEmotes[i].url
	}
	msg = replaceEmote(msg, globalChannelEmotesRegex, globalChannelEmotesURL, globalChannelEmotes[i].name);
  }
  

  // SUB EMOTES

  if (channel && channel.subsEmotes) {
	for (let i = 0; i < channel.subsEmotes.length; i++) {
		var subRegex = new RegExp("\\b" + channel.subsEmotes[i].name + "\\b", "g");
		var subURL = `https://static-cdn.jtvnw.net/emoticons/v2/${channel.subsEmotes[i].id}/default/dark/1.0`;

		msg = replaceEmote(msg, subRegex, subURL, channel.subsEmotes[i].name);
	}
  }

  // BETTER TTV EMOTES
  if(channel && channel.bttv){

	for (let i = 0; i < betterTTV.length; i++) {
		var bttvRegex = new RegExp("\\b" + betterTTV[i].code + "\\b", "g");
		var bttvURL = `https://cdn.betterttv.net/emote/${betterTTV[i].id}/1x`;
		
		msg = replaceEmote(msg, bttvRegex, bttvURL, betterTTV[i].code);
	}
	}

  // FRANKER FACE Z EMOTES
  if(channel && channel.ffz){

	for (let i = 0; i < frankerFaceZ.length; i++) {
		var ffzRegex = new RegExp("\\b" + frankerFaceZ[i].name + "\\b", "g");
		var ffzURL = `https://cdn.frankerfacez.com/emote/${frankerFaceZ[i].id}/1`;

		msg = replaceEmote(msg, ffzRegex, ffzURL, frankerFaceZ[i].name);
	}
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

			// banned words
			bannedWords.forEach(word => {
				msg = msg.replace(new RegExp("\\b" + word + "( |$)", "gi"),"****")
			});

			//console.log('[result] ',msg)

			$(this).html(msg);
		});
}

function changeChatOnChange(e){

	for (var j = 0; j < e.target.childNodes.length; j++) {
		var components = e.target.childNodes[j];

		// change the username color
		var usernameContainer = components.childNodes[0].childNodes[0];

		if(components.childNodes[0].childNodes[0].childNodes[0].className == 'message-badge'){
			components.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1'
		}

		//	message-badge

		var username = usernameContainer.childNodes[usernameContainer.childNodes.length - 1];

		var hash = username.innerText.charCodeAt(0);

		var color = "#ffffff";

		for (let i = 0; i < colors.length; i++) {
			if (hash % i === 0) {
				color = colors[i];
			}
		}

		username.style.color = color;

		
		/*donations.forEach(user => {
			if (user.username == username.innerText){
				var badge = document.createElement("img");
				badge.classList.add("donoBadge");
				badgeUrl = ''

				if(user.tiped > 0 && user.tiped < 5){
					badgeUrl = channel.subsBadges[0]
				}else if(user.tiped > 5 && user.tiped < 10){
					badgeUrl = channel.subsBadges[1]
				}
				badge.src = `https://static-cdn.jtvnw.net/badges/v1/${badgeUrl}/1`
				
				components.childNodes[0].childNodes[0].childNodes[0].prepend(badge)
			}
		})*/
		

		// change the message content with its emotes

		var messageContent = components.childNodes[0].childNodes

		// ban words

		bannedWords

		addEmotes(messageContent[messageContent.length - 1]);

	}
}

function watchChatChanges() {
	console.log('[BOOYAH.TV] Watching Chat Changes')

	document.getElementsByClassName("scroll-container")[0].removeEventListener('DOMNodeInserted', changeChatOnChange, true);

	document.getElementsByClassName("scroll-container")[0].addEventListener("DOMNodeInserted",changeChatOnChange,true);
}


function loadAPIs(){

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


			/*fetch('http://localhost:3000/tips/'+channel.twitchID)
			.then(response => response.json())
			.then(data => {
				console.log('[BOOYAH.TV] Donations')
				console.log(data)
				donations = data

				var usernameexist = setInterval(function() {
					if ($('.header-profile-panel').first().length) {
						console.log("[BOOYAH.TV] inserting money left to next badge");
			
						clearInterval(usernameexist)
						
						data.forEach(user => {
							console.log('check user',user.username,  document.querySelector('.header-profile-panel .user-name').innerText)
							if ((user.username) ==  document.querySelector('.header-profile-panel .user-name').innerText){

								  $('.header-profile-panel').first().append(`<div class="tipsbadge" title="aa">Te faltan <b>$${user.leftUSD} USD / ${user.leftCLP} CLP</b> para desbloquear el siguiente emblema. [${user.current}]</div>`);
		
							}
						})
			
					}
				}, 500);


			});*/

		})
		.catch((err) => {
			console.log(err);
		});
	});
}


// donations payload

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

// fold emote list payload

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

function sendEmotePayload(emoteName){

  return `
  if(document.getElementsByTagName('textarea')[0].value.length + ${emoteName.length + 1} <= 140) {
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
  }

`
}


function createEmoteHTML(name, url,width=null,height=null){
  var size = width ? `style="border-radius: 0%!important;width:${width}px!important;height:${height}px!important"`: `style="border-radius: 0%!important;width:auto!important"`

  return `<div class="user emote" ${size}>
  <span class="components-chatbox-user-menu"  ${size} 
    ><div style="background-color:transparent">
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

var script = document.createElement('script');
script.textContent = foldPayload;
(document.head||document.documentElement).appendChild(script);
script.remove();

function checkifoffline(){
	if($('.viewer-count span').length){

		if ($('.viewer-count span')[0].innerText == "0"){
			$('.chatroom-head')[0].innerHTML = `El Chat Offline <img title="TriHard" class="emote" src="https://static-cdn.jtvnw.net/emoticons/v2/120232/default/dark/1.0">`
		}else{
			$('.chatroom-head')[0].innerHTML = `El Chat`
		}
	}
}

function insertDOM(){
	console.log("[BOOYAH.TV] Emote panel added");

	setInterval(function(){ checkifoffline()},5000)
	checkifoffline()

	// on send emote
	if ($('.send-btn').length){

		document.querySelector('.send-btn').addEventListener("click", function() {
			var emoteList = document.getElementById('emoteList')
			
			emoteList.style.display = 'none';

			saveMessage()
		});
	}

	if ($('.toggle-btn').length){

		document.querySelector('.toggle-btn').addEventListener("click", function() {
			var emoteList = document.getElementById('emoteList')

			emoteList.style.display = 'none';
		});
	}

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
							document.getElementsByClassName('components-chat-menu-emoji')[0].style.display = '';

						}
						else {
							document.getElementById('emoteList').style.display = 'inline-flex';
							document.getElementsByClassName('components-chat-menu-emoji')[0].style.display = 'none';
							
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
		
		if (channel && channel.subsEmotes){
			channel.subsEmotes.forEach(emote => {
				subHTML += createEmoteHTML(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
			})
		}
		if(channel && channel.bttv){
			globalEmotes.forEach(emote => {
				bttvHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
			})
		}

		if(channel && channel.ffz){
			frankerFaceZ.forEach(emote => {
				ffzHTML += createEmoteHTML(emote.name, `https://cdn.frankerfacez.com/emote/${emote.id}/1`, emote.width, emote.height)
			})
		}
		

		if(channel.bttv && channelEmotes && typeof channelEmotes[0] != 'undefined' ){
			console.log(channelEmotes)
			channelEmotes.forEach(emote => {
				channelHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
			})
		}

		var emoteCount = betterTTV.length+1 + frankerFaceZ.length + 1 + twitchEmotes.length + 1

		var emotesHTML =
			`<div class="
			components-popover-container components-chat-menu-users-popover
			theme-dark"
			id="emoteList" style="min-height: 300px;">
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
				${currentChannel.bttv ? `<div class="title emoteCategory" onclick="fold(this, 'bttv')"><div id="bttvicon"></div><span>BetterTTV</span><span class="fold">V</span></div>`: ''}
  				<div id="bttv"> ${bttvHTML} </div>
  				${channel.bttv && channelEmotes && typeof channelEmotes[0] != 'undefined' ? `<div class="title emoteCategory" onclick="fold(this, 'channelEmotes')"><div id="ffzicon"></div><span>Emoticonos del canal</span><span class="fold">V</span></div>
  				<div id="channelEmotes">`: ''} ${channelHTML}
  				${ffzHTML} </div>
  				</div>
  			</div>
			</div>
		</div>`
	
		// add emote panel

		if (document.body.contains(document.getElementById("emoteList"))){
			document.getElementById("emoteList").remove();
		};

		$('.components-chat-menu-users').first().append(emotesHTML);

	//	document.getElementById("channelIcon").style.backgroundImage = `url(${document.querySelector('.channel-top-bar .components-avatar-image').src}`

	});

	

	

}

function insertVOD() {
	const segments = new URL(currentURL).pathname.split("/");
	const VODID = segments.pop() || segments.pop(); // Handle potential trailing slash

	let url = `https://booyah.live/api/v3/playbacks/${VODID}`;

	console.log(VODID, url);

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
		console.log(data);
		var resolution = data.playback.endpoint_list[0].resolution; // 1080
		var downloadurl = data.playback.endpoint_list[0].download_url;

		var downloadbtn = `
		<a id="downloadVOD" title="Desacargar VOD en ${resolution}p" target="_blank" download="${data.playback.name}.mp4" href="${downloadurl}" class="downloadvod components-button components-button-size-small components-button-type-outlined-dark desktop components-button-inline components-button-has-icon">
			<span class="button-content">
				<i class="follow-btn-divider"></i>Descargar VOD
			</span>
		</a>
		`;
		if (!$("#downloadVOD").length) {
			$(".video-btns").first().append(downloadbtn);
		}
		});
}

var url = window.location.href

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {
		console.log('====================PAGE CHANGED====================')
        if (url != request.url){
			
			initExtension()
        }
        
        url = request.url
	}
})

chrome.runtime.sendMessage({type: "setUID", uid: localStorage.getItem('loggedUID')});


function initExtension(){
	loadAPIs()
	
	var currentURL = window.location.href

	setTimeout(function () {
		if ($(".video-btns").first().length) {
			if(currentURL.includes('vods')){
				inserVOD()
			}
		}
	}, 3000);

	// emotes ,chat colors, donations button
	var chatExist = setInterval(function() {
		if ($('.scroll-container').first().length) {
			console.log("[BOOYAH.TV] insert on reload");
			
			
			clearInterval(chatExist);
			
			insertDOM()
			
			watchChatChanges()
			
		}
	}, 500);
	
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
			
			
			// Panels DOM
			channels.forEach((currentChannel) => {
				if (!currentURL.includes(currentChannel.booyahID) ) return;
				
				// panels title
				
				if ( currentChannel.panels  ) {
					
					var panelsHTML = ''
					
					currentChannel.panels.forEach(panel => {
						panelsHTML += createPanelHTML(panel)
					})
					
					
					var panels = `<div class="box">
						<div class="views-channel-video-list">
							<div class="list-title">
								<div class="components-tabs align-start size-big theme-tab desktop">
								<span class="tab-label tab-current">Panels</span>
								</div>
							</div>
							<div class="components-infinite-view">
							${panelsHTML}
							</div>
						</div>
					</div>`;
					
					
					
					$('.channel-top-bar').first().append(panelsHTML);
				}
			})
			
		}
	}, 500);
	
	
}

//init estension when the page is first loaded

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initExtension);
  } else {
	initExtension();
  }

var messageLog = []
var messageCursor = 0

/* Creating a function called PosEnd
         in JavaScript to place the cursor 
         at the end */
function moveTextareCursor(textarea) {
	var len = textarea.value.length;
		
	// Mostly for Web Browsers
	if (textarea.setSelectionRange) {
		textarea.focus();
		textarea.setSelectionRange(len, len);
	} else if (textarea.createTextRange) {
		var t = textarea.createTextRange();
		t.collapse(true);
		t.moveEnd('character', len);
		t.moveStart('character', len);
		t.select();
	}
}

function saveMessage(){
	if (messageLog.length > 2){
		messageLog.pop()
	}

	messageLog.unshift(document.getElementsByTagName('textarea')[0].innerHTML);

	messageCursor = 0
	console.log(messageLog)
}

function retriveMessage(){

	if (messageLog.length < 1) return

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

	setNativeValue(textarea, messageLog[messageCursor])

	textarea.dispatchEvent(new Event('input', { bubbles: true }))

	setTimeout(() => {
		moveTextareCursor(textarea)
	}, 10);

	if(messageCursor < messageLog.length -1){
		messageCursor += 1
	}
}

// Let users close emote list with Escape and Enter if is focusing the textarea.
document.addEventListener('keydown', (event) => {
	// dummy element
	var txtArea =  document.getElementsByTagName('textarea')[0]
	
	if ( (event.code === 'Escape' || event.code === 'Enter' || event.code === 'NumpadEnter') && document.activeElement === txtArea) {
		var emoteList = document.getElementById('emoteList')
		

		if(document.body.contains(emoteList)){
			emoteList.style.display = 'none';
			document.getElementsByClassName('components-chat-menu-emoji')[0].style.display = '';
		}
		
	}

	
	if ( (event.code === 'Enter' || event.code === 'NumpadEnter') && document.activeElement === txtArea ) {
		saveMessage()
		
	}
	if ( event.code === 'ArrowUp' && document.activeElement === txtArea ) {
		retriveMessage()
		
	}

});