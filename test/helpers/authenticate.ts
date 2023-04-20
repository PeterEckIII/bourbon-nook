import { createUser } from "~/models/user.server";
import { sessionStorage } from "~/session.server";

export const authenticate = async () => {
  const user = await createUser(
    "test2@example.com",
    "test-account",
    "TestingIsFun!"
  );
  let session = await sessionStorage.getSession();
  session.set("userId", user.id);
  let cookie = await sessionStorage.commitSession(session);

  return {
    user,
    session,
    cookie,
  };
};
