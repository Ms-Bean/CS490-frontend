# CS490-frontend
## A front end for the CS 490 project

By default, this frontend uses the backend hosted on heroku. This should still work, as I have the backend server deployed to heroku right now.

However, if you want to use the backend locally hosted server on port 3500, this bash script will replace all the heroku URLs with localhost.

```bash
chmod 777 switch_to_local.sh
./switch_to_local.sh 
```

If the app is currently being hosted (which it most likely is), it can be accessed here. https://cs490-frontend-56d6b4e4d85f.herokuapp.com/index.html

Note: it may take a few seconds for heroku's eco dynos to wake up and display content if the page has not been accessed for a while.