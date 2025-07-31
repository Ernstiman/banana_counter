import { useUser } from "../context/UserContextProvider";


const BASE_URL = import.meta.env.PROD
? ''
: 'http://localhost:4747'

export async function fetch_followers(username) {
  const followersResponse = await fetch(`${BASE_URL}/api/followers/${username}/followers`, {
    credentials: "include",
  });
  const { userData } = await followersResponse.json();
  return { userData };
}

export async function fetch_following(username) {
  const followingResponse = await fetch(`${BASE_URL}/api/followers/${username}/following`, {
    credentials: "include",
  });
  const { userData } = await followingResponse.json();
  return { userData };
};

export async function follow(targetUsername) {
  await fetch(`${BASE_URL}/api/followers/follow`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower: targetUsername }),
  });
}

export async function unfollow(targetUsername) {
  await fetch(`${BASE_URL}/api/followers/unfollow`, {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unfollowing: targetUsername }),
  });
}

export async function fetch_banana_count(users) {
  const response = await fetch(`${BASE_URL}/api/bananas/get-bananas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({users})
  });
  const { count, totalCount } = await response.json();

  return { count, totalCount };
}



export async function post_banana_count(count) {
  await fetch(`${BASE_URL}/api/bananas/post-bananas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
    credentials: "include"
  });
}

export async function post_banana_history(amount) {
  await fetch(`${BASE_URL}/api/banana-history/post-history`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
}

export async function fetch_banana_history(following) {
  let response = await fetch(`${BASE_URL}/api/banana-history/get-history`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: following.map((user) => user.username) }),
  });
  let { banana_history } = await response.json();

  return banana_history;
}

export async function post_login(username, password, email, create_account = false) {
  let url = create_account ? "/create-account" : "/login"
  
  const req = await fetch(
    `${BASE_URL}/api/auth${url}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email}),
      credentials: "include",
    }
  );
  const { success, message } = await req.json();

  return { success, message };
}

export async function post_friend_requests(sender, receiver) {

  await fetch(
    `${BASE_URL}/api/friend-requests/send-requests`,
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
    `${BASE_URL}/api/friend-requests/remove-requests`,
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
    `${BASE_URL}/api/friend-requests/get-requests?username=${username}`
  );
  let { friend_requests } = await data.json();
  return friend_requests;
}

export async function fetch_all_users(){
      const response = await fetch(`${BASE_URL}/api/users/get-users`,
         {credentials: "include"}
      )
      const data = await response.json();
      return data;
      
   }

export async function putNewPassword(email, newPassword) {
  const response =await fetch(`${BASE_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await response.json();
  return data;
}

export async function postResetPasswordLink(email) {
  await fetch(`${BASE_URL}/api/auth/forgot-password-link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function fetchPasswordReset(token) {
  const response = await fetch(`${BASE_URL}/api/auth/get-reset-password?token=${token}`, {
    method: "GET",
  });
  const {success, email, message} = await response.json();
  return {success, email, message};
}

export async function postNotificationSubscription(subscription, user_id){
  await fetch(`${BASE_URL}/api/push-notifications/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user_id, endpoint: subscription.endpoint, keys: subscription.keys}),});
}

export async function getPublicVapidKey(){
  const res = await fetch(`${BASE_URL}/api/push-notifications/get-public-vapid-key`);
  const key = await res.json();
  return key
}

export async function postNotification(username, amount, followers){
    await fetch(`${BASE_URL}/api/push-notifications/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, amount, followers }),
    });
}
