# Connect Me

Connect me allows you to explore a map and connect with other users based on shared interests.

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034251/connect_me_login.png)

Landing page

---

![alt text](https://res.cloudinary.com/dwfodxlfi/image/upload/v1540034252/connect_me_map.png)

Explore the map 

---

## Getting Started

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

# Tech Stack

Front End:

* React
* Redux
* Google Map Api

Back End:

* Koa
* MongoDb

## Contributing

This app is a work in progress. If you like the idea and you want to play with it let's connect and improve it!

## Next features

* Authentication with JWT

* A better state organization in redux following [these principles](https://medium.com/@ArolDev/a-redux-state-organization-proposal-a93f3d79a6d2)
