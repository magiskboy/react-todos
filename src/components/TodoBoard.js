import React, { Component } from 'react';
import classnames from 'classnames';

import './TodoBoard.css';

import TodoList from './TodoList';

export default class TodoBoard extends Component {
    constructor() {
        super();

        this.newTitle = "";
        this.inputRef = React.createRef();

        this.state = {
            currentFilter: "all",
        }
        let todoItems = localStorage.getItem('todoItems');
        if (!!todoItems) {
            this.state.todoItems = JSON.parse(todoItems);
        }
        else {
            this.state.todoItems = []
        }

        this.onChanged = this.onChanged.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.addNewTodoItem = this.addNewTodoItem.bind(this);
        this.removeTodoItem = this.removeTodoItem.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.filterItems = this.filterItems.bind(this);
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    componentDidUpdate() {
        localStorage.setItem('todoItems', JSON.stringify(this.state.todoItems));
    }

    onChanged(event) {
        this.newTitle = event.target.value;
    }

    onKeyUp(event) {
        if (event.code === "Enter") {
            const {todoItems} = this.state;
            const newTitle = this.newTitle.trim();

            if (newTitle.length > 0) {
                this.setState({
                    todoItems: todoItems.concat({
                        title: this.newTitle,
                        isComplete: false,
                    })
                });

                this.inputRef.current.value = "";
                this.newTitle = "";
            }
        }
    }

    addNewTodoItem(index) {
        const {todoItems} = this.state;
        const item = todoItems[index];

        this.setState({
            todoItems: [
                ...todoItems.slice(0, index),
                {
                    title: item.title,
                    isComplete: !item.isComplete
                },
                ...todoItems.slice(index + 1)
            ]
        })
    }

    removeTodoItem(index) {
        const {todoItems} = this.state;

        this.setState({
            todoItems: [
                ...todoItems.slice(0, index),
                ...todoItems.slice(index + 1)
            ]
        })
    }

    onFilterItemsClicked(filterName) {
        this.setState({
            currentFilter: filterName
        })
    }

    clearCompleted() {
        const { todoItems } = this.state;

        this.setState({
            todoItems: todoItems.filter(item => !item.isComplete)
        })
    }

    filterItems(status) {
        if (status === "active") return this.state.todoItems.filter(item => !item.isComplete);
        if (status === "completed") return this.state.todoItems.filter(item => item.isComplete);
        return this.state.todoItems;
    }

    render() {
        return (
            <div className="TodoBoard">
                <div className="NewItem">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        ref={this.inputRef}
                        onChange={this.onChanged}
                        onKeyUp={this.onKeyUp}
                    />
                </div>
                <TodoList
                    todoItems={this.filterItems(this.state.currentFilter)}
                    onAddNewTodoItem={this.addNewTodoItem}
                    onRemoveTodoItem={this.removeTodoItem}
                />
                <div className="BottomBoard">
                    <div className="LeftItem">{ this.state.todoItems.filter(item => !item.isComplete).length } left</div>
                    <div className="FilterdBar">
                        <button onClick={() => this.onFilterItemsClicked("all")} className={classnames({
                            "active": this.state.currentFilter === "all"
                        })}>All</button>
                        <button onClick={() => this.onFilterItemsClicked("active")} className={classnames({
                            "active": this.state.currentFilter === "active"
                        })}>Active</button>
                        <button onClick={() => this.onFilterItemsClicked("completed")} className={classnames({
                            "active": this.state.currentFilter === "completed"
                        })}>Completed</button>
                    </div>
                    <button className="ClearCompleted" onClick={this.clearCompleted}>Clear completed</button>
                </div>
            </div>
        )
    }
}
