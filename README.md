## SUDOKO GAME 
This is a simple Sudoku game. 
The game allows users to solve a partially filled Sudoku puzzle and validate their solution through a backend server.


## Features
- Interactive Sudoku grid with pre-filled, non-editable cells.
- Animated glittering background.
- Solution validation using a Node.js backend server.
- Easy-to-use interface.

## Project Structure
sudoku-game/
│
├── index.html        # Main HTML structure
├── styles.css        # CSS file for layout and animations
├── script.js         # JavaScript for grid functionality
├── backend/          # Backend files
│   ├── server.js     # Backend server code
│   └── package.json  # Backend dependencies
└── README.md         # Project documentation


## How to Play
- Open the Sudoku game in your browser.
- Fill in the empty cells of the Sudoku grid with numbers between 1 and 9.
- Click the "Check Solution" button to validate your solution.
- You will receive feedback:
- Correct Solution: A success message is shown.
- Incorrect Solution: An error message is displayed.
