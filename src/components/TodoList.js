import TodoItem from './TodoItem';

export default function TodoList(props) {
    const { todoItems, onAddNewTodoItem, onRemoveTodoItem } = props;

    return (
        <div className="TodoList">
            {todoItems.map((item, index) =>
                <TodoItem
                    key={index}
                    item={item}
                    onAddNewTodoItem={() => onAddNewTodoItem(index)}
                    onRemoveTodoItem={() => onRemoveTodoItem(index)}
                />
            )}
        </div>
    )
}
