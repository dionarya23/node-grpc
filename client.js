const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("user.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const email = process.argv[2];
const password = process.argv[3];

const client = new userPackage.User("localhost:40000", 
grpc.credentials.createInsecure())

client.createUser({
    "id": -1,
    "email": email,
    "password": password,
}, (err, response) => {
    console.log("Recieved from server " + JSON.stringify(response))
})

client.getListUser({}, (err, response) => {
    console.log("read the users from server " + JSON.stringify(response))
    if (typeof response.users !== "undefined")
        response.users.forEach(user => console.log(user.email, user.password));
})