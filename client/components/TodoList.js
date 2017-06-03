import { gql, graphql } from 'react-apollo';
import TodoListItem from './TodoListItem';

const TodoList = ({ removeTodo, data: { loading, todos } }) => {
	return (
		<ul className="todo__list">
			{loading &&
				<div className="todo__list-loader">
					<img src="https://res.cloudinary.com/stackpie/image/upload/v1495034057/ajax-loader_kutcwo.gif" />
				</div>}

			{!loading &&
				todos.length === 0 &&
				<div className="todo__list-none"> Todo.length === 0 </div>}

			{!loading &&
				todos.map(todo => (
					<TodoListItem key={todo.id} removeTodo={removeTodo} todo={todo} />
				))}
		</ul>
	);
};

export const todoListQuery = gql`
	query todos {
		todos {
			id
			text
		}
	}
`;

export default graphql(/* Add the todListQuery here */)(TodoList);
