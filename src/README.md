# nodePOST--Hack

A Boilerplate for NodeJs and Postgres Applications

## Implemented Features
* Users can create an account and login.
* Users can verify their account via their email.


## Technologies Used
* [NodeJs](https://nodejs.org) - Run time environment.
* [ExpressJs](https://expressjs.com) - Web framework.
* [PostgreSQL](https://www.postgresql.org) - Object relational database.
* [Babel](https://babeljs.io) - Javascript compiler.
* [Eslint](https://eslint.org/) - Javascript linter. [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.
* [Node Mailer](https://nodemailer.com/about/) - Nodemailer is a module for Node.js to send emails.

### Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - Assertion library.
* [Istanbul](https://istanbul.js.org) - Javascript code instrumenter.
* [nyc](https://github.com/istanbuljs/nyc) - Istanbul's command line interface.
* [coveralls](https://github.com/nickmerwin/node-coveralls) - lcov posting to coveralls.io

## Getting Started

### Installation
* Install [NodeJs](https://nodejs.org/en/download/) and [PostgreSQL](https://www.postgresql.org/download/) on your computer.
* Clone this repository using `git clone https://github.com/ogwurujohnson/nodepost--Hack.git`.
* Set up your environment variables in a `.env` file.
* Create production, development and test db's. specify their names in your env file
* Run `npm install` to install all dependencies.
* Run `npm run migration` to run DB migrations.
* Run `npm run dev` to start the server.
* Navigate to [localhost:3000/api/v1](localhost:3000/api/v1) in your browser to access the application.

### Testing the application
Requirements
* [Postman](https://www.getpostman.com/) - API development and testing environment.

Testing with Postman
* Install Postman by following the link above.
* Navigate to `localhost:3000` in Postman to access the application.
* Use the API Documentation to access the endpoints available (link will be available soon).

Running unit tests.
* In an open terminal, navigate to the cloned project file.
* Before running test, please change `NODE_ENV='test' `, still looking for a fix for this
* Then on your console run `npm run migration`
* Run `npm run test-travis`. This runs tests and displays coverage data generated by [Istanbul's](https://istanbul.js.org) nyc.


## Author
[Ogwuru Johnson](https://www.github.com/ogwurujohnson)


