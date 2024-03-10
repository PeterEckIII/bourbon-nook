import { test as base } from "@playwright/test";
import { user } from "@prisma/client";
import { parse } from "cookie";
import invariant from "tiny-invariant";

import { getUserByEmail } from "~/models/user.server";
import { getSession } from "~/utils/session.server";

export const test = base.extend<{
  login: (userOverrides?: Partial<user>) => Promise<user>;
}>({
  login: [
    async ({ page, baseURL }, use) => {
      invariant(baseURL, "The baseUrl must be set to use the login helper");
      return use(async () => {
        const user = await getUserByEmail("jpeckiii@gmail.com");
        invariant(user, "User was not returned");
        const session = await getSession(new Request(baseURL));
        await session.signIn(user);

        const cookieValue = await session.commit();
        invariant(cookieValue, "Cookie value was not returned");
        const { WHISKEY_NOOK_SESSION } = parse(cookieValue);
        invariant(WHISKEY_NOOK_SESSION, "Cookie was not returned");
        await page.context().addCookies([
          {
            name: "WHISKEY_NOOK_SESSION",
            value: WHISKEY_NOOK_SESSION,
            domain: new URL(baseURL).hostname,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "Lax",
          },
        ]);
        return user;
      });
    },
    { auto: true },
  ],
});

export const { expect } = test;
