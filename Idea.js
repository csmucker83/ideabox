// Idea methods must include, but are not limited to:
// saveToStorage (should only have one job which is to save the instance to storage)
// deleteFromStorage
// updateIdea (should be able to update the idea’s title, body, or starred state)

class Idea {
  constructor(titleInput, bodyInput) {
    this.id = Date.now();
    this.title = titleInput;
    this.body = bodyInput;
    this.star = false;
  }

  saveToStorage() {
    var key = JSON.stringify(this.id);
    var ideaStringified = JSON.stringify(this);
    localStorage.setItem(key, ideaStringified);
  }

  // saveToStorage() {
  //   var ideasStored = [];
  //   ideasStored.push(localStorage.setItem('ideaStored', JSON.stringify(this)));
  // }


  deleteFromStorage() {
    localStorage.removeItem(this.id.toString());
  }
  

  updateIdea() {
//need to come back to this
  }
}
