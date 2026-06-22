/* Script Principal - Instituto Regenere */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Menu Mobile Toggle
       ========================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================
       2. Header Scrolled & Scroll Spy Active Link
       ========================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Efeito Scrolled no Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Spy (Indicador de seção ativa)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       3. Dataset das Especialidades (Feridas)
       ========================================== */
    const woundData = {
        diabetico: {
            title: "Pé Diabético",
            icon: "🦶",
            description: "O pé diabético é uma complicação grave da diabetes mellitus, caracterizada pelo surgimento de feridas que não cicatrizam devido à neuropatia periférica (perda da sensibilidade ao toque e dor) e à microangiopatia (má circulação do sangue). Sem a dor para alertar, pequenas lesões evoluem rapidamente para úlceras complexas com risco de infecção óssea (osteomielite) e amputação.",
            treatment: "Nossa abordagem no Instituto Regenere é altamente protetora e reconstrutiva. Realizamos avaliações vasculares locais, desbridamento instrumental preciso dos tecidos necrosados, aplicação de curativos especiais com prata nanocristalina e alginatos para controle infeccioso, além de sessões de Laserterapia de Baixa Intensidade para acelerar a regeneração e orientação de palmilhas/sapatos protetores."
        },
        venosas: {
            title: "Úlceras Venosas",
            icon: "🩸",
            description: "As úlceras venosas são feridas crônicas e úmidas que acometem os membros inferiores, comumente próximas ao tornozelo. Originam-se devido à insuficiência venosa crônica (varizes ou sequelas de trombose), onde o sangue tem dificuldade de retornar ao coração, acumulando-se nas pernas e causando inchaço severo, escurecimento da pele e posterior rompimento tecidual.",
            treatment: "O tratamento padrão-ouro no Instituto alia limpeza fisiológica avançada ao controle do exsudato (secreção da ferida) e à aplicação de Terapia Compressiva. Utilizamos a Bota de Unna ou bandagens elásticas/inelásticas multicamadas, que comprimem as veias de forma terapêutica, reestabelecendo a circulação de retorno e gerando cicatrização rápida das úlceras venosas."
        },
        arteriais: {
            title: "Úlceras Arteriais",
            icon: "🩺",
            description: "As úlceras arteriais são causadas pela falta de oxigenação adequada dos tecidos devido à obstrução ou estreitamento das artérias periféricas (aterosclerose). São lesões extremamente dolorosas, de aspecto seco, bordas bem delimitadas, localizadas principalmente nas pontas dos dedos, dorso do pé ou calcanhar, onde o fluxo de sangue é crítico.",
            treatment: "O foco terapêutico do Instituto é a máxima preservação tecidual. Mantemos o leito da lesão protegido contra infecções bacterianas através de coberturas hidroativas ou com prata, modulamos a umidade na medida correta e atuamos de forma conjunta com cirurgiões vasculares para avaliar a necessidade urgente de revascularização arterial periférica."
        },
        escaras: {
            title: "Lesões por Pressão (Escaras)",
            icon: "🛏️",
            description: "Anteriormente conhecidas como escaras, estas lesões são causadas pela compressão prolongada da pele e tecidos sobre proeminências ósseas (como calcanhar, quadril e região sacral). É comum em idosos, cadeirantes, pacientes acamados ou sob cuidados intensivos, onde a fricção e falta de circulação local rompem as camadas da pele.",
            treatment: "Combatemos ativamente a lesão utilizando curativos biológicos de última geração (hidrocoloides, hidrogéis com alginato) que promovem o desbridamento autolítico e o surgimento de tecido de granulação saudável. Associamos a Laserterapia para estimular a circulação profunda e cicatrização rápida, fornecendo treinamento prático aos cuidadores para reposicionamento e alívio de pressão."
        },
        cirurgica: {
            title: "Deiscência Cirúrgica",
            icon: "✂️",
            description: "Consiste na abertura espontânea e indesejada de pontos cirúrgicos pós-operatórios. Pode ser causada por estresse mecânico precoce no local, infecções locais da ferida operatória, má circulação tecidual ou desnutrição sistêmica do paciente, expondo os tecidos internos e aumentando o risco de contaminação.",
            treatment: "Promovemos a limpeza profunda do leito exposto, eliminamos a carga bacteriana através de curativos avançados com ação antimicrobiana (como prata e PHMB) e estimulamos o fechamento por segunda intenção. A aplicação da Laserterapia de Baixa Intensidade é fundamental nesse caso, acelerando a deposição de colágeno estruturado e minimizando cicatrizes hipertróficas."
        },
        estomas: {
            title: "Cuidados com Estomas",
            icon: "🛡️",
            description: "O estoma ou ostomia é uma abertura criada cirurgicamente no abdômen para desvio do trânsito de fezes ou urina. A pele ao redor do estoma (periestoma) fica constantemente exposta a secreções ácidas e úmidas, necessitando de cuidados meticulosos para evitar dermatites, queimaduras químicas e infecções fúngicas ou bacterianas dolorosas.",
            treatment: "Prestamos consultoria e assistência personalizada de enfermagem estomaterapeuta. Realizamos a higienização da área, a mensuração correta do estoma, a indicação, corte e fixação de placas e bolsas coletoras de alto desempenho, além do uso de pós e películas protetoras da pele para prevenir e tratar qualquer lesão cutânea dolorosa."
        }
    };

    /* ==========================================
       4. Sistema do Modal de Especialidades
       ========================================== */
    const woundModal = document.getElementById('woundModal');
    const modalClose = document.getElementById('modalClose');
    const modalBtnClose = document.getElementById('modalBtnClose');
    const modalBtnCTA = document.getElementById('modalBtnCTA');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTreatment = document.getElementById('modalTreatment');
    const leadInterestSelect = document.getElementById('leadInterest');

    let currentWoundKey = '';

    // Função para abrir o modal
    function openModal(key) {
        if (!woundData[key]) return;
        
        currentWoundKey = key;
        const data = woundData[key];
        
        modalIcon.textContent = data.icon;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalTreatment.textContent = data.treatment;
        
        woundModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
    }

    // Função para fechar o modal
    function closeModal() {
        woundModal.classList.remove('active');
        document.body.style.overflow = ''; // Devolve o scroll de fundo
    }

    // Configura cliques nos cards de especialidade
    const specialtyCards = document.querySelectorAll('.specialty-card');
    specialtyCards.forEach(card => {
        const woundKey = card.getAttribute('data-wound');
        
        // Clicar no card inteiro ou no botão "Saiba Mais"
        card.addEventListener('click', () => {
            openModal(woundKey);
        });
    });

    // Configura botões de fechar modal
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBtnClose) modalBtnClose.addEventListener('click', closeModal);
    
    // Fecha clicando fora da caixa do modal
    window.addEventListener('click', (e) => {
        if (e.target === woundModal) {
            closeModal();
        }
    });

    // Ação do botão CTA do modal: direciona ao formulário e altera o select
    if (modalBtnCTA) {
        modalBtnCTA.addEventListener('click', () => {
            closeModal();
            
            // Mapeia a chave do modal para o valor exato no dropdown do formulário
            const dropdownMapping = {
                diabetico: "Pé Diabético",
                venosas: "Úlcera Venosa",
                arteriais: "Úlcera Arterial",
                escaras: "Lesão por Pressão (Escara)",
                cirurgica: "Deiscência Cirúrgica",
                estomas: "Cuidados com Estomas"
            };
            
            const dropdownVal = dropdownMapping[currentWoundKey] || "Não especificada";
            
            if (leadInterestSelect) {
                // Tenta selecionar o valor no dropdown
                // Nota: no HTML os valores estão no singular/plural, tratamos correspondências
                for (let i = 0; i < leadInterestSelect.options.length; i++) {
                    const option = leadInterestSelect.options[i];
                    if (option.value.includes(dropdownVal) || dropdownVal.includes(option.value)) {
                        leadInterestSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Rola até a seção de contato de forma suave
            const contactSection = document.getElementById('contato');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Dá um foco no campo de nome para melhorar a experiência
                setTimeout(() => {
                    const nameInput = document.getElementById('leadName');
                    if (nameInput) nameInput.focus();
                }, 800);
            }
        });
    }

    // Configura cliques nos links do rodapé que direcionam a especialidades específicas
    const footerWoundLinks = document.querySelectorAll('[data-wound-footer]');
    footerWoundLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const woundKey = link.getAttribute('data-wound-footer');
            
            // Rola até a seção de especialidades
            const specialtiesSection = document.getElementById('especialidades');
            if (specialtiesSection) {
                specialtiesSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Abre o modal após a rolagem começar
            setTimeout(() => {
                openModal(woundKey);
            }, 600);
        });
    });

    /* ==========================================
       5. FAQ Accordion
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os FAQs ativos (Comportamento de acordeão exclusivo)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Se o clicado não estava ativo, abre
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    /* ==========================================
       6. Máscara de Telefone Automática (WhatsApp)
       ========================================== */
    const phoneInput = document.getElementById('leadPhone');

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let inputVal = e.target.value.replace(/\D/g, ""); // Remove não numéricos
            
            if (inputVal.length > 11) {
                inputVal = inputVal.substring(0, 11);
            }
            
            let formattedVal = "";
            
            if (inputVal.length > 0) {
                formattedVal = "(" + inputVal.substring(0, 2);
            }
            if (inputVal.length > 2) {
                formattedVal += ") " + inputVal.substring(2, 7);
            }
            if (inputVal.length > 7) {
                formattedVal += "-" + inputVal.substring(7, 11);
            }
            
            e.target.value = formattedVal;
        });
    }

    /* ==========================================
       7. Validação do Formulário e Envio WhatsApp
       ========================================== */
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o reload da página
            
            const nameInput = document.getElementById('leadName');
            const phoneInput = document.getElementById('leadPhone');
            const profileSelect = document.getElementById('leadProfile');
            const interestSelect = document.getElementById('leadInterest');
            const messageTextarea = document.getElementById('leadMessage');
            
            let isValid = true;
            
            // Valida Nome
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }
            
            // Valida Telefone (Mínimo de caracteres para ser um celular brasileiro válido)
            const cleanPhone = phoneInput.value.replace(/\D/g, "");
            if (cleanPhone.length < 10) { // DDD + Número (Mínimo 10 dígitos)
                phoneInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                phoneInput.parentElement.classList.remove('invalid');
            }
            
            // Valida Perfil do Lead
            if (!profileSelect.value) {
                profileSelect.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                profileSelect.parentElement.classList.remove('invalid');
            }
            
            if (!isValid) return; // Interrompe se inválido
            
            // Construção da mensagem estruturada profissional para o WhatsApp
            const clinicPhone = "5538984290656"; // Número da clínica com DDI 55
            const name = nameInput.value.trim();
            const phone = phoneInput.value;
            const profile = profileSelect.value;
            const interest = interestSelect.value;
            const rawMessage = messageTextarea.value.trim();
            
            let textMessage = `Olá, Instituto Regenere! Gostaria de agendar uma avaliação clínica.\n\n`;
            textMessage += `*DADOS DO PRÉ-CADASTRO:*\n`;
            textMessage += `• *Paciente:* ${name}\n`;
            textMessage += `• *WhatsApp:* ${phone}\n`;
            textMessage += `• *Perfil do Solicitante:* ${profile}\n`;
            textMessage += `• *Ferida/Lesão Principal:* ${interest}\n`;
            
            if (rawMessage) {
                textMessage += `\n*Relato do Caso:*\n"${rawMessage}"`;
            }
            
            // URL encode
            const encodedText = encodeURIComponent(textMessage);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${clinicPhone}&text=${encodedText}`;
            
            // Redireciona para o WhatsApp oficial da clínica
            window.open(whatsappUrl, '_blank');
        });
        
        // Remove classes invalid ao digitar/selecionar
        const formInputs = whatsappForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('invalid');
            });
            input.addEventListener('change', () => {
                input.parentElement.classList.remove('invalid');
            });
        });
    }
});
