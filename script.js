class Todo {
  data = []
  constructor() {
    this.openFormButtonElement = document.querySelector('.js-open-form');
    this.closeFormButtonElement = document.querySelector('.js-close-form');
    this.formElement = document.querySelector('.js-form');
    this.listWrapElement = document.querySelector('.js-list-wrap');
    this.addItemButtonElement = document.querySelector('.js-add-item');
    this.inputElement = document.querySelector('.js-input');
    this.selectPriorityElement = document.querySelector('.js-select')
    this.inputDateElement = document.querySelector('.js-input-date')

    this.formFilterElement = document.querySelector('.js-filter-form')
    this.inputSearchElement = document.querySelector('.js-input-search');
    this.openFormFilterButtonElement = document.querySelector('.js-open-filter-form');
    this.selectSortElement = document.querySelector('.js-select-sort');

    this.listenEvents()
  }

  listenEvents (){
    this.openFormButtonElement.addEventListener('click', this.handleClickOpenFormButton.bind(this));
    this.openFormFilterButtonElement.addEventListener('click', this.handleToggleFormFilterButton.bind(this));
    this.closeFormButtonElement.addEventListener('click', this.handleClickCloseFormButton.bind(this));
    this.addItemButtonElement.addEventListener('click', this.handleClickAddItemButton.bind(this));
    this.inputSearchElement.addEventListener('input', this.handleInputSearch.bind(this))
    this.selectSortElement.addEventListener('change', this.handleChangeSelectSort.bind(this))
  }
  handleInputSearch ({ target }) {
    const { value } = target;
  
    const resultSearch = this.data.filter((item) =>{
      if (item.content.includes(value)){
        return true
      }
      return false
    })
    if (resultSearch.length){
      this.createList(resultSearch)
    } else {
      this.listWrapElement.innerHTML = '<div class="text-muted">Ничего не найдено</div>'
    } 
  }
  handleChangeSelectSort ({target}) {
    const { value } = target;
    const resultSort = this.data.sort((a, b) => {
      return a[value] - b[value]
    })
    this.createList(resultSort)
  }
  
  handleClickOpenFormButton () {
    this.formElement.classList.remove('island__item_hidden')
  };
  
  handleClickCloseFormButton () {
    this.formElement.classList.add('island__item_hidden')
  };
  
  handleToggleFormFilterButton () {
    this.formFilterElement.classList.toggle('island__item_hidden')
  };
  
  
  handleClickAddItemButton () {
    const content = this.inputElement.value.trim();
    const date = this.addDate();
    const priority = this.selectPriorityElement.value;
    const dateTravel = this.inputDateElement.value;
  
    if (content){
    this.data.push({ content, date, priority, dateTravel });
    this.formElement.reset();// clear form
  
    this.createList(this.data);
    }
  };
  
  handleClickRemoveButton (event) {
    const { target } = event;
  
    if (target.tagName == 'BUTTON'){
      const { index } = target.dataset;
      this.data.splice(index, 1);
      this.createList(this.data)
    }
  }
  
  createListItem ({ content, date, priority, dateTravel }, index) {
    const template = `
      <li class="list__item">
        ${content}
        <span class="fst-italic ms-3 text-muted ">${date}</span>
        <span class="badge bg-light text-warning ms-auto me-3">
          ${this.renderSuns(priority)}
        </span>
        <span class=" ms-3 text-danger me-3 fw-bold ">${dateTravel}</span>
        <button class="btn btn-danger btn-sm data-index="${index}">&#10008</button>
        
        </li>
        `
  
    return template
  };
  
  createList (data = []) {
    const listElement = document.createElement('ul');
    listElement.classList.add('list');
  
    this.listWrapElement.innerHTML = ''
    data.forEach(item => {
      listElement.innerHTML = listElement.innerHTML + this.createListItem(item)
    });
  
    listElement.addEventListener('click', this.handleClickRemoveButton.bind(this));
  
    this.listWrapElement.append(listElement)
  }
  
  addDate () {
    const data = new Date();
    const hour = data.getHours();
    const minuts = data.getMinutes();
    const day = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
  
    return `${day}:${month + 1}:${year} ${hour}:${minuts}`;
  }
  
  renderSuns (counter = 1){
    const template = `
    <svg width="1em" height="1em">
      <use xlink:href="#sun">
    </svg>
    `
    let result = '';
  
    for ( let i = 0; i < counter; i++) {
      result = result + template
    }
  
    return result
  }
  
}
 
new Todo()