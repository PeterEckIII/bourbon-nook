import { user } from "@prisma/client";
import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

import { createUserSession, getUser } from "~/session.server";

const USER_SESSION_KEY = "userId";

invariant(process.env.SESSION_SECRET);

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "WHISKEY_NOOK_SESSION",
    secure: true,
    secrets: [process.env.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});

export async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const initialValue = await sessionStorage.commitSession(session);
  const getSessionId = () =>
    session.get(USER_SESSION_KEY) as string | undefined;
  const unsetSessionId = () => session.unset(USER_SESSION_KEY);

  const commit = async () => {
    const currentValue = await sessionStorage.commitSession(session);
    return currentValue === initialValue ? null : currentValue;
  };

  return {
    session,
    getUser: async () => {
      const token = getSessionId();
      if (!token) return null;

      return getUser(request).catch((error: unknown) => {
        unsetSessionId();
        console.error(`Failure getting user from the request object: ${error}`);
        return null;
      });
    },
    getSessionId,
    unsetSessionId,
    signIn: async (user: Pick<user, "id">) => {
      await createUserSession({
        redirectTo: "/bottles",
        remember: true,
        request,
        userId: user.id,
      });

      session.set(USER_SESSION_KEY, user.id);
    },
    signOut: async () => {
      const sessionId = getSessionId();
      if (sessionId) {
        unsetSessionId();
      }
    },
    commit,
    getHeaders: async (headers: ResponseInit["headers"] = new Headers()) => {
      const value = await commit();
      if (!value) return headers;
      if (headers instanceof Headers) {
        headers.append("Set-Cookie", value);
      } else if (Array.isArray(headers)) {
        headers.push(["Set-Cookie", value]);
      } else {
        headers["Set-Cookie"] = value;
      }
      return headers;
    },
  };
}
