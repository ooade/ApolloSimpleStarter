import { render } from 'react-dom';
import withApollo from './components/withApollo';

import './index.css';

import Todo from './components/Todo';
import Footer from './components/Footer';

const App = withApollo(() => (
	<div>
		<Todo />
		<Footer />
	</div>
));

render(<App />, document.querySelector('.entry'));
