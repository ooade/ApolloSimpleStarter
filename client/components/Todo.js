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

	removeTodo(todo) {
		this.props
			.mutate({
				variables: {
					id: todo.id
				}
			})
			.then(() => {
				// Todo is removed ;)
				// Refresh data to see changes
				this.props.data.refetch();
			});
	}

	render() {
		const { todos } = this.state;

		return (
			<div className='todo'>
				<TodoForm />
				<ul className='todo__list'>
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

export const todoListQuery = gql`
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
