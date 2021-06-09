//Global Variable
var ideas = [];

//QuerySelectors
var bodyInput = document.getElementById('bodyInput');
var emptyStar = document.getElementById('inactiveStar');
var formArea = document.getElementById('formArea');
var filledStar = document.getElementById('activeStar');
var ideaCardSection = document.getElementById('ideaCardSection');
var saveBtn = document.getElementById('saveBtn');
var titleInput = document.getElementById('titleInput');

//EventListeners
window.addEventListener('load', loadPage);
formArea.addEventListener('keypress', enableSaveBtn);
saveBtn.addEventListener('click', function() {
  createNewIdea(event);
});
ideaCardSection.addEventListener('click', deleteCard);
ideaCardSection.addEventListener('click', toggleFavoriteStatus);

// Functions and Event Handlers
function loadPage() {
  disableSaveBtn();
  refreshIdeas();
  renderCard();
};

function createNewIdea(event) {
  event.preventDefault();
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.saveToStorage();
  ideas.push(newIdea);
  renderCard();
  clearInputFields();
  disableSaveBtn();
};

function enableSaveBtn() {
  if(titleInput.value && bodyInput.value) {
    saveBtn.classList.remove('inactive-save-btn');
    saveBtn.disabled = false;
  }

  if(!titleInput.value || !bodyInput.value) {
    saveBtn.disabled = true;
  }
};

function disableSaveBtn() {
  saveBtn.disabled = true;
  saveBtn.classList.add('inactive-save-btn')
};

function clearInputFields() {
  titleInput.value = '';
  bodyInput.value = '';
};

function renderCard() {
  var src;
  ideaCardSection.innerHTML = '';
    for (var i = 0; i < ideas.length; i++) {
      if(ideas[i].star) {
        src = 'assets/star-active.svg'
      } else {
        src = 'assets/star.svg'
      }
      ideaCardSection.innerHTML +=
      `<article id=${ideas[i].id}>
        <section class="top-card-bar">
          <img class="star" id="inactiveStar" src=${src} alt="star">
          <img class="delete" id="deleteImage" src="assets/delete.svg" alt="delete">
        </section>
        <div class="card-text">
          <h4>${ideas[i].title}</h4>
          <p>${ideas[i].body}</p>
        </div>
        <section class="bottom-card-bar">
          <img class="comment-icon" src="assets/comment.svg" alt="add comment">
          <h6>Comment</h6>
        </section>
      </article>`
  }
};

function deleteCard() {
  for (var i = 0; i < ideas.length; i++) {
    if (event.target.id === 'deleteImage' && ideas[i].id === parseInt(event.target.closest('article').id)) {
      ideas[i].deleteFromStorage();
      ideas.splice(i, 1);
      renderCard();
    }
  }
};

function toggleFavoriteStatus() {
  var starItem = event.target
  for (var i = 0; i < ideas.length; i++) {
    if(event.target.id === 'inactiveStar' && ideas[i].id === parseInt(event.target.closest('article').id)) {
      ideas[i].star = true;
      starItem.src = 'assets/star-active.svg'
      starItem.id = 'activeStar'
    } else if(event.target.id === 'activeStar' && ideas[i].id === parseInt(event.target.closest('article').id)) {
      ideas[i].star = false;
      starItem.src = 'assets/star.svg'
      starItem.id = 'inactiveStar'
    }
  }
};

function refreshIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
  var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
  var savedIdea = new Idea (parsedIdea.title, parsedIdea.body, parsedIdea.id, parsedIdea.star)
  ideas.push(savedIdea);
  }
};
