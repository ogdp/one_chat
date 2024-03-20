export const getGoogleUrl = (from: string) => {
  const ROOT_URL = `https://accounts.google.com/o/oauth2/v2/auth`;
  const REACT_APP_GOOGLE_OAUTH_REDIRECT = "http://localhost:8080/auth/google";
  const REACT_APP_GOOGLE_OAUTH_CLIENT_ID =
    "938631773415-r9uopg4ntg16akko0m4uluja3cl9hm3g.apps.googleusercontent.com";

  const options = {
    redirect_uri: REACT_APP_GOOGLE_OAUTH_REDIRECT,
    client_id: REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${ROOT_URL}?${qs.toString()}`;
};
