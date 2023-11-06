# Tic-Tac-Doh

Welcome to Tic-Tac-Doh, a fun twist on the classic game of Tic-Tac-Toe. This single-player game against the computer introduces a new 'Bump' feature, adding an extra layer of strategy to the timeless game we all know and love.

## Features

- **Classic Tic-Tac-Toe Play**: Enjoy the simple and familiar game.
- **Bump Mechanism**: Use the 'Bump' button to shift your opponent's last move to a different space, adding unpredictability and fun.
- **Simple Scoring**: Wins, losses, and draws are tallied over time, allowing you to track your performance.
- **Responsive UI**: Play on any device with a web interface that adapts to your screen.
- **Single Player Fun**: Challenge the AI with a smart yet beatable opponent.

## How to Play

1. Start the game by choosing a square to place your 'X'.
2. The AI opponent will place an 'O'.
3. Use your two 'Bump' opportunities to shift the AI's last move to another space.
4. The first to get three of their marks in a row vertically, horizontally, or diagonally wins!
5. The game will tally your overall score as you play multiple rounds.

# Architectural Decisions for Tic-Tac-Doh

## Decision Log

### 1. Core Technologies
- HTML, CSS, and JavaScript were chosen for the foundation of the application to ensure wide browser compatibility and ease of development.

### 2. Graphics and Animations
- CSS will be used for styling and simple animations, such as the 'Doh!' effect.
- SVGs will be considered for scalable game graphics.

### 3. Sound Effects
- HTML5 audio APIs will be used to incorporate sound effects for a more engaging user experience.

### 4. Data Storage
- The Web Storage API (`localStorage`) will be utilized to store user scores locally, avoiding the need for a backend.

### 5. Hosting and Deployment
- Netlify will host the web application, with plans to set up CI/CD directly from GitHub in the future.

### 6. Progressive Web App (PWA)
- Decision made not to pursue PWA features at this stage to keep the focus on core gameplay and simplicity.

### 7. Testing
- Initial stages will rely on manual testing due to rapid iteration.
- Automated testing may be introduced as the application stabilizes and core functionality solidifies.

## Rationale

Each decision was made to balance development speed, ease of use, and the potential for future expansion. Early stages of development will focus on core features and user experience, with scalability and robustness to be addressed as the application matures.

## License

Tic-Tac-Doh is open-source software licensed under the MIT License.

## Acknowledgments

- The development of Tic-Tac-Doh was assisted by OpenAI's ChatGPT, which provided guidance and suggestions throughout the creative process.
- GitHub Copilot was instrumental in generating code snippets and providing coding solutions for the project.
- A heartfelt thank you to all the players and contributors who have offered feedback and suggestions to improve Tic-Tac-Doh.


Enjoy the game!
