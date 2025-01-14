import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{ message: "Type in your URL", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("message.txt", url, (err) => {
      if (err) throw err;
      console.log("test", err);
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(
        "The prompt couldn't be rendered in the current environment."
      );
    } else {
      console.error("An error occurred:", error);
    }
  });
