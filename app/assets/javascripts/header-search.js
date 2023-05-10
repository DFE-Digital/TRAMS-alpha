function HeaderSearch() {
  this.menuButton = document.querySelector('.fiat-search-js-toggle');
    this.menu = this.menuButton && document.querySelector(
      '#' + this.menuButton.getAttribute('aria-controls')
    );
    this.menuIsOpen = false;
}

HeaderSearch.prototype.init = function () { 
  this.syncState();
  this.menuButton.addEventListener('click', this.toggleMenu.bind(this))
}

HeaderSearch.prototype.toggleMenu = function () {
  this.menuIsOpen = !this.menuIsOpen;
  this.syncState();
}

HeaderSearch.prototype.syncState = function () {
  
  if (this.menuIsOpen) {
    this.menu.removeAttribute('hidden');
    this.menuButton.setAttribute("aria-expanded", true);
  } else {
    this.menu.setAttribute('hidden', '');
    this.menuButton.setAttribute("aria-expanded", false);
  }
}

const headerSearch = new HeaderSearch();
if (headerSearch.menuButton) {
  headerSearch.init();
}

