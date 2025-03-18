// server.js

const e = require('express');
const express = require('express');
const app = express();



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

app.get('/greetings/:username', (req, res) => {
  // Accessing the parameter
  console.log(req.params.username);  // Output could be 123, 456, etc.

  // Sending a response with the parameter
  res.send(`<h1>Hello there, ${req.params.username}</h1>`);
});

app.get('/roll/:IsNumber', (req, res) => {
  // Accessing the parameter
  // console.log(typeof(req.params.IsNumber));  // Output could be 123, 456, etc.

  if (isNaN(req.params.IsNumber)){
    res.send(`<h1>Sorry, ${req.params.IsNumber} is not a number</h1>`);
  }  // Output could be 123, 456, etc.
else{
  // Sending a response with the parameter
res.send(`<h1>Hello there, your number is ${req.params.IsNumber}</h1>`);
}
});

// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.
// Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

// Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
  // Accessing the parameter
  console.log(req.params.index);  // Output could be 0, 1, 2, etc.

  // Accessing the item at the given index
  const item = collectibles[req.params.index];
  // notInCollectibles = !item.includes(req.params.index);

  // Sending a response with the item
  if (item === undefined) {
    res.send('This item is not yet in stock. Check back soon!');
  } else {
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  }
});



// Task: Create a route /shoes that filters the list of shoes based on query parameters.

// Query Parameters:

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  // Accessing the query parameters
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const type = req.query.type;
  
// making variables for the messages
  // let mimPriceMessage = '';
  // let maxPriceMessage = '';
  // let typeMessage = '';

  // Filtering the list of shoes based on the query parameters
  const filteredShoes = shoes.filter(shoe => {
    let message = true;
    // if their is no shoe that meets the criteria, message will be false
    //esle message will be true and the shoe will be displayed
    if (minPrice && shoe.price < minPrice) {
      message = false;
    }
    if (maxPrice && shoe.price > maxPrice) {
      message = false;
    }
    if (type && shoe.type !== type) {
      message = false;
    }
    return message;
  });
  
  let listItems = '';
  filteredShoes.forEach(shoe => {
    listItems += `<li>${shoe.name} - $${shoe.price} - ${shoe.type}</li>`;
  });

  let message = listItems ? listItems : 'No shoes available for that critera';
  let welcomeMessage = `<h1>Welcome to our shoe store</h1>`;
  res.send(`${welcomeMessage} ${message}`);
 
  
}
);

 // Sending a response with the filtered list of shoes
  //only returns one item
  // res.send(filteredShoes.forEach(shoe => {
  //   res.send(`<li>${shoe.name} - $${shoe.price} - ${shoe.type}</li>`);
  // }
  // ));