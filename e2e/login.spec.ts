import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Page", () => {
  test("should have a login form", async ({ page }) => {
    await page.goto("localhost:3000/login");
    await expect(page).toHaveTitle("Login");
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
  test("should redirect to the dashboard page if the submission is successful", async ({
    page,
  }) => {
    await page.goto("localhost:3000/login");

    const email = await page.getByText("Email address");
    await expect(email).toBeVisible();
    await email.fill("jpeckiii@gmail.com");

    const password = await page.getByLabel("Password");
    await expect(password).toBeVisible();
    await password.fill("Katie123!");

    const button = await page.getByText("Log in");
    await button.waitFor();
    await expect(button).toBeVisible();
    await button.click({ force: true });

    await expect(page).toHaveURL("http://localhost:3000/bottles");

    await page.screenshot({ path: "e2e/screenshots/login/login-success.png" });
  });
  test("It should display an error if the username and password don't match", async ({
    page,
  }) => {
    await page.goto("localhost:3000/login");

    const email = await page.getByText("Email address");
    await expect(email).toBeVisible();
    await email.fill("peck@google.com");
    const password = await page.getByText("Password");
    await expect(password).toBeVisible();
    await password.fill("secretpassword123");

    const button = await page.getByText("Log In");
    expect(button).toBeVisible();
    await button.click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await page.screenshot({ path: "e2e/screenshots/login/login-error.png" });
  });
});
