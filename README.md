# CS490-frontend
## A front end for the CS 490 project

By default, this branch uses the backend server hosted on heroku. This should still work, as I have the backend server deployed to heroku right now.

To use the backend hosted locally, all links to the heroku server should be switched to localhost. The best solution I could come up with to automate this was a bash script. To do this automatically and use the server hosted on port 3500, run the following script.
```bash
chmod 777 switch_to_local.sh
./switch_to_local.sh 
```
After this is done, if the server is being hosted locally on port 3500, the empty html element in index.html should change to "Hello world"


If the app is currently being hosted (which it most likely is), it can be accessed here. https://cs490-frontend-56d6b4e4d85f.herokuapp.com/index.html

Note: it may take a few seconds for heroku's eco dynos to wake up and display content if the page has not been accessed for a while.