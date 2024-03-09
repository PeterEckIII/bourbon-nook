import { test, expect } from "./utils";

test.describe("New Bottle", async () => {
  test("should create a new bottle", async ({ page, login }) => {
    await login();
    await page.goto("localhost:3000/bottles/new");
    await expect(page).toHaveURL(/\/bottles\/new/);

    const name = await page.locator('input[name="name"]');
    const type = await page.locator('input[name="type"]');
    const status = await page.locator("#status");
    const distiller = await page.locator('input[name="distiller"]');
    const producer = await page.locator('input[name="producer"]');
    const country = await page.locator('input[name="country"]');
    const region = await page.locator('input[name="region"]');
    const price = await page.locator('input[name="price"]');
    const age = await page.locator('input[name="age"]');
    const year = await page.locator('input[name="year"]');
    const batch = await page.locator('input[name="batch"]');
    const barrel = await page.locator('input[name="barrel"]');
    const alcoholPercent = await page.locator('input[name="alcoholPercent"]');
    const proof = await page.locator('input[name="proof"]');
    const size = await page.locator('input[name="size"]');
    const color = await page.locator('input[name="color"]');
    const finishing = await page.locator('input[name="finishing"]');
    const openDate = await page.locator('input[name="openDate"]');
    const killDate = await page.locator('input[name="killDate"]');
    const imageUrl = await page.locator('input[name="imageUrl"]');

    await expect(name).toBeVisible();
    await expect(type).toBeVisible();
    await expect(distiller).toBeVisible();
    await expect(producer).toBeVisible();
    await expect(country).toBeVisible();
    await expect(region).toBeVisible();
    await expect(price).toBeVisible();
    await expect(age).toBeVisible();
    await expect(year).toBeVisible();
    await expect(batch).toBeVisible();
    await expect(barrel).toBeVisible();
    await expect(alcoholPercent).toBeVisible();
    await expect(proof).toBeVisible();
    await expect(size).toBeVisible();
    await expect(color).toBeVisible();
    await expect(finishing).toBeVisible();
    await expect(openDate).toBeVisible();
    await expect(killDate).toBeVisible();

    await name.fill("Test Bottle");
    await type.fill("Bourbon");

    await status.click();
    await page.getByRole("option", { name: /opened/i }).click();

    await distiller.fill("Test Distiller");
    await producer.fill("Test Producer");
    await country.fill("USA");
    await region.fill("Kentucky");
    await price.fill("50");
    await age.fill("10");
    await year.fill("2021");
    await batch.fill("1");
    await barrel.fill("N/A");
    await alcoholPercent.fill("45");
    await proof.fill("90");
    await size.fill("750");
    await color.fill("Amber");
    await finishing.fill("N/A");
    await imageUrl.fill(
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    );
    await openDate.fill("2021-01-01");
    await killDate.fill("N/A");

    await page.getByText("Submit").waitFor();
    await page.getByText("Submit").click({ force: true });
    await expect(page).toHaveURL(/\/bottles\/[A-Za-z0-9]+/);
    await page.screenshot({
      path: "e2e/screenshots/bottles/new-bottle_success.png",
    });
  });
});
