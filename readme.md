# The Countdown app

Application that displays a countdown to a given date. It comes with a plethora of features such as custom date entries, theming etc.
Oh and not forgetting the beloved dark mode! <br>
Just save the date and let the countdown begin!

[![Netlify Status](https://api.netlify.com/api/v1/badges/be93b718-a6df-402a-b4a4-855ba186c97d/deploy-status)](https://app.netlify.com/sites/kubernetes-io-main-staging/deploys)

App deployed on netlify at https://rcountdown.netlify.app/

Built with:
Javascript, CSS, html
<br><br>


## Running the application in development on your device- For developers

### Prerequisites
To use this repository, you need the following installed locally:

- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

npm comes installed with Node so most likely you don't need to install it separately.

- Clone the repository using 
```bash
git clone https://github.com/RDjarbeng/countdown.git
cd countdown
```
- Install dependencies, we used vite for bundling as a dev dependency
```
npm install
```
- View the application using vite by launching the dev server with
```
npm run dev
```

- Or alternatively use live server extension in vscode to view the application. NB: Vite is recommended because you might run into some minor issues with live server in vscode

### Building for production or deployment
Use
```
npm run build
```
This will create a build directory `/dist` with the bundled assets and pages as a Progressive Web App (PWA). You could open the index.html file generated with this build from your file explorer but a better option is to run:

```
npm run preview
```
This provides a link to the built website with the PWA ready to go, useful for testing the build. Before deploying
note that after building some assets such as css, js may have a hash/string of characters added to their name.
It's vite's way of keeping track of files,the application will be able to find those files referenced even with the strange names.

If you make changes that involve addition of new pages or routes you have to update the vite.config.js to ensure the new page is included in the bundling.
Sigh!😪. But on the bright side it takes care of the PWA configuration and allowing the users to updating the application with the new version.
## Code structure
There are 4 pages currently. 
1. The homepage: with the large countdown:  index.html
2. List page which shows the list of countdowns: countdown-list.html
3. Today page which shows the day counter: today.html
4. About page which shows information about the application version and contributors, about.html

The image below helps to get a high level overview of the code structure
![image](https://github.com/RDjarbeng/countdown/assets/57795443/bc21ca78-e19a-4d8f-8935-17f9b039f8d2)

Other utility functions that are used across the application and are not specific to a single page are shown here.
![image](https://github.com/RDjarbeng/countdown/assets/57795443/fafdb90d-20b5-421e-a443-85b2cf4cdeea)

### Possible contributions
Here are possible initial contributions, you can also look through the open [issues](https://github.com/RDjarbeng/countdown/issues) for ideas as well as the tasks in [projects](https://github.com/users/RDjarbeng/projects/4). Or you can implement features that you think should be included. We would love to see what you add🌟.

- Add confetti effects when a countdown elapses. Current version 3 only plays sound
- Adding a history page so users can set a memory to remember and view how long it has been since then. This page will also allow that elapsed countdowns show the time since they elapsed

Also, view the [dev process](/docs/dev-process.md) for inspiration by looking at the history of the application and the current direction of the project.

## How to use
To get started using the application you can follow this [guide](https://scribehow.com/shared/Get_started_with_rcountdown__EyFbM6bFS5ql48-UeEyM2w)
<br>
Or you can read instructions right here
1. Visit the application here [rcountdown](https://rcountdown.netlify.app/)
3. Click the + icon here to add a countdown.
![image](https://github.com/RDjarbeng/countdown/assets/57795443/355f9a5b-d84d-4ac9-8ab3-a780a1907490)
4. Click the "Title" field to add a description or leave the default
![Screenshot 2023-05-22 105242](https://github.com/RDjarbeng/countdown/assets/57795443/8a7348b4-4bfa-4387-b5b6-eeb0baeebd96)

5. Click the date and time field to set your own date and time. By default it's set to your current date and time.
![Screenshot 2023-05-22 105517](https://github.com/RDjarbeng/countdown/assets/57795443/48ae2255-8084-4449-a749-6f19674dd90e)

6. Optional step: Set deadline date and time for your event, recommend setting birthdays to midnight '00:00'

7. Optional step: Click the "Repeat every year" field if you want the countdown event to repeat annually, eg: birthdays

![Screenshot 2023-05-22 105616](https://github.com/RDjarbeng/countdown/assets/57795443/0fd1fa2f-990f-4208-9bb1-c7f6bbdd794d)

8. Click the submit button to save your countdown.

![Screenshot 2023-05-22 111201](https://github.com/RDjarbeng/countdown/assets/57795443/f85a039b-b691-436e-935c-c703704935bb)

9. You should be redirected to the [countdown list page](https://rcountdown.netlify.app/html/countdown-list.html)

![image](https://github.com/RDjarbeng/countdown/assets/57795443/c4202165-8629-490d-9ef3-2b6f101c27cb)

10. Click the drop down icon on a countdown to show more options.
![image](https://github.com/RDjarbeng/countdown/assets/57795443/63acdfe4-9fe3-48fd-b5c8-273a5892698f)

11. Optional step: With these options you can edit, delete or set the current event to be displayed on the homepage. Click 'Set as main' to set the homepage clock to current event.

![image](https://github.com/RDjarbeng/countdown/assets/57795443/92320477-51f4-4282-b0ad-169e712eda95)

12. To go back to the homepage click this icon to show site navigation options as well as options to change the theme and background.

![image](https://github.com/RDjarbeng/countdown/assets/57795443/4b3e40fb-d04a-49c3-bfb4-1dbcd83efb22)

13. Click 'Home' to go to the homepage. Or alternatively you can click the application icon to go to the homepage.
![image](https://github.com/RDjarbeng/countdown/assets/57795443/24a2d31e-e300-4948-9706-7cbfe73432b9)

14. If you selected 'set as main' on the countdown you created you should see your countdown event displayed by default on the home screen now even when you reload the page.
![image](https://github.com/RDjarbeng/countdown/assets/57795443/8a50c846-b898-441e-b7d9-6544ef933a48)

> Note: Your countdowns are saved on your device and are not stored online. Currently you cannot access them from a separate device.
<br><br>

## Countdown v0.1.0 (How it began)
Counts down to midnight with clickable features (dark mode) <br><br>
![v0 1](https://user-images.githubusercontent.com/73431750/163797559-f06ea073-8a74-4a09-a5f7-8aa4cb8c4732.png)


## Countdown v0.2.1
Added contributor [Nathaniel Nyakotey](https://github.com/nyakotey)

* Changes by Nyakotey
* Added background image
* Changed fonts
* Simplified css


## Countdown v0.2.2
* Added Font Awesome icons
* Fixed light and dark mode styling
* Fixed light/dark mode toggle button layout
* Minor text edits


## Countdown v0.2.3
* Added auto light and dark mode
![v023@0,75x](https://user-images.githubusercontent.com/73431750/163797714-e40fe63b-6236-482a-865e-2a58665c0352.png)


## Countdown v0.4.2
* Redesigned UI
* Added countdown to end of year
* Added day count

![v042](https://user-images.githubusercontent.com/73431750/163798384-a48aae8c-91d0-4d31-b4e1-991f25147766.png)


## Countdown v1.0.0
* Added authors page
* Added link with names at bottom of main page to authors page

![v1](https://user-images.githubusercontent.com/73431750/163801098-192a70c7-ecf6-4f11-bd9b-dc10825ee98b.png)


## Countdown v1.1.0
* Implement offline functionality
* Add PWA functionality


## Countdown v1.2.0
* Used service workers to cache site static resources
* Site now works without internet connection
* Added PWA functionality for (android) users to install app
* UI updates to light and dark mode 👀

![v1 2](https://user-images.githubusercontent.com/73431750/163797976-658ca351-eec2-4879-960c-a274609be1ce.png)


## Countdown v2.0.0
* Redesigned UI; sidebar navigation added, multiple themes and backgrounds to choose from
* User created countdowns is now possible; can edit, delete and set a countdown to display on homepage
* Added sharing of the day of year Count to Whatsapp platform

![v2 mobile alt1](https://user-images.githubusercontent.com/73431750/161403556-db26fc75-581e-43e1-8008-f0e3627826a6.png)
![v2 pc](https://user-images.githubusercontent.com/73431750/161403301-3f0eea81-6edd-49aa-80b9-d90996449af4.png)


## Countdown v2.1.0
* Added black theme
* Enhanced app security and integrity by sanitizing form inputs
* Improved documentation with the addition of the [dev process](/docs/dev-process.md)

![black theme](https://user-images.githubusercontent.com/73431750/163834582-2b98f0be-af25-4011-a0be-361d01a50d4e.png)


## Countdown v2.2.0
* Updated `authors` page to a functional `about` page
* Added in a special `today` page: <br>
&emsp; Stay current, share the `dayCount` to Whatsapp and many more to come
* Provided dark mode styles for form popups, improved responsiveness and styling

![v220@0,5x](https://user-images.githubusercontent.com/73431750/165914344-9e812d54-f5d7-4887-8a70-50253c36f85c.png)


## Countdown v2.3.0
* Added option to sort countdowns
* Removed due date status, added countdown status on the list item

![v2 3](https://user-images.githubusercontent.com/73431750/169272292-e83d9285-05bf-4264-9f45-3d8880505d7b.png)


## Countdown v2.4.0
* Animated deadline on homepage
* Added option to set repeatable countdowns 
* Added ui cues for countdown status
* Display due date when countdown is elapsed
* fixed rogue italics, browser auto text selection and more

![v2 4@0,5x](https://user-images.githubusercontent.com/73431750/170242064-43aa6765-229c-43e8-a6e7-ed39e7de3ee0.png)


## Countdown v2.4.1
* fixed sidebar option text going under the icon

## Countdown v2.5.0
* Major code refactor, improved code readability and reusuability
* Added a bundling step, Vite, resulting in massive performance gains
* Many other significant updates, setting the stage for the next version
* Bug fixes

---
#### For further changes in future versions see the [release notes](https://github.com/RDjarbeng/countdown/releases)
For more details for developers, and live updates, checkout the [dev process](/docs/dev-process.md) readme
