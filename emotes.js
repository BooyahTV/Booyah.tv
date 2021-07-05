const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";

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

var betterTTV = [];
var frankerFaceZ = [];

function replaceEmote(text, regex, url, title) {
	if(regex.test(text)){
		console.log('EMOTE: '+title+' found')	
	}

  return text.replace(
	regex,
	`<img title="${title}" class="moveimage" src="${url}">`
  );
}

function replaceEmotes(text) {
  // BETTER TTV EMOTES

  for (let i = 0; i < betterTTV.length; i++) {
	var bttvRegex = new RegExp("\\b" + betterTTV[i].code + "\\b", "g");
	var bttvURL = `https://cdn.betterttv.net/emote/${betterTTV[i].id}/1x`;

	text = replaceEmote(text, bttvRegex, bttvURL, betterTTV[i].code);
  }

  // BETTER EMOTES EMOTES

  for (let i = 0; i < frankerFaceZ.length; i++) {
	var ffzRegex = new RegExp("\\b" + frankerFaceZ[i].name + "\\b", "g");
	var ffzURL = `https://cdn.frankerfacez.com/emote/${frankerFaceZ[i].id}/1`;
	
	text = replaceEmote(text, ffzRegex, ffzURL, frankerFaceZ[i].name);
  }

  return text;
}

function addEmotes(objective) {

	// reemplace the emote code with his corresponding code

	$(objective)
		.slice(-50)
		.not(":has(img)")
		.each(function () {
			var text = $(this).html();

			text = replaceEmote(text, new RegExp("( |^)" + "&lt;3" + "\\b(?!&lt;3)", "g"), "https://static-cdn.jtvnw.net/emoticons/v1/9/1.0", "<3"); // harth <3
			text = replaceEmote(text,new RegExp("\\b" + "D:" + "( |$)", "g"),"https://cdn.betterttv.net/emote/55028cd2135896936880fdd7/1x","D:"); // D:
			text = replaceEmotes(text); // replace all betterttv and franker face z emotes

			//console.log('[result] ',text)

			$(this).html(text);
		});
}

function watchChatChanges() {
	console.log('[BOOYAH.TV] Watching Chat Changes')

	document.getElementsByClassName("scroll-container")[0].addEventListener("DOMNodeInserted",
		function (e) {
			//console.log(   e.target.childNodes )

			
			for (var j = 0; j < e.target.childNodes.length; j++) {
				var inner = e.target.childNodes[j];
				console.log(   inner )

				var message = inner.childNodes[0].childNodes[0];

				var username = message.childNodes[message.childNodes.length - 1];

				var hash = username.innerText.charCodeAt(0);

				var color = "#ffffff";

				for (let i = 0; i < colors.length; i++) {
					if (hash % i === 0) {
						color = colors[i];
					}
				}

				addEmotes(inner.childNodes[0].childNodes[inner.childNodes[0].childNodes.length - 1]);

				username.style.color = color;

				//console.log(inner)
			}
		},
		false
	);
}

window.onload = function () {
  setTimeout(function () {

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
	
	watchChatChanges();
  }, 4000);
};

