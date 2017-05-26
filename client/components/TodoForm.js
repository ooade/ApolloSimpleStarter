import { gql, graphql } from 'react-apollo';

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
				}
			})
			.then(res => {
				this.props.addTodo(res.data.addTodo);
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
