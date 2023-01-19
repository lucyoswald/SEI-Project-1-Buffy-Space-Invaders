![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Space Invaders

## Project overview

This was my first significant coding project. Built using HTML, CSS, and JavaScript, it is a Buffy the Vampire Slayer-inspired Space Invaders game that enables players to control the Slayer using keyboard inputs to defeat the invading vampires and earn points. The invaders (vampires) can also periodically drop ‘fangs’ on the player. There is a current score attribute so the player can keep track of their score while they play.

### 🛠 Technologies Used

Javascript, HTML, CSS...

### Planning

I spent time thinking about the game's functionality and design, creating a basic layout and features, and whiteboarding the logic and steps needed for each element of the game. I also wrote pseudo code and established a project timeline with a target date for a minimum viable product, with stretch goals for later implementation.

I began by creating the grid for my game in JS and added a square at the bottom as the shooter. I implemented the ability to move the shooter left and right, and then added the invaders to the grid. I used CSS classes and initially used coloured circles for the invaders and a coloured square for the shooter. Starting simple allowed me to focus on functionality first and not worry about styling.

### Challenges:

Invader Movement

I would say I found the invader movement particularly challenging. I figured out that the best approach it was to make a condition for when the invaders hit the edge, and if they did, then move them down. This took me a while to understand and work out.

Laser Shooting

I found the laser shooting to be fairly straightforward but ran into errors when I realized that the laser, even though it was working, kept going forever after exiting the grid. I had to implement code to ensure that the laser was removed as soon as it reached the top of the grid.

![Laser remove from grid fully](../Project_1_Space_Invaders/assets/Laser%20remove%20from%20grid.png "Remove from grid fully")

Bomb Movement

Similarly, I faced challenges with the bomb movement (fangs), as they also kept going, so I had to make a condition to remove them once they reached the last row in the grid.

![Bomb remove from grid fully](../Project_1_Space_Invaders/assets/Bombs%20removal%20from%20grid.png "Remove from grid fully")

### Wins:

It’s no secret as you can tell by looking at the game that I had a lot of fun styling it! While implementing the JavaScript logic proved to be a challenge at times, I found that taking breaks and focusing on the styling whilst my mind was processing everything helped me look at the JS with a fresh perspective + allowed me to enjoy small wins with the CSS keeping my spirits up.

Inspiration for the game's visual design was drawn from one of my favourite tv shows, Buffy the Vampire Slayer. Towards the end I knew that I wanted to create the ‘gameLost’ and ‘gameWon’ functions and thought how cool it would be if the grid displayed different GIFs of Buffy depending on whether the player won or lost.

To achieve the dynamic display of gifs upon winning or losing the game, I utilized the concept of hidden classes. I added two spans in the HTML with the class of "gameWon" and "gameLost” and applied a class of "hidden" to each of them. In the CSS, I set the display property of the hidden class to "none". In my JavaScript logic, I selected the elements with the classes "gameWon" and "gameLost” and added the appropriate GIFs and styling to each one. When the game was won or lost, I removed the "hidden" class from the corresponding element, revealing the gif and triggering the appropriate styling. This added an interactive and responsive aspect to the game, making the user experience more engaging.

GAME WON GIF
![Game Won](../Project_1_Space_Invaders/assets/Game_Won_Gif.png "Game Won GIF")

GAME LOST GIF
![Game Lost](../Project_1_Space_Invaders/assets/Game_Lost_Gif.png "Game Lost GIF")

I utilised the Math.random function to create a randomised bomb-dropping pattern. I am really happy with this as I initially had self-doubt and lack of confidence in my solution, however I continued to research and eventually discovered that my approach was correct all along. This experience not only resulted in a successful feature in the game but also an increase in my confidence in my ability to problem solve.

![Math.random](../Project_1_Space_Invaders/assets/math.random.png "Math.random ")

### Lessons learnt:

This project taught me that despite planning and mapping out a project, there will always be unexpected challenges. It's important to allow time for these issues and not to be too hard on oneself when faced with them. Additionally, I learned that some tasks may have more layers than initially anticipated and it's okay to take breaks and seek help from others when debugging.
