
function ask(question, callback) {
  var stdin = process.stdin,
  stdout = process.stdout;

  stdin.resume();
  stdout.write(`${question}: `);

  stdin.once('data', function(data) {
    data = data.toString().trim();

    if (!data || data === '') {
      stdout.write('Please enter some data bro... \n');
      ask(question, callback);
    }
    else {
      callback(data);
    }
  })
}


ask('what is your name?', function(name) {
  ask('what color are your eyes?', function(eyes) {
    console.log(`your name is ${name}, and you have ${eyes} colored eyes`);
    process.exit();
  });
});

/**
    rl.question("Please Choose an option:\n"
        + "1) Option 1\n"
        + "2) Option 2\n"
        + "3) Exit\n"
        , function (line) {

            switch (line){
                case "1":
                    console.log("this is option 1");
                    break;
                case "2":
                    console.log("this is option 2");
                    break;
                case "3":
                    return rl.close();
                    break;
                default:
                    console.log("No such option. Please enter another: ");
            }
*/