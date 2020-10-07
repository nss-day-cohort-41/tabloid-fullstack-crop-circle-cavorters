# Description
Added a feature for UserProfiles in which an admin can view a list of active user profiles, and give them the option to deactivate any user profile. 

**The deactivate option does not delete the profile. Rather, it changes the user's "IsActive" boolean in the database.

Deactivated user profiles will be removed from the index list. There is also a "View Deactivated" button to view all deactivated users and an option to reactivate the user, and add them back to the active users list.

Lastly, the feature also makes it so any deactivated user's email will not allow them to login. 

#### Styling
Added 10% margins to either side of window for all views to create a whitespace border.

# Ticket Reference

> [#53 - Change to Database](https://github.com/nss-day-cohort-41/tabloidmvc-oysters-rockefeller-rose/issues/53)
> [#26 - Deactivate a User Profile](https://github.com/nss-day-cohort-41/tabloidmvc-oysters-rockefeller-rose/issues/26)
> [#27 - Reactivate a User Profile](https://github.com/nss-day-cohort-41/tabloidmvc-oysters-rockefeller-rose/issues/27)

## Type of change

- [ ] **Bug fix** (non-breaking change which fixes an issue)
- [x] **New feature** (non-breaking change which adds functionality)
- [ ] **Breaking change** (fix or feature that would cause existing functionality to not work as expected)

# Testing Instructions
- Run both files in the SQL folder.
- Run a SQL query to add a user to the UserProfile table with an id of 2 and a display name "adminRick" and email "adminRick@example.com"
- Start program
- Go to localhost:44336 in your browser.
- Login with "admin@example.com"
- Navigate to the "USERz" link in the navbar.
- Locate The AdminRick profile and click the "Deactivate" button to the right.
- The link will bring you to a confirmation page to deactive AdminRick's profile. 
- First click the cancel button and ensure the link brings you back to the active users page, then repeat the previous step.
- Click Confirm to deactivate AdminRick and be returned back to the User Index
- Visually confirm that the only user listed on the index page is "Admin"
- Next, click the logout button on the navbar.
- Enter adminRick@example.com into the email field and click "Login"
- Visually confirm that an error message appears below the input field that "User is Deactivated"
- Clear the email field and add admin@example.com and click login.
- Navigate to the "USERz" link in the navbar.
- Click the "View Deactivated" button above the table.
- Visually confirm that AdminRick is displayed as deactivated.
- Click the "Reactivate" link to the right of AdminRick's listing.
- First click the cancel button and ensure the link brings you back to the inactive users page, then repeat the previous step.
- On the confirmation page, click "Confirm" to reactivate admin Rick and return back to the Inactive Page.
- Visually confirm that the table is empty.
- Click the "View Active" button above the table to be redirected to the Active User's page.
- Visually confirm that both Admin and AdminRick are displaying.

# Checklist:
- [X] My code follows the style guidelines of this project
- [X] I have performed a self-review of my own code
- [X] I have commented my code, particularly in hard-to-understand areas
- [X] My changes generate no new warnings or errors
- [X] I have added test instructions that prove my fix is effective or that my feature works