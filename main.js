var ideas = [];
//QuerySelectors
var titleInput = document.getElementById('titleInput')
var saveBtn = document.getElementById('saveBtn');
var bodyInput = document.getElementById('bodyInput');
//EventListeners
saveBtn.addEventListener('click', function(event) {
  createNewIdea(event);
});

//Functions and Event Handlers
function createNewIdea(event) {
  event.preventDefault();
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  if (!titleInput.value || !bodyInput.value) {
    saveBtn.disabled
  } else {
    ideas.push(newIdea);
    clearInputFields();
  }
};


function clearInputFields() {
  titleInput.value = '';
  bodyInput.value = '';
};
