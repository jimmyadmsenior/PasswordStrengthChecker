// Configuração dos critérios de segurança
const passwordCriteria = {
    length: {
        test: (password) => password.length >= 8,
        element: 'length',
        points: 25
    },
    lowercase: {
        test: (password) => /[a-z]/.test(password),
        element: 'lowercase',
        points: 20
    },
    uppercase: {
        test: (password) => /[A-Z]/.test(password),
        element: 'uppercase',
        points: 20
    },
    numbers: {
        test: (password) => /\d/.test(password),
        element: 'numbers',
        points: 20
    },
    special: {
        test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        element: 'special',
        points: 15
    }
};

// Elementos do DOM
const passwordInput = document.getElementById('password');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const eyeIcon = document.getElementById('eye-icon');

// Variável para controlar visibilidade da senha
let passwordVisible = false;

// Event listener para o input da senha
passwordInput.addEventListener('input', function() {
    const password = this.value;
    checkPasswordStrength(password);
});

// Função principal para verificar a força da senha
function checkPasswordStrength(password) {
    let score = 0;
    let metCriteria = 0;
    
    // Verificar cada critério
    Object.keys(passwordCriteria).forEach(criteriaKey => {
        const criteria = passwordCriteria[criteriaKey];
        const element = document.getElementById(criteria.element);
        const isMet = criteria.test(password);
        
        if (isMet) {
            score += criteria.points;
            metCriteria++;
            element.classList.add('met');
            element.querySelector('.icon').textContent = '✅';
        } else {
            element.classList.remove('met');
            element.querySelector('.icon').textContent = '❌';
        }
    });
    
    // Bonificações adicionais
    if (password.length >= 12) {
        score += 10; // Bônus para senhas mais longas
    }
    
    if (password.length >= 16) {
        score += 10; // Bônus extra para senhas muito longas
    }
    
    // Verificar sequências comuns (penalidade)
    if (hasCommonSequences(password)) {
        score -= 20;
    }
    
    // Verificar repetições excessivas (penalidade)
    if (hasExcessiveRepetition(password)) {
        score -= 15;
    }
    
    // Garantir que o score não seja negativo
    score = Math.max(0, score);
    
    // Atualizar a interface
    updateStrengthIndicator(score, metCriteria);
    updateFeedback(password, score, metCriteria);
}

// Função para atualizar o indicador de força
function updateStrengthIndicator(score, metCriteria) {
    // Remover classes anteriores
    strengthFill.className = 'strength-fill';
    strengthText.className = 'strength-text';
    
    if (score === 0) {
        strengthText.textContent = 'Digite uma senha para começar';
        strengthText.classList.add('default');
        strengthFill.classList.add('empty');
    } else if (score < 40) {
        strengthText.textContent = 'Senha Fraca';
        strengthText.classList.add('weak');
        strengthFill.classList.add('weak');
    } else if (score < 80) {
        strengthText.textContent = 'Senha Moderada';
        strengthText.classList.add('moderate');
        strengthFill.classList.add('moderate');
    } else {
        strengthText.textContent = 'Senha Forte';
        strengthText.classList.add('strong');
        strengthFill.classList.add('strong');
    }
}

// Função para atualizar o feedback
function updateFeedback(password, score, metCriteria) {
    const feedback = document.getElementById('feedback');
    const tips = document.getElementById('tips');
    
    if (password.length === 0) {
        // Mostrar dicas gerais quando não há senha
        tips.innerHTML = `
            <li>Use pelo menos 8 caracteres</li>
            <li>Misture letras maiúsculas e minúsculas</li>
            <li>Inclua números</li>
            <li>Use caracteres especiais</li>
            <li>Evite informações pessoais</li>
            <li>Não use senhas comuns ou sequenciais</li>
        `;
        return;
    }
    
    const suggestions = [];
    
    // Sugestões específicas baseadas nos critérios não atendidos
    Object.keys(passwordCriteria).forEach(criteriaKey => {
        const criteria = passwordCriteria[criteriaKey];
        if (!criteria.test(password)) {
            switch(criteriaKey) {
                case 'length':
                    suggestions.push('Adicione mais caracteres (mínimo 8, recomendado 12+)');
                    break;
                case 'lowercase':
                    suggestions.push('Inclua pelo menos uma letra minúscula (a-z)');
                    break;
                case 'uppercase':
                    suggestions.push('Inclua pelo menos uma letra maiúscula (A-Z)');
                    break;
                case 'numbers':
                    suggestions.push('Adicione pelo menos um número (0-9)');
                    break;
                case 'special':
                    suggestions.push('Use caracteres especiais (!@#$%^&*)');
                    break;
            }
        }
    });
    
    // Sugestões adicionais baseadas na análise da senha
    if (hasCommonSequences(password)) {
        suggestions.push('Evite sequências comuns como "123" ou "abc"');
    }
    
    if (hasExcessiveRepetition(password)) {
        suggestions.push('Reduza a repetição de caracteres');
    }
    
    if (password.length < 12) {
        suggestions.push('Considere usar 12 ou mais caracteres para maior segurança');
    }
    
    // Sugestões positivas para senhas fortes
    if (score >= 80) {
        suggestions.push('🎉 Excelente! Sua senha está forte');
        suggestions.push('💾 Considere usar um gerenciador de senhas');
        suggestions.push('🔄 Mude suas senhas regularmente');
    }
    
    // Atualizar as dicas
    if (suggestions.length > 0) {
        tips.innerHTML = suggestions.map(tip => `<li>${tip}</li>`).join('');
    }
}

// Função para verificar sequências comuns
function hasCommonSequences(password) {
    const commonSequences = [
        '123', '234', '345', '456', '567', '678', '789',
        'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi',
        'qwerty', 'asdf', 'zxcv',
        '111', '222', '333', '444', '555', '666', '777', '888', '999'
    ];
    
    const lowerPassword = password.toLowerCase();
    
    return commonSequences.some(sequence => 
        lowerPassword.includes(sequence) || lowerPassword.includes(sequence.split('').reverse().join(''))
    );
}

// Função para verificar repetições excessivas
function hasExcessiveRepetition(password) {
    const charCount = {};
    
    for (let char of password) {
        charCount[char] = (charCount[char] || 0) + 1;
        if (charCount[char] > password.length * 0.4) {
            return true;
        }
    }
    
    return false;
}

// Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
    
    if (passwordVisible) {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Função para gerar senha segura (funcionalidade extra)
function generateSecurePassword() {
    const length = 16;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';
    
    // Garantir pelo menos um caractere de cada tipo
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Completar o resto da senha
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Embaralhar a senha
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Event listeners adicionais
document.addEventListener('DOMContentLoaded', function() {
    // Focus automático no input da senha
    passwordInput.focus();
    
    // Adicionar funcionalidade de geração de senha (tecla F2)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F2') {
            e.preventDefault();
            const generatedPassword = generateSecurePassword();
            passwordInput.value = generatedPassword;
            checkPasswordStrength(generatedPassword);
            
            // Mostrar temporariamente a senha gerada
            const originalType = passwordInput.type;
            passwordInput.type = 'text';
            setTimeout(() => {
                if (!passwordVisible) {
                    passwordInput.type = originalType;
                }
            }, 3000);
        }
    });
    
    // Adicionar tooltip para a funcionalidade F2
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = '💡 Dica: Pressione F2 para gerar uma senha segura automaticamente';
    
    document.body.appendChild(tooltip);
    
    // Ocultar tooltip após 10 segundos
    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => tooltip.remove(), 300);
    }, 10000);
    
    // Inicializar efeitos visuais
    addVisualEffects();
    
    // Partículas desabilitadas para melhor performance e experiência visual
    /*
    // Adicionar efeito de pulsação nas partículas
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 1.2}s`;
    });
    */
});

// Função para análise avançada de senha (funcionalidade extra)
function analyzePasswordComplexity(password) {
    const analysis = {
        entropy: calculateEntropy(password),
        uniqueChars: new Set(password).size,
        patterns: findPatterns(password),
        estimatedCrackTime: estimateCrackTime(password)
    };
    
    return analysis;
}

// Calcular entropia da senha
function calculateEntropy(password) {
    const charSet = getCharacterSet(password);
    return password.length * Math.log2(charSet);
}

// Determinar conjunto de caracteres usado
function getCharacterSet(password) {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26; // lowercase
    if (/[A-Z]/.test(password)) charset += 26; // uppercase  
    if (/[0-9]/.test(password)) charset += 10; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32; // special chars
    return charset;
}

// Encontrar padrões na senha
function findPatterns(password) {
    const patterns = [];
    
    // Sequências
    if (/(.)\1{2,}/.test(password)) {
        patterns.push('Repetição de caracteres');
    }
    
    // Sequências numéricas
    if (/(?:0123|1234|2345|3456|4567|5678|6789)/.test(password)) {
        patterns.push('Sequência numérica');
    }
    
    // Sequências alfabéticas
    if (/(?:abcd|bcde|cdef|defg|efgh|fghi|ghij)/.test(password.toLowerCase())) {
        patterns.push('Sequência alfabética');
    }
    
    return patterns;
}

// Estimar tempo de quebra da senha
function estimateCrackTime(password) {
    const charset = getCharacterSet(password);
    const combinations = Math.pow(charset, password.length);
    const guessesPerSecond = 1000000000; // 1 bilhão de tentativas por segundo
    
    const seconds = combinations / (2 * guessesPerSecond); // Divisão por 2 para tempo médio
    
    if (seconds < 60) return 'Menos de 1 minuto';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutos`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} horas`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} dias`;
    if (seconds < 31536000 * 1000) return `${Math.floor(seconds / 31536000)} anos`;
    
    return 'Milhares de anos';
}

// Adicionar efeitos visuais avançados
function addVisualEffects() {
    // Efeito de typing animation no input
    const passwordInput = document.getElementById('password');
    
    passwordInput.addEventListener('input', function() {
        this.classList.add('typing-animation');
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.classList.remove('typing-animation');
        }, 1000);
    });

    // Adicionar efeito de ondulação aos cliques
    document.addEventListener('click', createRipple);
    
    // Animação sequencial das dicas
    animateTips();
    
    // Efeito de partículas no hover
    addParticleEffects();
    
    // Cursor personalizado
    addCustomCursor();
}

// Criar efeito de ondulação
function createRipple(event) {
    const ripple = document.createElement('span');
    const rect = event.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Adicionar animação CSS se não existir
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-effect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const targetElement = event.target.closest('.example-item, .toggle-password, .criterion');
    if (targetElement) {
        targetElement.style.position = 'relative';
        targetElement.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Animar dicas sequencialmente
function animateTips() {
    const tips = document.querySelectorAll('.feedback li');
    tips.forEach((tip, index) => {
        tip.style.setProperty('--i', index);
        tip.style.animationDelay = `${index * 0.3}s`;
    });
}

// Adicionar efeitos de partículas
function addParticleEffects() {
    const container = document.querySelector('.container');
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Criar partícula ocasional
        if (Math.random() > 0.95) {
            createFloatingParticle(x, y);
        }
    });
}

// Criar partícula flutuante
function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    const symbols = ['✨', '⚡', '🔒', '🛡️', '💎'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    particle.textContent = symbol;
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        font-size: ${Math.random() * 10 + 15}px;
        pointer-events: none;
        animation: float-away 2s ease-out forwards;
        z-index: 100;
    `;
    
    // Adicionar animação se não existir
    if (!document.querySelector('#float-away-style')) {
        const style = document.createElement('style');
        style.id = 'float-away-style';
        style.textContent = `
            @keyframes float-away {
                0% { opacity: 1; transform: translateY(0) scale(0); }
                50% { opacity: 0.8; transform: translateY(-20px) scale(1); }
                100% { opacity: 0; transform: translateY(-40px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.querySelector('.container').appendChild(particle);
    setTimeout(() => particle.remove(), 2000);
}

// Cursor personalizado
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Adicionar estilos do cursor
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            transform: translate(-50%, -50%) scale(2);
            background: radial-gradient(circle, rgba(118, 75, 162, 0.8), transparent);
        }
        
        body * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Mover cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Efeito hover
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('button, input, .example-item, .criterion')) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    });
}

// Efeito de confetes quando senha forte
function celebrateStrongPassword() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall 3s ease-out forwards;
            `;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
    
    // Adicionar animação se não existir
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                0% { transform: translateY(-100vh) rotateZ(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotateZ(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Modificar a função de atualização para incluir confetes
const originalUpdateStrengthIndicator = updateStrengthIndicator;
updateStrengthIndicator = function(score, metCriteria) {
    originalUpdateStrengthIndicator(score, metCriteria);
    
    // Celebrar senha forte
    if (score >= 80 && !window.hasRecentlyCelebrated) {
        celebrateStrongPassword();
        window.hasRecentlyCelebrated = true;
        setTimeout(() => {
            window.hasRecentlyCelebrated = false;
        }, 5000);
    }
};

// Log de atividade (para desenvolvimento)
console.log('Password Strength Checker carregado com sucesso! 🔒');
console.log('Dica: Pressione F2 para gerar uma senha segura automaticamente');
