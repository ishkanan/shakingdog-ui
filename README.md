# UI implementation for shakingdog

This is a UI implementation of the APIs provided by another of my homebrew muck-around projects [Shaking Dog](https://github.com/ishkanan/shakingdog). Again it is really only public to form part of my public portfolio. The project is based on React and uses Redux and ImmutableJS for data flow. Really enjoyed working with that combo. Redux demands a bit of boiler plate, but just spend the effort once and re-use it for other projects (with improvements/updates of course).

Interesting bits 'n' bobs:

* no tests have been written (Jest would be my pick if I had time to re-visit this)
* it is a single page app (SPA)
* it ain't pretty (but it's functional and reasonably Web 2.0). Bulma.io is fairly easy to work with but I have no prejudice to other CSS frameworks ala. Bootstrap
* does not 100% follow Redux best practices, especially around using selectors, and whatever best practices have come through since I worked on this
* doesn't use SCSS despite a folder being there (was on my TODO list, but didn't get around to it)
* linting configuration isn't tested, nor is it used during build
* uses NPM for package management and Webpack for build
