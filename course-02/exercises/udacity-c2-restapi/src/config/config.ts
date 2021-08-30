export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": process.env.POSTGRESS_DIALECT,
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}

// console.log(process.env.AWS_REGION);
// console.log(process.env.AWS_PROFILE);
// console.log(process.env.AWS_BUCKET);
// console.log(process.env.POSTGRESS_USERNAME);
// console.log(process.env.POSTGRESS_PASSWORD);
// console.log(process.env.POSTGRESS_DATABASE);
// console.log(process.env.POSTGRESS_HOST);