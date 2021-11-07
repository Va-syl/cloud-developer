import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';
import {createLogger} from '../../utils/logger'

const logger = createLogger('getTodos')

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    logger.info('getTodos request', event)
    const userId = getUserId(event)
    logger.info('getTodos userId', userId)
    // const authorization = event.headers.Authorization
    // const split = authorization.split(' ')
    // const jwtToken = split[1]

    const result = await getTodosForUser(userId)
    logger.info('getTodos result', result)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: result
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
