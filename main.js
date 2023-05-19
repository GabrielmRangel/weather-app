const conteiner = document.querySelector('[data-container]');
const pesquisaBotao = document.querySelector('[data-pesquisa]');
const caixaClima = document.querySelector('[data-caixa-clima]');
const climaDetalhes = document.querySelector('[data-clima-detalhes]');
const erro = document.querySelector('[data-nao-encontrado]');

pesquisaBotao.addEventListener('click', () => {
    const APIKey = '1f6d5f2050fa30b664a99b2aac771b75';
    const cidade = document.querySelector('[data-container-input]').value;

    if(cidade === ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`).then(resposta => resposta.json()).then(json => {
        if(json.cod === '404'){
            conteiner.style.height = '400px';
            caixaClima.style.display = 'none';
            climaDetalhes.style.display = 'none';
            erro.style.display = 'block';
            erro.classList.add('fadeIn');
            return;
        }

        erro.style.display = 'none';
        erro.classList.remove('fadeIn');

        const imagem = document.querySelector('[data-caixa-clima-img]');
        const temperatura = document.querySelector('[data-caixa-clima-temperatura]');
        const descricao = document.querySelector('[data-caixa-clima-descricao]');
        const umidade = document.querySelector('[data-clima-detalhes-umidade]');
        const vento = document.querySelector('[data-clima-detalhes-vento]');

        switch(json.weather[0].main){
            case 'Clear':
                imagem.src = 'img/clear.png';
            break;

            case 'Rain':
                imagem.src = 'img/rain.png';
            break;

            case 'Snow':
                imagem.src = 'img/snow.png';
            break;

            case 'Clouds':
                imagem.src = 'img/cloud.png';
            break;

            case 'Haze':
                imagem.src = 'img/mist.png';
            break;

            default:
                imagem.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        caixaClima.style.display = '';
        climaDetalhes.style.display = '';
        caixaClima.classList.add('fadeIn');
        climaDetalhes.classList.add('fadeIn');
        conteiner.style.height = "590px";
    });
})