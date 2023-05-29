# The Countdown app

Application that displays a countdown to a given date. It comes with a plethora of features such as custom date entries, theming etc.
Oh and not forgetting the beloved dark mode! <br>
Just save the date and let the countdown begin!


App deployed on netlify at https://rcountdown.netlify.app/
<br><br>


## Running the application in development on your device- For developers

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

### Building for production
Use
```
npm run build
```
This will create a build directory `/dist` with the bundled assets and pages as a Progressive Web App (PWA). You could open the index.html file generated with this build from your file explorer but a better option is to run:

```
npm run preview
```
This provides a link to the built website with the PWA ready to go, useful for testing the build before deploying
Note that after building some assets such as css, js may have a hash/string of characters added to their name. It's vite's way of keeping track of files, so don't worry the application should still build.

If you make changes that involve addition of new pages or routes you have to update the vite.config.js to ensure the new page is included in the bundling.
It's a pain we know😪. But on the bright side it takes care of the PWA configuration and allowing the users to updating the application with the new version.

## How to use
To get started using the application you can follow this guide
https://scribehow.com/shared/Get_started_with_rcountdown__EyFbM6bFS5ql48-UeEyM2w
<br>
Or you can read instructions right here
- Visit the application here [rcountdown](https://rcountdown.netlify.app/)
- Click the + icon here to add a countdown.

![image](https://github.com/RDjarbeng/countdown/assets/57795443/355f9a5b-d84d-4ac9-8ab3-a780a1907490)

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
#### Many more to come, stay tuned!
For more details, and live updates, checkout the [dev process](/docs/dev-process.md) readme
