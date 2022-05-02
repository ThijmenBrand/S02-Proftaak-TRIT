import { graphConfig } from "@/config/authConfig";
import axios from "axios";
import { Event } from "@microsoft/microsoft-graph-types";

export default function sendGraphReq(token: string) {
  console.log(token);
  axios
    .get(graphConfig.graphMeEndpoint + "/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const events: Event[] = res.data;
      console.log(events[0].subject);
    });
}

export function getAllRockstars(token: string) {
  axios.get(graphConfig.graphApplicationEndpoint + "/users")
}
