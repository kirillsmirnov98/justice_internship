import {useEffect, useMemo, useState} from 'react'
import buttonplus from "./assets/icons/button__plus.svg";
import bell from "./assets/icons/bell.svg";
import userIcon from "./assets/icons/usericon.svg";
import buttonDelete from "./assets/icons/btndlt.svg";

function App() {
  const [type, setType] = useState('list');
  const [lists, setLists] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  /* Отображение бургер меню*/
  const displayBurger = () => {
    if(isBurgerOpened === false) {
      let container = document.getElementById('burger-menu');
      container.classList.add('active');
      container.classList.remove('disactive');
      let btnContainer = document.getElementById('burger-button');
      btnContainer.classList.add('active_button');
      btnContainer.classList.remove('disactive_button');
      setIsBurgerOpened(true);
    }
    if(isBurgerOpened === true) {
      let container = document.getElementById('burger-menu');
      container.classList.add('disactive');
      container.classList.remove('active');
      let btnContainer = document.getElementById('burger-button');
      btnContainer.classList.add('disactive_button');
      btnContainer.classList.remove('active_button');
      setIsBurgerOpened(false);
    }
  }

  /* Добавление элементов списка */
  const listsLayout = useMemo(() => {
    return lists.length ?
      lists
        .filter((el) => el.type === type)
        .map((el, index) => (<div className='tasks_task'>
          {el.list}
          {<img src={buttonDelete} onClick={() => deleteTask(index, type)} />}
        </div>)) :
      (<div className='tasks_empty-list'>
        Нет задач в списке
      </div>)
  }, [lists.length]);

  /* Добавление элементов напоминаний */
  const notifsLayout = useMemo(() => {
    return notifs.length ?
      notifs
        .filter((el) => el.type === type)
        .map((el, index) => (<div className='tasks_task'>
          {el.notif}
          {<img src={buttonDelete} onClick={() => deleteTask(index, type)} />}
        </div>)) :
      (<div className='tasks_empty-list'>
        Нет задач в напоминаниях
      </div>)
  }, [notifs.length]);

  /* Создание див-элементов */
  const tasksLayout = useMemo(() => {
    if (type === 'list') {
      return listsLayout;
    } else if (type === 'notif') {
      return notifsLayout;
    } else {
      return (<div className='tasks_empty-list'>
        Недопустимый тип
      </div>);
    }
  }, [notifs.length, lists.length, type]);

  /* Создание нового типа элемента */
  const clickTypeBtn = (newType) => {
    if (newType !== type) setType(newType);
  };

  /* Добавление элементов в массив */
  const addNewTask = () => {
    const taskText = document.getElementById('inputTask').value;
    if (taskText === "") return;
    if(type === 'list'){
      const inputlist = document.getElementById('inputTask');
      const newList = {list: inputlist.value, type};
      inputlist.value = '';
      setLists([...lists, newList]);
    }
    if(type === 'notif'){
      const inputnotif = document.getElementById('inputTask');
      const newNotif = {notif: inputnotif.value, type};
      inputnotif.value = '';
      setNotifs([...notifs, newNotif]);
    }
  };

  /* Удаление элементов */
  const deleteTask = (index, type) => {
    if(type === 'list')
      setLists([...lists.slice(0, index), ...lists.slice(index + 1)]);
    if(type === 'notif')
      setNotifs([...notifs.slice(0, index), ...notifs.slice(index + 1)]);
  };

  /* Текущий элемент панели навигации */
  const navActive = (id) => {
    let btnMain = document.getElementById('btn-main');
    let btnList = document.getElementById('btn-list');
    let btnFriends = document.getElementById('btn-friends');
    let btnContacts = document.getElementById('btn-contacts');
      if(id === 'btn-main') { 
          btnList.classList.remove('active_div');
          btnFriends.classList.remove('active_div');
          btnContacts.classList.remove('active_div');
          btnMain.classList.add('active_div');
      };
      if(id === 'btn-list') { 
          btnMain.classList.remove('active_div');
          btnFriends.classList.remove('active_div');
          btnContacts.classList.remove('active_div');
          btnList.classList.add('active_div');
      };
      if(id === 'btn-friends') { 
          btnMain.classList.remove('active_div');
          btnList.classList.remove('active_div');
          btnContacts.classList.remove('active_div');
          btnFriends.classList.add('active_div');
      };
      if(id === 'btn-contacts') { 
          btnMain.classList.remove('active_div');
          btnList.classList.remove('active_div');
          btnFriends.classList.remove('active_div');
          btnContacts.classList.add('active_div');
      };
  };

 /* Текущий элемент фильтра */
  const currentFilter = (name) => {
    let list = document.getElementById('tasks-list');
    let notif = document.getElementById('notification');
    let other = document.getElementById('other_filter');
    
    if(name === 'tasks-list'){
      list.classList.add('active_filter');
      notif.classList.remove('active_filter');
      other.classList.remove('active_filter');
    };
    if(name === 'notification'){
      notif.classList.add('active_filter');
      list.classList.remove('active_filter');
      other.classList.remove('active_filter');    
    };
    if(name === 'other_filter'){
      other.classList.add('active_filter');
      list.classList.remove('active_filter');
      notif.classList.remove('active_filter');
    }
  };

  /* Обработчик двух событий на кнопках "Список" и "Напоминания" */
  const twoFunctions = (newType, name) => {
    clickTypeBtn(newType);
    currentFilter(name);
  };
  
  return (
    <div className = "container">
      <div className = "header">       
          <div className = "logo_primary">
            Justice
          </div>
          <div className = "header__burger disactive_button" id = "burger-button" onClick = {() => displayBurger ()}>
              <span></span>
          </div>
          <div className = "functional disactive" id='burger-menu'>
            
            <div className = "navigation">
              <div id = "btn-main" onClick = {() => navActive('btn-main')}>
                Главная
              </div>
              <div id = "btn-list" onClick = {() => navActive('btn-list')}>
                Список
              </div>
              <div id = "btn-friends" onClick = {() => navActive('btn-friends')}>
                Друзья
              </div>
              <div id = "btn-contacts" onClick = {() => navActive('btn-contacts')}>
                Контакты
              </div>
            </div>
            <div className = "action">
              <button>
                Выйти
              </button>
              <div id = "bell"><img src = {bell} alt = "X"/></div>
              <div><img src = {userIcon} alt = "X"/></div>
            </div>
          </div>     
      </div>
      <div className = "content_creator">
        <div className = "filters">
          <button id = "tasks-list" className = "active_filter" onClick={() => twoFunctions('list', 'tasks-list')}>
            Список
          </button>
          <button id = "notification" onClick={() => twoFunctions('notif', 'notification')}>
            Напоминания
          </button>
          <button id = "other_filter" onClick = {() => currentFilter('other_filter')}>
            Еще
          </button>
        </div>
        <div className = "tasks_creator">
          <input id='inputTask' type = "text" placeholder = "Введите текст" />
          <button onClick={() => addNewTask()}>
            Добавить
            <img src={buttonplus} alt = "X"></img>
          </button>
        </div>
      </div>
      <div className='tasks_list'>
        {tasksLayout}
      </div>
      
      <div className = "footer">
        <div className = "top__footer">
          <div className = "logo_secondary">
            Justice
          </div>
          <div className = "footer__navigation">
            <div>
              Главная
            </div>
            <div>
              Список
            </div>
            <div>
              Друзья
            </div>
           <div>
              Контакты
            </div>
          </div>
        </div>
        <div className = "middle__footer">

        </div>
        <div className = "bot__footer">
          <div className = "all_rights_reserved">
            © 2021 Justice-team. All rights reserved.
          </div>
          <div className = "terms_cond_pp">
            <div>
              Terms & conditions
            </div>
            <div>
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;