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
    scoreboard.innerHTML = `Счёт: Вы - ${playerScore}, Компьютер - ${computerScore}<br>Раунд ${roundsPlayed + 1}`;
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
