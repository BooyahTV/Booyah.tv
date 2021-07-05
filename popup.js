document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("myInput").addEventListener("keyup", myFunction);
	document
		.getElementById("hide_donations")
		.addEventListener("click", alternateDonations);

	const url = "https://kasecami.ddns.net/channels/63681555";

	const target = document.getElementsByClassName("modal-content");

	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			const emotes = json["emotes"];
			emotes.forEach((em) => {
				var new_emote = document.createElement("a");
				elements = `
			<img class="emote" id=${em.emote_name} src='${em.emote_url}'></img>
			`;
				target[0].appendChild(new_emote);
				new_emote.innerHTML = elements;

				new_emote.onclick = function () {
					var el = event.target.id;
					chrome.tabs.query(
						{ active: true, currentWindow: true },
						function (activeTabs) {
							chrome.tabs.executeScript(activeTabs[0].id, {
								code: `
									var event = new Event("input", { bubbles: true });
									var textbox = document.getElementsByClassName("components-input-element")[0]; 
									textbox.value +="${el} ";
									textbox.focus();
									textbox.scrollLeft = textbox.scrollWidth;
									textbox.dispatchEvent(event);
								`,
							});
						}
					);
				};
			});
		});

	chrome.tabs.query(
		{ active: true, currentWindow: true },
		function (activeTabs) {
			var url = activeTabs[0].url;
			//if (url.includes("https://booyah.live/channels/63681555")) return;

			info = document.getElementById("info");
			info.innerText =
				"Tienes que estar en el directo de Suwie en booyah.live para usar estos emotes";

			document.getElementsByClassName("modal-content")[0].style.display =
				"none"; //hide emote menu, user is not on website
		}
	);

	function myFunction() {
		// Declare variables
		var input, filter, em, a, i, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		em = document.getElementsByTagName("a");

		// Loop through all list items, and hide those who don't match the search query
		for (i = 0; i < em.length; i++) {
			a = em[i].getElementsByTagName("img")[0];
			txtValue = a.id;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				em[i].style.display = "";
			} else {
				em[i].style.display = "none";
			}
		}
	}
	function alternateDonations() {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (activeTabs) {
				chrome.tabs.executeScript(activeTabs[0].id, {
					code: `
					var donations = document.getElementsByClassName("components-gifter-rank")[0]; 
					if(donations.style.display =="none") donations.style.display = ""
					else donations.style.display = "none";
					`,
				});
			}
		);
	}
});
