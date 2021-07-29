var url = window.location.href;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "TabUpdated") {
    console.log("====================PAGE CHANGED====================");
    if (url != request.url) {
      insertDOM();
    }

    url = request.url;
  }
});

//init estension when the page is first loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", insertDOM);
} else {
  insertDOM();
}

function insertDOM() {
  setTimeout(function () {
    if ($(".video-btns").first().length) {
      console.log("[BOOYAH.TV] insert VOD");
      
      var currentURL = window.location.href

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
  }, 3000);
}
