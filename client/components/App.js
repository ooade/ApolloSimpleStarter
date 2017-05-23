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
import Todo from './Todo';
import Footer from './Footer';

// Wrap our App with ApolloProvider
export default () => (
	<ApolloProvider client={client}>
		<div className="app">
			<Todo />
			<Footer />
		</div>
	</ApolloProvider>
);
