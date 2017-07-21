import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Firehose } from 'aws-sdk';

const DeliveryStreamName = `${process.env.STAGE}-serverless-kinesis-firehose`;
const firehose = new Firehose();

export const execute = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const json: any = JSON.parse(event.body as string);
  const params = {
    DeliveryStreamName,
    Record: {
      Data: JSON.stringify(json.events[0]) + '\n',
    },
  };
  firehose.putRecord(params, (err, data) => {
    if (err) {
      console.log(JSON.stringify(err));
      callback(undefined, { statusCode: 200, body: JSON.stringify(err) });
    } else {
      console.log(JSON.stringify(data));
      callback(undefined, { statusCode: 200, body: JSON.stringify(data) });
    }
  });
};
