import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface
} from 'react-apollo';

function createClient() {
	return new ApolloClient({
		dataIdFromObject: result => result.id || null,
		networkInterface: createNetworkInterface({
			uri: 'http://localhost:8080/graphql'
		})
	});
}

export default ComposedComponent => {
	return function() {
		return (
			<ApolloProvider client={createClient()}>
				<ComposedComponent />
			</ApolloProvider>
		);
	};
};
