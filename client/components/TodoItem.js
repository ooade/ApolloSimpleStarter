export default ({ todo, removeTodo }) => (
	<li className="todo__list-item">
		<button onClick={() => removeTodo(todo)}>x</button>
		{' '}
		{todo.text}
	</li>
);
