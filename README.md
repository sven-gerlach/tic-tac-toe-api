# Tic Tac Toe API

## Local Development

1. Run `git clone git@github.com:sven-gerlach/tic-tac-toe-api.git`
2. Run `npm i`
3. To start the local dev server run `npm run start:dev`

## Deployment

This app is deployed on AWS Elastic Beanstalk. A CI/CD pipeline is set up for the main branch such that any push or
merge into main results in a new deployment. The main branch is deployed at this [URL](http://tictactoeapi-env.eba-hpiuzwz2.us-east-1.elasticbeanstalk.com/).

## Important URLs

- [Deployed API](http://tictactoeapi-env.eba-hpiuzwz2.us-east-1.elasticbeanstalk.com/)
- [Deployed Client](https://main.d2fre69usz6no8.amplifyapp.com)

## Configurations

### Environment Variables

All environment variables are stored in Doppler. However, due to Doppler's integration into Elastic Beanstalk being
tricky, Doppler is used as the source of truth but variables are not injected into the dev nor the prod environment. For
dev the [.env](.env) file is used and for prod the variables are copied into the Elastic Beanstalk env var settings.