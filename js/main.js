const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('.empty-list__title');

let tasks = [];
checkEmptyList();

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

// функции
function addTask(e) {
    // отменяем перезагрузку страницы
    e.preventDefault();
    // получаем введенные данные
    const taskText = taskInput.value;

  // описываем задачу в виде обьекто
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    // добавляем задачу в массив
    tasks.push(newTask);
   

    // формируем css класс
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';
    
    // формируем разметку для новой задачи
    const taskHtml = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
          <span class="${cssClass}">${newTask.text}</span>
          <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
              <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
          </div>
        </li>
    `;
    // добавляем задачу на страницу
    taskList.insertAdjacentHTML('beforeend', taskHtml);
  
    // очищаем поле ввода и оставляем фокус
    taskInput.value = '';
    taskInput.focus();
 
  
    // if(taskList.children.length > 1) {
    //   emptyList.classList.add('none');
    // } else {
      
    // }
}

function doneTask(e) {
  if(e.target.dataset.action !== 'done') return;

  if(e.target.dataset.action === 'done') {
    const parentNode = e.target.closest('.list-group-item');

    // определеяем id задачи
    id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    // const taskTitle = parentNode.querySelector('.task-title');
    // taskTitle.classList.toggle('task-title--done');
  }
}

function deleteTask(e) {
  if (e.target.dataset.action !== 'delete') return;
  
  if (e.target.dataset.action === 'delete') {
  const parentNode = e.target.closest('li');

  // определяем id задачи
  id = Number(parentNode.id);

  // находим индекс задачи в массиве
  const index = tasks.findIndex((task) => task.id === id);
  // удаляем задачу из массива
  tasks.splice(index, 1)

  // удаляем задачу из разметки
  parentNode.remove();
  }

}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHtml = `
    <li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
    <div class="empty-list__title">Список дел пуст</div>
    </li>
    `
    taskList.insertAdjacentHTML('afterbegin', emptyListHtml);
  }
  // if (tasks.length > 0) {
  //   const emptyListPage = `
  //   <li id="emptyList" class="list-group-item empty-list">
  //   <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
  //   <div class="empty-list__title">Есть невыполненные задачи</div>
  //   </li>
  //   `
  //   taskList.insertAdjacentHTML('afterbegin', emptyListPage)
  // }
}