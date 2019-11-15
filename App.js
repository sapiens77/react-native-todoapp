import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';

let todoIndex = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '', //todo들을 추가하는 textinput
      todos: [], //여러 todo를 다뤄야하기 때문에 배열사용
      type: 'All', //todo 타입 all,current, active
    };
    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  inputChange(inputValue) {
    console.log(' Input Value: ', inputValue);
    this.setState({inputValue}); // inputValue: inputValue 와 동일
  }

  submitTodo() {
    // inputValue가 비어있는지, 공백만 있는지 확인, 비어있으면 아무것도 하지않고 반환
    if (this.state.inputValue.match(/^\s*$/)) {
      console.log('빈값입니다. ', this.state);
      return;
    }
    const todo = {
      // inputValue가 비어 있지 않으면 todo 변수를 생성하고 title,todoIndex,complete 객체를 할당
      title: this.state.inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++; // todoindex 증가
    const todos = [...this.state.todos, todo]; // 새로운 todo

    this.setState({todos, inputValue: ''}, () => {
      // todo의 state를 지정해 this.state.todos의 갱신된 배열과 일치하게 만들고, inputValue를 빈문자열로 재지정
      console.log('State: ', this.state); // 상태가 설정되면 콜백함수를 전달하는 옵션이 있다. 여기서 setState의 콜백 함수는 상태가 로그아웃되어 모든것이 작동하는지 확인한다.
    });
  }

  deleteTodo(todoIndex) {
    let {todos} = this.state;
    todos = todos.filter(todo => todo.todoIndex !== todoIndex);
    this.setState(todos);
  }

  toggleComplete(todoIndex) {
    let todos = this.state.todos;
    todos.forEach(todo => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({todos});
  }

  render() {
    const {inputValue, todos} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={text => this.inputChange(text)}
          />
          <TodoList todos={todos} />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
