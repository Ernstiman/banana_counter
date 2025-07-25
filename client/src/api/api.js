import { useUser } from "../context/UserContextProvider";

export async function fetch_followers(username) {
  const followersResponse = await fetch(`http://localhost:4747/api/followers/${username}/followers`, {
    credentials: "include",
  });
  const { followers } = await followersResponse.json();
  return { followers };
}

export async function fetch_following(username) {
  const followingResponse = await fetch(`http://localhost:4747/api/followers/${username}/following`, {
    credentials: "include",
  });
  const { following } = await followingResponse.json();
  return { following };
};

export async function follow(targetUsername) {
  await fetch("http://localhost:4747/api/followers/follow", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower: targetUsername }),
  });
}

export async function unfollow(targetUsername) {
  await fetch("http://localhost:4747/api/followers/unfollow", {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unfollowing: targetUsername }),
  });
}

export async function fetch_banana_count(users) {
  const response = await fetch("http://localhost:4747/api/bananas/get-bananas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({users})
  });
  const { count, total_count } = await response.json();
  

  return { count, total_count };
}

export async function post_banana_count(count) {
  await fetch("http://localhost:4747/api/bananas/post-bananas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
    credentials: "include"
  });
}

export async function post_banana_history(amount) {
  await fetch("http://localhost:4747/api/banana-history/post-history", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
}

export async function fetch_banana_history(following) {
  let response = await fetch("http://localhost:4747/api/banana-history/get-history", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: following.map((user) => user.username) }),
  });
  let { banana_history } = await response.json();

  return banana_history;
}

export async function post_login(username, password, create_account = false) {
  let url = create_account ? "/create-account" : "/login"
  
  const req = await fetch(
    `http://localhost:4747/api/auth${url}`,
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

export async function post_friend_requests(sender, receiver) {

  await fetch(
    `http://localhost:4747/api/friend-requests/send-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, receiver }),
    }
  );
}

export async function remove_friend_requests(sender, receiver) {
  await fetch(
    `http://localhost:4747/api/friend-requests/remove-requests`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, receiver }),
    }
  );

}

export async function fetch_friend_requests(username) {
  let data = await fetch(
    `http://localhost:4747/api/friend-requests/get-requests?username=${username}`
  );
  let { friend_requests } = await data.json();
  return friend_requests;
}

export async function fetch_all_users(){
      const response = await fetch("http://localhost:4747/api/users/get-users",
         {credentials: "include"}
      )
      const data = await response.json();
      return data;
      
   }

