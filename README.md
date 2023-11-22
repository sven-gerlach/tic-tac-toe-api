# Tic Tac Toe API

## Local Development
1. Run `git clone git@github.com:sven-gerlach/tic-tac-toe-api.git`
2. Run `npm i`

### NestJS Server
To start the local dev server run `npm run start:dev`

### Serverless
The app can also be run in serverless mode using serverless-offline. This can be achieved by running `npm run start:serverless`.

## Deployment
### Render
The app is deployed on [Render](https://tic-tac-toe-iu10.onrender.com). The accompanying client is also deployed on [Render](https://tictactoe.sigmagamma.app).

### Serverless / AWS Lambda
The app used to be deployed via Serverless on AWS Lambda/Gateway under the URL https://lshtt05434.execute-api.us-east-1.amazonaws.com/prod.
After remaining AWS credits were used up, the app was deployed on Render.

### AWS Beanstalk
Initially, the app was deployed on AWS Beanstalk. However, the pricing of an always-on live server amounted to ~$7 per month.

## Important URLs

- [Deployed API](https://lshtt05434.execute-api.us-east-1.amazonaws.com/prod)
- [Deployed Client](https://main.d2fre69usz6no8.amplifyapp.com)

## Configurations

### Environment Variables

All environment variables are stored in Doppler. For development, Doppler injects env vars into the environment via the 'doppler run' command which is prepended to the `npm run start:dev` script.
For the deployed app, a Doppler integration into Render injects all env vars into the runtime environment.