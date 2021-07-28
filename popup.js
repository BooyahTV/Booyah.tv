chrome.runtime.sendMessage({ type: "getUID" }, function (uid) {
  if (typeof uid == "undefined") {
    // That's kind of bad
  } else {
    console.log(uid);

    var channels = []

    let url = `https://booyah.live/api/v3/users/${uid}/followings?cursor=0&count=50`;

    // fetch the user following channels

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        channels = json["following_list"];

        var channelsContainer = document.getElementById("channels")

        var channelHTML = "";

        channels.forEach((channel) => {
          channelHTML += `
          <div class="channel" title="${channel.name}" id="${channel.uid}">
          <button id="goto_${channel.uid}">
            <img class="icon" src="${channel.thumbnail}"></img>
            <span class="nickname"> ${channel.nickname}</span>
          </button>
          <div id="live_${channel.uid}" class="live"></div>
        </div>        
        `;
      });
      
      
      channelsContainer.innerHTML = channelHTML;
      channels.forEach(function(channel){
        document.getElementById("goto_"+channel.uid).addEventListener("click", function(){ gotostream(channel.uid)});
      })

        // fetch the channel streaming data (is live, stream name,etc)
        
        channels.forEach(channel => {
          let url =  `https://booyah.live/api/v3/channels/${channel.uid}`

          fetch(url)
          .then((response) => response.json())
          .then((json) => { 

            let stream = json['channel']
            
            console.log(channel)
            
            document.getElementById(stream.channel_id).setAttribute('title',stream.name);


            if(stream.is_streaming){
              document.getElementById('live_'+stream.channel_id).style.display = 'inline-block'
            }
            

          })
        })

      });

     

  }
});

function gotostream(uid){
  chrome.tabs.create({active: true, url: `https://booyah.live/channels/${uid}`});
}