import { gql, graphql } from 'react-apollo';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

import { todoListQuery } from './TodoList';

const Todo = ({ mutate }) => {
	const removeTodo = todo => {
		// Update DB
		mutate({
			variables: {
				id: todo.id
			},
			optimisticResponse: {
				removeTodo: {
					__typename: 'Todo',
					text: todo.text
				}
			},
			update: (store, { data: { removeTodo } }) => {
				// Read the data from our cache for this query
				const data = store.readQuery({ query: todoListQuery });
				// Remove our Todo from the mutation to the end
				data.todos.splice(data.todos.findIndex(obj => obj.id === todo.id), 1);
				// Write our data back to the cache.
				store.writeQuery({ query: todoListQuery, data });
			}
		});
	};

	return (
		<div className="todo">
			<TodoForm />
			<TodoList removeTodo={removeTodo} />
		</div>
	);
};

const removeTodoMutation = gql`
	mutation removeTodo($id: ID!) {
		removeTodo(id: $id) {
			text
		}
	}
`;

export default graphql(removeTodoMutation)(Todo);
