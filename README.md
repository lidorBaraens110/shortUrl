## short-URL

open your terminal,
clone the project.

# with docker

cd server

docker build -t short-server . ////docker create an image for the server

cd ../client

docker build -t short-client . ////docker create an image for the client

run the server with the command

docker run -p 5000:5000 short-server

open a new terminal and run the client with th command

docker run -p 3000:3000 short-client

# without docker

cd server,

npm install,

npm start. or npm run dev

open new tab in your terminal and go to the project

cd client,

yarn,

yarn start

server side should be open in localhost : 5000,

client side should be open in localhost : 3000,
