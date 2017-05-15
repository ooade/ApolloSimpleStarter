import { render } from 'react-dom';

import './index.css';

import Todo from './components/Todo';
import Footer from './components/Footer';

const App = () => (
	<div>
		<Todo />
		<Footer />
	</div>
)

render(<App />, document.querySelector('.entry'));
