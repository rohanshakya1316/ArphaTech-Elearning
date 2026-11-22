// * BroadcastChannel used to keep authentication state in sync across tabs.

export const AUTH_CHANNEL_NAME = "auth";

export const AUTH_EVENTS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const broadcastAuthEvent = (type) => {
  if (typeof BroadcastChannel === "undefined") return;

  try {
    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

    channel.postMessage({ type });
    channel.close();
  } catch (error) {
    console.error(`Failed to broadcast "${type}" auth event:`, error);
  }
};
