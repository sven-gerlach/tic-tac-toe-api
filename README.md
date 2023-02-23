# Tic Tac Toe API

## Local Development

1. Run `git clone git@github.com:sven-gerlach/tic-tac-toe-api.git`
2. Run `npm i`
3. To start the local dev server run `npm run start:dev`

## Deployment

The app is deployed on Render. Every push or merge into the main branch will initiate a deployment. Initially the app was deployed on AWS Beanstalk but the pricing of an always on server would have been about $6 per month.

## Important URLs

- [Deployed API](https://ti-sq80.onrender.com)
- [Deployed Client](https://main.d2fre69usz6no8.amplifyapp.com)

## Configurations

### Environment Variables

All environment variables are stored in Doppler. For development, Doppler injects env vars into the environment via the 'doppler run' command which is prepended to the `npm run start:dev` script.
For the deployed app, a Doppler integration into Render injects all env vars into the runtime environment.