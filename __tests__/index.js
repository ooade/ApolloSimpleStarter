import App from '../client/components/App';
import TodoListItem from '../client/components/TodoListItem';

describe('App', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});
});

describe('Todo', () => {
	test('renders a todo item correctly', () => {
		const todo = {
			id: 123,
			text: 'I am a todo'
		};

		const todoListItem = render(<TodoListItem todo={todo} />);

		expect(todoListItem.text()).toEqual(`x ${todo.text}`);
	});
});
