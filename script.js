/* GYM FITNESS EVERY DAY - TV INDOOR */

const CONFIG = {
    tempoAnuncio:15000,
    tempoPainel:8000,

    // MODIFIQUE AQUI! Anúncios centrais: imagens ou vídeos
    anuncios:[
        "anuncio1.png",
        "anuncio2.jpeg",
        "anuncio3.png",
        "anuncio4.png",
        "anuncio5.jpeg",
        "anuncio6.png",
        "anuncio7.jpeg",
        "anuncio8.jpeg",
        "anuncio9.jpeg",
        "anuncio10.jpeg",
        "anuncio11.jpeg",
        "anuncio12.jpeg",
        "anuncio13.jpeg",
        "anuncio14.jpeg",
        "anuncio15.jpeg",
        "anuncio16.jpeg"
    ],


    // MODIFIQUE AQUI! Painel lateral: imagens ou vídeos
    painel:[
        "lateral1.png",
        "lateral2.png",
        "lateral3.png",
        "lateral4.png",
        "lateral5.png",
        "lateral6.png",
        "lateral7.png",
        "lateral8.png",
        "lateral9.jpeg",
        "lateral10.jpeg",
        "lateral11.jpeg",
        "lateral12.jpeg",
        "lateral13.jpeg",
        "lateral14.jpeg",
        "lateral15.jpeg",
        "lateral16.jpeg",
        "lateral17.jpeg",
        "lateral18.jpeg",
        "lateral19.jpeg",
        "lateral20.jpeg"
    ],

    // MODIFIQUE AQUI! Temporário: aniversário, promoção ou aviso por tempo limitado
    temporario:{
        ativo:true,
        arquivo:"aniversariante1.jpeg",
        inicio:"2026-06-15T08:00:00",
        duracaoHoras:24,
        tempoNaTela:12000
    },

    avisos:[
        "💧 Beba água durante seu treino",
        "🏋️ Precisou de ajuda? Chame um instrutor",
        "📲 Baixe nosso aplicativo",
        "🔥 Disciplina vence motivação",
        "❤️ Sua saúde é seu maior investimento",
        "📢 Anuncie aqui para mais de 3 mil pessoas por semana"
    ]
};

const PASTAS = {
    anuncios:"assets/anuncios/",
    painel:"assets/painel/",
    temporarios:"assets/temporarios/"
};

function atualizarData(){
    const dataBox = document.getElementById("date");
    if(!dataBox) return;

    let texto = new Date().toLocaleDateString("pt-BR",{
        timeZone:"America/Sao_Paulo",
        weekday:"long",
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    });

    dataBox.innerText = texto.charAt(0).toUpperCase() + texto.slice(1);
}

function horarioAcademia(dia){
    if(dia >= 1 && dia <= 5) return {abre:5, fecha:24, texto:"05h às 00h"};
    if(dia === 6) return {abre:7, fecha:17, texto:"07h às 17h"};
    return {abre:8, fecha:14, texto:"08h às 14h"};
}

function atualizarFuncionamento(){
    const dias = ["DOMINGO","SEGUNDA-FEIRA","TERÇA-FEIRA","QUARTA-FEIRA","QUINTA-FEIRA","SEXTA-FEIRA","SÁBADO"];
    const agora = new Date();
    const dia = agora.getDay();
    const horario = horarioAcademia(dia);

    const abertura = new Date(agora);
    abertura.setHours(horario.abre,0,0,0);

    const fechamento = new Date(agora);
    if(horario.fecha === 24){
        fechamento.setDate(fechamento.getDate() + 1);
        fechamento.setHours(0,0,0,0);
    }else{
        fechamento.setHours(horario.fecha,0,0,0);
    }

    const panelBox = document.getElementById("panelBox");
    const titulo = document.getElementById("funcTitulo");
    const contador = document.getElementById("contadorFechamento");
    const dot = document.getElementById("statusDot");
    const miniLabels = document.getElementById("miniLabels");
    const infoLabel = document.getElementById("infoLabel");
    const countLabel = document.getElementById("countLabel");
    const diaSemana = document.getElementById("diaSemana");
    const horarioHoje = document.getElementById("horarioHoje");

    if(!panelBox || !titulo || !contador || !dot || !miniLabels) return;

    panelBox.classList.remove("alerta","urgente","critico","fechado");
    titulo.classList.remove("yellow","orange","red");
    dot.classList.remove("closed","alerta","urgente");

    if(diaSemana) diaSemana.innerText = dias[dia];
    if(horarioHoje) horarioHoje.innerText = horario.texto;

    if(agora >= abertura && agora < fechamento){
        const falta = fechamento - agora;
        const minutosRestantes = Math.floor(falta / 1000 / 60);

        contador.className = "countdown";
        contador.innerText = formatarTempo(falta);
        if(infoLabel) infoLabel.innerText = "HOJE";
        if(countLabel) countLabel.innerText = "ENCERRA EM";
        miniLabels.style.display = "flex";

        if(minutosRestantes <= 10){
            titulo.innerText = "ENCERRANDO";
            titulo.classList.add("red");
            panelBox.classList.add("critico");
            dot.classList.add("closed");
        }else if(minutosRestantes <= 30){
            titulo.innerText = "ÚLTIMOS 30 MIN";
            titulo.classList.add("orange");
            panelBox.classList.add("urgente");
            dot.classList.add("urgente");
        }else if(minutosRestantes <= 60){
            titulo.innerText = "ATENÇÃO";
            titulo.classList.add("yellow");
            panelBox.classList.add("alerta");
            dot.classList.add("alerta");
        }else{
            titulo.innerText = "ABERTO AGORA";
        }
        return;
    }

    titulo.innerText = "FECHADO AGORA";
    titulo.classList.add("red");
    contador.className = "status-fechado";
    contador.innerText = "FECHADO";
    dot.classList.add("closed");
    panelBox.classList.add("fechado");
    miniLabels.style.display = "none";
}

function formatarTempo(ms){
    const total = Math.max(0,Math.floor(ms / 1000));
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const segundos = total % 60;
    return String(horas).padStart(2,"0") + ":" + String(minutos).padStart(2,"0") + ":" + String(segundos).padStart(2,"0");
}

function carregarAvisos(){
    const tickerLabel = document.getElementById("tickerLabel");
    const tickerText = document.getElementById("tickerText");
    if(!tickerText) return;

    const hora = new Date().getHours();
    let frase = "🌙 Ainda dá tempo de cuidar de você hoje";
    if(hora >= 5 && hora < 12) frase = "☀️ Bom dia! Vamos começar o dia com energia";
    else if(hora >= 12 && hora < 18) frase = "💪 Continue firme no seu objetivo";

    if(tickerLabel) tickerLabel.innerText = "GYM INFORMA!";
    tickerText.innerText = [frase,...CONFIG.avisos].join(" • ");
}

function ehVideo(arquivo){
    const extensao = arquivo.split(".").pop().toLowerCase();
    return ["mp4","webm","ogg"].includes(extensao);
}

function tipoVideo(arquivo){
    const extensao = arquivo.split(".").pop().toLowerCase();
    if(extensao === "webm") return "video/webm";
    if(extensao === "ogg") return "video/ogg";
    return "video/mp4";
}

function criarMidia(arquivo,pasta,index){
    if(ehVideo(arquivo)){
        return `<video muted playsinline preload="metadata" onerror="mostrarErroMidia(this,'VÍDEO ${index}')"><source src="${pasta}${arquivo}" type="${tipoVideo(arquivo)}"></video>`;
    }
    return `<img src="${pasta}${arquivo}" alt="Mídia ${index}" onerror="mostrarErroMidia(this,'ARQUIVO ${index}')">`;
}

function mostrarErroMidia(elemento,titulo){
    const slide = elemento.closest(".ad-slide,.painel-slide,.temporario-box");
    if(!slide) return;
    slide.innerHTML = `<div class="media-error">${titulo}<br>NÃO ENCONTRADO</div>`;
}

function criarSlides(containerId,classe,pasta,lista,usarDots=false){
    const container = document.getElementById(containerId);
    if(!container || !Array.isArray(lista) || lista.length === 0) return;

    const dotsBox = usarDots ? document.getElementById("slideDots") : null;

    lista.forEach((arquivo,index)=>{
        if(!arquivo) return;

        const slide = document.createElement("div");
        slide.className = classe;
        if(index === 0) slide.classList.add("active");
        slide.innerHTML = criarMidia(arquivo,pasta,index + 1);

        if(usarDots && dotsBox){
            container.insertBefore(slide,dotsBox);
            const dot = document.createElement("div");
            dot.className = "slide-dot";
            if(index === 0) dot.classList.add("active");
            dotsBox.appendChild(dot);
        }else{
            container.appendChild(slide);
        }
    });
}

function iniciarRotacao(seletor,seletorDots,tempoImagem){
    const slides = document.querySelectorAll(seletor);
    if(!slides.length) return;

    const dots = seletorDots ? document.querySelectorAll(seletorDots) : null;
    let index = 0;
    let timer = null;

    function pararVideos(){
        slides.forEach(slide=>{
            const video = slide.querySelector("video");
            if(video){
                video.pause();
                video.currentTime = 0;
                video.onended = null;
            }
        });
    }

    function mostrarSlide(novoIndex){
        clearTimeout(timer);
        slides[index].classList.remove("active");
        if(dots && dots[index]) dots[index].classList.remove("active");

        pararVideos();
        index = novoIndex;

        slides[index].classList.add("active");
        if(dots && dots[index]) dots[index].classList.add("active");

        const video = slides[index].querySelector("video");
        if(video){
            video.currentTime = 0;
            video.play().catch(()=>{timer = setTimeout(proximoSlide,tempoImagem)});
            video.onended = proximoSlide;
        }else{
            timer = setTimeout(proximoSlide,tempoImagem);
        }
    }

    function proximoSlide(){
        mostrarSlide((index + 1) % slides.length);
    }

    if(slides.length === 1){
        const video = slides[0].querySelector("video");
        if(video) video.play().catch(()=>{});
        return;
    }

    mostrarSlide(0);
}

function temporarioValido(){
    const t = CONFIG.temporario;
    if(!t || !t.ativo || !t.arquivo || !t.inicio || !t.duracaoHoras) return false;

    const agora = new Date();
    const inicio = new Date(t.inicio);
    const fim = new Date(inicio.getTime() + (t.duracaoHoras * 60 * 60 * 1000));
    return agora >= inicio && agora <= fim;
}

function criarTemporarioNoPainel(){
    if(!temporarioValido()) return;

    const panelBox = document.getElementById("panelBox");
    if(!panelBox || document.getElementById("temporarioBox")) return;

    const temporarioBox = document.createElement("div");
    temporarioBox.id = "temporarioBox";
    temporarioBox.className = "temporario-box";
    temporarioBox.innerHTML = criarMidia(CONFIG.temporario.arquivo,PASTAS.temporarios,"TEMPORÁRIO");
    panelBox.parentNode.insertBefore(temporarioBox,panelBox.nextSibling);
}

function alternarFuncionamentoTemporario(){
    const panelBox = document.getElementById("panelBox");
    const temporarioBox = document.getElementById("temporarioBox");
    if(!panelBox || !temporarioBox) return;

    let mostrandoTemporario = false;

    setInterval(()=>{
        if(!temporarioValido()){
            panelBox.style.display = "flex";
            temporarioBox.style.display = "none";
            return;
        }

        mostrandoTemporario = !mostrandoTemporario;

        if(mostrandoTemporario){
            panelBox.style.display = "none";
            temporarioBox.style.display = "flex";
            const video = temporarioBox.querySelector("video");
            if(video){
                video.currentTime = 0;
                video.play().catch(()=>{});
            }
        }else{
            temporarioBox.style.display = "none";
            panelBox.style.display = "flex";
            const video = temporarioBox.querySelector("video");
            if(video){
                video.pause();
                video.currentTime = 0;
            }
        }
    },CONFIG.temporario.tempoNaTela || 12000);
}

function ajustarTela(){
    const overlay = document.querySelector(".overlay");
    if(!overlay) return;

    const escala = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    overlay.style.transform = `translate(-50%,-50%) scale(${escala})`;
}

function iniciarSistema(){
    atualizarData();
    atualizarFuncionamento();
    carregarAvisos();

    criarSlides("adArea","ad-slide",PASTAS.anuncios,CONFIG.anuncios,true);
    criarSlides("painelArea","painel-slide",PASTAS.painel,CONFIG.painel,false);

    criarTemporarioNoPainel();
    alternarFuncionamentoTemporario();

    iniciarRotacao(".ad-slide",".slide-dot",CONFIG.tempoAnuncio);
    iniciarRotacao(".painel-slide",null,CONFIG.tempoPainel);

    ajustarTela();

    setInterval(atualizarData,1000);
    setInterval(atualizarFuncionamento,1000);
    setInterval(carregarAvisos,60000);

    window.addEventListener("resize",ajustarTela);

    document.addEventListener("click",()=>{
        if(document.documentElement.requestFullscreen){
            document.documentElement.requestFullscreen();
        }
    },{once:true});
}

iniciarSistema();
