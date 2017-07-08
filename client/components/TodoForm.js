import { gql, graphql } from 'react-apollo';
import { todoListQuery } from './TodoList';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);

		this.onTodoInput = this.onTodoInput.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = { text: '' };
	}

	onFormSubmit(e) {
		e.preventDefault();

		// Update DB
		this.props
			.mutate({
				variables: {
					text: this.state.text
				},
				optimisticResponse: {
					addTodo: {
						__typename: 'Todo',
						id: Math.random(),
						text: this.state.text
					}
				},
				update: (store, { data: { addTodo } }) => {
					// Read the data from our cache for this query
					const data = store.readQuery({ query: todoListQuery });
					// Add our Todo from the mutation to the end
					data.todos.push(addTodo);
					// Write our data back to the cache.
					store.writeQuery({ query: todoListQuery, data });
				}
			})
			.then(res => {
				this.setState({ text: '' });
			});
	}

	onTodoInput(e) {
		e.preventDefault();

		this.setState({ text: e.target.value });
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<input type="text" value={this.state.text} onInput={this.onTodoInput} />
				<button> Submit </button>
			</form>
		);
	}
}

const addTodoMutation = gql`
	mutation addTodo($text: String!) {
		addTodo(text: $text) {
			id
			text
		}
	}
`;

export default graphql(addTodoMutation)(TodoForm);
