# study-express
This is my study project for node / express api

## Develop
Run following command to run the api inside a docker container.
```
npm install
sudo npm start
```

In development mode you can:
* Use VSCode Debugger *Docker: Attach to Api* to debug the api.
* Modified source codes are automatically linted, recompiled and the api is updated.

## Deploy production
Note: sample only
```
npm install
sudo npm run compose:prod
```

## API
GET:
**[host]/health-check**

returns status of the service

GET:
**[host]/api/v1/channel/[id]/messages**

Returns all messages of the channel

POST:
**[host]/api/v1/channel/[id]/messages**

Creates new message to the channel
