import axios from "axios";

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;

const getToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  // header paremeter
  const config = {
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // request body parameter
  const data = new URLSearchParams([
    ["grant_type", "client_credentials"],
  ]).toString();

  axios
    .post("https://accounts.spotify.com/api/token", data, config)
    .then((res) => {
      console.log(res.data, "spotify token");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getToken;
