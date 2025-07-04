import View from './View.js';

import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _messageError = 'No recipes found for yous query. Please try again ;)';
  _message = 'hello';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
