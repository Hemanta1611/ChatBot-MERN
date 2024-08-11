import { connect, disconnect } from 'mongoose';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Couldn't Connect to MongoDB");
    }
}
;
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Couldn't Disconnect From MongoDB");
    }
}
;
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connections.js.map