export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stargazers_count: 0
		};
	}

	async fetchStars() {
		let res = await fetch(
			'https://api.github.com/repos/ooade/ApolloSimpleStarter'
		);
		let data = await res.json();
		this.setState({ stargazers_count: data.stargazers_count });
	}

	componentDidMount() {
		this.fetchStars();
	}

	render() {
		return (
			<footer>
				<p> Built with Apollo Server & Client. </p>
				<p>
					<a href="https://github.com/ooade/ApolloSimpleStarter">
						{' '}Check out the Repo{' '}
					</a>
				</p>
				<p> Stars: {this.state.stargazers_count} </p>
			</footer>
		);
	}
}
