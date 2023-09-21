import amqp from "amqplib/callback_api";

function main() {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1;

      var queue = "email-service";
      var msg = "Hello world bro!";

      channel.assertQueue(queue, { durable: false });

      let i = 0;
      setInterval(() => {
        channel.sendToQueue(
          queue,
          Buffer.from(
            JSON.stringify({
              message: `${msg} | ${i}`,
              data: { i, msg },
            })
          )
        );

        console.log(` [${i}] Sent ${msg}`);
        i++;
      }, 15000);
    });

    // setTimeout(function () {
    //   connection.close();
    //   Bun.exit(0);
    // }, 500);
  });
}

main();
