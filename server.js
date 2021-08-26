const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("user.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000",
 grpc.ServerCredentials.createInsecure());

server.addService(userPackage.User.service,
    {
        "createUser": createUser,
        "getListUser" : getListUser,
    });
server.start();

const users = []
function createUser (call, callback) {
    const newUser = {
        "userId": users.length + 1,
        "email": call.request.email,
        "password": call.request.password
    }
    users.push(newUser)
    callback(null, newUser);
}

function getListUser(call, callback) {
      callback(null, {"users": users});
}