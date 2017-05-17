import { gql, graphql } from 'react-apollo';
import { todoListQuery } from './Todo';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);

		this.onTodoInput = this.onTodoInput.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = { text: '' };
	}

	onFormSubmit(e) {
		e.preventDefault();

		// Update the state
		this.props.addTodo(this.state.text);

		this.setState({ text: '' });

		// Update DB
		this.props.mutate({
			variables: {
				text: this.state.text
			},
			// refetch todoList to get our mongo id attached
			refetchQueries: [{ query: todoListQuery }]
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
