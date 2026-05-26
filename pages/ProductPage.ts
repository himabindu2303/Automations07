import { Page, expect, Locator } from "@playwright/test"
import { testData } from "./Testdata";
export class ProductPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
        expect(this.page.getByText("CATEGORIES")).toBeVisible();
        console.log("Homepage Launched - Categories text is visible");
    }


    //Category selection
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


    async addProductsFromMultipleCategories(data: any[], page: Page) {

        for (const item of data) {

            const category = item.category;
            const products = item.products;

            for (const product of products) {

                // Always navigates category to select the product
                await this.page.getByRole('link', { name: 'Home' }).click();
                await this.selectcategory(category);

                await this.page.waitForSelector('.card-title');

                // Open product
                await this.page.locator('.card-title', { hasText: product }).click();

                // Handle dialog
               await Promise.all([
                    this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
                    this.page.getByRole('link', { name: 'Add to cart' }).click()
                ]);
                console.log("Successfully added Product", product);
            }
        }
        await this.page.getByRole('link', { name: 'Home' }).click();

    }

}