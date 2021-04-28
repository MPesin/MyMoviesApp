# wix-interview

Wix mobile home assignment

![movies screen](./_images/screen_movies.png)
![favorites screen](./_images/screen_favorites.png)

# Intro

This is the homework assignment by wix that was required for the interview. When I started this project I didn't have experience with React, React Native or Typescript.

This was a very challanging project, beacuse the React Native environment and architecture (and the VSCode editor) are different from what I'm used to, but it was a great challange!

Coming from Android Native (Java and a bit of Kotlin) and Xamarin (C# and .Net), the whole concept of state managment was new to me. I'm accustomed to working in MVVM, having a ViewModel bind to my view, so I had to rethink how I should organize my files. I'm aslo used to languages that require a complier, and the Typescript (basically JS) environment is much more… allowing and required me to do more debugging than usual. Also, I decided to use functional components and hooks, to vary from the regular OOP I’m used to, but still used classes for the models.

Overall, I’m happy for the intense week I had (because I’m working full-time I only had time to work at nights). I got to familiarize myself with a whole new way of thinking and programing.

# Sources

Here is a list of the sources I used for this application:

1. [React Native Documentation](https://reactnative.dev/docs/getting-started)
2. [Typescript Documentation](https://www.typescriptlang.org/docs/handbook/intro.html)
3. _React Native integration with Redux and TypeScript (Part 1)_, by Leandro Ercoli, 2020, [Link](https://medium.com/@leandroercoli/react-native-integration-with-redux-and-typescript-part-1-6ee1b3da19a0).
4. _Refactoring React class components to Typescript functional components with hooks_, by Benjamin Morali, 2020, [Link](https://medium.com/benextcompany/refactoring-react-class-components-to-typescript-functional-components-with-hooks-a4f42b2bd7b5)

# Folder Structure

All of the code is located in the `./src` folder:

![folders](./_images/folder_structure.png)

# Main Packages

- [Redux](https://react-redux.js.org/) - for state managment.
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - middleware for Redux that basically adds a clouser to our action functions, allowing it to delay the execiton and manage async actions better. I added it because API requests are asynchronous.
- [React Navigation](https://reactnavigation.org/) - for **tab** navigation.
- [React Native Elements](https://reactnativeelements.com/) - for better UI components.
- [React Native Async Storage](https://github.com/react-native-async-storage/async-storage) - for saving key-value pairs in the mobile persistent memory.
- [axios](https://github.com/axios/axios) - for managing the requests to the API using _XMLHttpRequests_.

# The Advanture of the Architecture

Designing the app in advance was problematic for me, because I had no idea when I started what I would need and how React Projects look like. So, I started with the simplest initialization of a React Native project with Typescript. The thinking was to try to make the design as modular as possible so I will manage small models while I’m learning and improving – this is much easier to manage than large objects and **SoC (Separation of Concern)** is very important to me. I also used interfaces, in the `./services` folder, so I’ll be able to do **DI (Dependency Injection)** - this allows me to replace objects in the code without damaging the logic and will help with unit testing.

I separated each tab to a different view: `./views/moviesView` and `./views/favoritesView` - both are placed in a main view: `./views/mainView` that is the root of the `./src` project. The smaller components that make up these main view I placed in the `./views/components` folder, it has the ‘FlatList’s where I present the movies – one component for each view, and the renderer that renders the information to a _list item_.

I decided to have the business logic in dedicated handlers `./models/moviesHandler` and `./models/favoritesHandler.

To test the basic structure, and learn how React Native works, I created a basic JSON file to serve as my database `_data/moviesSample`, and created the `./repos` folder to hold my repositories. The first thing I did was the interface `./repos/Repo` so in the future when I’ll implement the API repository, it’ll be easier to integrate it, and of course this is good for unit testing and allows us to create a stub or a mockup.

After managing to display the sample movies I turned to looking at how I’m going to bind the views to the logic, and how I will manage the information in every view. Learning about the State management in react, reading blogs and talking to friends, I turned to **Redux** as the package to handle my state management. This was not easy to implement together with the UI and the hooks event, and this venture improved my knowledge on how the flow of **component’s and hooks** works, and what does it mean to use **immutable states** to manage the UI.

Finally I added the `AsyncStorage` package to save the favorite movies in the persistent memory of the device, so I’ll be able to retrieve them even if my process was destroyed, in model `./models/storageManager`.

The last thing I added what the **search bar**, which throw me into a set of new problems: there were new movie items that I didn’t want all of them to be added to my state (redux store), but I did want to allow the user to flag them as _Favorite_. This required me to add logic to manage the favorites list better, and when I initialize the data on startup – I needed to make sure that I present all the favorite movies, even those that were not part of the regular API request that fills up the initial state.

# What I would do with more time?

## Unit Tests

I really wanted to add unit tests using the [Jest package](https://jestjs.io/) and maybe even some more integrated **UI tests**.

## Advanced Search

Adding an advanced search option using an [_Overlay_](https://reactnativeelements.com/docs/overlay) component to create a form.

## A Mini Game: "Guess the Movie"

I wanted to add a tab to allow users to play a game with their friend, where you get a movie and the other player needs to guess what movie it is (using questions or mime), and then using NFC we pass the movie ID to the other player and he gets a message if he's right or wrong.

## UML Diagram

This is something that should be done before we even start programming, but because I wasn't familiar with React Native I didn't know how to do a good diagram in advance, so I went ahead and got my hands dirty instead. If I had more time I would make a **class diagram** of my architecture.
