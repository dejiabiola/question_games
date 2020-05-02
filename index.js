window.addEventListener('DOMContentLoaded', (event) => {
  prepareUi()
  const nextButton = document.getElementById('next-button')
  nextButton.addEventListener('click', changeToNextQuestion)
  getUserClickedOption()
})


function getQuestionDivFromUi() {
  const infoDiv = document.getElementById('question-info-div')
  const questionDiv = document.getElementById('question')
  const optionsDiv = document.getElementById('options')
  return {
    questionDiv,
    optionsDiv,
    infoDiv
  } 
}

function prepareUi() {
  const hiddenInput = document.getElementById('ui-value')
  const uiValue = parseInt(hiddenInput.value)
  if (uiValue > 5) {
    showEndofGameScreen()
    return
  }
  populateUi(data[uiValue])
  hiddenInput.value = uiValue + 1
  return uiValue
}


function changeToNextQuestion() {
  prepareUi()
  getUserClickedOption()
}


function populateUi(question) {
  const { questionDiv, optionsDiv } = getQuestionDivFromUi()
  questionDiv.innerHTML = `<h3>${question.question}</h3>`
  
  optionsDiv.innerHTML = question.options.map(option => (
    ` 
    <li class="option">
      <label class="option-span">${option.name}</label><br />
    </li>
    `
  )).join('')

}

function showEndofGameScreen() {
  const { infoDiv } = getQuestionDivFromUi()
  const finalScore = document.getElementById('score').innerHTML
  document.getElementById('score-div').remove()
  document.getElementById('next-button').remove()

  infoDiv.innerHTML = `
    <div class="final-score">
      <h2>You are all done</h2>
      <p style=>You scored ${finalScore} out of 5 questions</p>
    </div>
  `
}

function handleClick(option) {
  const hiddenInput = document.getElementById('ui-value')
  const uiValue = parseInt(hiddenInput.value)
  const questionAnswer = data[uiValue - 1].answer

  if (option.textContent === questionAnswer) {
    option.className = 'success'
    const score = document.getElementById('score')
    score.innerHTML = parseInt(score.innerHTML) + 1
  } else {
    option.className = 'failure'
  }
}

function getUserClickedOption() {
  const options = document.getElementsByTagName('label');
  for (let option of options) {
    option.addEventListener('click', (event) => {
      handleClick(option)
    })
  }
}


const data = {
  1: {
    id: 1,
    question: 'Who is the current president of Nigeria?',
    options: [
      {name: 'Donald Trump'},
      {name: 'Mark Essien'},
      {name: 'Samurai Jack'},
      {name: 'Muhammadu Buhari'},
      {name: 'Naruto'}
    ],
    answer: 'Muhammadu Buhari'
  },
  2: {
    id: 2,
    question: 'How many hours make one day?',
    options: [
      {name: '58 hours'},
      {name: '24 hours'},
      {name: '12 hours'},
      {name: "I don't know"},
      {name: 'Na wa o'}
    ],
    answer: '24 hours'
  },
  3: {
    id: 3,
    question: 'JavaScript is also called?',
    options: [
      {name: 'EcmaScript'},
      {name: 'Java'},
      {name: 'FrontEnd'},
      {name: 'Coding'},
      {name: 'Programming'}
    ],
    answer: 'EcmaScript'
  },
  4: {
    id: 4,
    question: 'Where was Covid19 first discovered?',
    options: [
      {name: 'In a cartoon'},
      {name: 'The white house'},
      {name: 'Aso villa'},
      {name: 'Old Trafford'},
      {name: 'Wuhan, China'}
    ],
    answer: 'Wuhan, China'
  },
  5: {
    id: 5,
    question: 'If Nairobi is to Kenya, then Bogota is to what?',
    options: [
      {name: 'Colombia'},
      {name: 'Nigeria'},
      {name: 'Brazil'},
      {name: 'Chile'},
      {name: 'Haiti'}
    ],
    answer: 'Colombia'
  }
}