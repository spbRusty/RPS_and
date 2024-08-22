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
          card.style.backgroundColor = '#8fa5b6';
          card.classList.add('revealed');
      }
  });

  const resultText = determineWinner(playerChoice, computerChoice);

  // Добавляем задержку перед показом модального окна
  setTimeout(() => {
      const resultMessage = document.getElementById('result-message');
      resultMessage.textContent = resultText;
      const resultModal = document.getElementById('result-modal');
      resultModal.classList.remove('hidden');
  }, 600); // Задержка 600 мс для завершения анимации переворота карты
}

function resetGame() {
  // Скрыть модальное окно
  const resultModal = document.getElementById('result-modal');
  resultModal.classList.add('hidden');

  // Сброс карт
  const topRowCards = document.querySelectorAll('#top-row .card');
  topRowCards.forEach(card => {
      card.textContent = '';
      card.style.color = 'transparent';
      card.style.backgroundColor = '#777';
      card.classList.remove('revealed');
      card.style.transform = 'rotateY(180deg)'; // Обратный переворот карты
      setTimeout(() => {
          card.style.transform = '';
      }, 10); // Небольшая задержка для сброса анимации
  });
}
