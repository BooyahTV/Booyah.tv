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
	`<img title="${title}" class="moveimage" src="${url}">`
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

function watchChatChanges() {
	console.log('[BOOYAH.TV] Watching Chat Changes')

	document.getElementsByClassName("scroll-container")[0].addEventListener("DOMNodeInserted",
		function (e) {

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
		},
		false
	);
}

var existCondition = setInterval(function() {
	if ($('.scroll-container').first().length) {


		watchChatChanges()

		clearInterval(existCondition);

	}
}, 100); // check every 100ms

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
init()