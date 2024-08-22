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

function playGame(playerChoice) {
  const computerChoice = getRandomCard();

  // Показать выбранную компьютером карту
  const topRowCards = document.querySelectorAll('#top-row .card');
  topRowCards.forEach(card => {
      if (card.getAttribute('data-type') === computerChoice) {
          card.textContent = computerChoice === 'rock' ? 'Камень' : computerChoice === 'scissors' ? 'Ножницы' : 'Бумага';
          card.style.color = '#fff';
          card.style.backgroundColor = '#f4b400';
          card.classList.add('revealed');
      }
  });

  const resultText = determineWinner(playerChoice, computerChoice);
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = resultText;
  resultDiv.classList.remove('result-hidden');
  resultDiv.classList.add('result-visible');
}
