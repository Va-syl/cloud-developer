const AWS = require('aws-sdk')
const axios = require('axios')

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {
  // TODO: Use these variables to record metric values
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()
  try{
    await axios.get(url)
    requestWasSuccessful = true;
  }
  catch {
    requestWasSuccessful = false;

  }
  finally{
    endTime = timeInMs();
  }

  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Latency', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Milliseconds', // 'Count' or 'Milliseconds'
        Value: endTime - startTime  // Total value
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise()

  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Successful', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'count', // 'Count' or 'Milliseconds'
        Value: requestWasSuccessful ? 1 : 0// Total value
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise()
}

function timeInMs() {
  return new Date().getTime()
}
