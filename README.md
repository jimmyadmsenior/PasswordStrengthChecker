# 🔒 Password Strength Checker

Um verificador de força de senhas interativo e educacional, desenvolvido para ajudar usuários a criar senhas mais seguras através de feedback em tempo real.

## 🎯 Funcionalidades

### ✨ Características Principais
- **Análise em Tempo Real**: Verifica a força da senha conforme você digita
- **Critérios de Segurança Visuais**: Indicadores claros para cada requisito
- **Feedback Inteligente**: Sugestões personalizadas para melhorar a senha
- **Interface Moderna**: Design responsivo e acessível
- **Exemplos Educacionais**: Comparações entre senhas fracas e fortes
- **Gerador de Senhas**: Pressione F2 para gerar uma senha segura automaticamente

### 🔍 Critérios Avaliados
1. **Comprimento**: Mínimo de 8 caracteres (recomendado 12+)
2. **Letras Minúsculas**: Pelo menos uma letra minúscula (a-z)
3. **Letras Maiúsculas**: Pelo menos uma letra maiúscula (A-Z)
4. **Números**: Pelo menos um dígito (0-9)
5. **Caracteres Especiais**: Símbolos especiais (!@#$%^&*)

### 🎨 Sistema de Pontuação
- **Fraca (0-39 pontos)**: 🔴 Senha vulnerável
- **Moderada (40-79 pontos)**: 🟡 Senha aceitável, mas pode melhorar
- **Forte (80+ pontos)**: 🟢 Senha segura

### 🧠 Análise Avançada
- Detecção de sequências comuns (123, abc, qwerty)
- Identificação de repetições excessivas
- Bonificação para senhas longas (12+ e 16+ caracteres)
- Penalização para padrões previsíveis

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** em qualquer navegador moderno
2. **Digite sua senha** no campo de entrada
3. **Observe o feedback** em tempo real:
   - Barra de força colorida
   - Critérios com indicadores visuais
   - Sugestões personalizadas
4. **Use F2** para gerar uma senha segura automaticamente

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (Vanilla)**: Lógica de verificação e interatividade
- **Google Fonts**: Tipografia profissional (Inter)

## 📁 Estrutura do Projeto

```
PasswordStrengthChecker/
├── index.html          # Página principal
├── style.css           # Estilos e layout
├── script.js           # Lógica de verificação
├── README.md           # Documentação
└── LICENSE             # Licença do projeto
```

## 🔧 Algoritmo de Verificação

### Pontuação Base
- Comprimento >= 8 caracteres: **25 pontos**
- Letras minúsculas: **20 pontos**
- Letras maiúsculas: **20 pontos**
- Números: **20 pontos**
- Caracteres especiais: **15 pontos**

### Bonificações
- Senha >= 12 caracteres: **+10 pontos**
- Senha >= 16 caracteres: **+10 pontos** (adicional)

### Penalidades
- Sequências comuns: **-20 pontos**
- Repetições excessivas: **-15 pontos**

## 🎨 Interface

A interface foi projetada seguindo princípios de UX/UI modernos:
- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Acessibilidade**: Contrastes adequados e navegação por teclado
- **Feedback Visual**: Cores e animações para comunicar o status
- **Tipografia Legível**: Fonte Inter para máxima legibilidade

## 🔐 Segurança e Privacidade

- **Processamento Local**: Todas as análises são feitas no navegador
- **Sem Envio de Dados**: Nenhuma senha é enviada para servidores
- **Código Aberto**: Transparência total no algoritmo utilizado
- **Aviso de Segurança**: Lembretes para não usar senhas reais para teste

## 🚀 Funcionalidades Avançadas

### Gerador Automático de Senhas
- Pressione **F2** para gerar uma senha segura
- 16 caracteres com todos os tipos de caracteres
- Embaralhamento seguro para evitar padrões

### Análise de Complexidade
- Cálculo de entropia
- Estimativa de tempo de quebra
- Detecção de padrões complexos
- Análise de conjunto de caracteres

## 🎯 Casos de Uso

- **Educação**: Ensinar boas práticas de segurança
- **Empresas**: Treinamento de funcionários
- **Desenvolvimento**: Integração em sistemas de cadastro
- **Pessoal**: Melhorar suas próprias senhas

## 🔄 Possíveis Melhorias Futuras

- [ ] Verificação contra base de senhas vazadas
- [ ] Suporte a múltiplos idiomas
- [ ] Modo escuro automático
- [ ] Histórico de senhas testadas (sem armazenar)
- [ ] Integração com gerenciadores de senha
- [ ] Análise de políticas corporativas
- [ ] Relatórios de segurança exportáveis

## 📊 Exemplos de Senhas

| Senha | Força | Pontuação | Observações |
|-------|--------|-----------|-------------|
| `123456` | 🔴 Fraca | 5 | Apenas números, muito comum |
| `Password123` | 🟡 Moderada | 65 | Boa base, mas previsível |
| `MyS3cur3P@ss!` | 🟢 Forte | 90 | Excelente combinação |
| `PxH1#n!8` | 🟢 Forte | 85 | Compacta e segura |

## 🤝 Contribuições

Contribuições são bem-vindas! Algumas áreas para melhoria:
- Novos critérios de validação
- Melhorias na interface
- Otimizações de performance
- Testes automatizados
- Documentação adicional

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙋‍♂️ Suporte

Para dúvidas, sugestões ou reportar problemas:
- Abra uma issue no repositório
- Verifique a documentação existente
- Teste em diferentes navegadores

---

**⚠️ Importante**: Este é um projeto educacional. Nunca insira suas senhas reais para teste. Use apenas senhas de exemplo ou gere novas senhas para avaliar o sistema.

**💡 Dica**: Para máxima segurança, use um gerenciador de senhas profissional junto com senhas fortes!