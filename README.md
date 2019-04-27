## About the website

Tech Stacks

* HTML & CSS
* JavaScript
* React

Features

* Responsive
* Search (Implementing this successfully makes me feel like I've created a Google🤣 , although it's very simple for most of you guys.)
* no more☹️ (What have I done for these hard-working days?🤯)

### How I layout the page

For responsive effects, I used the most important css style is CSS Grid and Flex-box

*  For the whole page layout,  using grid display, when the window changed, the content layout will be changed from four columns a row to on columns a row.
* For the smaller section layout, like a video resource content box need centralize multiple children elements horizontally and vertically, Flex-box is a better solution.

### Let's talk about the responsive part

For what I understand, 'Responsive' means when the window changed, the webpage will be re-layouted

* First, the search box will move down.

  <img src="https://github.com/wwsu97/fedhub_beta/blob/master/docs/images/resp_1.gif" width=50%>

  🤔It seems like the search box moved down from the header, actually there are two search boxes, when the window become smaller, the search box on the header is hidden, and the second one showed up.

* When the window becomes smaller, the topic nav will move down too, and the search box width will stretch to 100% of the window (same as the search box).

  <img src="https://github.com/wwsu97/fedhub_beta/blob/master/docs/images/resp_2.gif" width=50%>

* When it becomes smallerrrrr😆, the nav bar will pass away peacefully, and its son The Menu Icon will inherit his father's mission!🚀

  <img src="https://github.com/wwsu97/fedhub_beta/blob/master/docs/images/resp_3.gif" width=50%>

  🤔How can the menu slide down?

  * set menu position as relative, give is a default position from top 0px
  * and when the menu is clicked, change it from top like 200px, and set a transition time like 1s.

  🤩The rotating menu icon?

  * Same as menu, when it clicked, change the rotating degree.

* When it becomes smaller for the last time, it will get into the "Mobile Mode"

  <img src="https://github.com/wwsu97/fedhub_beta/blob/master/docs/images/resp_4.gif" width=50%>

  * it will show extra three button, and you know what them for😌

## About the FedHub

### What is FedHub?

FedHub is a website which integrates front-end development resources with good qualities.

### The topics

There are six topics on FedHub, and the contents are just some fake data for now.

* HTML&CSS
* JavaScript
* React
* Vue
* Angular
* Bootstrap

### The resource kinds

There are three kinds for now:

* video
* article
* book

### The Content

The resource contents are linked with an outside link, like YouTube, Medium links.







