function showError(message) {
    const errorModal = document.createElement('div');
    errorModal.className = 'error-modal';
    
    errorModal.innerHTML = `
        <div>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(errorModal);
}

function callDonat() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData('/pay');
    } else {
        showError('Telegram Web App API не доступен');
    }
}

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function getRandomCard() {
  const cards = ['rock', 'scissors', 'paper'];
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
      return "Ничья!";
  }

  if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'scissors' && computerChoice === 'paper') ||
      (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
      return "Вы выиграли!";
  } else {
      return "Вы проиграли!";
  }
}

function updateScoreboard() {
    const scoreboard = document.getElementById('result-message');
    scoreboard.innerHTML = `Счёт9:<br>Вы - ${playerScore}, Компьютер - ${computerScore}<br>Раунд ${roundsPlayed + 1}`;
}

function checkGameWinner() {
    if (playerScore === 2 || computerScore === 2) {
        const resultText = playerScore === 2 ? "Вы выиграли матч!" : "Вы проиграли матч!";
        const resultMessage = document.getElementById('result-message');
        resultMessage.textContent = resultText;
        const nextRoundButton = document.getElementById('next-round-button');
        nextRoundButton.textContent = 'Новая игра';
        nextRoundButton.onclick = resetGame;
        return true;
    }
    return false;
}

function playGame(playerChoice) {
    const computerChoice = getRandomCard();
    roundsPlayed++;

    // Показать выбранную компьютером карту
    const topRowCards = document.querySelectorAll('#top-row .card');
    topRowCards.forEach(card => {
        if (card.getAttribute('data-type') === computerChoice) {
            card.textContent = computerChoice === 'rock' ? 'Камень' : computerChoice === 'scissors' ? 'Ножницы' : 'Бумага';
            card.style.color = '#fff';
            card.style.backgroundColor = '#8fa5b6';
            card.classList.add('revealed');
        }
    });

    const resultText = determineWinner(playerChoice, computerChoice);
    if (resultText === "Вы выиграли!") {
        playerScore++;
    } else if (resultText === "Вы проиграли!") {
        computerScore++;
    }

    setTimeout(() => {
        updateScoreboard();
        const resultModal = document.getElementById('result-modal');
        resultModal.classList.remove('hidden');

        const nextRoundButton = document.getElementById('next-round-button');
        nextRoundButton.onclick = startNextRound;
        
        if (!checkGameWinner()) {
            nextRoundButton.textContent = 'Дальше';
        }
    }, 600); // Задержка для завершения анимации переворота карты
}

function startNextRound() {
    const resultModal = document.getElementById('result-modal');
    resultModal.classList.add('hidden');

    const topRowCards = document.querySelectorAll('#top-row .card');
    topRowCards.forEach(card => {
        card.textContent = '';
        card.style.color = 'transparent';
        card.style.backgroundColor = '#777';
        card.classList.remove('revealed');
        card.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            card.style.transform = '';
        }, 10);
    });
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    startNextRound();
}

window.Telegram.WebApp.ready();

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  
