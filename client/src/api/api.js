import { useUser } from "../context/UserContextProvider";

export async function fetch_followers() {
  const response = await fetch("http://localhost:4747/api/get-follower", {
    credentials: "include",
  });
  const { following_data, follower_data } = await response.json();
  return { following_data, follower_data };
}

export async function add_user(targetUsername) {
  await fetch("http://localhost:4747/api/set-follower", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower: targetUsername }),
  });
}

export async function remove_user(targetUsername) {
  await fetch("http://localhost:4747/api/remove-follower", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followed: targetUsername }),
  });
}

export async function fetch_user_data(targetUsername) {
  const response = await fetch(
    `http://localhost:4747/api/get-user-count?username=${targetUsername}`
  );
  const data = await response.json();

  return data.count;
}

export async function fetch_banana_count() {
  const response = await fetch(`http://localhost:4747/api/get-count`, {
    credentials: "include",
  });
  const { count, total_count } = await response.json();

  return { count, total_count };
}

export async function post_banana_count(count) {
  await fetch("http://localhost:4747/api/set-count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
    credentials: "include",
  });
}

export async function post_banana_history(amount) {
  await fetch("http://localhost:4747/api/post-banana-history", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
}

export async function fetch_banana_history(following) {
  let response = await fetch("http://localhost:4747/api/get-banana-history", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: following.map((user) => user.username) }),
  });
  let { banana_history } = await response.json();

  return banana_history;
}

export async function post_login(username, password, createAccount) {
  const req = await fetch(
    `http://localhost:4747/api/login/post?create_account=${createAccount}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    }
  );
  const { success, message } = await req.json();

  return { success, message };
}

export async function post_friend_requests(sender, receiver, insert) {
  await fetch(
    `http://localhost:4747/api/post-friend-requests?insert=${insert}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, receiver }),
    }
  );
}

export async function fetch_friend_requests(username) {
  let data = await fetch(
    `http://localhost:4747/api/get-friend-requests?username=${username}`
  );
  let { friend_requests } = await data.json();
  return friend_requests;
}
