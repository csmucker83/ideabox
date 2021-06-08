//Global Variable
var ideas = [];

//QuerySelectors
var titleInput = document.getElementById('titleInput');
var saveBtn = document.getElementById('saveBtn');
var bodyInput = document.getElementById('bodyInput');
var formArea = document.getElementById('formArea');
var ideaCardSection = document.getElementById('ideaCardSection');
var emptyStar = document.getElementById('inactiveStar');
var filledStar = document.getElementById('activeStar');
var starstuff = document.querySelector('.star');



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
  ideaCardSection.innerHTML = '';
    for (var i = 0; i < ideas.length; i++) {
      ideaCardSection.innerHTML +=
      `<article id=${ideas[i].id}>
        <section class="top-card-bar">
          <img class="star" id="inactiveStar" src="assets/star.svg" alt="star">
          <img class="delete" id="deleteImage" src="assets/delete.svg" alt="delete">
          <!-- <img class="delete hidden" src="assets/delete-active.svg" alt="active delete"> HOVER STATE TOGGLE -->
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
      console.log(ideas[i]);
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
    ideas.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
}

//👆 this is pushing an object not associated with the idea class. It has all the info, but maybe needs to be instantied again?
