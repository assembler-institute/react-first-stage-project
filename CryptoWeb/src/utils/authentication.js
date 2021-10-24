let local = JSON.parse(localStorage.getItem("Users"));

function updateCurrentUser(array, values) {
  const updatedUsers = array.map((user) => {
    if (values === null) {
      user.isCurrentUser = false
    } else if (user.username === values.username) {
      user.isCurrentUser = true
    } else if (user.username !== values.username) user.isCurrentUser = false;
    
    return user;
  });
  return updatedUsers;
}

function signUpUser(values) {
  if (local === null) {
    values = { ...values, isCurrentUser: true };
    const newList = [values];
    localStorage.Users = JSON.stringify(newList, null, 2);
  } else {
    local = Array.from(local);
    local.push(values);

    const updatedUsers = updateCurrentUser(local, values);

    localStorage.Users = JSON.stringify(updatedUsers, null, 2);
  }
}

function logInUser(values) {
  let currentUser;
  if (local === null) {
    currentUser = null;
  } else {
    currentUser = Array.from(local).find(
      (user) => user.username === values.username
    );
  }
  if (local && currentUser && currentUser.password === values.password) {
    const updatedUsers = updateCurrentUser(local, values);

    localStorage.Users = JSON.stringify(updatedUsers, null, 2);

    return true;
  }
  if (!local || !currentUser) {
    alert("You are not registered yet. Sign in and get started!");
    return false;
  }
  if (local && currentUser && currentUser.password !== values.password) {
    alert("Wrong password! Think again");
    return false;
  }
}

export { signUpUser, logInUser,  updateCurrentUser };
