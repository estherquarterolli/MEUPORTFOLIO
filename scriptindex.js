
        
        document.addEventListener('DOMContentLoaded', () => {
            // Barra de Progresso de Scroll
            const scrollProgressBar = document.getElementById('scroll-progress-bar');
            if (scrollProgressBar) {
                window.addEventListener('scroll', () => {
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    if (scrollHeight > 0) {
                        const scrolled = (scrollTop / scrollHeight) * 100;
                        scrollProgressBar.style.width = scrolled + '%';
                    } else {
                        scrollProgressBar.style.width = '0%'; // Caso não haja scroll
                    }
                });
            }

            // Efeito de Digitação no Hero
            const heroTituloElement = document.getElementById('hero-titulo');
            if (heroTituloElement) {
                const textoOriginal = heroTituloElement.textContent;
                heroTituloElement.textContent = ''; // Limpa para iniciar a digitação
                let i = 0;
                function typeWriter() {
                    if (i < textoOriginal.length) {
                        heroTituloElement.textContent += textoOriginal.charAt(i);
                        i++;
                        setTimeout(typeWriter, Math.random() * 100 + 50); // Velocidade de digitação variada
                    } else {
                        heroTituloElement.classList.add('typing-effect'); // Adiciona classe para o cursor após terminar
                    }
                }
                setTimeout(typeWriter, 500); // Inicia após um pequeno delay
            }

            // Atualiza o ano no rodapé
            const anoAtualEl = document.getElementById('ano-atual');
            if (anoAtualEl) {
                anoAtualEl.textContent = new Date().getFullYear();
            }

            // Links de Navegação Ativos
            const navLinks = document.querySelectorAll('.nav-link');
            const currentPath = window.location.pathname.split("/").pop() || "index.html"; // Pega o nome do arquivo atual
            navLinks.forEach(link => {
                link.classList.toggle('ativo', link.getAttribute('href') === currentPath);
            });

            // Alternador de Tema (Claro/Escuro)
            const botaoTema = document.getElementById('botao-tema');
            const iconeTemaSVGContainer = document.getElementById('icone-tema'); // O elemento <svg> em si
            const corpo = document.body;
            // Caminhos SVG para os ícones de sol e lua
            const svgSol = '<path fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM12 20a8 8 0 100-16 8 8 0 000 16zm0-14a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 6zm0 10.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.05 8.05a.75.75 0 011.06-1.06l1.062 1.06a.75.75 0 01-1.06 1.062L8.05 8.05zm6.951 6.951a.75.75 0 011.06-1.06l1.062 1.06a.75.75 0 11-1.06 1.062l-1.062-1.06zM6 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016 12zm10.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM8.05 15.95a.75.75 0 011.06 1.06l-1.062 1.06a.75.75 0 11-1.06-1.062l1.062-1.06zM15.95 8.05a.75.75 0 011.06 1.06l-1.062 1.06a.75.75 0 01-1.06-1.062l1.062-1.06z" clip-rule="evenodd"></path>';
            const svgLua = '<path fill-rule="evenodd" d="M9.522.94a.75.75 0 01.738 1.2L3.05 17.416a.75.75 0 01-1.3-.75L8.792.965a.75.75 0 01.73-.024zM11.26.65a.75.75 0 00-1.061 1.06L3.95 16.737a.75.75 0 001.06 1.061L11.26.65z" clip-rule="evenodd" opacity=".5"></path><path d="M18.5 13.016a.75.75 0 00-1.113-.924 6.501 6.501 0 01-8.025-8.025.75.75 0 10-1.113-.924A8.001 8.001 0 1018.5 13.016z"></path>';
            
            const aplicarTema = (tema) => {
                if (tema === 'escuro') {
                    corpo.classList.add('tema-escuro');
                    if (iconeTemaSVGContainer) iconeTemaSVGContainer.innerHTML = svgSol;
                    localStorage.setItem('temaPortifolioEsther', 'escuro');
                } else {
                    corpo.classList.remove('tema-escuro');
                    if (iconeTemaSVGContainer) iconeTemaSVGContainer.innerHTML = svgLua;
                    localStorage.setItem('temaPortifolioEsther', 'claro');
                }
            };

            if (botaoTema) {
                botaoTema.addEventListener('click', () => {
                    aplicarTema(corpo.classList.contains('tema-escuro') ? 'claro' : 'escuro');
                });
            }
            // Verifica tema salvo ou preferência do sistema
            const temaSalvo = localStorage.getItem('temaPortifolioEsther');
            const temaPreferidoSistema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
            aplicarTema(temaSalvo || temaPreferidoSistema);

            // Controle de Música
            const musicaFundo = document.getElementById('musica-fundo');
            const botaoMusicaHeader = document.getElementById('botao-musica-header');
            const iconeMusicaSVGContainer = document.getElementById('icone-musica'); // O elemento <svg>
            const svgPlay = '<path d="M6 19V5l14 7-14 7Z"></path>';
            const svgPause = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>';

            const atualizarIconeMusica = () => {
                if (!iconeMusicaSVGContainer || !musicaFundo) return;
                iconeMusicaSVGContainer.innerHTML = musicaFundo.paused ? svgPlay : svgPause;
            };

            if (musicaFundo && botaoMusicaHeader) {
                musicaFundo.volume = 0.2; // Volume inicial
                setTimeout(atualizarIconeMusica, 100); // Garante que o ícone inicial esteja correto

                // Tenta tocar a música (autoplay pode ser bloqueado)
                const playPromise = musicaFundo.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Autoplay funcionou
                        atualizarIconeMusica();
                    }).catch(error => {
                        // Autoplay bloqueado ou erro ao carregar
                        console.error("Autoplay da música bloqueado ou erro. Interação do usuário necessária.", error);
                        atualizarIconeMusica(); // Garante que o ícone de play seja mostrado
                    });
                }

                botaoMusicaHeader.addEventListener('click', () => {
                    if (musicaFundo.paused) {
                        musicaFundo.play().then(atualizarIconeMusica).catch(e => {
                            console.error("Erro ao tentar tocar música após clique:", e);
                            // Poderia adicionar um feedback visual mais sutil aqui em vez de alert
                            atualizarIconeMusica();
                        });
                    } else {
                        musicaFundo.pause();
                        atualizarIconeMusica();
                    }
                });

                // Atualiza o ícone em eventos de play/pause/fim
                musicaFundo.onplay = atualizarIconeMusica;
                musicaFundo.onpause = atualizarIconeMusica;
                musicaFundo.onended = atualizarIconeMusica; // Se quiser que o ícone mude quando a música acabar (se não for loop)
                musicaFundo.onerror = (e) => {
                    console.error("Erro no elemento de áudio:", e);
                    atualizarIconeMusica(); // Garante ícone de play
                };
            }

            // Carrossel de Projetos
            const carrosselTrilho = document.querySelector('.carrossel-trilho');
            const cartoesProjetoNodeList = document.querySelectorAll('.cartao-projeto'); // Renomeado para clareza
            const botaoPrev = document.querySelector('.carrossel-botao.prev');
            const botaoNext = document.querySelector('.carrossel-botao.next');

            if (carrosselTrilho && cartoesProjetoNodeList.length > 0) {
                let indiceAtual = 0;
                let arrastando = false;
                let inicioX;
                let scrollEsquerdaTrilho; // Posição inicial do trilho ao começar a arrastar
                let larguraCartaoComMargem = 0;

                const calcularLarguraCartao = () => {
                    if (cartoesProjetoNodeList.length > 0) {
                        const primeiroCartao = cartoesProjetoNodeList[0];
                        const estilosPrimeiroCartao = getComputedStyle(primeiroCartao);
                        larguraCartaoComMargem = primeiroCartao.offsetWidth + (parseInt(estilosPrimeiroCartao.marginRight) || 0);
                    }
                };
                
                const mostrarSlide = (indice) => {
                    if (larguraCartaoComMargem === 0) { // Calcula se ainda não foi feito
                        calcularLarguraCartao();
                    }
                    if (larguraCartaoComMargem !== 0) { // Procede apenas se a largura for válida
                        const deslocamento = -indice * larguraCartaoComMargem;
                        carrosselTrilho.style.transform = `translateX(${deslocamento}px)`;
                    }
                };

                const atualizarVisibilidadeBotoes = () => {
                    if (botaoPrev && botaoNext && carrosselTrilho.parentElement && larguraCartaoComMargem !== 0) {
                        const containerTrilho = carrosselTrilho.parentElement;
                        const slidesVisiveis = Math.floor(containerTrilho.offsetWidth / larguraCartaoComMargem);
                        const maxIndice = Math.max(0, cartoesProjetoNodeList.length - slidesVisiveis);
                        
                        botaoPrev.style.display = (indiceAtual === 0) ? "none" : "flex";
                        botaoNext.style.display = (indiceAtual >= maxIndice) ? "none" : "flex";
                    }
                };
                
                const ajustarIndiceParaVisivel = () => { // Garante que o índice não saia dos limites após resize/drag
                    if (carrosselTrilho.parentElement && larguraCartaoComMargem !== 0) {
                        const containerTrilho = carrosselTrilho.parentElement;
                        const slidesVisiveis = Math.floor(containerTrilho.offsetWidth / larguraCartaoComMargem);
                        const maxIndice = Math.max(0, cartoesProjetoNodeList.length - slidesVisiveis);
                        
                        if (indiceAtual > maxIndice) indiceAtual = maxIndice;
                        if (indiceAtual < 0) indiceAtual = 0;
                    }
                };

                if (botaoNext) {
                    botaoNext.addEventListener("click", () => {
                        if (larguraCartaoComMargem === 0) calcularLarguraCartao();
                        if (larguraCartaoComMargem !== 0) {
                            const containerTrilho = carrosselTrilho.parentElement;
                            if (containerTrilho) {
                                const slidesVisiveis = Math.floor(containerTrilho.offsetWidth / larguraCartaoComMargem);
                                if (indiceAtual < cartoesProjetoNodeList.length - slidesVisiveis) {
                                    indiceAtual++;
                                    mostrarSlide(indiceAtual);
                                    atualizarVisibilidadeBotoes();
                                }
                            }
                        }
                    });
                }

                if (botaoPrev) {
                    botaoPrev.addEventListener("click", () => {
                        if (indiceAtual > 0) {
                            indiceAtual--;
                            mostrarSlide(indiceAtual);
                            atualizarVisibilidadeBotoes();
                        }
                    });
                }

                const inicioArrastar = evento => {
                    arrastando = true;
                    carrosselTrilho.classList.add("arrastando");
                    inicioX = evento.pageX || evento.touches[0].pageX; // Posição inicial do clique/toque
                    const transformStyle = getComputedStyle(carrosselTrilho).transform;
                    scrollEsquerdaTrilho = (transformStyle === "none") ? 0 : (new DOMMatrixReadOnly(transformStyle)).m41; // Pega o valor X do translate
                    carrosselTrilho.style.transition = "none"; // Remove transição durante o arrasto
                };

                const arrastar = evento => {
                    if (arrastando) {
                        evento.preventDefault(); // Previne scroll da página em mobile
                        const xAtual = evento.pageX || evento.touches[0].pageX;
                        const diferencaX = xAtual - inicioX;
                        carrosselTrilho.style.transform = `translateX(${scrollEsquerdaTrilho + diferencaX}px)`;
                    }
                };

                const fimArrastar = evento => {
                    if (arrastando) {
                        arrastando = false;
                        carrosselTrilho.classList.remove("arrastando");
                        carrosselTrilho.style.transition = "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)"; // Restaura transição
                        
                        const xFinal = evento.pageX || (evento.changedTouches && evento.changedTouches[0].pageX);
                        if (xFinal === undefined) return; // Evita erro se o evento não tiver pageX (ex: mouseleave sem clique)

                        const diferencaX = xFinal - inicioX;

                        if (larguraCartaoComMargem > 0 && Math.abs(diferencaX) > larguraCartaoComMargem / 4) { // Se arrastou mais que 1/4 do cartão
                            const containerTrilho = carrosselTrilho.parentElement;
                            if (containerTrilho) {
                                const slidesVisiveis = Math.floor(containerTrilho.offsetWidth / larguraCartaoComMargem);
                                if (diferencaX < 0) { // Arrastou para a esquerda (próximo)
                                    if (indiceAtual < cartoesProjetoNodeList.length - slidesVisiveis) indiceAtual++;
                                } else { // Arrastou para a direita (anterior)
                                    if (indiceAtual > 0) indiceAtual--;
                                }
                            }
                        }
                        ajustarIndiceParaVisivel();
                        mostrarSlide(indiceAtual);
                        atualizarVisibilidadeBotoes();
                    }
                };

                carrosselTrilho.addEventListener("mousedown", inicioArrastar);
                carrosselTrilho.addEventListener("touchstart", inicioArrastar, { passive: true }); // Passive true para melhor performance de scroll

                document.addEventListener("mousemove", arrastar);
                document.addEventListener("touchmove", arrastar, { passive: false }); // Passive false para permitir preventDefault

                document.addEventListener("mouseup", fimArrastar);
                document.addEventListener("mouseleave", evento => { if (arrastando) fimArrastar(evento); }); // Se sair da janela arrastando
                document.addEventListener("touchend", fimArrastar);

                const inicializarCarrossel = () => {
                    calcularLarguraCartao();
                    ajustarIndiceParaVisivel();
                    mostrarSlide(indiceAtual);
                    atualizarVisibilidadeBotoes();
                };
                
                inicializarCarrossel(); // Inicializa ao carregar
                window.addEventListener("resize", inicializarCarrossel); // Reajusta no resize
            }

            // Lógica para o formulário de contato (se estiver na página de contato)
            const formularioContato = document.getElementById('formulario-contato');
            const feedbackForm = document.getElementById('feedback-form');
            // Verifica se estamos na página de contato e os elementos existem
            if (formularioContato && feedbackForm && window.location.pathname.includes('contato.html')) {
                formularioContato.addEventListener('submit', function(evento) {
                    evento.preventDefault(); // Previne o envio padrão do formulário
                    
                    const nomeInput = formularioContato.querySelector('#nome'); // Supondo que haja um input com id="nome"
                    const nome = nomeInput ? nomeInput.value : "Usuário"; // Pega o nome ou usa um padrão
                    
                    feedbackForm.textContent = `Obrigado pelo contato, ${nome}! Sua mensagem foi "enviada".`;
                    feedbackForm.className = 'feedback-form-mensagem sucesso'; // Adiciona classes para estilização
                    feedbackForm.style.display = 'block'; // Mostra a mensagem
                    
                    formularioContato.reset(); // Limpa o formulário
                    
                    setTimeout(() => { feedbackForm.style.display = 'none'; }, 5000); // Esconde a mensagem após 5 segundos
                });
            }
        });
   