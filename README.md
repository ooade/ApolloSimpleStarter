<div align="center">
	<h1 align="center"> Apollo Simple Starter </h1>
	<p align="center">
		<a href="https://travis-ci.org/ooade/ApolloSimpleStarter"><img src="https://travis-ci.org/ooade/ApolloSimpleStarter.svg?branch=master" alt="travis-ci"/></a> 
		<a href="https://codeclimate.com/github/ooade/ApolloSimpleStarter/badges"><img src="https://codeclimate.com/github/ooade/ApolloSimpleStarter/badges/gpa.svg" alt="codeclimate-gpa-badge"/></a> 
		<a href="https://codeclimate.com/github/ooade/ApolloSimpleStarter"><img src="https://codeclimate.com/github/ooade/ApolloSimpleStarter/badges/issue_count.svg" alt="codeclimate-issues-badge"/></a>
	</p>
	<p align="center"> Barebone Implementation of Apollo Server & Client. </p>
	<p align="center">
		<a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat" alt="pullrequest"></a>
  	<a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg" alt="firsttimersonly"></a>
	</p>
</div>

## Contents
- [Built With?](#built-with)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
	
### Built With?
- MERN
- Apollo Server (GraphQL Server Express)
- Apollo Client (React-Apollo)

### Development Workflow
- Run `npm run dev` on your CLI.
- Open http://localhost:8080
- Add or Remove Todo

<p align="center">
	<img align="center" src="http://i.imgur.com/BSYBn1L.gif" />
</p>

### Deployment
Very easy to deploy with `now`, by running the command `now -e MONGO_URI=mongodb://INSERT_MONGO_URI_HERE`. 
On heroku, run `git push heroku master`. Don't forget to add `MONGO_DB` to your heroku server.

## License
MIT
