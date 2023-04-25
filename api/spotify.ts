// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQBTifHS8Stu0Il65L8aJTZbR-oszvjrO59L-FJg2mGGA8zrL1XrolVbjVDnbYg3vT5gFgBoOZV23TwbRlYo4FzK-6jR4_RS0NG2LKRExsxkXU9TeolHjRdETCSPm56Jn6fhiZukOC9gc5pH2p8i-MtH_NVsf8tT5SbHzHtsM-5YcuMB6g0NnYqlLzDZhKHvONKKESGWX9t3dJS7czZW_PTo9jeg_jsu_4-X0GVq5_1S93LWwK480xGSoG1sHA3Nx4sTmKNMkbqG89fcKZhmyy01r2bceRLTjm9vTutArb8K3IV-8o-QhueJokPoeOSaRGud8QMeRmeJiQDg1f-VfGowZtqLjM-dUgVF_ltSvHO_4gk";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=5", "GET")
  ).items;
}
