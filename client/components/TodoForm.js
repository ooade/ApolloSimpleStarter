import { gql, graphql } from 'react-apollo';
import { todoListQuery } from './Todo';

class TodoForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.onTodoInput = this.onTodoInput.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

		this.state = { todo: '' };
	}

	onFormSubmit(e) {
		e.preventDefault();

		this.props
			.mutate({
				variables: {
					todo: this.state.todo
				},
				refetchQueries: [{ query: todoListQuery }]
			})
			.then(() => this.setState({ todo: '' }));
	}

	onTodoInput(e) {
		e.preventDefault();

		this.setState({ todo: e.target.value });
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<input type="text" value={this.state.todo} onInput={this.onTodoInput} />
				<button> Submit </button>
			</form>
		);
	}
}

const addTodoMutation = gql`
	mutation addTodo($todo: String!) {
		addTodo(todo: $todo) {
			id
			todo
		}
	}
`;

export default graphql(addTodoMutation)(TodoForm);
