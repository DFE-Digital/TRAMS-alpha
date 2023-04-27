const autocomplete  = ({ idPrefix, formName, valueName, path }) => {
  const inputValue = result => result && result.name
  const suggestion = result => {
    if (result) {
      return result.name + '<span class="autocomplete__option-hint">' + result.address + '</span>'
    }
  }

  const suggest = (query, populateResults) => {
    const http = new XMLHttpRequest();
    http.onload = function () {
      populateResults(JSON.parse(this.responseText))
    }

    http.open('GET', `${path}?query=${query}`, true);
    http.send();
  }

  accessibleAutocomplete({
    autoselect: false,
    confirmOnBlur: false,
    element: document.getElementById(idPrefix + '-autocomplete-container'),
    name: formName,
    id: `${idPrefix}-${formName}`, // To match it to the existing <label>.
    source: suggest,
    displayMenu: 'overlay',
    minLength: 3,
    templates: {
      inputValue,
      suggestion
    },
    onConfirm: (selected) => {
      if (selected) {
        const value = (selected[valueName])
        document
          .getElementById(`${idPrefix}-${valueName}`)
          .value = value
      }
    }
  })
}
