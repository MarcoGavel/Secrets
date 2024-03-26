// Import the express module and assign it to a variable called 'express'
import express from "express";

// Import the bodyParser module to parse data sent in HTTP requests
import bodyParser from "body-parser";

// Import the 'dirname' function from the 'path' module to get the name of the current directory
import { dirname } from "path";

// Import the 'fileURLToPath' function from the 'url' module to convert a URL to a corresponding file path
import { fileURLToPath } from "url";

// Get the path of the current directory using the 'dirname' and 'fileURLToPath' functions
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application
const app = express();

// Define the port on which the application will listen for HTTP requests
const port = 3000;

// Variable to store the user authorization status
var userIsAuthorised = false;

// Use the bodyParser middleware to parse URL-encoded request data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check the password sent in POST requests
function passwordCheck(req, res, next) {
  // Get the password sent in the request
  const password = req.body["password"];

  // Check if the sent password is correct
  if (password === "ILoveProgramming") {
    // If the password is correct, set the authorization status to true
    userIsAuthorised = true;
  }

  // Move on to the next middleware
  next();
}

// Use the 'passwordCheck' middleware for all requests
app.use(passwordCheck);

// Handle GET requests to the main endpoint "/"
app.get("/", (req, res) => {
  // Send the index HTML file as the response
  res.sendFile(__dirname + "/index.html");
});

// Handle POST requests to the "/check" endpoint
app.post("/check", (req, res) => {
  // Check the user authorization status
  if (userIsAuthorised) {
    // If the user is authorized, send the secret HTML file as the response
    res.sendFile(__dirname + "/secret.html");
  } else {
    // If the user is not authorized, redirect to the homepage
    res.sendFile(__dirname + "/index.html");
    // Or use redirection with res.redirect("/");
  }
});

// Start the Express server to listen for requests on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
