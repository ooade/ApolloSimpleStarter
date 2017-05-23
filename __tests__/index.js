import App from '../client/components/App';
import TodoItem from '../client/components/TodoItem';

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

		const todoItem = shallow(<TodoItem todo={todo} />);

		expect(todoItem.text()).toEqual('x ' + todo.text);
	});
});
