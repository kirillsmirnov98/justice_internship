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
            <div className = "action">
              <button>
                Выйти
              </button>
              <div><img src = {bell} alt = "X"/></div>
              <div><img src = {userIcon} alt = "X"/></div>
            </div>
          </div>     
      </div>
      <div className = "content_creator">
        <div className = "filters">
          <button onClick={() => clickTypeBtn('list')}>
            Список
          </button>
          <button onClick={() => clickTypeBtn('notif')}>
            Напоминания
          </button>
          <button>
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