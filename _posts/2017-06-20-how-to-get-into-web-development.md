---
title: how to get into web development
---

*WARNING: this guide assumes some programming knowledge. This should not be an endeavor for absolute beginners.*

*NOTE: I always recommend books over other resources.*

If you're like me, you've probably procrastinated learning anything web-related because of how unordered and even 'artsy' it all seems - HT(text)M(arkup)L(anguage) isn't even a programming language, for crying out loud! Why would a coder waste their time on it?  

But whether we like it or not, the web is definitely the future. *All* of us use it on a daily basis, and for many, it's *the only point to life*. We're going to have to learn it at some point, and at the speed at which things are unrolling at the moment, I think the sooner the better. 

That out of the way, here is my LIY (learn it yourself) guide to all things web development. I promise that it's worth it.

---

### SOME QUICK DEFINITIONS:

* *NodeJS (aka node)*: a desktop environment for Javascript, which means that it lets JS run outside of the browser. Node also happens to include some necessary server framework.
* *frontend*: how websites look and act. Includes html, css, and Javascript.
* *backend*: the servers that control the websites. There are many server frameworks out there, but the most common ones are NodeJS (Javascript), Ruby on Rails (Ruby), and Django (Python). This guide focuses on NodeJS.
* *stack*: developers refer to the 'stack' as all of the bits they use for web development. For example, a stack might include a frontend framework, a database framework, and a server framework. 

### FRONTEND GUIDE 

1. Learn HTML/CSS with [this 700 page book](http://shop.oreilly.com/product/0636920023494.do) or any online course like [CodeAcademy](https://www.codecademy.com/learn/learn-html-css). By the end, you should have a solid understanding of not only the syntax but how the web actually works.

2. Learn Javascript (the newest version is ES7, but ES6 is acceptable) with [this book](http://shop.oreilly.com/product/0636920035534.do). Chapter 2 is critical — make sure you install all of the necessary software except for the Babel cross-compiler, which is pretty redundant.  

   If you don't use the book, make sure to do some researching on NodeJS and the Node Package Manager.

3. If you don’t know how Git/Github works, make an account and [learn it](https://git-scm.com/book/en/v2).

4. Since Javascript is such a [terrible language](http://walkercoderanger.com/blog/2014/02/Javascript-minefield/), you should also probably learn [Coffeescript](http://coffeescript.org/v2/).

5. (Optional) Learn [Sass](http://sass-lang.com/guide) for better CSS and [Pug](https://pugjs.org/api/getting-started.html) for better HTML.

6. Make sure you understand how Gulp works, as it is critical for managing complex projects that use a combination of Coffeescript, Sass, and Pug.  [This](https://code.lengstorf.com/ggbw-slides/#/37) is a good article, and [this](https://github.com/jetmate/website_boilerplate) is my official website boilerplate that has an example of a basic gulp setup.

7. ~~Learn~~ Acknowledge the existence of [jQuery](https://jquery.com/), which is a frontend library* that simplifies many tasks such as DOM manipulation. Everyone in the web development world is obsessed with it, but personally I think it's not strictly necessary.  

8. Learn a CSS framework, which takes care of many annoying CSS tasks like responsive design. [Bootstrap](https://v4-alpha.getbootstrap.com/) is really popular, but recently I've been messing around with [PureCSS](https://purecss.io/)**.

9. Learn good design principles. There are [many books](https://www.designforfounders.com/learn-design/) available online, but I especially love [this one](https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515). [This article](https://medium.freecodecamp.com/what-to-learn-in-2017-if-youre-a-frontend-developer-b6cfef46effd) also has a good section on web design.

10. Practice! [Github Pages](https://pages.github.com/) provides a great way to host static websites for free. 

### BACKEND GUIDE

1. Learn the server capabilities of node with a book such as [this](http://shop.oreilly.com/product/0636920032977.do).

2. (optional) If you haven't already, learn about [ExpressJS](https://expressjs.com/). This is server framework that takes care of the more redundant aspects of coding a server.

3. Learn about websockets, which are a quick way for a server to communicate with a client. [SocketIO](https://socket.io/) is by far the best Javascript websocket library.

4. Learn a frontend framework that, similar to jQuery, greatly simplifies the task of changing HTML on the go. I personally prefer [React](https://facebook.github.io/react/), but [VueJS](https://vuejs.org/) is a more minimal alternative. [Angular](https://angular.io/) is also pretty popular, but it is has a much greater learning curve.

5. Learn a content management system, which is a software that eliminates the repetitive task of creating similar pages (like blog posts in a blog). [Jekyll](https://jekyllrb.com/) is ideal because it is directly integrated with Github Pages, which means that there is no extra work required on the developer side.

---

*If at this point you're confused by the difference between a library and a framework, I don't blame you. [Here's](http://www.programcreek.com/2011/09/what-is-the-difference-between-a-java-library-and-a-framework/) an article that clarifies this.

**There are so many frameworks out there! This was one of the hardest things to research.