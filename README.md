# study-express
This is my study project for node / express api

## To launch
NPM
```
npm install
npm start
in another console npm run serve
or start debugger in vscode or run npm
```

DOCKER
```
docker build -t api .
docker run -p 4200:4200 api
```

## API
GET:
**[host]/health-check**

returns status of the service

GET:
**[host]/api/v1/channel/<id>/messages**

Returns all messages of the channel

POST:
**[host]/api/v1/channel/<id>/messages**

Creates new message to the channel