const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const musicaFocoInput = document.querySelector("#alternar-musica")
const startPausebt = document.querySelector("#start-pause")
const iniciarPausarbt = document.querySelector("#start-pause")
const tempoNatela = document.querySelector("#timer")
let tempoDecorridoEmsegundos = 1500
let intervaloID = null

const musica = new Audio("/sons/luna-rise-part-one.mp3")
musica.loop = true;
const audioPlay = new Audio("/sons/play.wav")
const audioPause = new Audio("/sons/pause.mp3")
const audioTempoFinalizado = new Audio("/sons/tempo-finalizado.mp3")

musicaFocoInput.addEventListener("change", function() {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmsegundos = 1500
    alterarContexto("foco")
    focoBt.classList.add("active")
})


curtoBt.addEventListener("click",() => {
    tempoDecorridoEmsegundos = 300
    alterarContexto("curto")
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click",() => {
    tempoDecorridoEmsegundos = 900
    alterarContexto("longo")
    longoBt.classList.add("active")
});

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(botao){
        botao.classList.remove("active")
    })
    html.setAttribute("data-contexto",contexto)
    const nomeImagem = contexto === "curto" ? "descanso-curto" : contexto === "longo" ? "descanso-longo" : contexto
    banner.setAttribute("src",`./imagens/${nomeImagem}.png`)
    switch(contexto){
        case"foco":            
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case"curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case"longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmsegundos <= 0){
        alert("Tempo finalizado")
            zerar()
        return
    }
    tempoDecorridoEmsegundos -= 1
    mostrarTempo()
}

startPausebt.addEventListener("click", iniciarOupausar)

function iniciarOupausar(){
    if(intervaloID){
        zerar()
        return
    }
    audioPlay.play()
    intervaloID = setInterval(contagemRegressiva,1000)
    iniciarPausarbt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloID)
    iniciarPausarbt.textContent = "Começar"
    intervaloID = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR",{minute:"2-digit", second:"2-digit"})
    tempoNatela.innerHTML =` ${tempoFormatado}`
}
mostrarTempo()