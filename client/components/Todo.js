import { gql, graphql, compose } from 'react-apollo';
import withApollo from './withApollo';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class Todo extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = { todos: [] };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			todos: nextProps.data.todos
		});
	}

	addTodo(todo) {
		const newTodos = [
			...this.state.todos,
			{ id: Math.random().toString(16).slice(-5), todo }
		];

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
		const { todos } = this.state;

		return (
			<div className="todo">
				<TodoForm addTodo={this.addTodo.bind(this)} />
				{todos.length === 0 &&
					<div className="todo__list-none"> Todo.length === 0 </div>}
				<ul className="todo__list">
					{todos.map(todo => (
						<TodoItem
							removeTodo={this.removeTodo.bind(this)}
							key={todo.id}
							todo={todo}
						/>
					))}
				</ul>
			</div>
		);
	}
}

const todoListQuery = gql`
	query todos {
		todos {
			id
			todo
		}
	}
`;

const removeTodoMutation = gql`
	mutation removeTodo($id: ID!) {
		removeTodo(id: $id) {
			todo
		}
	}
`;

export default withApollo(
	compose(graphql(todoListQuery), graphql(removeTodoMutation))(Todo)
);
