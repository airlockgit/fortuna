import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as createActions from '../../actions/forecast';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import classNames from 'classnames/bind';
import styled from './todos.module.scss';

class Todos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            sortType: {
                name: false,
                reverse: false,
            },
        }

        this.cx = classNames.bind(styled)
        this.listTitlesInput = [];
    }

    componentDidMount() {
        this.props.getForecast();
    }

    componentDidUpdate(prevProps) {
        if (this.props.todos !== prevProps.todos) {
            console.log('Обновились');
            axios.put('/forecast/update', {
                data: {
                    id: this.props.user.id,
                    list: this.props.todos,
                }
            });
        }
    }

    _handleChange = e => {
        let title = e.currentTarget.value;

        this.setState({ title });
    }

    _handleAddTodo = () => {
        if (this.state.title === '') return;

        let newTodo = {
            text: this.state.title,
        };

        this.props.addTodo(newTodo);
        this.setState({ title: '' });
    }

    _handleChecked = id => {
        let todo = this.props.todos.find(todo => todo.id === id);
        let checked = todo.checked ? false : true;

        this.props.updateTodo({ id, checked });
    }

    _handleDeleteTodo = id => {
        this.props.deleteTodo(id);
    }

    _handleListSort = (type) => {
        switch (type) {
            case 'name':
                let name = this.state.sortType.name ? false : true;

                this.setState({ sortType: { name } })
                break;
            default:
                break;
        }
    }

    _handleEditTitle = id => {
        let { target } = this.listTitlesInput.find(todo => todo.id === id);

        target.setAttribute('contentEditable', true);
        target.focus();
    }

    _changeEditTitle = (id, e) => {//and save
        let target = e.currentTarget;
        let text = target.textContent;

        this.props.updateTodo({ id, text });
    }

    sortTodos = (arr) => {
        if (this.state.sortType.name) {//обратный порядок и по заголовку
            arr.sort((a, b) => {
                return a.title === b.title ? 0 : +(a.title > b.title) || -1;
            });
        }

        return arr;
    }

    render() {
        console.log(this.props)
        const { todos } = this.props;
        let newTodos = this.sortTodos(todos);

        return (
            <div className={styled.container}>
                <div className={styled.grid}>
                    <div className={styled.gridItem}>
                        <TextField
                            label={this.props.placeholder}
                            value={this.state.title}
                            onChange={this._handleChange}
                            className={styled.input}
                        />
                    </div>
                    <div className={styled.gridItemButton}>
                        <Button variant="outlined" color="primary" className={styled.buttonAdd}
                            onClick={this._handleAddTodo}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
                <ul className={styled.list}>
                    {
                        todos.length > 1 ?
                            <li
                                className={this.cx({
                                    listItemSort: true,
                                    listItemSort_active: this.state.sortType.name,
                                })}
                                onClick={this._handleListSort.bind(this, 'name')}
                            >Сортировать по имени</li> : null

                    }
                    {
                        newTodos.map((todo, i) => (
                            <li className={styled.listItem} key={i}>
                                <Checkbox
                                    className={styled.checkbox}
                                    checked={todo.checked}
                                    onChange={this._handleChecked.bind(this, todo.id)}
                                    value="checked"
                                    color="primary"
                                />
                                <div
                                    className={styled.listItemTitle}
                                    onClick={this._changeItemTitle}
                                    onInput={this._changeEditTitle.bind(this, todo.id)}
                                    onBlur={(e) => e.currentTarget.setAttribute('contentEditable', false)}
                                    ref={target => this.listTitlesInput.push({ id: todo.id, target })}
                                >{todo.text}</div>
                                <div
                                    className={styled.listItemEdit}
                                    onClick={this._handleEditTitle.bind(this, todo.id)}
                                ></div>
                                <div
                                    className={styled.listItemClose}
                                    onClick={this._handleDeleteTodo.bind(this, todo.id)}
                                >X</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    todos: [...store.forecast.list],
    id: store.forecast.id,
    user: store.user,
});

const mapDispatchToProps = dispatch => ({
    addTodo(todo) {
        dispatch(createActions.add(todo));
    },
    updateTodo(todo) {
        dispatch(createActions.update(todo));
    },
    deleteTodo(id) {
        dispatch(createActions.del(id));
    },
    getForecast() {
        dispatch(createActions.getForecast());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);