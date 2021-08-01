import React from "react";
import '../App.css';

class Todo extends React.Component {

    constructor() {
        super()

        this.state = {
            todo: {},
            todoList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDoneClick = this.handleDoneClick.bind(this);
        this.saveToLocal = this.saveToLocal.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('user')){
            this.setState({todoList: JSON.parse(localStorage.getItem('user'))});
        }
    }

    saveToLocal(){
        localStorage.setItem('user', JSON.stringify(this.state.todoList));
    }

    handleChange(e){
        let currentTodo = e.target.value;
        this.setState({todo: {currentTodo: currentTodo,date: new Date(),completed: false}});        
    }

    handleClick(){
        let currentTodo = this.state.todo;
        let list = this.state.todoList;
        list.unshift(currentTodo);
        this.setState({todoList: list});
        this.setState({todo: {currentTodo: ''}});
        this.saveToLocal();

    }

    handleDeleteClick(e){
        let list = this.state.todoList;
        let index = e.target.value;
        if (index > -1) {
          list.splice(index, 1);
        }
        this.setState({todoList: list});
        this.saveToLocal();
    }

    handleDoneClick(e){
        let list = this.state.todoList;
        let index = e.target.value;
        if (index > -1) {
          list[index].completed = list[index].completed ? false : true;
        }
        this.setState({todoList: list});
        this.saveToLocal();
    }
    
    render(){

        let todoList = this.state.todoList.length > 0 ? <div className='container'>
                {this.state.todoList.map((todo, i) => 
                        <div key={i} className='card'>
                        <li> { todo.completed 
                        ? 
                        <span> <del className='todo'><p>{todo.currentTodo}</p></del> <span className='date'>{todo.date.toString()}</span> </span> 
                        :
                        <span> <span className='todo'><p>{todo.currentTodo}</p></span> <span className='date'>{todo.date.toString()}</span> </span>} 

                        <button className='deleteButton' value={i} onClick={this.handleDeleteClick}> Delete </button> 
                        <button className='doneButton' value={i} onClick={this.handleDoneClick}> {todo.completed ? 'not Done' : 'Done'} </button> </li>
                        </div>
                        
                )}
            </div> : <h3>Add Todo</h3>;

        return(<div>
            <div className='head'>
            <div>    
            <h1> TODO </h1>
            </div>
            <div>
                <input value={this.state.todo.currentTodo} onChange={this.handleChange} type="text"/>
                {this.state.todo.currentTodo ? <button className='todoButton' onClick={this.handleClick}>Add</button> : null}
                
            </div>
            </div>
                <div>{todoList}</div>
            </div>
                );
            
    }
}

export default Todo;