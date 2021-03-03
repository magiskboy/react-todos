import classNames from 'classnames';

import './TodoItem.css';

import doneItemImage from '../images/item-done.svg';
import itemImage from '../images/item.svg';
import itemRemoveImage from '../images/item-remove.svg';


export default function TodoItem(props) {
    const { item, onAddNewTodoItem, onRemoveTodoItem } = props;

    return (
        <div className={classNames('TodoItem', {"TodoItem-complete": item.isComplete})}>
            {item.isComplete && <img src={doneItemImage} className="TodoStatusImage" onClick={onAddNewTodoItem} alt="Task was done" />}
            {!item.isComplete && <img src={itemImage} className="TodoStatusImage" onClick={onAddNewTodoItem} alt="Task wasn't done" />}
            <p>{item.title}</p>
            <img className="ItemRemove" src={itemRemoveImage} onClick={onRemoveTodoItem} alt="Remove task" />
        </div>
    )
}
