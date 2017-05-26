import { gql, graphql, compose } from 'react-apollo';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.state = { todos: [], loading: true };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			todos: nextProps.data.todos,
			loading: nextProps.data.loading
		});
	}

	addTodo(todo) {
		const newTodos = [...this.state.todos, todo];

		this.setState({ todos: newTodos });
	}

	removeTodo(todo) {
		const TodoIndex = this.state.todos.findIndex(t => t.id === todo.id);

		const newTodos = [
			...this.state.todos.slice(0, TodoIndex),
			...this.state.todos.slice(TodoIndex + 1)
		];

		// Update the state
		this.setState({ todos: newTodos });

		// Update DB
		this.props.mutate({
			variables: {
				id: todo.id
			}
		});
	}

	render() {
		// Todo List
		const todos = this.state.todos.map(todo => (
			<TodoItem removeTodo={this.removeTodo} key={todo.id} todo={todo} />
		));

		return (
			<div className="todo">
				<TodoForm addTodo={this.addTodo} />

				{this.state.loading &&
					<div className="todo__list-loader">
						<img src="https://res.cloudinary.com/stackpie/image/upload/v1495034057/ajax-loader_kutcwo.gif" />
					</div>}

				{!this.state.loading &&
					todos.length === 0 &&
					<div className="todo__list-none"> Todo.length === 0 </div>}

				<CSSTransitionGroup
					component="ul"
					className="todo__list"
					transitionName="todo"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{todos}
				</CSSTransitionGroup>
			</div>
		);
	}
}

const todoListQuery = gql`
	query todos {
		todos {
			id
			text
		}
	}
`;

const removeTodoMutation = gql`
	mutation removeTodo($id: ID!) {
		removeTodo(id: $id) {
			text
		}
	}
`;

export default compose(graphql(todoListQuery), graphql(removeTodoMutation))(
	Todo
);
