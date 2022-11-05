import { parentPort } from "worker_threads";
import axios from "axios";
async function testAxios() {
  try {
    let total = 0;
    let i = 0;
    while (i !== 10) {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (data) {
        i++;
        console.log(i);
        total++;
      }
    }

    parentPort.postMessage(total);
  } catch (error) {
    console.log(error);
  }
}

testAxios();
