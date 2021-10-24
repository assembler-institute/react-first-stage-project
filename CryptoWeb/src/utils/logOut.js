import { updateCurrentUser } from "./authentication";

let local = JSON.parse(localStorage.getItem("Users"));

export default function logOut() {
  const updatedUsers = updateCurrentUser(local, null);
  localStorage.Users = JSON.stringify(updatedUsers, null, 2);
}
