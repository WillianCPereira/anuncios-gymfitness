/* ==============================
   GYM FITNESS EVERY DAY
   SISTEMA TV INDOOR
   IMAGENS + VÍDEOS
================================*/

const CONFIG = {
    // MODIFIQUE AQUI!
    // Tempo das imagens principais. Vídeos passam ao terminar.
    tempoAnuncio:15000,

    // MODIFIQUE AQUI!
    // Tempo das imagens do painel lateral.
    tempoPainel:8000,

    // MODIFIQUE AQUI!
    // Arquivos da pasta assets/anuncios/
    // Aceita: png, jpg, jpeg, webp, mp4, webm, ogg.
    // Para vídeos, use o formato mp4 para melhor compatibilidade.
    
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
        
    ],

    // MODIFIQUE AQUI!
    // Arquivos da pasta assets/painel/
    painel:[
        "lateral1.png",
        "lateral2.png",
        "lateral3.png",
        "lateral4.png",
        "lateral5.png",
        "lateral6.png",
        "lateral7.png",
        "lateral8.png"
    ],

    // MODIFIQUE AQUI!
    // Avisos fixos da barra inferior.
    avisos:[
        "💧 Beba água durante seu treino",
        "🏋️ Precisou de ajuda? Chame um instrutor",
        "📲 Baixe nosso aplicativo",
        "🔥 Disciplina vence motivação",
        "❤️ Sua saúde é seu maior investimento",
        "📢 Anuncie aqui para mais de 3 mil pessoas por semana"
    ]
};

/* DATA */
function atualizarData(){
    const agora = new Date();

    let texto = agora.toLocaleDateString("pt-BR",{
        timeZone:"America/Sao_Paulo",
        weekday:"long",
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    });

    texto = texto.charAt(0).toUpperCase() + texto.slice(1);
    document.getElementById("date").innerText = texto;
}

/* FUNCIONAMENTO */
function horarioAcademia(dia){
    // Segunda a sexta
    if(dia >= 1 && dia <= 5){
        return {abre:5, fecha:24, texto:"05h às 00h"};
    }

    // Sábado
    if(dia === 6){
        return {abre:7, fecha:17, texto:"07h às 17h"};
    }

    // Domingo e feriado
    return {abre:8, fecha:14, texto:"08h às 14h"};
}

function atualizarFuncionamento(){
    const dias = [
        "DOMINGO",
        "SEGUNDA-FEIRA",
        "TERÇA-FEIRA",
        "QUARTA-FEIRA",
        "QUINTA-FEIRA",
        "SEXTA-FEIRA",
        "SÁBADO"
    ];

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

    const titulo = document.getElementById("funcTitulo");
    const contador = document.getElementById("contadorFechamento");
    const dot = document.getElementById("statusDot");
    const miniLabels = document.getElementById("miniLabels");

    document.getElementById("diaSemana").innerText = dias[dia];
    document.getElementById("horarioHoje").innerText = horario.texto;

    if(agora >= abertura && agora < fechamento){
        titulo.innerText = "ABERTO AGORA";
        contador.className = "countdown";
        contador.innerText = formatarTempo(fechamento - agora);
        dot.classList.remove("closed");
        miniLabels.style.display = "flex";
    }else{
        titulo.innerText = "FECHADO AGORA";
        contador.className = "status-fechado";
        contador.innerText = "FECHADO";
        dot.classList.add("closed");
        miniLabels.style.display = "none";
    }
}

function formatarTempo(ms){
    const total = Math.max(0,Math.floor(ms / 1000));
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const segundos = total % 60;

    return (
        String(horas).padStart(2,"0") + ":" +
        String(minutos).padStart(2,"0") + ":" +
        String(segundos).padStart(2,"0")
    );
}

/* AVISOS */
function carregarAvisos(){
    const hora = new Date().getHours();
    let frase;

    if(hora >= 5 && hora < 12){
        frase = "☀️ Bom dia! Vamos começar o dia com energia";
    }else if(hora >= 12 && hora < 18){
        frase = "💪 Continue firme no seu objetivo";
    }else{
        frase = "🌙 Ainda dá tempo de cuidar de você hoje";
    }

    document.getElementById("tickerLabel").innerText = "GYM INFORMA!";
    document.getElementById("tickerText").innerText = [
        frase,
        ...CONFIG.avisos
    ].join(" • ");
}

/* SLIDES: IMAGEM + VÍDEO */
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

function criarSlides(containerId,classe,pasta,lista,usarDots=false){
    const container = document.getElementById(containerId);
    const dotsBox = usarDots ? document.getElementById("slideDots") : null;

    lista.forEach((arquivo,index)=>{
        const slide = document.createElement("div");
        slide.className = classe;

        if(index === 0){
            slide.classList.add("active");
        }

        if(ehVideo(arquivo)){
            slide.innerHTML = `
                <video muted playsinline preload="auto">
                    <source src="${pasta}${arquivo}" type="${tipoVideo(arquivo)}">
                </video>
            `;
        }else{
            slide.innerHTML = `<img src="${pasta}${arquivo}" alt="Slide ${index + 1}">`;
        }

        if(usarDots){
            container.insertBefore(slide,dotsBox);

            const dot = document.createElement("div");
            dot.className = "slide-dot";

            if(index === 0){
                dot.classList.add("active");
            }

            dotsBox.appendChild(dot);
        }else{
            container.appendChild(slide);
        }
    });
}

function iniciarRotacao(seletor,seletorDots,tempoImagem){
    const slides = document.querySelectorAll(seletor);
    const dots = seletorDots ? document.querySelectorAll(seletorDots) : null;

    let index = 0;
    let timer = null;

    if(slides.length <= 1){
        tocarVideoAtivo(slides[0]);
        return;
    }

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
        if(dots) dots[index].classList.remove("active");

        pararVideos();

        index = novoIndex;

        slides[index].classList.add("active");
        if(dots) dots[index].classList.add("active");

        const video = slides[index].querySelector("video");

        if(video){
            video.currentTime = 0;
            video.play().catch(()=>{
                timer = setTimeout(proximoSlide,tempoImagem);
            });
            video.onended = proximoSlide;
        }else{
            timer = setTimeout(proximoSlide,tempoImagem);
        }
    }

    function proximoSlide(){
        mostrarSlide((index + 1) % slides.length);
    }

    mostrarSlide(0);
}

function tocarVideoAtivo(slide){
    if(!slide) return;

    const video = slide.querySelector("video");

    if(video){
        video.currentTime = 0;
        video.play().catch(()=>{});
    }
}

/* AJUSTE DE TELA */
function ajustarTela(){
    const escala = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
    );

    document.querySelector(".overlay").style.transform =
        `translate(-50%,-50%) scale(${escala})`;
}

/* INICIAR */
atualizarData();
atualizarFuncionamento();
carregarAvisos();

criarSlides("adArea","ad-slide","assets/anuncios/",CONFIG.anuncios,true);
criarSlides("painelArea","painel-slide","assets/painel/",CONFIG.painel,false);

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
