/* ==============================
 GYM FITNESS EVERY DAY
 SISTEMA TV INDOOR
==============================*/


const CONFIG = {

    // MONIQUE AQUI!
    // Tempo dos anúncios principais
    // 15000 = 15 segundos
    tempoAnuncio:15000,


    // MONIQUE AQUI!
    // Tempo painel lateral
    tempoPainel:8000,



    // MONIQUE AQUI!
    // Coloque aqui as imagens da pasta:
    // assets/anuncios/

    anuncios:[

        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio1.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio2.jpeg",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio3.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio4.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio5.jpeg",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio6.png",

        // deixe preparado para novos clientes

        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio7.jpeg",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio8.jpeg",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/anuncio9.jpeg"
        

    ],




    // MONIQUE AQUI!
    // Imagens da lateral:
    // assets/painel/

    painel:[

        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral1.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral2.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral3.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral4.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral5.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral6.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral7.png",
        "https://github.com/WillianCPereira/anuncios-gymfitness/blob/main/lateral8.png"
        

    ],





    // MONIQUE AQUI!
    // Avisos da barra inferior

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


let texto = agora.toLocaleDateString(
"pt-BR",
{

timeZone:"America/Sao_Paulo",

weekday:"long",

day:"2-digit",

month:"2-digit",

year:"numeric"

});


texto =
texto.charAt(0).toUpperCase()
+
texto.slice(1);



document.getElementById("date").innerText =
texto;

}








/* ==============================
 HORÁRIO DA ACADEMIA
==============================*/


function horarioAcademia(dia){


    // MONIQUE AQUI!
    // Segunda a sexta

    if(dia >=1 && dia <=5){

        return {

        abre:5,

        fecha:24,

        texto:"05h às 00h"

        };

    }



    // MONIQUE AQUI!
    // Sábado

    if(dia ===6){

        return {

        abre:7,

        fecha:17,

        texto:"07h às 17h"

        };

    }



    // MONIQUE AQUI!
    // Domingo e feriado

    return {

    abre:8,

    fecha:14,

    texto:"08h às 14h"

    };


}







function atualizarFuncionamento(){


const dias=[

"DOMINGO",
"SEGUNDA-FEIRA",
"TERÇA-FEIRA",
"QUARTA-FEIRA",
"QUINTA-FEIRA",
"SEXTA-FEIRA",
"SÁBADO"

];



const agora=new Date();

const dia=agora.getDay();

const h=horarioAcademia(dia);




let abertura=new Date();

abertura.setHours(
h.abre,0,0,0
);



let fechamento=new Date();


if(h.fecha===24){

fechamento.setDate(
fechamento.getDate()+1
);

fechamento.setHours(
0,0,0,0
);


}else{


fechamento.setHours(
h.fecha,0,0,0
);


}





const titulo =
document.getElementById("funcTitulo");


const contador =
document.getElementById("contadorFechamento");


const dot =
document.getElementById("statusDot");


document.getElementById("diaSemana").innerText =
dias[dia];


document.getElementById("horarioHoje").innerText =
h.texto;




if(
agora >= abertura &&
agora < fechamento
){


let falta =
fechamento - agora;


titulo.innerText =
"ABERTO AGORA";


contador.className =
"countdown";


contador.innerText =
tempo(falta);


dot.classList.remove("closed");



}else{



titulo.innerText =
"FECHADO AGORA";


contador.className =
"status-fechado";


contador.innerText =
"FECHADO";


dot.classList.add("closed");


document.getElementById("miniLabels")
.style.display="none";


}


}








function tempo(ms){


let total =
Math.floor(ms/1000);


let h =
Math.floor(total/3600);


let m =
Math.floor(
(total%3600)/60
);


let s =
total%60;



return (

String(h).padStart(2,"0")
+
":"
+
String(m).padStart(2,"0")
+
":"
+
String(s).padStart(2,"0")

);


}










/* ==============================
 SLIDES
==============================*/


function criarSlides(
id,
classe,
pasta,
lista,
dots=false
){



const area =
document.getElementById(id);



const dotArea =
document.getElementById(
"slideDots"
);



lista.forEach(
(arquivo,i)=>{



let slide =
document.createElement("div");


slide.className =
classe;



if(i===0)
slide.classList.add("active");




slide.innerHTML =
`
<img src="${pasta}${arquivo}">
`;



area.appendChild(slide);




if(dots){


let d =
document.createElement("div");


d.className="slide-dot";


if(i===0)
d.classList.add("active");



dotArea.appendChild(d);


}



});


}









function rodarSlides(
seletor,
dotSeletor,
tempo
){


const slides =
document.querySelectorAll(seletor);


const dots =
dotSeletor ?
document.querySelectorAll(dotSeletor)
:
null;



let atual=0;



setInterval(()=>{


slides[atual]
.classList.remove("active");



if(dots)
dots[atual]
.classList.remove("active");




atual =
(atual+1)
%
slides.length;




slides[atual]
.classList.add("active");



if(dots)
dots[atual]
.classList.add("active");



},tempo);



}










/* AVISOS */


function carregarAvisos(){


let hora =
new Date().getHours();



let frase;


if(hora <12){

frase =
"☀️ Bom dia! Vamos começar o dia com energia";

}

else if(hora <18){

frase =
"💪 Continue firme no seu objetivo";

}

else{

frase =
"🌙 Ainda dá tempo de cuidar de você hoje";

}



document.getElementById("tickerText")
.innerText =

[
frase,
...CONFIG.avisos

].join(" • ");


}









/* AJUSTAR TV */

function ajustarTela(){


let escala =
Math.min(

window.innerWidth/1920,

window.innerHeight/1080

);



document.querySelector(".overlay")
.style.transform =

`translate(-50%,-50%) scale(${escala})`;


}









/* INICIAR SISTEMA */


atualizarData();

atualizarFuncionamento();

carregarAvisos();



criarSlides(
"adArea",
"ad-slide",
"assets/anuncios/",
CONFIG.anuncios,
true
);



criarSlides(
"painelArea",
"painel-slide",
"assets/painel/",
CONFIG.painel
);




rodarSlides(
".ad-slide",
".slide-dot",
CONFIG.tempoAnuncio
);



rodarSlides(
".painel-slide",
null,
CONFIG.tempoPainel
);




ajustarTela();





setInterval(
atualizarData,
1000
);


setInterval(
atualizarFuncionamento,
1000
);


setInterval(
carregarAvisos,
60000
);



window.addEventListener(
"resize",
ajustarTela
);



document.addEventListener(
"click",
()=>{

document.documentElement
.requestFullscreen();

},
{once:true}

);
