

## SEI Project 1 - Space Invaders JavaScript Game

This was my first significant coding project. Built using HTML, CSS, and JavaScript, it is a Buffy the Vampire Slayer-inspired Space Invaders game that enables players to control the Slayer using keyboard inputs to defeat the invading vampires and earn points. The invaders (vampires) can also periodically drop ‘fangs’ on the player. There is a current score attribute so the player can keep track of their score while they play.

View the live site [here](https://lucyoswald.github.io/SEI-Project-1-Buffy-Space-Invaders/).

## Project Brief
* Render a game in the browser
* Be built on a grid: do not use HTML Canvas for this
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it (we will do this together at the end of the project)
* Use semantic markup for HTML and CSS (adhere to best practices)

## 🛠 Technologies Used

HTML
CSS
JavaScript
Excalidraw



## Timeframe:
2 weeks | Solo project


## Planning

I spent time thinking about the game's functionality and design, creating a basic layout and features, and whiteboarding the logic and steps needed for each element of the game. I also wrote pseudo code and established a project timeline with a target date for a minimum viable product, with stretch goals for later implementation.

<img width=49.5% src="https://user-images.githubusercontent.com/116687424/226118384-94007971-9818-411b-a3ca-36ac8648e234.png">


## Build/Code process

* I began by creating the grid for my game in JS and added a square at the bottom as the shooter.
* I implemented the ability to move the shooter left and right, and then added the invaders to the grid.
* I used CSS classes and initially used coloured circles for the invaders and a coloured square for the shooter.
* Starting simple allowed me to focus on functionality first and not worry about styling.


## Shooter Movement:

I created a function called shooterMove that listens to keyboard events and updates the position of the shooter.. The function first calculates the current x coordinate of the shooter and then moves it one box to the right or left depending on the keyboard input, unless it is at the edge of the screen:
``` js
function shooterMove(event) {
  // create x coordinate to show where the shooter is and make sure they don't move further
  const x = shooterStartPosition % width;
  //console.log(`We are in box number ${x + 1} of the current row`);

  if (event.code === "ArrowRight" && x < width - 1) {
    boxes[shooterStartPosition].classList.remove("shooter");
    shooterStartPosition++;
    boxes[shooterStartPosition].classList.add("shooter");
  } else if (event.code === "ArrowLeft") {
    if (x > 0) {
      boxes[shooterStartPosition].classList.remove("shooter");
      shooterStartPosition--;
      boxes[shooterStartPosition].classList.add("shooter");
    }
  }
}
document.addEventListener("keyup", shooterMove);
```


## Invader Movement

* I created functions that control the movement of the invaders. 
* The invadersRight function moves the invaders one position to the right, the invadersLeft function moves them one position to the left, and the moveInvaders function uses these functions to move the invaders either right or left depending on their current direction. 
* The moveInvaders function also checks if any invaders have reached the edge of the screen and, if so, moves them down and changes their direction. 
* Finally, the moveInvaders function checks if the player has been hit by an invader and if any invaders have reached the bottom of the screen, which results in the game ending.
* I’ve included a snippet of the moveInvaders function as that’s the most important bit.

``` js
function moveInvaders() {
  
  removeInvaders();
  if (anyInvadersAtEdge() && !noVertical) {
    invaderMovement = invaderMovement === "left" ? "right" : "left";
    invaders = moveInvadersDown();
    noVertical = true;
  } else {
    if (invaderMovement === "right") {
      invadersRight();
    } else {
      invadersLeft();
    }
    noVertical = false;
  }
  addInvaders();
```

## Laser Movement

The laserShoot() function handles the shooting of the laser when the player presses the spacebar. It adds a laser (a class created in my css) and moves it upward until it hits an invader or goes off the game board. If the laser hits an invader, the corresponding invader is removed, and the class ‘explosion’ is added + the player's score is updated. If all invaders are eliminated, the player wins the game. If the laser hits an invader, an explosion animation is played and the laser is removed. 

``` js
 function moveLaser() {
    boxes[laserPosition].classList.remove("laser");
    laserPosition -= width;
    boxes[laserPosition].classList.add("laser");

    if (boxes[laserPosition].classList.contains("invader")) {
      invaders = invaders.filter((invader) => {
        return !boxes[invader].classList.contains("laser");
      });
      resultsDisplay.innerHTML = score += 100;
      if (invaders.length === 0) {
        resultsDisplay.innerHTML = `YOU WIN! Final score: ${score + 1000}`;
        clearInterval(laserId);
        gameWon();
        resultsDisplay.setAttribute(
          "style",
          "color: green; font-size: 15px; height: 60px; padding: 20px;"
        );
        gridwrapper.setAttribute("style", "height: 950px;");
        if (introMusic.pause()) {
          introMusic.play();
          playPauseBtn.innerHTML = "Paused &#9208;";
        } else {
          introMusic.play();
        }
      }

      boxes[laserPosition].classList.remove("laser");
      boxes[laserPosition].classList.remove("invader");
      boxes[laserPosition].style.backgroundImage = "";
      boxes[laserPosition].classList.add("explosion");

      if (boxes[laserPosition].classList.contains("explosion")) {
        if (vampireExplodeSound.play()) {
          vampireExplodeSound.load();
          vampireExplodeSound.play();
        }

        setTimeout(
          () => boxes[laserPosition].classList.remove("explosion"),
          300
        );
        clearInterval(laserId);
      }
    }
  }
```
## Invader Bombs

* This code snippet shows the invader bombs functionality in the space invaders game. The function invaderBombs() selects a random invader to drop a bomb. 
* The moveBombs() function moves the bomb down the grid and checks if it hits the shooter. If it does, the game is over and the bomb explodes.
* I utilised the Math.random function to create a randomised bomb-dropping pattern. I am really happy with this as I initially had self-doubt and lack of confidence in my solution, however I continued to research and eventually discovered that my approach was correct all along. 
* This experience not only resulted in a successful feature in the game but also an increase in my confidence in my ability to problem solve.

``` js
function invaderBombs() {
  let invaderBombStartPosition =
    invaders[Math.floor(Math.random() * invaders.length)];
  //console.log(invaderBombStartPosition, invaders[invaderBombStartPosition]);

  let clearBombs;

  function moveBombs() {
    boxes[invaderBombStartPosition].classList.remove("bomb");
    invaderBombStartPosition += width;
    boxes[invaderBombStartPosition].classList.add("bomb");

    if (boxes[invaderBombStartPosition].classList.contains("shooter")) {
      boxes[invaderBombStartPosition].classList.remove("shooter");
      resultsDisplay.innerText = `GAME OVER! Bitten! Score: ${score}`;
      clearInterval(clearBombs);
      gameLost();
      resultsDisplay.setAttribute(
        "style",
        "color: white; font-size: 12px; height: 60px; padding: 20px;"
      );

      gridwrapper.setAttribute("style", "height: 950px;");

      gameOverSound.play();
      if (introMusic.play()) {
        introMusic.pause();
        playPauseBtn.innerHTML = "Paused &#9208;";
      }
      if (vampireExplodeSound.play()) {
        vampireExplodeSound.pause();
      }

      setTimeout(
        () => boxes[invaderBombStartPosition].classList.remove("bomb"),
        900
      );

      clearInterval(clearBombs);
    }
  }
```

## Finished Product 

<img width=80% src="https://user-images.githubusercontent.com/116687424/230680545-120c07d1-9ba5-4fac-855a-90e6c54061e2.gif">

## Wins & Challenges 

### Wins:

* It’s no secret as you can tell by looking at the game that I had a lot of fun styling it! While implementing the JavaScript logic proved to be a challenge at times, I found that taking breaks and focusing on the styling whilst my mind was processing everything helped me look at the JS with a fresh perspective + allowed me to enjoy small wins with the CSS keeping my spirits up.
* Inspiration for the game's visual design was drawn from one of my favourite tv shows, Buffy the Vampire Slayer. 
* Towards the end I knew that I wanted to create the ‘gameLost’ and ‘gameWon’ functions and thought how cool it would be if the grid displayed different GIFs of Buffy depending on whether the player won or lost.

### Game Won + Game Lost GIFs logic: 

* To achieve the dynamic display of gifs upon winning or losing the game, I utilised the concept of hidden classes. 
* I added two spans in the HTML with the class of "gameWon" and "gameLost” and applied a class of "hidden" to each of them. 
* In the CSS, I set the display property of the hidden class to "none". 
* In my JavaScript logic, I selected the elements with the classes "gameWon" and "gameLost” and added the appropriate GIFs and styling to each one.
* When the game was won or lost, I removed the "hidden" class from the corresponding element, revealing the gif and triggering the appropriate styling. 
* This added an interactive and responsive aspect to the game, making the user experience more engaging.



<img width=80% src="https://user-images.githubusercontent.com/116687424/230679624-dca92b71-ea1c-4324-9763-d2fa0d691f99.gif">


<img width=80% src="https://user-images.githubusercontent.com/116687424/230679905-58df0562-c25d-4c79-a507-6c0124d85443.gif">


## Challenges
 
### Invader Movement
I would say I found the invader movement particularly challenging. I figured out that the best approach was to make a condition for when the invaders hit the edge, and if they did, then move them down. This took me a while to understand and work out.

### Laser Shooting
I found the laser shooting to be fairly straightforward but ran into errors when I realised that the laser, even though it was working, kept going forever after exiting the grid. I had to implement code to ensure that the laser was removed as soon as it reached the top of the grid.
``` js
  if (event.code === "Space") {
    laserId = setInterval(() => {
      if (laserPosition - width >= 0) {
        moveLaser();
      } else {
        boxes[laserPosition].classList.remove("laser");
        clearInterval(laserId);
      }
    }, 100);
  }
}

document.addEventListener("keydown", laserShoot);
```
### Bomb Movement
Similarly, I faced challenges with the bomb movement (fangs), as they also kept going, so I had to make a condition to remove them once they reached the last row in the grid.
  
  ``` js
  clearBombs = setInterval(() => {
    if (invaderBombStartPosition < 90) {
      moveBombs();
    } else {
      boxes[invaderBombStartPosition].classList.remove("bomb");
      clearInterval(clearBombs);
      clearInterval(bombsFallInterval);
    }
  }, 100);
}

```

## Key Learnings

This project taught me that despite planning and mapping out a project, there will always be unexpected challenges. It's important to allow time for these issues and not to be too hard on oneself when faced with them. Additionally, I learned that some tasks may have more layers than initially anticipated and it's okay to take breaks and seek help from others when debugging.

## Future Improvements

I think adding different levels of difficulty would have been a nice touch. Also currently I made the game not start unless you insert a coin. It would be nice to add a little pop up if someone hits the start button without inserting a coin saying “Please insert a coin first” but didn’t get round to it, so this would be a great future improvement. 

