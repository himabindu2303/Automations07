import { Page, expect, Locator } from "@playwright/test"
import { testData } from "./Testdata";
export class ProductPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
        expect(this.page.getByText("CATEGORIES")).toBeVisible();
        console.log("Categories text is visible");
    }


    //Verify Categories section
    async selectcategory(category: string): Promise<string> {

        if (category == "Phones") {

            await this.page.getByRole('link', { name: 'Phones' }).click();

        }
        else if (category == "Laptops") {

            await this.page.getByRole('link', { name: 'Laptops' }).click();

        }
        else {
            await this.page.getByRole('link', { name: 'Monitors' }).click();
        }
        return category;

    }

    //Clicking on Next button
    async nextbutton(page: Page) {

        const Nextbutton = page.locator('#next2');
        await expect(Nextbutton).toBeEnabled();
        await Nextbutton.click();
    }

    //Selecting the Product from list
    async productselection(product: string) {

        const selectproduct = this.page.getByRole('link', { name: product });

        await expect(selectproduct).toBeVisible();

        await selectproduct.click();

        await expect(this.page.locator("#more-information")).toBeVisible();

        console.log(" Details page is displayed for ", product);
    }

    //Adding item to the cart from product details page

    async addtocart(page: Page) {

        const addtocart = await page.getByRole('link', { name: "Add to cart" });
        await addtocart.click();

    }




    async addProductsFromMultipleCategories(data: any[], page: Page) {

        for (const item of data) {

            const category = item.category;
            const products = item.products;

            for (const product of products) {

                await this.selectcategory(category);

                await this.page.waitForSelector('.card-title');

                await this.page.locator('.card-title', { hasText: product }).click();

                page.once('dialog', async dialog => {

                    await this.page.getByRole('link', { name: 'Add to cart' }).click();
                    await dialog.accept();
                });
                await page.goBack();
            }

            await page.getByRole('link', { name: 'Cart' }).click();

            // ✅ Verify all products
            await expect(page.locator('text=Sony vaio i5')).toBeVisible();
            await expect(page.locator('text=Dell i7 8gb')).toBeVisible();
            await expect(page.locator('text=Samsung galaxy s6')).toBeVisible();
            console.log("Validated cart");

        }
    }

}