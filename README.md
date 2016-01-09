# TaskTerminator

## How to get it running:
  ``` git pull origin master```<br>
    ```  npm install ``` <br>
    ```git checkout -b (whatever branch) ```<br>
    ```  gulp ``` <br>

When you're ready to push:

  ```  git add . ``` <br>
    ```  git commit -m "(some message)" ``` <br>
    ```  git push origin (whatever branch you are on) ```

  After that, go to the branches page of the repo on Github and create a pull request. Once that's all done, let the group know that you're code needs a review. Someone else will respond on Slack, review the code, and merge it when they're ready.


  ### IMPORTANT: DO NOT MODIFY THE BUILD FILE AFTER RUNNING GULP. ONLY MAKE CHANGES IN THE SRC DIRECTORY!! THE BUILD FILE WILL AUTOMATICALLY UDPATE WHEN THINGS ARE SAVED.


  ### There may be an error that pops up while running Gulp about server.js. If it just keeps restarting and ends up saying "Listening on port: 8000" and "connected to db", ignore it. All is well.
