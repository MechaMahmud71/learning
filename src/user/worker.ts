import { parentPort, workerData } from "worker_threads";

const user = [];
const admin = [];

for (let i = 0; i < 100000000; i++) {
  user.push(i);
}
for (let i = 0; i < 100000000; i++) {
  admin.push(i);
}

parentPort.postMessage({
  user: user,
  admin: admin,
});
