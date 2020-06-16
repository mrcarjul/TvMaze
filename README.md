# TvMaze

# Installation

Previous Requirements
 
React Native Cli Enviroment
https://reactnative.dev/docs/environment-setup 

Yarn was used as package management lib

1. Install project dependencies

yarn install
cd ios && pod install

To run Android/iOS projects run

npx react-native run-android 
npx react-native run-ios


# Description of features applied 

All Mandatory features

● List all of the series contained in the API used by the paging scheme provided by the API. 
● Allow users to search series by name. 
● The listing and search views must show at least the name and poster image of the series. 
● After clicking on a series, the application should show the details of the series, showing the following information: 
    ○ Name 
    ○ Poster 
    ○ Days and time during which the series airs 
    ○ Genres 
    ○ Summary 
    ○ List of episodes separated by season 
● After clicking on an episode, the application should show the episode’s information, including: 
    ○ Name 
    ○ Number 
    ○ Season 
    ○ Summary 
    ○ Image, if there is one 

Extra 

    Unit testing for Footer, Header and Summary Components

    run

    yarn test

# Main dependencies used

React Navigation 5.0 -- To manage general app navigation

Axios -- To manage Api calls

Redux -- State management lib

Redux Logger -- Development lib to log store state

React Native Fast Image -- Improve Image display performance

React Native Vector Icons -- Improve UX/UI with Icons

React Native Shared Element -- Share elements between screens

Why did you render -- Development lib to Review components render to avoid bad practices

React Native Splash Screen -- Manages Splash Screen