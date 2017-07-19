import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Firehose } from 'aws-sdk';

const DeliveryStreamName = `${process.env.STAGE}-serverless-firehose-athena`;
const firehose = new Firehose();

export const execute = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  console.log();
  const params = {
    DeliveryStreamName,
    Record: {
      Data: event.body as string,
    },
  };
  firehose.putRecord(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(undefined, { statusCode: 200, err });
    } else {
      console.log(data);
      callback(undefined, { statusCode: 200, data });
    }
  });
};
