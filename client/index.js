import { render } from 'react-dom';

// Style our app
import './index.css';

// Import Apollo Client deps
import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: '/graphql' });

const client = new ApolloClient({
	dataIdFromObject: result => result.id || null,
	networkInterface
});

// Import our components
import Todo from './components/Todo';
import Footer from './components/Footer';

// Wrap our App with ApolloProvider
const App = () => (
	<ApolloProvider client={client}>
		<div className="app">
			<Todo />
			<Footer />
		</div>
	</ApolloProvider>
);

render(<App />, document.querySelector('.entry'));
