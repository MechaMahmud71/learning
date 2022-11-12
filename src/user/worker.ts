import { parentPort, workerData } from "worker_threads";

const user = [...workerData.value.android];
const admin = [...workerData.value.ios];

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
