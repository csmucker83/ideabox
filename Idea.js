// //
// An Idea.js file that contains an Idea class.
// Idea methods must include, but are not limited to:
// constructor
// saveToStorage (should only have one job which is to save the instance to storage)
// deleteFromStorage
// updateIdea (should be able to update the idea’s title, body, or starred state)
// A main.js file that contains all DOM related JavaScript.
// Note The Idea.js file must be the first script in your HTML so that your main.js file has access to your Idea class.
//

// Each idea should be created as an object instance of the Idea class. Once an idea object is created, all that data can be used to update the DOM. That object should also be added to a list of all the ideas your application currently has. This should probably be a global variable in your main.js.

class Idea {
  constructor(titleInput, bodyInput) {
    this.id = Date.now();
    this.title = titleInput;
    this.body = bodyInput;
    this.star = false;
  }

  saveToStorage() {
    localStorage.setItem('ideaStored', JSON.stringify(this));
  }

  deleteFromStorage() {
    // for loop to iterate through the var ideas array
    // for (var i = 0; i < ideas.length; i++) {
    // };
    // Access the ids (ideas[i].id) of the instances
    localStorage.remove();

  }

  updateIdea() {
//need to come back to this
  }
}
