let questionCount = 0;
let scoreCount = 0;
let wrongCount = 0;

function renderSplashPage() {
  $('#js-dashboard').empty().hide();
  $('#js-final-page').empty().hide();
  $('#js-question-page').empty().hide();
  $('#js-feedback-page').empty().hide();

  questionCount = 0;
  scoreCount = 0;
  wrongCount = 0;
  $('#js-splash-page').empty().append(`
    <p>Given a Song Title, please choose the correct Artist.</p>
    <button class="submit-button" id="js-submit-button" type="button">
      Start Quiz
    </button>
    `).show();
};

function renderDashboard() {
  $('#js-dashboard').empty().append(`
    <p>Question ${questionCount + 1} of ${songs.length}</p>
    <p>Score: ${scoreCount / 10 * 100}%
        <span> | Correct: ${scoreCount} | Wrong: ${wrongCount}</span>
    </p>
  `).show();
};

function updateDashboard() {
  if(questionCount < 10) {
    $('#js-dashboard').empty().append(`
      <p class="track-question">Question ${questionCount + 1} of ${songs.length}</p> 
      <p class="stats">Score: ${scoreCount / 10 * 100}%
        <span> | Correct: ${scoreCount} | Wrong: ${wrongCount}</span>
      </p>
    `).show();
  }
};

function renderQuestion() {
  $('#js-feedback-page').hide();
  if(questionCount < songs.length) {
    $('#js-song-artist-page').empty().append(`
      <form class="song-artist-form">
        <fieldset>
          <legend id="song-title">
            <p>Who sings <span>${songs[questionCount].songTitle}</span> ?</p>
          </legend>

          <div class="artist-box">
            <img class="artist-image" src="${songs[questionCount].a}" alt="Headshot of ${songs[questionCount].aArtist}">
            <input type="radio" name="user-answer-a" id="a" value="a" checked required>
            <label class="artist-name" for="a">${songs[questionCount].aArtist}</label> 
          </div>

          <div class="artist-box">
            <img class="artist-image" src="${songs[questionCount].b}" alt="Headshot of ${songs[questionCount].bArtist}">
            <input type="radio" name="user-answer-b" id="b" value="b" required>
            <label class="artist-name" for="b">${songs[questionCount].bArtist}</label>
          </div>

          <div class="artist-box">
            <img class="artist-image" src="${songs[questionCount].c}" alt="Headshot of ${songs[questionCount].cArtist}">
            <input type="radio" name="user-answer-c" id="c" value="c" required>
            <label class="artist-name" for="c">${songs[questionCount].cArtist}</label>
          </div>

          <div class="artist-box"> 
            <img class="artist-image" src="${songs[questionCount].d}" alt="Headshot of ${songs[questionCount].dArtist}">
            <input type="radio" name="user-answer-d" id="d" value="d" required>
            <label class="artist-name" for="d">${songs[questionCount].dArtist}</label>
          </div>

          <button class="submit-button" id="js-submit-button" type="button">
            <div>
              Submit Answer
            </div>
          </button>
        </fieldset>
      </form>
    `).show();
  } else {
    renderFinalPage();
  }
};

function renderFeedbackCorrect() {
  $('#js-song-artist-page').hide();
  updateDashboard();
  $('#js-feedback-page').empty().append(`
    <div class="feedback-box">
      <p>You got it right!</p>
      <button class="submit-button" id="js-next-button" type="button">
        Next Question
      </button>
    </div>
  `).show();
};

function renderFeedbackWrong() {
  $('#js-song-artist-page').hide();
  updateDashboard();
  $('#js-feedback-page').empty().append(`
    <div class="feedback-box">
      <p>You got it wrong!</p>
      <p>The correct answer was ${songs[questionCount].correctArtist}.</p>
      <button class="submit-button" id="js-next-button" type="button">
        Next Question
      </button>
    </div>
  `).show();
};

function renderFinalPage() {
  $('#js-song-artist-page').empty().hide();
  $('#js-dashboard').empty().hide();

  $('#js-final-page').empty().append(`
    <p>Congratulations!</p>
    <ul>
      <li>Score: ${scoreCount / 10 * 100}%</li>
      <li>Number correct: ${scoreCount}</li>
      <li>Number wrong: ${wrongCount}</li>
    </ul>
    <button class="submit-button" id="js-resart-button" type="button">
      Restart Quiz
    </button>
  `).show();
}


function changeQuestionCount() {
  questionCount++;
};

function changeScoreCount() {
  scoreCount++;
};

function changeWrongCount() {
  wrongCount++;
};

function handleStartQuiz() {
  $('#js-splash-page').on('click', '.submit-button', function(event) {
    event.preventDefault();
    $('#js-splash-page').hide();
    renderDashboard();
    renderQuestion();
  });
};

function handleSubmitAnswer() {
  $('#js-song-artist-page').on('click', '.submit-button', function(event) {
    event.preventDefault();

    let userAnswer = $('#js-song-artist-page').find('input[type="radio"]:checked').val();
    let correctAnswer = `${songs[questionCount].correct}`;

    if(userAnswer === correctAnswer) {
      changeScoreCount();
      renderFeedbackCorrect();
    } else {
      changeWrongCount();
      renderFeedbackWrong();
    }
  });
};

function handleNextQuestion() {
  $('#js-feedback-page').on('click', '.submit-button', function(event) {
    event.preventDefault();

    changeQuestionCount();
    renderQuestion();
    updateDashboard();
  });
};

function handleRestartQuiz() {
  $('#js-final-page').on('click', '.submit-button', function(event) {
    event.preventDefault();
    
    renderSplashPage();
    
    $('#js-splash-page').hide();
    renderDashboard();
    renderQuestion();
  });
};

function driver() {
  renderSplashPage();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestartQuiz();
};

$(driver);