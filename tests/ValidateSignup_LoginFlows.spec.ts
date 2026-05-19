import {test,expect,Page} from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { Signup } from "../pages/Signup";

// test.describe.serial('Auth Flow', () =>{} // used to run the test parallely

test("Verify HomePage Launch", async ({page})=>{

    
    const  homepage = new HomePage(page);

    const signup = new Signup(page);

    const islaunched= await homepage.HomepageLaunch();


    if(islaunched == 'STORE')
    {
        console.log(" HomePage Launched Successfully");
    }

    else
    {
        console.log(" HomePage launch failed");
    }

    // Clicking SignUp button to create a new account for user
    
    await signup.ClickSignup();



})