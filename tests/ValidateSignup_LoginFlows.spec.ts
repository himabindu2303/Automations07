import { test, expect, Page } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { Signup } from "../pages/Signup";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { testData } from "../pages/Testdata";

// test.describe.serial('Auth Flow', () =>{} // used to run the test parallely if there are multiple test

test("Verify User Sign In and Login functionality", async ({ page }) => {


    const homepage = new HomePage(page);

    const signup = new Signup(page);

    const login = new LoginPage(page);


    //Verify HomePage Launch
    const islaunched = await homepage.HomepageLaunch();


    if (islaunched == 'STORE') // Check whether the Homepage title is as expected
    {
        console.log(" HomePage Launched Successfully");
    }

    else {
        console.log(" HomePage launch failed");
    }


    // Trying login with the Credentials
    await login.ClickLoginbutton(page);

    const UserExists = await login.VerifyLogin(testData.validUser.username, testData.validUser.password);

    if (UserExists == false) {
        console.log("User Does not Exists.Moving to Signin popup to create a new user")

        await signup.ClickSignup(); // Sign up the new user

        await signup.NewUserSignup(testData.validUser.username, testData.validUser.password);

        //Logging in with the new registered user
        await login.ClickLoginbutton(page);

        await login.VerifyLogin(testData.validUser.username, testData.validUser.password);
    }

    //Verify Productpage displays Categories section
    const product = new ProductPage(page);
})