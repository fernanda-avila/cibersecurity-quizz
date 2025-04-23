document.addEventListener('DOMContentLoaded', () => {
   
    const explanationContainer = document.getElementById('explanation');
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const resultContainer = document.getElementById('result');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-btn');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const hintBtn = document.getElementById('hint-btn');
    const hintBox = document.getElementById('hint-box');

    
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;
    let currentHint = "";
    let isTyping = false;

    
    const questions = [
        {
            question: "O que é cibersegurança?",
            options: [
                "O estudo sobre computadores",
                "O conjunto de práticas e tecnologias para proteger sistemas e dados contra ataques",
                "A criação de programas antivírus",
                "A proteção de dispositivos móveis exclusivamente"
            ],
            correctAnswer: 1,
            explanation: "[✓] Correto! Cibersegurança é o conjunto de práticas para proteger sistemas contra ameaças digitais.",
            hint: "*Digitando rápido* Se eu fosse um sysadmin, me preocuparia com a proteção completa... não apenas antivírus ou celulares, mas toda a infraestrutura digital."
        },
        {
            question: "Quais são os principais pilares da cibersegurança?",
            options: [
                "Confiança, integridade, e disponibilidade",
                "Confidencialidade, integridade, e disponibilidade",
                "Criptografia, antivírus, e firewalls",
                "Proteção, redes e dispositivos"
            ],
            correctAnswer: 1,
            explanation: "[✓] Correto! Os três pilares são Confidencialidade, Integridade e Disponibilidade (CID).",
            hint: "*Rindo* Eu odeio quando aplicam esses três princípios direito... Um deles me impede de ler dados, outro de alterá-los... e tem aquele que mantém tudo funcionando."
        },
        {
            question: "Como a cibersegurança pode ajudar uma empresa?",
            options: [
                "Aumentar a velocidade dos sistemas",
                "Impedir ataques, proteger dados, e garantir o funcionamento sem riscos",
                "Melhorar a qualidade do produto final",
                "Ajudar a desenvolver novos softwares"
            ],
            correctAnswer: 1,
            explanation: "[✓] Correto! A cibersegurança protege a empresa contra ameaças digitais e vazamentos.",
            hint: "*Analisando redes* Se uma empresa não quer me ver roubando seus dados ou derrubando seus sistemas... o que ela deveria implementar?"
        },
        {
            question: "O que é phishing?",
            options: [
                "Um ataque que se disguisa de e-mail ou mensagem para roubar dados pessoais",
                "Um tipo de antivírus",
                "Uma técnica para melhorar a segurança dos dados",
                "Um sistema de firewall"
            ],
            correctAnswer: 0,
            explanation: "[✓] Correto! Phishing é um golpe que tenta enganar vítimas para obter informações sensíveis.",
            hint: "*Sussurrando* Eu adoro enviar e-mails que parecem do banco... mas não são. Qual será o nome dessa técnica que 'pesca' dados?"
        },
        {
            question: "Qual é o objetivo de um ataque de ransomware?",
            options: [
                "Roubar senhas bancárias",
                "Paralisar os sistemas e pedir resgate para devolver os dados",
                "Alterar a integridade de dados sem ser detectado",
                "Infectar computadores com vírus leves"
            ],
            correctAnswer: 1,
            explanation: "[✓] Correto! Ransomware criptografa dados e exige pagamento para liberá-los.",
            hint: "*Criptografando arquivos* Imagine que todos seus documentos viraram um enigma... e eu peço Bitcoin para te dar a senha. Isso me lembra a palavra 'ransom'..."
        },
        {
            question: "O que significa 'confidencialidade' na cibersegurança?",
            options: [
                "Manter os sistemas disponíveis o tempo todo",
                "Assegurar que dados não sejam alterados por pessoas não autorizadas",
                "Garantir que apenas pessoas autorizadas possam acessar certos dados",
                "Proteger os sistemas de vírus"
            ],
            correctAnswer: 2,
            explanation: "[✓] Correto! Confidencialidade garante que só pessoas autorizadas acessem informações.",
            hint: "*Farejando dados* Se eu não consigo acessar informações mesmo com minhas técnicas... qual princípio está sendo bem aplicado?"
        },
        {
            question: "Qual é o papel dos antivírus na cibersegurança?",
            options: [
                "Melhorar a velocidade da internet",
                "Detectar e eliminar malwares e vírus",
                "Melhorar a navegação em sites",
                "Armazenar dados pessoais de forma segura"
            ],
            correctAnswer: 1,
            explanation: "[✓] Correto! Antivírus detectam, impedem e removem software malicioso.",
            hint: "*Desenvolvendo malware* Esses programas irritantes sempre detectam meus códigos maliciosos... o que eles fazem exatamente?"
        },
        {
            "question": "Qual frase está no Past Continuous corretamente?",
            "options": [
                "The IT team was investigate a data breach yesterday",
                "The IT team were investigating a data breach yesterday",
                "The IT team was investigating a data breach yesterday",
                "The IT team is investigating a data breach yesterday"
            ],
            "correctAnswer": 2,
            "explanation": "[✓] Correto! O Past Continuous usa 'was/were' + verbo com -ing. 'IT team' é singular (was), e 'investigating' mantém a forma contínua.",
            "hint": "*Lembre-se*: Past Continuous = 'was/were' + verbo terminado em -ing. Time singular usa 'was'!"
        },
        {
            question:"Complete com 'to be' no passado:'Cybersecurity _____ less complex a decade ago.'",
            options: [
                "were",
                "was",
                "been",
                "are"
            ],
            correctAnswer: 2,
            explanation: "[✓] Correto! No passado, usamos 'was' para singular. Exemplo: 'Cybersecurity was simpler before cloud computing.'",
            hint: "*Analisando gramática* \"Regra do passado: Singular → was (it was, she was) Plural → were (they were)"
        },
        {
            "question": "Qual frase está correta no Present Perfect e indica um risco atual?",
            "options": [
                "Attackers have exploited this vulnerability since 2022",
                "We detected malware last week",
                "The CEO changed his password an hour ago",
                "They implemented MFA in January"
            ],
            "correctAnswer": 1,
            "explanation": "[✓] Correto! 'Have exploited' mostra uma exploração contínua da vulnerabilidade até hoje. As outras ações (detected/changed/implemented) estão concluídas no passado.",
            "hint": "*Dica*: Present Perfect = have/has + verbo no particípio (ex: exploited). Procure a ação que ainda afeta o presente!"
        }
    ];

   
    function initQuiz() {
        explanationContainer.style.display = 'block';
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        hintBox.style.display = 'none';
    }

    
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `PONTUAÇÃO: ${score}`;
        explanationContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        hintBox.style.display = 'none';
        showQuestion();
        startTimer();
    }

 
    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        const totalQuestions = questions.length;
        
    
        const progressPercent = (questionNo / totalQuestions) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
       
        questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
        currentHint = currentQuestion.hint;
        
        
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(optionElement);
        });
        
       
        clearInterval(timer);
        timeLeft = 30;
        updateTimerDisplay();
        startTimer();
    }

    
    function resetState() {
        nextButton.style.display = 'none';
        hintBox.style.display = 'none';
        isTyping = false;
        while (optionsElement.firstChild) {
            optionsElement.removeChild(optionsElement.firstChild);
        }
    }

    
    function selectOption(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        const correctIndex = currentQuestion.correctAnswer;
        
        clearInterval(timer);
        
       
        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
    
        if (selectedIndex === correctIndex) {
            score++;
            scoreElement.textContent = `PONTUAÇÃO: ${score}`;
        }
      
        if (currentQuestion.explanation) {
            const correctOption = options[correctIndex];
            correctOption.setAttribute('title', currentQuestion.explanation);
            correctOption.style.cursor = 'help';
        }
        
        nextButton.style.display = 'block';
    }

    
    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        finalScoreElement.textContent = `PONTUAÇÃO FINAL: ${score} de ${questions.length}`;
    }

   
    function startTimer() {
        resetTimer();
        updateTimerDisplay();
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 60;
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        timerElement.textContent = `TEMPO: ${timeLeft}s`;
        
        if (timeLeft <= 10) {
            timerElement.style.color = 'var(--error-red)';
            timerElement.style.textShadow = '0 0 5px var(--error-red)';
        } else if (timeLeft <= 20) {
            timerElement.style.color = 'var(--neon-purple)';
            timerElement.style.textShadow = '0 0 5px var(--neon-purple)';
        } else {
            timerElement.style.color = 'var(--neon-purple)';
            timerElement.style.textShadow = '0 0 5px var(--neon-purple)';
        }
    }

    function timeUp() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        const currentQuestion = questions[currentQuestionIndex];
        const correctIndex = currentQuestion.correctAnswer;
        
        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
                if (currentQuestion.explanation) {
                    option.setAttribute('title', currentQuestion.explanation);
                    option.style.cursor = 'help';
                }
            }
        });
        
        nextButton.style.display = 'block';
    }

    
    function showHint() {
        if (isTyping) return;
        
        isTyping = true;
        let i = 0;
        const speed = 60;
        
        hintBox.innerHTML = `<div class="hacker-terminal">
            <div class="hacker-header">root@darknet:~$ ./dica.sh</div>
            <div class="hacker-text" id="typing-text"></div>
            <div class="blinking-cursor">_</div>
        </div>`;
        hintBox.style.display = 'block';
        
        const typingText = document.getElementById('typing-text');
        const text = currentHint;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                isTyping = false;
            }
        }
        
        typeWriter();
    }

   
    nextButton.addEventListener('click', showNextQuestion);
    restartButton.addEventListener('click', startQuiz);
    startButton.addEventListener('click', startQuiz);
    hintBtn.addEventListener('click', showHint);
    
   
    initQuiz();
});