class Toaster {

  constructor () {
    this.view = document.querySelector('.toast-view');
    this.hideTimeout = 0;
    this.hideBound = this.hide.bind(this);
  }

  toast (message) {

    this.view.textContent = message;
    this.view.classList.add('toast-view--visible');

    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(this.hideBound, 5000);
  }

  hide () {
    this.view.classList.remove('toast-view--visible');
  }
}

export default Toaster;
