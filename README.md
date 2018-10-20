# Connect Me

## About the app

I decided to build this app because i thought it would be both fun and useful to provide a way to connect with someone just by exploring the world map and see what other people are interested about.
The idea behind this app is to let the user explore the map and show him other users based on location.
Each user can provide a number of topics in wich he is interested about and they will be publicly available.
When scrolling around the world map the app will load the users currently living there and show their interests. Now with a click you can select a person and start a conversation!

# Tech Stack

Front End:

* React
* Redux
* Google Map Api

Back End:

* Koa
* MongoDb

## Screenshots

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034251/connect_me_login.png)

Landing page

---

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034252/connect_me_map.png)

Explore the map 

---

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034251/connect_me_chat.png)

Chat view

---

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034251/connect_me_mailbox.png)

Your conversations. Click on a user name to get back to chatting 

---

# Getting Started

To have a operative app you will need mongoDb and Node.js installed on your machine.


1. `git clone https://github.com/Tezenn/ConnectMe.git`
2. `cd ConnectMe`
3. Run `npm install` in your terminal.
4. Inside the src folder create a config.js file with those variables inside:

```
const API_KEY = here you should put your google api key;
const URL =
  'https://maps.googleapis.com/maps/api/HERE ALSO PUT YOUR GOOGLE MAP API KEY &v=3.exp&libraries=geometry,drawing,places';

export { API_KEY, URL };
```
5. enter the server folder and run `node index.js` in the terminal
6. Go to the src folder and run `npm start` in the terminal.
The app is running!

# Collaboration

This was a learning experience during the first week of the senior part of Codeworks bootcamp, this app is a work in progress.

If you liked the idea and you want to play with it let's connect and improve it!


# Coming features

* Authentication with JWT

* A better state organization in redux following [these principles](https://medium.com/@ArolDev/a-redux-state-organization-proposal-a93f3d79a6d2)
