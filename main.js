const conteiner = document.querySelector('[data-container]');
const pesquisaBotao = document.querySelector('[data-pesquisa]');
const caixaClima = document.querySelector('[data-caixa-clima]');
const climaDetalhes = document.querySelector('[data-clima-detalhes]');
const erro = document.querySelector('[data-nao-encontrado]');

document.addEventListener('keydown', (evento) => {
    if(evento.key === 'Enter'){
        buscaClima();
    }
});

pesquisaBotao.addEventListener('click', buscaClima);

async function buscaClima(){
    const APIKey = '1f6d5f2050fa30b664a99b2aac771b75';
    const cidade = document.querySelector('[data-container-input]').value;
    const msgErro = document.querySelector('[data-erro-msg]');

    if(cidade === ""){
        erroAviso();
        msgErro.innerHTML = "Nenhuma localização inserida!";

        return;
    }

    const consultaApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`);
    const json = await consultaApi.json();

    if(json.cod === '404'){
        erroAviso();
        msgErro.innerHTML = "Localização inválida! :/";

        return;
    }

    erro.style.display = 'none';
    erro.classList.remove('fadeIn');

    const imagem = document.querySelector('[data-caixa-clima-img]');
    const temperatura = document.querySelector('[data-caixa-clima-temperatura]');
    const descricao = document.querySelector('[data-caixa-clima-descricao]');
    const umidade = document.querySelector('[data-clima-detalhes-umidade]');
    const vento = document.querySelector('[data-clima-detalhes-vento]');

    avaliaClima(json, imagem, descricao);
    exibeClima(json, temperatura, umidade, vento);
}

function erroAviso(){
    conteiner.style.height = '400px';
    caixaClima.style.display = 'none';
    climaDetalhes.style.display = 'none';
    erro.style.display = 'block';
    erro.classList.add('fadeIn');
}

function avaliaClima(json, imagem, descricao){
    switch(json.weather[0].main){
        case 'Clear':
            imagem.src = 'img/clear.png';
            imagem.alt = "Sol radiante"
            descricao.innerHTML = "Ensolarado";
        break;

        case 'Rain':
            imagem.src = 'img/rain.png';
            imagem.alt = "Nuvens com chuva leve"
            descricao.innerHTML = "Chovendo";
        break;

        case 'Snow':
            imagem.src = 'img/snow.png';
            imagem.alt = "Nuvens com chuva forte e raios"
            descricao.innerHTML = "Chuva Forte";
        break;

        case 'Clouds':
            imagem.src = 'img/cloud.png';
            imagem.alt = "Sol atrás de uma nuvem"
            descricao.innerHTML = "Nublado";
        break;

        case 'Haze':
            imagem.src = 'img/mist.png';
            imagem.alt = "Neblina e vento"
            descricao.innerHTML = "Neblina";
        break;

        default:
            imagem.src = '';
    }
}

function exibeClima(json, temperatura, umidade, vento){
    temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
    // descricao.innerHTML = `${json.weather[0].description}`;
    umidade.innerHTML = `${json.main.humidity}%`;
    vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    conteiner.style.height = "590px";
    caixaClima.classList.add('fadeIn');
    caixaClima.style.display = '';
    climaDetalhes.style.display = '';
    climaDetalhes.classList.add('fadeIn');
}