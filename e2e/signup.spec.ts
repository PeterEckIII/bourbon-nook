import { test, expect } from "@playwright/test";

import { prisma } from "~/db.server";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup Page", () => {
  test("should have a signup form", async ({ page }) => {
    await page.goto("localhost:3000/join");

    await expect(page).toHaveURL(/\/join/);
    await expect(page).toHaveTitle("Sign Up");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await page.screenshot({ path: "e2e/screenshots/signup/signup-form.png" });
  });
  test("should redirect to the home page if the email is not already taken", async ({
    page,
  }) => {
    await page.goto("localhost:3000/join");

    const emailValue = "newuser@gmail.com";
    const email = await page.getByLabel("Email address");
    await expect(email).toBeVisible();
    await email.fill(emailValue);

    const username = await page.getByLabel("Username");
    await expect(username).toBeVisible();
    await username.fill("newuser");

    const password = await page.getByLabel("Password");
    await expect(password).toBeVisible();
    await password.fill("mysecretpassword123");

    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Create Account" }).waitFor();
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
    await page.screenshot({
      path: "e2e/screenshots/signup/signup-success.png",
    });

    await prisma.user.delete({
      where: {
        email: "newuser@gmail.com",
      },
    });
  });
  test("should show an error if the email is already taken", async ({
    page,
  }) => {
    await page.goto("localhost:3000/join");

    const email = await page.getByText("Email address");
    await expect(email).toBeVisible();
    await email.fill("jpeckiii@gmail.com");

    const username = await page.getByLabel("Username");
    await expect(username).toBeVisible();
    await username.fill("newuser");

    const password = await page.getByLabel("Password");
    await expect(password).toBeVisible();
    await password.fill("mysecretpassword123");

    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Create Account" }).waitFor();
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText("That email has already been taken"),
    ).toBeVisible();

    await page.screenshot({
      path: "e2e/screenshots/signup/signup-error_email.png",
    });
  });
  test("should show an error if the username is already taken", async ({
    page,
  }) => {
    await page.goto("localhost:3000/join");

    const email = await page.locator('input[name="email"]');
    await expect(email).toBeVisible();
    await email.fill("mybrandnewemail@google.com");

    const username = await page.locator('input[name="username"]');
    await expect(username).toBeVisible();
    await username.fill("jpeckiii");

    const password = await page.locator('input[name="password"]');
    await expect(password).toBeVisible();
    await password.fill("mysecretpassword123");

    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Create Account" }).waitFor();
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText("That username has already been taken"),
    ).toBeVisible();
    await page.screenshot({
      path: "e2e/screenshots/signup/signup-error_username.png",
    });
  });
});
