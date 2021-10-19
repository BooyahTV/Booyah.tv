
function addLogo() {    
    var logo = document.querySelector('.logo'); // esto busca el logo en la pagina

    var gratings = document.createElement('div');
    var esqueleto = document.createElement('div');

    esqueleto.innerHTML = `
    <img id="logo_esqueleto" src="https://cdn.betterttv.net/emote/5df2af0691129e77b47cd3d3/1x" alt="site logo" style="
    padding-left: 10px!important;">`

    
    
    gratings.innerHTML = `
    <h1 style="
    position: absolute;
    font-size: 10px;
    left: 0px;
    top: 33px;
    color: white;
    width: 200px;
    " id="grattings">¡Feliz Halloween! <img style="width:16px" src="https://cdn.frankerfacez.com/emote/525473/1"></img></h1>
    `

    if(!document.getElementById('logo_esqueleto')){
    while(esqueleto.firstChild) {
        
            logo.appendChild(esqueleto.firstChild);
        }
    }   
    
    if(!document.getElementById('grattings')){                
    while(gratings.firstChild) {
            logo.appendChild(gratings.firstChild);
        }
    }
        
}
    setTimeout(function(){

        addLogo()
    },1000)

setInterval(function() {
    addLogo()
},3000)
