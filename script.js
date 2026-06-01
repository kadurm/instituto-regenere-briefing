/**
 * Script Principal - Briefing Interativo do Instituto Regenere
 * Desenvolvido para Carlos Eduardo - DevOps_KrM
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const form = document.getElementById('briefing-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const stepItems = Array.from(document.querySelectorAll('.step-item'));
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const mobileProgressBar = document.getElementById('mobile-progress-bar');
    const mobileCurrentStep = document.getElementById('mobile-current-step');
    const mobileStepName = document.getElementById('mobile-step-name');
    const successScreen = document.getElementById('success-screen');
    const mainApp = document.getElementById('briefing-app');
    
    // Dev Panel Elements
    const devConfigToggle = document.getElementById('dev-config-toggle');
    const devConfigPanel = document.getElementById('dev-config-panel');
    const devConfigClose = document.getElementById('dev-config-close');
    const devEmailInput = document.getElementById('dev_email');
    const btnSaveDevConfig = document.getElementById('btn-save-dev-config');

    // Success Screen Buttons
    const btnDownloadJson = document.getElementById('btn-download-json');
    const btnCopyClipboard = document.getElementById('btn-copy-clipboard');
    const btnWhatsappShare = document.getElementById('btn-whatsapp-share');
    const btnRestart = document.getElementById('btn-restart');

    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Nomes legíveis dos passos para exibição no Mobile
    const stepNames = {
        1: "Identificação",
        2: "O Instituto",
        3: "Objetivos",
        4: "Funcionalidades",
        5: "Visual & Conteúdo",
        6: "Prazos & Envio"
    };

    // --- 1. CONFIGURAÇÃO DE E-MAIL E URL ---
    // E-mail padrão do Carlos (se não fornecido na URL ou painel)
    const DEFAULT_DEV_EMAIL = 'carlosermenezes@gmail.com';
    
    // Recupera o email da URL (?email=exemplo@dominio.com ou ?to=exemplo@dominio.com)
    const urlParams = new URLSearchParams(window.location.search);
    let targetEmail = urlParams.get('email') || urlParams.get('to') || localStorage.getItem('regenere_dev_email');
    
    if (!targetEmail) {
        targetEmail = DEFAULT_DEV_EMAIL;
    } else {
        localStorage.setItem('regenere_dev_email', targetEmail);
    }
    
    // Inicializa campos do painel de dev
    devEmailInput.value = targetEmail === DEFAULT_DEV_EMAIL ? '' : targetEmail;
    updateFormAction(targetEmail);

    // Configura o redirecionamento pós-envio do FormSubmit.co
    // Quando enviado com sucesso, redirecionará para a própria página com ?success=true
    const redirectUrl = window.location.origin + window.location.pathname + '?success=true';
    const nextInput = document.querySelector('input[name="_next"]');
    if (nextInput) {
        nextInput.value = redirectUrl;
    }

    // --- 2. CONTROLE DO FLUXO MULTI-PASSOS ---
    function showStep(stepNum) {
        // Oculta passos inativos e exibe o ativo
        steps.forEach(step => {
            step.classList.remove('active-step');
            if (parseInt(step.getAttribute('data-step')) === stepNum) {
                step.classList.add('active-step');
            }
        });

        // Atualiza a navegação lateral (Desktop)
        stepItems.forEach(item => {
            const itemStep = parseInt(item.getAttribute('data-step'));
            item.classList.remove('active');
            item.classList.remove('completed');
            
            if (itemStep === stepNum) {
                item.classList.add('active');
            } else if (itemStep < stepNum) {
                item.classList.add('completed');
            }
        });

        // Atualiza botões
        if (stepNum === 1) {
            btnPrev.disabled = true;
        } else {
            btnPrev.disabled = false;
        }

        if (stepNum === totalSteps) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'inline-flex';
        } else {
            btnNext.style.display = 'inline-flex';
            btnSubmit.style.display = 'none';
        }

        // Atualiza progresso
        updateProgress(stepNum);
        
        // Rola a área do formulário para o topo
        document.querySelector('.form-area').scrollTop = 0;
    }

    function updateProgress(stepNum) {
        currentStep = stepNum;
        
        // Porcentagem linear baseada no passo atual
        const percentage = Math.round(((stepNum - 1) / (totalSteps - 1)) * 100);
        
        // Atualiza Desktop
        progressFill.style.width = `${percentage}%`;
        progressPercentage.innerText = `${percentage}%`;
        
        // Atualiza Mobile
        mobileProgressBar.style.width = `${(stepNum / totalSteps) * 100}%`;
        mobileCurrentStep.innerText = stepNum;
        mobileStepName.innerText = stepNames[stepNum];
    }

    // Validação básica do passo atual
    function validateStep(stepNum) {
        const currentPanel = document.querySelector(`.form-step[data-step="${stepNum}"]`);
        const requiredInputs = Array.from(currentPanel.querySelectorAll('[required]'));
        
        let isValid = true;
        
        // Reseta estados anteriores
        requiredInputs.forEach(input => {
            const control = input.closest('.input-control');
            if (control) control.classList.remove('has-error');
        });

        for (const input of requiredInputs) {
            // Se for checkbox ou radio
            if (input.type === 'checkbox' || input.type === 'radio') {
                const name = input.name;
                const checked = currentPanel.querySelectorAll(`[name="${name}"]:checked`);
                if (checked.length === 0) {
                    isValid = false;
                    // Adiciona erro visual no container pai
                    const control = input.closest('.input-control');
                    if (control) control.classList.add('has-error');
                }
            } else if (!input.value.trim()) {
                isValid = false;
                const control = input.closest('.input-control');
                if (control) control.classList.add('has-error');
                input.focus();
                break;
            }
        }

        if (!isValid) {
            // Feedback sutil para o usuário
            const shakeElement = currentPanel.querySelector('.step-header');
            if (shakeElement) {
                shakeElement.classList.add('shake-anim');
                setTimeout(() => shakeElement.classList.remove('shake-anim'), 500);
            }
        }
        
        return isValid;
    }

    // Eventos de Navegação
    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });

    // Permite clicar nos números da sidebar para navegar, contanto que já tenham sido validados
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = parseInt(item.getAttribute('data-step'));
            if (target < currentStep) {
                showStep(target);
            } else if (target > currentStep) {
                // Valida passos intermediários
                let canAdvance = true;
                for (let i = currentStep; i < target; i++) {
                    if (!validateStep(i)) {
                        canAdvance = false;
                        showStep(i);
                        break;
                    }
                }
                if (canAdvance) {
                    showStep(target);
                }
            }
        });
    });

    // --- 3. AUTO-SALVAMENTO (LOCALSTORAGE) ---
    function saveFormData() {
        const formData = {};
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.name) {
                if (input.type === 'checkbox') {
                    if (!formData[input.name]) formData[input.name] = [];
                    if (input.checked) formData[input.name].push(input.value);
                } else if (input.type === 'radio') {
                    if (input.checked) formData[input.name] = input.value;
                } else {
                    formData[input.name] = input.value;
                }
            }
        });
        
        localStorage.setItem('regenere_briefing_draft', JSON.stringify(formData));
    }

    function loadFormData() {
        const draft = localStorage.getItem('regenere_briefing_draft');
        if (!draft) return;

        try {
            const data = JSON.parse(draft);
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.name && data[input.name] !== undefined) {
                    if (input.type === 'checkbox') {
                        if (Array.isArray(data[input.name])) {
                            input.checked = data[input.name].includes(input.value);
                        }
                    } else if (input.type === 'radio') {
                        input.checked = (data[input.name] === input.value);
                    } else {
                        input.value = data[input.name];
                    }
                }
            });
        } catch (e) {
            console.error("Erro ao carregar rascunho de dados:", e);
        }
    }

    // Escuta mudanças nos inputs para salvar
    form.addEventListener('input', saveFormData);
    form.addEventListener('change', saveFormData);
    
    // Carrega dados salvos na inicialização
    loadFormData();

    // --- 4. EXIBIÇÃO DA TELA DE SUCESSO ---
    // Verifica se a página foi carregada com ?success=true na URL
    if (urlParams.get('success') === 'true') {
        mainApp.style.display = 'none';
        successScreen.style.display = 'flex';
        
        // Faz backup das respostas antes de limpar, para que as exportações funcionem
        const currentDraft = localStorage.getItem('regenere_briefing_draft');
        if (currentDraft) {
            localStorage.setItem('regenere_briefing_completed_backup', currentDraft);
        }
        
        // Limpa o rascunho ativo após o envio bem-sucedido
        localStorage.removeItem('regenere_briefing_draft');
    }

    // --- 5. EXPORTAÇÃO E COMPARTILHAMENTO DAS RESPOSTAS ---
    // Compila os dados do briefing em formato legível de texto (Markdown)
    function compileResponsesToText() {
        const draft = localStorage.getItem('regenere_briefing_draft') || localStorage.getItem('regenere_briefing_completed_backup');
        let data = {};
        
        if (draft) {
            data = JSON.parse(draft);
        } else {
            // Fallback se já tiver sido apagado por sucesso
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.name) {
                    if (input.type === 'checkbox') {
                        if (!data[input.name]) data[input.name] = [];
                        if (input.checked) data[input.name].push(input.value);
                    } else if (input.type === 'radio') {
                        if (input.checked) data[input.name] = input.value;
                    } else {
                        data[input.name] = input.value;
                    }
                }
            });
        }

        let report = `==================================================\n`;
        report += `   BRIEFING DE SITE INSTITUCIONAL - INSTITUTO REGENERE\n`;
        report += `   Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n`;
        report += `==================================================\n\n`;

        for (const [key, value] of Object.entries(data)) {
            if (key.startsWith('_')) continue; // Ignora configs do FormSubmit
            
            report += `▶ ${key.toUpperCase()}:\n`;
            if (Array.isArray(value)) {
                if (value.length === 0) report += `  [Nenhuma opção selecionada]\n`;
                value.forEach(val => report += `  - ${val}\n`);
            } else {
                report += `  ${value || '[Não informado]'}\n`;
            }
            report += `\n`;
        }
        
        report += `==================================================\n`;
        report += `Fim do Briefing. Obrigado!\n`;
        report += `Instituto Regenere & Equipe de Desenvolvimento\n`;
        
        return report;
    }

    // Botão de Download (TXT)
    btnDownloadJson.addEventListener('click', () => {
        const text = compileResponsesToText();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `briefing-instituto-regenere-${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Botão de Copiar para Área de Transferência
    btnCopyClipboard.addEventListener('click', () => {
        const text = compileResponsesToText();
        navigator.clipboard.writeText(text).then(() => {
            // Altera visualmente o botão indicando sucesso
            const originalHTML = btnCopyClipboard.innerHTML;
            btnCopyClipboard.innerHTML = `<i class="fa-solid fa-check"></i> Copiado com Sucesso!`;
            btnCopyClipboard.style.borderColor = 'var(--color-success)';
            btnCopyClipboard.style.color = 'var(--color-success)';
            
            setTimeout(() => {
                btnCopyClipboard.innerHTML = originalHTML;
                btnCopyClipboard.style.borderColor = '';
                btnCopyClipboard.style.color = '';
            }, 2500);
        }).catch(err => {
            alert('Não foi possível copiar automaticamente. Por favor, selecione e copie manualmente.');
        });
    });

    // Botão de Compartilhar no WhatsApp
    btnWhatsappShare.addEventListener('click', () => {
        // Reduz o tamanho da mensagem para caber na URL do WhatsApp
        const draft = localStorage.getItem('regenere_briefing_draft') || localStorage.getItem('regenere_briefing_completed_backup');
        let data = {};
        if (draft) data = JSON.parse(draft);

        const clientName = data["Nome do Cliente"] || "Cliente";
        const clientEmail = data["E-mail"] || "";
        const deadline = data["Prazo Desejado"] || "A combinar";
        
        let text = `Olá! Concluí o preenchimento do Briefing para o novo site do *Instituto Regenere*! 🌿\n\n`;
        text += `*Cliente:* ${clientName}\n`;
        text += `*E-mail:* ${clientEmail}\n`;
        text += `*Prazo sugerido:* ${deadline}\n\n`;
        text += `As respostas completas foram salvas e enviadas! Você também pode baixar o relatório em TXT ou copiar o sumário completo diretamente na tela final do formulário.\n\n`;
        text += `Aguardo os próximos passos! 😊`;

        const encodedText = encodeURIComponent(text);
        // Abre o WhatsApp enviando a mensagem diretamente para o número do Carlos
        const whatsappUrl = `https://api.whatsapp.com/send?phone=5538988450377&text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    });

    // Botão de Reiniciar/Editar
    btnRestart.addEventListener('click', () => {
        // Remove o ?success=true da URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.location.href = cleanUrl;
    });

    // --- 6. PAINEL DO DESENVOLVEDOR ---
    function updateFormAction(email) {
        if (email && email !== DEFAULT_DEV_EMAIL) {
            form.action = `https://formsubmit.co/${email}`;
        } else {
            form.action = `https://formsubmit.co/${DEFAULT_DEV_EMAIL}`;
        }
    }

    devConfigToggle.addEventListener('click', () => {
        devConfigPanel.style.display = devConfigPanel.style.display === 'none' ? 'block' : 'none';
    });

    devConfigClose.addEventListener('click', () => {
        devConfigPanel.style.display = 'none';
    });

    btnSaveDevConfig.addEventListener('click', () => {
        const newEmail = devEmailInput.value.trim();
        if (newEmail && validateEmail(newEmail)) {
            localStorage.setItem('regenere_dev_email', newEmail);
            updateFormAction(newEmail);
            
            // Sucesso visual
            btnSaveDevConfig.innerHTML = `<i class="fa-solid fa-check"></i> Salvo com Sucesso!`;
            btnSaveDevConfig.style.backgroundColor = 'var(--color-success)';
            
            // Atualiza a URL sem recarregar a página para incluir o novo e-mail
            const newUrl = window.location.origin + window.location.pathname + `?email=${newEmail}`;
            window.history.pushState({ path: newUrl }, '', newUrl);

            setTimeout(() => {
                btnSaveDevConfig.innerHTML = `<i class="fa-solid fa-check"></i> Salvar Configuração`;
                btnSaveDevConfig.style.backgroundColor = '';
                devConfigPanel.style.display = 'none';
            }, 1500);
        } else {
            alert('Por favor, insira um e-mail válido para receber as respostas.');
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Inicialização do Passo 1
    showStep(1);
});
