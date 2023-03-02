# Tic Tac Toe API

## Local Development
1. Run `git clone git@github.com:sven-gerlach/tic-tac-toe-api.git`
2. Run `npm i`

### NestJS Server
To start the local dev server run `npm run start:dev`

### Serverless
The app can also be run in serverless mode using serverless-offline. This can be achieved by running `npm run start:serverless`.

## Deployment
### Serverless / AWS Lambda
The app is deployed via Serverless on AWS Lambda/Gateway under the URL https://lshtt05434.execute-api.us-east-1.amazonaws.com/prod.
Setting up CI/CD via connecting Serverless Dashboard with GutHub was attempted the build command could not be adjusted and the preconfigured default commands did not work.
Instead, deploying needs to happen with the npm script `npm run deploy:serverless`.

### Render
The app was also deployed on Render. However, Render's free tier uses ephemeral server instances that shut down after some time of inactivity. Whilst that is fine in principle, 
it takes anywhere between 15-30 seconds for the instance to spin up again, leading to rather long wait times. That was the main reason for looking into serverless architecture.

### AWS Beanstalk
Initially, the app was deployed on AWS Beanstalk. However, the pricing of an always-on live server amounted to ~$7 per month.

## Important URLs

- [Deployed API](https://lshtt05434.execute-api.us-east-1.amazonaws.com/prod)
- [Deployed Client](https://main.d2fre69usz6no8.amplifyapp.com)

## Configurations

### Environment Variables

All environment variables are stored in Doppler. For development, Doppler injects env vars into the environment via the 'doppler run' command which is prepended to the `npm run start:dev` script.
For the deployed app, a Doppler integration into Render injects all env vars into the runtime environment.