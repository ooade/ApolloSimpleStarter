export default ({ todo, removeTodo }) => (
	<CSSTransitionGroup
		component="li"
		className="todo__list-item"
		transitionName="todo__list-item"
		transitionAppear={true}
		transitionAppearTimeout={500}
		transitionLeave={false}
		transitionEnter={false}
	>
		<span>
			<button onClick={() => removeTodo(todo)}>x</button> {todo.text}
		</span>
	</CSSTransitionGroup>
);
