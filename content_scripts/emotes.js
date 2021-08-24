const subsEmotesBaseURL = 'https://api.ivr.fi/twitch/allemotes/'

const globalBetterttvURL = "https://api.betterttv.net/3/cached/emotes/global";

const betterTTVChannelBaseURL = "https://api.betterttv.net/3/cached/users/twitch/";
const frankerfaceZChannelBaseURL = "https://api.frankerfacez.com/v1/room/id/";

const pointsBaseURL = "http://localhost:3000/api/points/"

const twitchClientID = 'k4j3nkws4mwx90yqfa3mlpn0i0udom'

// twitch id grabed at https://api.twitch.tv/kraken/users?login={username} -h Accept = application/vnd.twitchtv.v5+json, Client-ID = cclk5hafv1i7lksfauerry4w7ythu2

var channel;
var donations;

var selfUsername;

const blip = new Audio(chrome.runtime.getURL("sounds/blip.wav"));

const channels = [{
		//puvloo
		name: 'puvloo',
		twitchID: 474990645,
		booyahID: 62813927,
		chatroomID: 62474863,
		bttv: false,
		ffz: false,
		panels: [
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-0"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UCok4dp9tEPNjCyq93xfB0hw?view_as=subscriber"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-474990645-image-21f207ff-161d-4c5e-9315-b368396c70af" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-3"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/puvlo69/"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-474990645-image-36700caf-44fc-4ba6-8701-6ada5df209c1" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-6"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/Puvlo69"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-474990645-image-be64dee4-25b2-46aa-899b-4fffb3525f92" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-9"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://discord.gg/7sNUXvZb"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-474990645-image-543eece1-c679-4765-a7c3-a4847db8cc1f" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-474990645-image-96a68ed3-8ec0-4fc6-8295-e09c8be22feb" alt="Contenido del panel"></div>`,
			}
		],
	},
	{
		//donsebastian
		name: 'donsebastianlive',
		twitchID: 38108090,
		booyahID: 'donsebastian',
		booyahNumericID: 13259566,
		chatroomID: 13037025,
		bttv: true,
		ffz: true,
		panels: [{
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
		name: 'suwie',
		twitchID: 191996164,
		booyahID: 'Suwie',
		booyahNumericID: 71614581,
		chatroomID: 71191348,
		bttv: true,
		ffz: true,
		panels: [
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-191996164-image-dd106a33-1cfb-4f47-896a-a0840534f3b9" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><p>1 - No insultar.<br>2- Respetar a los mods y tanto como mods usuarios.<br>3- No hacer spam/flood.<br>4- No hablar de temas religiosos/politicos.<br>5- Divertirse</p></div></div></div></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-191996164-image-8d73fdb9-9129-484b-b6fa-0b432f78a4fb" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><p>Contact: Suwiecontact@gmail.com</p><p>⋆┈┈┈┈┈⋆┈┈⊰✩⊱┈┈⋆┈┈┈┈┈┈⋆</p><p>https://twitter.com/Suwie_</p><p>⋆┈┈┈┈┈⋆┈┈⊰✩⊱┈┈⋆┈┈┈┈┈┈⋆</p><p>https://discord.gg/suwie</p><p>⋆┈┈┈┈┈⋆┈┈⊰✩⊱┈┈⋆┈┈┈┈┈┈⋆</p><p>https://www.youtube.com/c/Suwie</p><p>⋆┈┈┈┈┈⋆┈┈⊰✩⊱┈┈⋆┈┈┈┈┈┈⋆</p><p>https://www.facebook.com/LoliLoliuwu/</p><p>⋆┈┈┈┈┈⋆┈┈⊰✩⊱┈┈⋆┈┈┈┈┈┈⋆</p></div></div></div></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-7"><h3 data-test-selector="title_test_selector" class="sc-AxgMl sc-fzpmMD jzuMSH tw-title">Discord</h3><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://discord.gg/suwie"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-191996164-image-b10ab5b5-5423-4584-a5a5-53f639209436" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-191996164-image-dd106a33-1cfb-4f47-896a-a0840534f3b9" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><p>1 - No insultar.<br>2- Respetar a los mods y tanto como mods usuarios.<br>3- No hacer spam/flood.<br>4- No hablar de temas religiosos/politicos.<br>5- Divertirse</p></div></div></div></div>`,
			}
		],
	},
	{
		// cristianghost
		name: 'cristianghost',
		twitchID: 149287198,
		booyahID: 'cristianghost',
		booyahNumericID: 79895327,
		chatroomID: 79543340,
		bttv: true,
		ffz: true,
		leaderboard: true,
		panels: [{
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
				type: 'html',
				html: `			
				<div id="leaderboard-container" class="sc-AxjAm dGeTii default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-1">
					<div id="table-container"></div>
				</div>`,
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
			}
		],
	},
	{
		// moai
		name: 'moaigr',
		twitchID: 68111739, // 149287198
		booyahID: 63681555,
		chatroomID: 63325494,
		bttv: true,
		ffz: true,
		panels: [
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-0"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-674b3aa9-0282-4680-a1cc-6aad358f69e1" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><ul><li>No a la XENOFOBIA.</li><li>No SPAM.</li><li>El ":v" (en exceso).</li><li>Los Copy&amp;Paste, estan prohibidos, para no provocar desorden en el chat.</li></ul><p>NO CUMPLIR ESTO SE RECURIRA AL PERMA BAN.</p></div></div></div></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-1"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-be39615b-bded-4d8c-bc13-136797db0eb3" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><ul><li>Soy Moai, hago videos en Youtube.</li><li>Chileno.</li><li>Me dicen Moai, por mi cara, así de simple.</li><li>No tengo un horario organizado, así que por este momento no hay ninguna información respecto a la hora en que se levantan los streams.</li></ul></div></div></div></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/user/MoaiGr1"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-86dfc490-77d1-435b-8555-d3f2f5c99c26" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-3"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/moaigr/"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-e1849f6f-d16c-4c51-b0ce-4456cf54d29b" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/MoaiGr"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-440f17dc-e714-41fa-a775-7a5f3f31bd20" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-5"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/MoaiGr/"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-7524e2de-62de-4b97-aa94-dfee843e4a3b" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-6"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-68111739-image-21dc940e-8585-405e-8b50-2c5335ca5aae" alt="Contenido del panel"><div data-test-selector="description_test_selector"><div class="sc-AxiKw sc-pscky gzUZnd tw-typeset"><div class="panel-description"><p><em>EN PROCESO</em></p></div></div></div></div>`,
			},
		],
	},
	{
		// dylantero
		name: 'dylanterolive',
		twitchID: 130345683, // 149287198
		booyahID: 'dylantero',
		booyahNumericID: 79330097,
		chatroomID: 78979571,
		bttv: true,
		ffz: true,
		panels: [
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://discord.gg/QShQVKV"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-130345683-image-0a463264-a391-4424-985d-a1f1b6b977bc" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-6"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/user/DylanteroElBronze?sub_confirmation=1"><img data-test-selector="image_test_selector" src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-130345683-image-6001c25e-2b05-4c72-8982-f774c676f7b0" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://furuishop.cl/"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-130345683-image-66f45fd9-c3f3-4d0d-9918-8fe60be60975" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="sc-AxiKw QcRNp default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-3"><a data-test-selector="link_url_test_selector" class="sc-fznMAR iOxnOz tw-link" rel="noopener noreferrer" target="_blank" href="https://bit.ly/3nEwTSI"><img data-test-selector="image_test_selector" src="https://panels-images.twitch.tv/panel-130345683-image-bdfc396b-ca69-42ba-b7ed-7b40a5a1db61" alt="Contenido del panel"></a></div>`,
			}
		],
	},
	{
		name: 'latesitoo',
		twitchID: 134037766,
		booyahNumericID: 79458266,
		chatroomID: 79107365,
		bttv: true,
		ffz: true,
		panels: [
			{
				type: "html",
				html: `<div class="Layout-sc-nxg1ff-0 ljMhJH default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><a data-test-selector="link_url_test_selector" class="ScCoreLink-sc-udwpw5-0 jxwNWA tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UC73AugPHBoFmdt3Dwz50iZw"><img data-test-selector="image_test_selector" src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-134037766-image-bf1450ff9dc06b68-320-320.jpeg" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="Layout-sc-nxg1ff-0 ljMhJH default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><a data-test-selector="link_url_test_selector" class="ScCoreLink-sc-udwpw5-0 jxwNWA tw-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/late_cod"><img data-test-selector="image_test_selector" src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-134037766-image-e2e904433759c602-320-320.jpeg" alt="Contenido del panel"></a></div>`,
			},
		],
	},
	{ // test channel
		name: 'elmarceloc',
		twitchID: 134037766,
		booyahNumericID: 77452717,
		chatroomID: 77103915,
		bttv: true,
		ffz: true,
		panels: [
			{
				type: "html",
				html: `<div class="Layout-sc-nxg1ff-0 ljMhJH default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-2"><a data-test-selector="link_url_test_selector" class="ScCoreLink-sc-udwpw5-0 jxwNWA tw-link" rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UC73AugPHBoFmdt3Dwz50iZw"><img data-test-selector="image_test_selector" src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-134037766-image-bf1450ff9dc06b68-320-320.jpeg" alt="Contenido del panel"></a></div>`,
			},
			{
				type: "html",
				html: `<div class="Layout-sc-nxg1ff-0 ljMhJH default-panel" data-test-selector="channel_panel_test_selector" data-a-target="panel-4"><a data-test-selector="link_url_test_selector" class="ScCoreLink-sc-udwpw5-0 jxwNWA tw-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/late_cod"><img data-test-selector="image_test_selector" src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-134037766-image-e2e904433759c602-320-320.jpeg" alt="Contenido del panel"></a></div>`,
			},
		],
	}
];

var twitchEmotes = [
	// https://twitchemotes.com

	{ id: '425618', name: 'LUL' },
	{ id: '160404', name: 'TehePelo' },
	{ id: '120232', name: 'TriHard' },
	{ id: '114836', name: 'Jebaited' },
	{ id: '84608', name: 'cmonBruh' },
	{ id: '81248', name: 'OSFrog' },
	{ id: '58765', name: 'NotLikeThis' },
	{ id: '55338', name: 'KappaPride' },
	{ id: '28087', name: 'WutFace' },
	{ id: '27602', name: 'BuddhaBar' },
	{ id: '22639', name: 'BabyRage' },
	{ id: '3792', name: 'ANELE' },
	{ id: '86', name: 'BibleThump' },
	{ id: '69', name: 'BloodTrail' },
	{ id: '41', name: 'Kreygasm' },
	{ id: '25', name: 'Kappa' },
	{ id: '461298', name: 'DarkMode' },
	{ id: '245', name: 'ResidentSleeper' },
	{ id: '114856', name: 'UncleNox' },
	

	{ id: '555555579', name: '8-)', scaped: true },
	{ id: '2', name: ':(', scaped: true },
	{ id: '1', name: ':)', scaped: true },
	{ id: '555555559', name: ':-(', scaped: true },
	{ id: '555555557', name: ':-)', scaped: true },
	{ id: '555555586', name: ':-/', scaped: true },
	{ id: '555555561', name: ':-D', scaped: true },
	{ id: '555555581', name: ':-O', scaped: true },
	{ id: '555555592', name: ':-P', scaped: true },
	{ id: '555555568', name: ':-Z', scaped: true },
	{ id: '555555588', name: ":-\\", scaped: true },
	{ id: '555555583', name: ":-o", scaped: true },
];

// forsenE, etc
var booyahtvEmotes = [
	{ url: 'https://zzls.xyz/booyah.tv/1x.png', name: 'YEAHBUTBOOYAHTV' },
	{ url: 'https://cdn.betterttv.net/emote/604f8eac306b602acc59d6d2/1x', name: 'forsenBased' },

	{ id: '521050', name: 'forsenE' },
	{ id: '116051', name: 'forsen1' },
	{ id: '116052', name: 'forsen2' },
	{ id: 'emotesv2_2f9a36844b054423833c817b5f8d4225', name: 'forsenPls' },
	 
];

var channelSubsEmotes = []
var bttvGlobalEmotes = [];
var bttvChannelEmotes = [];

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

const censoredWords = [
	['PUTA', 'PUTΑ'],
	['PUT4', 'PUTΑ'],
	['COCK', 'CΟCK']
]

const streamVipWords = [
	['você possui', 'tiene'],
	['pontos', 'puntos'],
	['assistiu', 'ha visto a'],
	['A live está offline. 😐', 'El directo está offline Sadge'],
	['A live está aberta há','HYPERS El directo esta online hace'],
	['Lista de comandos da live', 'HACKERMANS Lista de comandos del stream'],
	['o usuário', 'el usuario'],
	['ainda não ha visto a esse canal', 'aún no ha visto este canal'],
	['foi criado há','fue creado hace'],
	['está ativo no canal há','esta activo en el canal hace'],
	['💰','BASED'],
	['💬',''],
	['⏱️','KirbDance']
]
 
const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g
const twitchClipsRegex = /(?:https:\/\/)?clips\.twitch\.tv\/(\S+)/g;
const tweetRegex = /https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/g;
const imgurRegex = /(http|https):\/\/?(.)imgur.com(.)([^\s]+)/g;
const instagramRegex = /(https?:\/\/(?:www\.)?instagram\.com\/([^/?#&]+))(.)([^\s]+)/g;
const tagRegex = /(?<![\w@])@([\w@]+(?:[.!][\w@]+)*)/g;

var checkEmotesInterval;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

// Escapes a regex string

function escapeRegex(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function toggleEmotePanel(visible){
	var emoteList = document.getElementById('emoteList')
	var emojis = document.getElementsByClassName('components-chat-menu-emoji')[0]

	if(!document.body.contains(emoteList)) return

	if(visible){
		emoteList.style.display = 'inline-flex';
		emojis.style.display = 'none';
		$( ".components-input-element" ).autocomplete( "disable" );
	}else {
		emoteList.style.display = 'none';
		emojis.style.display = '';
		$( ".components-input-element" ).autocomplete( "enable" );

	}


}

// Clipboard auciliar functions

function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function() {
		console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
		console.error('Async: Could not copy text: ', err);
	});
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

// crea el <a href="url"> url </a>

function createAnchor(msg, urlparam, domain, prefixSize) {
	let url =  urlparam.substring(prefixSize)
	
	return replaceAll(msg,urlparam, `<a class="chaturl" target="__blank" href="${domain}/${url}">${domain}/${url}</a>`)
}

// Reemplaces the urls in the chatbox with a non-censurated version of it.

function replaceURLSinTextarea() {
	let msg = document.getElementsByClassName('components-input-element')[0].value;
	// youtube clips

	if(msg.match(youtubeRegex) !== null){
		msg.match(youtubeRegex).forEach((youtubeURL) => {
			msg = msg.replace(youtubeURL, `yt=${youtubeURL.slice(-11)} ` )
		});
	}
	
	// twitch clips

	if(msg.match(twitchClipsRegex) !== null){
		msg.match(twitchClipsRegex).forEach((clipURL) => {
			msg = msg.replace(clipURL, `twclip=${clipURL.slice(24)} `  )
		});
	}

	// twiter

	if(msg.match(tweetRegex) !== null){
		msg.match(tweetRegex).forEach((twitURL) => {
			msg = msg.replace(twitURL, `tweet=${twitURL.slice(20)} `  )
		});
	}
	
	// imgur

	if(msg.match(imgurRegex) !== null){
		msg.match(imgurRegex).forEach((imgurURL) => {
			msg = msg.replace(imgurURL, `imgur=${imgurURL.slice(18)} `  )
		});
	}
		
	// instagram

	if(msg.match(instagramRegex) !== null){
		msg.match(instagramRegex).forEach((instagramURL) => {
			msg = msg.replace(instagramURL, `ig=${instagramURL.slice(26)} `  )
		});
	}  

	censoredWords.forEach(word => {
		msg = msg.replace(word[0], word[1])
	})

	setTextareaValue(msg, false)
}

// Replaces all the prefixed-urls in the chat 
// generated by the "replaceURLSinTextarea" function
// by its corresponding anchor

function replaceURLS(msg) {

	let youtubePrefixRegex = /yt=(.){11}/g
	let twitchPrefixClipsRegex = /twclip=(.)([^\s]+)/g
	let tweetPrefixRegex = /tweet=(.)([^\s]+)/g
	let imgurPrefixRegex = /imgur=(.)([^\s]+)/g
	let instagramPrefixRegex = /ig=(.)([^\s]+)/g

	// youtube
	if (msg.match(youtubePrefixRegex) !== null){ 
		msg.match(youtubePrefixRegex).forEach((youtubeURL) => {
			msg = createAnchor(msg, youtubeURL, 'https://youtu.be' ,3)
		});
	}

	// twitch clips

	if (msg.match(twitchPrefixClipsRegex) !== null){ 
		msg.match(twitchPrefixClipsRegex).forEach((clipURL) => {
			msg = createAnchor(msg, clipURL, 'https://clips.twitch.tv' ,7)
		});
	}

	// tweet

	if (msg.match(tweetPrefixRegex) !== null){ 
		msg.match(tweetPrefixRegex).forEach((tweetURL) => {
			msg = createAnchor(msg, tweetURL, 'https://twitter.com' ,6)
		});
	}

	// imgur

	if (msg.match(imgurPrefixRegex) !== null){ 
		msg.match(imgurPrefixRegex).forEach((imgurURL) => {
			msg = createAnchor(msg, imgurURL, 'https://imgur.com' ,6)
		});
	}

	// instagram

	if (msg.match(instagramPrefixRegex) !== null){ 
		msg.match(instagramPrefixRegex).forEach((instagramURL) => {
			msg = createAnchor(msg, instagramURL, 'https://www.instagram.com' ,3)
		});
	}

	return msg
}

function updateEmotes(){
	console.log('[BOOYAH.TV] titulo actualisado')
	addEmotes($('.channel-top-bar .channel-name'))
}

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
		let regex = ''

		if (twitchEmotes[i].scaped) {
			regex = escapeRegex(twitchEmotes[i].name)
		} else {
			regex = "\\b" + twitchEmotes[i].name + "\\b"
		}

		regex = new RegExp(regex, "g"); // use scaped if exists

		let url = `https://static-cdn.jtvnw.net/emoticons/v2/${twitchEmotes[i].id}/default/dark/1.0`;

		msg = replaceEmote(msg, regex, url, twitchEmotes[i].name);
	}

	// GLOBAL CHANNEL EMOTES

	for (let i = 0; i < booyahtvEmotes.length; i++) {
		let regex = new RegExp("\\b" + booyahtvEmotes[i].name + "\\b", "g");
		let url = ''

		if (booyahtvEmotes[i].url) {
			url = booyahtvEmotes[i].url
		} else {
			url = `https://static-cdn.jtvnw.net/emoticons/v2/${booyahtvEmotes[i].id}/default/dark/1.0`;
		}
		msg = replaceEmote(msg, regex, url, booyahtvEmotes[i].name);
	}


	// SUB EMOTES

	if (channelSubsEmotes) {
		for (let i = 0; i < channelSubsEmotes.length; i++) {
			let regex = new RegExp("\\b" + channelSubsEmotes[i].code + "\\b", "g");
			let url = `https://static-cdn.jtvnw.net/emoticons/v2/${channelSubsEmotes[i].id}/default/dark/1.0`;

			msg = replaceEmote(msg, regex, url, channelSubsEmotes[i].code);
		}
	}

	// BETTER TTV GLOBAL EMOTES
	
	if (channel.bttv) {

		for (let i = 0; i < bttvGlobalEmotes.length; i++) {
			let regex = new RegExp("\\b" + bttvGlobalEmotes[i].code + "\\b", "g");
			let url = `https://cdn.betterttv.net/emote/${bttvGlobalEmotes[i].id}/1x`;

			msg = replaceEmote(msg, regex, url, bttvGlobalEmotes[i].code);
		}
	}

	// BETTER TTV CHANNEL EMOTES

	if(channel && channel.bttv){ 

		for (let i = 0; i < bttvChannelEmotes.length; i++) {
			let regex = new RegExp("\\b" + bttvChannelEmotes[i].code + "\\b", "g");
			let url = `https://cdn.betterttv.net/emote/${bttvChannelEmotes[i].id}/1x`;

			msg = replaceEmote(msg, regex, url, bttvChannelEmotes[i].code);
		}
	}

	// FRANKER FACE Z EMOTES
	if (channel && channel.ffz) {

		for (let i = 0; i < frankerFaceZ.length; i++) {
			let regex = new RegExp("\\b" + frankerFaceZ[i].name + "\\b", "g");
			let url = `https://cdn.frankerfacez.com/emote/${frankerFaceZ[i].id}/1`;

			msg = replaceEmote(msg, regex, url, frankerFaceZ[i].name);
		}
	}


	return msg;
}

// copy a another user messages to chatbox

function copyMessage(message, messageValue){
	message.onclick = event => {
		if (event.shiftKey) {

			// check if there are any links and return; in the future, their will be parsed aswell
			if (youtubeRegex.test(messageValue) ||
				twitchClipsRegex.test(messageValue) ||
				tweetRegex.test(messageValue) ||
				imgurRegex.test(messageValue) ||
				instagramRegex.test(messageValue)
			) return

			
			// remplaces the emotes with their corresponding title, ex : OMEGALUL
			console.log('original message',messageValue)
			messageValue = messageValue.replace(/<img.*?title="(.*?)"[^\>]+>/g, '$1'); 
			console.log('emote parsed message',messageValue)

			// sets the value in the textarea
			setTextareaValue(messageValue, false)

			// disable emote autocomplete, this can produce bugs
			$( ".components-input-element" ).autocomplete( "disable" );

		}
	};
}

function translateStreamVip(username, messageElement){
	//console.log(username.innerHTML)

	if (username.innerHTML !== 'StreamVip') return

	streamVipWords.forEach(word => {
		messageElement.innerHTML = messageElement.innerHTML.replace(word[0], word[1])
	})


}

function changeBadges() {
	// TODO:, cambiar los iconos

	// change channel badges
	/* if (components.childNodes[0].childNodes[0].childNodes[0].className == 'message-badge') {
	components.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1'
	}*/

		
}

function changeUsernameColor(username) {

	var hash = username.innerText.charCodeAt(0);

	var color = "#6525a1";
	
	for (let i = 0; i < colors.length; i++) {
		if (hash % i === 0) {
			color = colors[i];
		}
	}

	username.style.color = color;
}

// checks if the user is tagged by another user and adds the event to tag another user

function checkTag(event, messageContent, usernameContainer,usernameElement, messageContainer) {

	if (selfUsername) { //&& !messageText.innerHTML.includes(channel.name)

		var taggedUsers = []

		// checks if the message is sent by the bot, if it is, the user
		// will be taged by their name, otherwise will be tagged with @

		taggedUsers = messageContent.match(tagRegex) != null ? messageContent.match(tagRegex) : [];

		if (usernameElement.innerHTML == 'StreamVip' && messageContent.includes(selfUsername)){
			taggedUsers.push(selfUsername)
		}

		taggedUsers.forEach(username =>{
			username = username.replace('@','')

			if (username.toLowerCase() == selfUsername.toLowerCase() && username.toLowerCase() != channel.name.toLowerCase()) {
			
				event.target.style.background = 'rgb(197 25 25 / 32%)' // makes the message red
				messageContainer.style.color = 'rgb(255 255 255)' // makes the username white for more readeability
	
				//blip.play();
			}
		})
	}

	// Put tag in chatbox if a username is doble clicked

	usernameContainer.onclick = e => {
		if (e.detail === 2) {

			tagUserByMessage(e.target)

			document.getElementsByTagName('textarea')[0].focus(); // focus textarea

		}
	};

}

// remplace all emotes in message (bttv, ffz, D:,etc) with an image

function addEmotes(objective) {

	// reemplace the emote code with his corresponding code

	$(objective)
		.not(":has(img)")
		.each(function() {
			var msg = $(this).html();

			msg = replaceEmote(msg, new RegExp("( |^)" + "&lt;3" + "\\b(?!&lt;3)", "g"), "https://static-cdn.jtvnw.net/emoticons/v1/9/1.0", "<3"); // harth <3			
			msg = replaceEmote(msg, new RegExp("\\b" + "D:" + "( |$)", "g"), "https://cdn.betterttv.net/emote/55028cd2135896936880fdd7/1x", "D:"); // D:
			msg = replaceEmote(msg, new RegExp(":tf:", "g"), "https://cdn.betterttv.net/emote/54fa8f1401e468494b85b537/1x", ":tf:"); // :tf:

			msg = replaceEmotes(msg); // replace all twitch, sub emotes, betterttv and franker face z emotes
			msg = replaceURLS(msg) // replaces all the urls
			//console.log('[result] ',msg)

			$(this).html(msg);
		});
}

function modifyMessage(event) {
	// modify the message and username if the message is from an user
	for (var j = 0; j < event.target.childNodes.length; j++) {
		var message = event.target.childNodes[j];

		if(!message.childNodes[0]) return

		var messageContainer = message.childNodes[0] // Marcelo: hola

		var usernameContainer = messageContainer.childNodes[0]; // username container, includes badges
		var usernameElement = usernameContainer.childNodes[usernameContainer.childNodes.length - 1]; // EX: <span> elmarceloc: </span>

		var messageText = messageContainer.childNodes[messageContainer.childNodes.length - 1] // EX: <span> hola </span>

		/*console.log('messageContainer:',messageContainer)

		console.log('usernameContainer:',usernameContainer)
		console.log('usernameElement:',usernameElement)
		console.log('messageText:',messageText)*/

		copyMessage(message, messageText.innerHTML)
		
		translateStreamVip(usernameElement, messageText)
		changeBadges(usernameContainer)
		checkTag(event, messageText.innerHTML,usernameContainer,usernameElement, messageContainer)

		changeUsernameColor(usernameElement)
		addEmotes(messageText);
	}
}

function initExtension() {
	var currentURL = window.location.href

	// save nickname
	let uid = localStorage.getItem('loggedUID')
	console.log('[BOOYAH.TV] USER ID: ' + uid)

	if (uid) {
		fetch(`https://booyah.live/api/v3/users/${uid}`)
			.then(response => response.json())
			.then(data => {
				selfUsername = 'Niel'//data.user.nickname
				console.log('[BOOYAH.TV] self username: ' + selfUsername)
			});
	}

	if (currentURL.includes('vods')) {
		// TODO: show loading overlay
	}


	setTimeout(function() {
		if (currentURL.includes('vods')) {
			insertVOD(currentURL)
		}
	}, 3000);


	// delates the panels
	var panels = document.getElementsByClassName('default-panel');

	while (panels[0]) {
		panels[0].parentNode.removeChild(panels[0]);
	}


	console.log("[BOOYAH.TV] CURRENT URL: " + currentURL)

	channels.forEach((currentChannel) => {
		// check if user is in channel or its chatroom (popup)
		if (!(currentURL.includes(currentChannel.booyahID) 
			|| currentURL.includes(currentChannel.booyahNumericID) 
			|| currentURL.includes(currentChannel.chatroomID))) return;

		channel = currentChannel

		console.log("[BOOYAH.TV] You are in " + currentChannel.booyahID + " Channel.");

		console.log("[BOOYAH.TV] fetching betterttv for channel: ", betterTTVChannelBaseURL + currentChannel.twitchID);
		console.log("[BOOYAH.TV] fetching frankerFaceZ for channel: ", frankerfaceZChannelBaseURL + currentChannel.twitchID);

		Promise.all([
				fetch(globalBetterttvURL).then((value) => value.json()),
				fetch(betterTTVChannelBaseURL + currentChannel.twitchID).then((value) => value.json()),
				fetch(frankerfaceZChannelBaseURL + currentChannel.twitchID).then((value) => value.json()),
				fetch(subsEmotesBaseURL + currentChannel.name).then((value) => value.json() ),
			])
			.then(([globalBetterttv, channelBetterttv, channelFrankerfaceZ, subsEmotes]) => {
				// limiamos los emotes para que no se junten con los de otro streamer

				bttvGlobalEmotes = []
				frankerFaceZ = []
				bttvChannelEmotes = []
				channelSubsEmotes = []

				// guardamos los emotes globales
				bttvGlobalEmotes = globalBetterttv

				// cargamos los emotes del canal (bttv)
				if (channelBetterttv.channelEmotes) {

					// añadimos los emotes de de canal de better ttv
					bttvChannelEmotes = channelBetterttv.channelEmotes

					// luevgo añadimos los emotes compartidos con otros canales, con al condicion
					// de que no se este en los emotes del canal

					for (let i = 0; i < channelBetterttv.sharedEmotes.length; i++) {
						var exists = false

						for (let j = 0; j < channelBetterttv.channelEmotes.length; j++) {
							if(channelBetterttv.sharedEmotes[i].code == channelBetterttv.channelEmotes[j].code){
								exists = true
							}
						}
						// si no esta repetido el emote, lo agregamos al arreglo de emotes de canal
						if(!exists){
							bttvChannelEmotes.push(channelBetterttv.sharedEmotes[i])
						}
					}
				}

				// cargamos los emotes del canal (ffz)

				if (channelFrankerfaceZ.status != 404) {
					
					frankerFaceZ = frankerFaceZ.concat(channelFrankerfaceZ.sets[Object.keys(channelFrankerfaceZ.sets)[0]].emoticons);

					// quitamos los emotes que ya estan en bttv

					frankerFaceZ = frankerFaceZ.filter(ffzEmote => {
						return !bttvGlobalEmotes.some((bttvEmote) => bttvEmote.code == ffzEmote.name);  
					})

					frankerFaceZ = frankerFaceZ.filter(ffzEmote => {
						return !bttvChannelEmotes.some((bttvEmote) => bttvEmote.code == ffzEmote.name);  
					})

				}

				if(subsEmotes.length > 0){
					channelSubsEmotes = subsEmotes.subEmotes[0].emotes
				}

				console.log("[BOOYAH.TV] subsEmotes: ", channelSubsEmotes);
				console.log("[BOOYAH.TV] frankerFaceZ: ", frankerFaceZ);
				console.log("[BOOYAH.TV] bttvGlobalEmotes: ", bttvGlobalEmotes);
				console.log("[BOOYAH.TV] bttvChannelEmotes: ", bttvChannelEmotes);


				if($('.components-input-element').length){
					setInterval(() => {
						
						replaceURLSinTextarea()
					}, 200);
				}
				//   fetch `https://api.twitch.tv/helix/streams?client_id=${twitchClientID}&channel=${channel.name}`
			
				
			  
									
				// emotes en el titulo

				var titleExist = setInterval(function() {
					if ($('.channel-top-bar .channel-name').first().length) {
						clearInterval(titleExist);

						clearTimeout(checkEmotesInterval)
						 
						checkEmotesInterval = setInterval(() => {
							updateEmotes()
						}, 1000 * 5);
						
						// chat de twitch

						twitchChat()
						
					}
				}, 5000)
			
				// emotes, chat colors, el chat offline...

				var chatExist = setInterval(function() {
					if ($('.scroll-container').first().length) {

						clearInterval(chatExist);

						// el chat offline..

						setInterval(function() { checkifoffline() }, 5000)
						checkifoffline()

						// emote panel
						
						insertEmotesPanel(currentChannel)

						// insert dom mutation observer to listener for new messages added in .scroll-container
						document.getElementsByClassName("scroll-container")[0].removeEventListener('DOMNodeInserted', modifyMessage, true);

						document.getElementsByClassName("scroll-container")[0].addEventListener("DOMNodeInserted", modifyMessage, true);
					}
				}, 500);

				// panels 

				var panelsExist = setInterval(function() {
					if ($('.channel-box').first().length) {
						clearInterval(panelsExist);
						insertChannelPanels(currentChannel)
					}
				}, 500)


				// autocomplete
				var autocompleteExist = setInterval(function() {
					if ($('.components-input-element').first().length) {
						clearInterval(autocompleteExist);

						initAutocomplete()

						$('textarea').focus(function() {
							$( ".components-input-element" ).autocomplete( "enable" );
						})
						

					}
				}, 500)                
					
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
	}
`

// fold emote group in the emote menu

function foldEmoteGroup(arrowElement, list){
	var listElement = document.getElementById(list)

	console.log(arrowElement)

	if(listElement.style.display =='none'){
		listElement.style.display = ''
		arrowElement.innerHTML = '▼';

	}else{
		listElement.style.display = 'none'
		arrowElement.innerHTML = '◄';

	}
}

function sendEmotePayload(emoteName) {

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


function createEmoteHTML(name, url, width = null, height = null) {
	var size = width ? `style="border-radius: 0%!important;width:${width}px!important;height:${height}px!important"` : `style="border-radius: 0%!important;width:auto!important"`

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

function createPanelHTML(panel) {
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

function checkifoffline() {
	if ($('.viewer-count span').length) {

		if ($('.viewer-count span')[0].innerText == "0") {
			$('.chatroom-head')[0].innerHTML = `El Chat Offline <img title="TriHard" class="emote" src="https://static-cdn.jtvnw.net/emoticons/v2/120232/default/dark/1.0">`
		} else {
			$('.chatroom-head')[0].innerHTML = `El Chat`
		}
	}
}

function insertBooyahrino(channelID) {

	fetch('https://booyah.live/api/v3/channels/71484262')
		.then(response => response.json())
		.then(data => {
			var channelID = data.channel.chatroom_id
			var channelName = data.user.nickname

			var booyahrinoHTML = `

			<a href="booyahrino://${channelID},${channelName}" id="booyahrino" class="menu-others-item">
				<div class="components-chat-menu-popout theme-dark" title="Abrir en Booyahrino">
					<div class="toggle-btn">
						<div class="components-icon components-icon-popout">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
							<g transform="translate(-93.000000, -92.000000)">
								<g transform="translate(94.000000, 93.000000)">
									<path d="M3.5,2 L16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L4.5,16 C3.94771525,16 3.5,15.5522847 3.5,15 L3.5,2 L3.5,2 Z" class="highlight-bg"></path>
									<path d="M4,2 L4.11662113,2.00672773 C4.61395981,2.06449284 5,2.48716416 5,3 C5,3.55228475 4.55228475,4 4,4 C3.99421869,4 3.98844885,3.99995094 3.98269085,3.99985321 L2.5,4 C2.25454011,4 2.05039163,4.17687516 2.00805567,4.41012437 L2,4.5 L1.999,12.515 L13.999,12.515 L13.999,10.999 L14.0067277,10.8833789 C14.0644928,10.3860402 14.4871642,10 15,10 C15.5522847,10 16,10.4477153 16,11 L15.999,10.999 L16,16 C16,17.1045695 15.1045695,18 14,18 L2,18 C0.8954305,18 1.76405761e-12,17.1045695 1.76392234e-12,16 L1.76392234e-12,4 C1.76378707e-12,2.8954305 0.8954305,2 2,2 L4,2 Z M13.999,14.515 L1.999,14.515 L2,15.5 C2,15.7454599 2.17687516,15.9496084 2.41012437,15.9919443 L2.5,16 L13.5,16 C13.7454599,16 13.9496084,15.8231248 13.9919443,15.5898756 L14,15.5 L13.999,14.515 Z"></path>
									<path d="M16,-9.09494702e-13 C17.1045695,-9.09697608e-13 18,0.8954305 18,2 L18,7 C18,8.1045695 17.1045695,9 16,9 L8,9 C6.8954305,9 6,8.1045695 6,7 L6,2 C6,0.8954305 6.8954305,-9.09291796e-13 8,-9.09494702e-13 L16,-9.09494702e-13 Z M15.5,2 L8.5,2 C8.22385763,2 8,2.22385763 8,2.5 L8,2.5 L8,6.5 C8,6.77614237 8.22385763,7 8.5,7 L8.5,7 L15.5,7 C15.7761424,7 16,6.77614237 16,6.5 L16,6.5 L16,2.5 C16,2.22385763 15.7761424,2 15.5,2 L15.5,2 Z"></path>
								</g>
							</g>
						</svg>
						</div>
						<span class="banner-txt">Abrir Chat en Booyahrino</span>
					</div>
				</div>
			</a>
		`

			//if (!document.body.contains(document.getElementById("booyahrino"))){		
			setTimeout(() => {
				console.log("[BOOYAH.TV] Booyahrino added");

				if (document.body.contains(document.querySelector(".components-chat-menu-others-popover .menu-others-list"))) {
					document.querySelector(".components-chat-menu-others-popover .menu-others-list").remove();
				};

				$('.components-chat-menu-others-popover .menu-others-list').append(booyahrinoHTML);

			}, 500);
			//};
		});



}

function insertEmotesPanel(currentChannel) {
	console.log("[BOOYAH.TV] inserting emote panel");

	// on send a message, close the emote panel

	if ($('.send-btn').length) {

		document.querySelector('.send-btn').addEventListener("click", function() {
			toggleEmotePanel(false)

			saveMessage()
		});
	}
	
	// close emote panel by clicking on the default booyah emote panel

	if ($('.toggle-btn').length) {

		document.querySelector('.toggle-btn').addEventListener("click", function() {
			toggleEmotePanel(false)
		});
	}

	var currentURL = window.location.href


	/*document.getElementsByClassName('components-chat-menu-others')[0].onclick = function(){
		insertBooyahrino(currentChannel.booyahID)
	};*/


	// Emote List

	console.log("[BOOYAH.TV] Emote panel added");


	var emoteButton = `
	<div id="emoteButton" class="components-chat-menu-emotes theme-dark">
		<div class="toggle-btn" title="Emotes">
			<div class="components-icon components-icon-emotes">
				<div id="emotes-icon">
				</div>
			</div>
		</div>
	</div>`



	if (!document.body.contains(document.getElementById("emoteButton"))) {
		console.log("[BOOYAH.TV] Creating emote button");

		$('.btns-bar-chat').first().append(emoteButton);  

		console.log("[BOOYAH.TV] Create emote button click listener");

		$('#emotes-icon').click(function() {

			if(document.getElementById('emoteList').style.display == 'inline-flex') {
				toggleEmotePanel(false)
			}
			else {
				toggleEmotePanel(true)
			}

		});

	};

	// Emote list DOM

	var twitchHTML = ''
	var subHTML = ''
	var bttvHTML = ''
	var ffzHTML = ''
	var channelHTML = ''

	/* Emotes globales de Twitch*/ 

	twitchEmotes.forEach(emote => {
		twitchHTML += createEmoteHTML(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
	})

	/* Emotes de subs*/ 

	if (channelSubsEmotes && channelSubsEmotes.length > 0) {
		channelSubsEmotes.forEach(emote => {
			subHTML += createEmoteHTML(emote.code, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`)
		})
	}

	/* Emotes globales de BTTV*/ 

	if (bttvGlobalEmotes && bttvGlobalEmotes.length > 0) {
		bttvGlobalEmotes.forEach(emote => {
			bttvHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
		})
	}

	/* Emotes globales de FFZ*/

	if (frankerFaceZ && frankerFaceZ.length > 0) {
		frankerFaceZ.forEach(emote => {
			ffzHTML += createEmoteHTML(emote.name, `https://cdn.frankerfacez.com/emote/${emote.id}/1`, emote.width, emote.height)
		})
	}

	/* Emotes de canal de BTTV*/

	if (bttvChannelEmotes && bttvChannelEmotes.length > 0) {
		bttvChannelEmotes.forEach(emote => {
			channelHTML += createEmoteHTML(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/1x`)
		})
	}

	var emoteCount = bttvGlobalEmotes.length + 1 +  bttvChannelEmotes.length + 1 + frankerFaceZ.length + 1 + twitchEmotes.length + 1
	
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
			<div id="emoteGroups" class="components-infinite-view has-data" style="text-align: center;">
				<div>
				<div class="title emoteCategory" title="twitch"><div id="twitchicon"></div><span>Emotes de Twitch</span><span class="foldArrow">▼</span></div>
				<div id="twitch">${twitchHTML} </div>
				${channelSubsEmotes && channelSubsEmotes.length > 0 ? `<div class="title emoteCategory" title="subs"><div id="twitchicon"></div><span>Emotes de subs</span><span class="foldArrow">▼</span></div>` : ''}
				<div id="subs"> ${subHTML} </div>
				${channel.bttv ? `<div class="title emoteCategory" title="bttv"><div id="bttvicon"></div><span>BetterTTV</span><span class="foldArrow">▼</span></div>`: ''}
				<div id="bttv"> ${bttvHTML} </div>
				${ channel.bttv || channel.ffz ? `<div class="title emoteCategory" title="channelEmotes"><div id="ffzicon"></div><span>Emotes del canal</span><span class="foldArrow">▼</span></div>` : ''}
				<div id="channelEmotes"> ${channelHTML}
				${ffzHTML} </div>
				</div>
			</div>
		</div>
	</div>`

	// insert emote panel to the DOM emote panel

	if (document.body.contains(document.getElementById("emoteList"))){
		document.getElementById("emoteList").remove();
	};

	$('.components-chat-menu-users').first().append(emotesHTML).ready(function () {
		$('#emoteGroups .title').click(function () {
			let title = $( this ).attr( "title" )

			foldEmoteGroup($(this).find('.foldArrow')[0], title)
		})    

	});
	
	// closes the emote panel when his outside is clicked

	$(document).click(function(event) { 
		var $target = $(event.target);

		if($target.attr('id') == 'emotes-icon') return
		
		if($target.attr('id') != 'emotes-icon' &&
		 !$target.closest('#emoteList').length && 
		$('#emoteList').is(":visible")) {
			console.log('hide')
		  $('#emoteList').hide();
		}   

	});
	
//	document.getElementById("channelIcon").style.backgroundImage = `url(${document.querySelector('.channel-top-bar .components-avatar-image').src}`

}


function twitchChat(){

	twitchChatHTML = 
	`<div id="twitchchat" class="btn-ellipsis">
		<div  onclick="window.open('https://www.twitch.tv/popout/${channel.name}/chat?popout=','popup','width=400,height=660');" class="components-icon components-icon-channel-more">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#adadba" d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
		</div>
	</div>`

	if (document.body.contains(document.getElementById("twitchchat"))){
		document.getElementById("twitchchat").remove();
	};

	$('.channel-profile-btns').append(twitchChatHTML)

}

function insertChannelPanels(channel) {
	console.log("[BOOYAH.TV] inserting panels");

	// Panels DOM

	if (channel.panels) {

		var panelsHTML = ''
		
		channel.panels.forEach(panel => {
			panelsHTML += createPanelHTML(panel)
		})

		if(channel.leaderboard){
			var table = $('<table class="rank-table" id="leaderboard">');
			
			fetch(pointsBaseURL + channel.name)
				.then(response => response.json())
				.then(userPoints => {
					userPoints.forEach((user,index) =>{
						//if(index > 14) return

						var row = $(`
						<tr class="rank-tr">
							<td class="rank-td rank"><span>#</span>${user[0].replace('#','')}</td>
							<td class="rank-td rank-color">
								${ index == 0 ? "<img class='rank-emote' src='https://cdn.betterttv.net/emote/6044e31b306b602acc598811/3x'/> " : ""}
								${ index == 1 ? "<img class='rank-emote-secound' src='https://cdn.frankerfacez.com/emote/318914/4'/> " : ""}
								 ${ user[1] }${ index == 497 ? "<img class='rank-emote' src='https://cdn.frankerfacez.com/emote/590273/1'/> " : ""}</td>
							<td class="rank-td rank-points">${user[3]}</td>
						</tr>
						`)
						
						table.append(row)

					})

					$('#table-container').append(table)
				}).catch(function(err) {
				
					
					$('#leaderboard-container').remove()

				});
				
				
		}

		$('.channel-box').first().append(panelsHTML);

	}
}

function insertClipBtn(parent){


	var clipBtnHTML = `

		<!-- Modal HTML embedded directly into document -->
		<div id="clipModal" class="modal" style="z-index: 100;">
		<div id="clipMessage" style="display:none">¡link del clip copiado!</div>
		<h1><svg width="48px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><g><path fill="#e6269c" d="M14.594 4.495l-.585-1.91L15.922 2l.585 1.91-1.913.585zM11.14 3.46l.585 1.911 1.913-.584-.585-1.91-1.913.583zM8.856 6.247l-.584-1.91 1.912-.584.585 1.91-1.913.584zM5.403 5.213l.584 1.91L7.9 6.54l-.585-1.911-1.912.584zM2.534 6.09L3.118 8l1.913-.584-.585-1.91-1.912.583zM5 9H3v7a2 2 0 002 2h10a2 2 0 002-2V9h-2v7H5V9z"></path><path fill="#e6269c" d="M8 9H6v2h2V9zM9 9h2v2H9V9zM14 9h-2v2h2V9z"></path></g></svg>Crear Clip.</h1>
		<div>
		Nombre: 
		<input id="clipName" pleaceholder=""></input>
		</div>
		<button class="components-button components-button-size-small components-button-type-outlined-dark desktop components-button-inline components-button-has-icon" id="clipBtn">Copiar link del clip</button>
		</div>

		<a href="#clipModal"  id="createClip" rel="modal:open" title="Crear Clip" target="_blank" class="createclip components-button components-button-size-small components-button-type-outlined-dark desktop components-button-inline components-button-has-icon">
		<span class="button-content">
		<i class="follow-btn-divider"></i>Crear Clip
		</span>
		</a>
	`;
	
	parent.first().append(clipBtnHTML).ready(function () {
		
		clipBtn.addEventListener('click', function(event) {
			var clipBtn = document.querySelector('#clipBtn');
			var clipName = document.querySelector('#clipName');
			var clipMessage = document.querySelector('#clipMessage');

			console.log('clip '+clipName.value)
			
			if(clipName.value == "") return

			var nicknameParam = ''

			
			if(selfUsername !== null){
				nicknameParam = `&nickname=${selfUsername.replaceAll(' ','+')}`
			}


			var video = document.getElementById("vjs_video_3_html5_api");

			copyTextToClipboard( `${window.location.href.split('?')[0]}?timestamp=${Math.floor(video.currentTime)}&clipname=${clipName.value.replaceAll(' ','+')}${nicknameParam}`);
			
			clipMessage.style.display = "block"

			setTimeout(function(){
				clipMessage.style.display = "none"
			},5000)
		});
		
	});
}

function insertVOD(currentURL) {
	const segments = new URL(currentURL).pathname.split("/");
	const VODID = segments.pop() || segments.pop(); // Handle potential trailing slash

	let url = `https://booyah.live/api/v3/playbacks/${VODID}`;

	setTimeout(function(){

		var url = new URL(currentURL);

		var timestamp = url.searchParams.get("timestamp");
		var clipname = url.searchParams.get("clipname");
		var nickname = url.searchParams.get("nickname");

		console.log(clipname)
		
		if(timestamp){
			var video = document.getElementById("vjs_video_3_html5_api"); //factorise selectors to consts
			video.currentTime = timestamp; // set time (in secounds)
		}

		if(nickname){
			nickname = nickname.replaceAll('+',' ')
			document.querySelector('.video-date-count').innerHTML ='clipeado por ' + nickname
		}

		if(clipname){
			document.querySelector('.video-bottom .video-title').innerHTML = '<span style="color:#4949ff">[CLIP]</span> ' + clipname.replaceAll('+',' ')
		}
	},2000)


	if (!$("#createClip").length) {
		insertClipBtn($(".video-btns"))
	}

	console.log(VODID, url);

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
		
		var resolution = data.playback.endpoint_list[0].resolution; // 1080
		var downloadurl = data.playback.endpoint_list[0].download_url;

		// todo crear inicio/fin del clip
		

		var vodHTML = `
		<a id="downloadVOD" title="Desacargar VOD en ${resolution}p" target="_blank" download="${data.playback.name}.mp4" href="${downloadurl}" class="downloadvod components-button components-button-size-small components-button-type-outlined-dark desktop components-button-inline components-button-has-icon">
			<span class="button-content">
			<i class="follow-btn-divider"></i>Descargar VOD
			</span>
		</a>`

		if (!$("#downloadVOD").length) {
			
			$(".video-btns").first().append(vodHTML)
			
		}

	});
}

function setTextareaValue(message, isAdd) {
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
	if(isAdd){
		setNativeValue(textarea, textarea.value + message)
	}else{
		setNativeValue(textarea, message)
	}

	textarea.dispatchEvent(new Event('input', { bubbles: true }))
}

function tagUserByMessage(usernameContainer) {
	console.log(usernameContainer.textContent);

	setTextareaValue('@'+usernameContainer.textContent +' ', true)
	
}  

// keyboard events

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
//	console.log(messageLog)
}

function retriveMessage(){

	if (messageLog.length < 1) return

	setTextareaValue(messageLog[messageCursor], false)

	setTimeout(() => {
		moveTextareCursor(document.getElementsByTagName('textarea')[0])
	}, 10);

	if(messageCursor < messageLog.length -1){
		messageCursor += 1
	}
}

// Let users close emote list with Escape and Enter if is focusing the textarea.
document.addEventListener('keydown', (event) => {
	// dummy element
	var txtArea =  document.getElementsByTagName('textarea')[0]
	
	var autocomplete = document.getElementsByClassName('ui-autocomplete')[0]

	if ( event.code === 'Escape' || ( event.code === 'Enter' || event.code === 'NumpadEnter') && document.activeElement === txtArea) {		
		toggleEmotePanel(false)
	}

	
	if ( (event.code === 'Enter' || event.code === 'NumpadEnter') && document.activeElement === txtArea ) {
		saveMessage()
		
	}

	if ( event.code === 'ArrowUp' && document.activeElement === txtArea && autocomplete.style.display == 'none' ) {
		//TODO: volver a colocarlo
		//retriveMessage()
		
	}

});

//  AUTOCOMPLETE


(function ($) {
	// Extend the autocomplete widget, using our own application namespace.
	$.widget("app.autocomplete", $.ui.autocomplete, {
	  // The _renderItem() method is responsible for rendering each
	  // menu item in the autocomplete menu.
	  _renderItem: function (ul, item) {
		// We want the rendered menu item generated by the default implementation.
		var result = this._super(ul, item);
  
		// If there is logo data, add our custom CSS class, and the specific
		// logo URL.
  
		if (item.img) {
		  result
			.find("a")
			.addClass("ui-menu-item-icon")
			.css("background-image", "url(" + item.img + ")");
		}
  
		return result;
	  },
	});
  })(jQuery);
  

function formatEmotesToAutocomplete() {
	let emotes = []

	twitchEmotes.forEach(emote => {
		emotes.push({
			label: emote.name,
			img: `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`,
		})
	})

	booyahtvEmotes.forEach(emote => {

		if (emote.url) {
			url = emote.url
		} else {
			url = `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`;
		}

		emotes.push({
			label: emote.name,
			img: url,
		})
	})

	channelSubsEmotes.forEach(emote => {
		emotes.push({
			label: emote.code,
			img: `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`,
		})
	})

	bttvGlobalEmotes.forEach(emote => {
		emotes.push({
			label: emote.code,
			img: `https://cdn.betterttv.net/emote/${emote.id}/3x`,
		})
	})

	bttvChannelEmotes.forEach(emote => {
		emotes.push({
			label: emote.code,
			img: `https://cdn.betterttv.net/emote/${emote.id}/3x`,
		})
	})


	frankerFaceZ.forEach(emote => {
		emotes.push({
			label: emote.name,
			img: `https://cdn.frankerfacez.com/emote/${emote.id}/2`,
		})
	})

	return emotes
}

function initAutocomplete(){
	// add twitch, booyahtv, subs, bttv global, bttv channel, ffz emotes
	// to the autocomplete list

	var emotes = formatEmotesToAutocomplete()

	function split(val) {
		return val.split(/ \s*/);
	}
	function extractLast(term) {
		return split(term).pop();
	}

	// inject results div
	$(".components-desktop-chatroom").first().after(`<div id="results"></div>`);

	$(".components-input-element")
	.on("keydown", function (event) {
		if (
			event.keyCode === $.ui.keyCode.TAB &&
			$(this).autocomplete("instance").menu.active
		) {
			event.preventDefault();
		}
	})
	.autocomplete({
		appendTo: "#results",
		minLength: 2,
		delay: 100,
		highlightItem: true,
		position: { my: "left bottom", at: "left top", collision: "flip" },

		open: function () {
			var position = $("#results").position(),
				left = position.left

			$("#results > ul").css({
				left: left + "px",

			});

			toggleEmotePanel(false)
		},
		source: function (request, response) {
		   var results = $.ui.autocomplete.filter(emotes, extractLast(request.term))

		   /*var results = $.map(emotes, function (emote) {
				if (emote.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
					return emote;
				}
			});
			*/
			results = results.slice(0, 10)

			response(results);

		},
		focus: function (event, ui) {
			// prevent value inserted on focus
			$(".ui-helper-hidden-accessible").hide();
			event.preventDefault();

			return false;
		},
		select: function (event, ui) {
			var terms = split(this.value);
			console.log(terms);
			// remove the current input
			terms.pop();
			// add the selected item
			terms.push(ui.item.value);
			// add placeholder to get the space at the end
			terms.push("");
			this.value = terms.join(" ");

			setTextareaValue('',true)
			return false;
		},
	});

}

// //init estension when the page is first loaded

initExtension();


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