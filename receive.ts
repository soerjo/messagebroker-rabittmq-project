import amqp from "amqplib/callback_api";
import { sendMessage } from "./nodemailer";

const name = "soerjohastomo";
const email = "soerjohastomo@gmail.com";

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function (error1, channel) {
    if (error1) throw error1;

    var queue = "email-service";

    channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      (msg) => {
        console.log("send!");
        console.log(msg?.content.toString());
        sendMessage(name, email, msg?.content.toString() || "pesan kosongg");
      },
      { noAck: true }
    );
  });
});
