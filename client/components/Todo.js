import { gql, graphql } from 'react-apollo';
import withApollo from './withApollo';

import TodoItem from './TodoItem';

class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.state = { todos: [] };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			todos: nextProps.data.todos
		});
	}

	render() {
		const { todos } = this.state;

		return (
			<ul>
				{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
			</ul>
		);
	}
}

const todoQuery = gql`
	query todos {
		todos {
			id
			todo
		}
	}
`;

export default withApollo(graphql(todoQuery)(Todo));
