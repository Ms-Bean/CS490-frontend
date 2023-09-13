# CS490-frontend
## A front end for the CS 490 project

By default, this branch uses the backend server hosted on heroku. To use the backend hosted locally, all links to the heroku server should be switched to localhost. The best solution I could come up with to automate this was a bash script. To do this automatically and use the server hosted on port 3500, run the following script.
```bash
./switch_to_local.sh 
```

If the app is currently being hosted (which it most likely is), it can be accessed here. https://cs490-frontend-56d6b4e4d85f.herokuapp.com/index.html

Note: it may take a few seconds for heroku's dynos to wake up and display content if the page has not been accessed for a while.