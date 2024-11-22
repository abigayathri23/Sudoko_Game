document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("sudoku-grid");
  
    // Predefined Sudoku puzzle (0 represents empty cells)
    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
  
    // Generate Sudoku grid
    puzzle.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
  
        if (value !== 0) {
          input.value = value;
          input.readOnly = true; // Prevent editing pre-filled cells
          input.classList.add("pre-filled"); // Add a special style
        }
  
        grid.appendChild(input);
      });
    });
  
    // Send solution to backend for validation
    document.getElementById("check-solution").addEventListener("click", () => {
      const inputs = Array.from(grid.querySelectorAll("input"));
      const values = inputs.map(input => input.value || 0);
  
      fetch("http://localhost:3000/check-sudoku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: chunkArray(values, 9) }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            alert("Congratulations! The solution is correct!");
          } else {
            alert("The solution is incorrect. Try again!");
          }
        });
    });
  });
  
  // Helper function to chunk the array into 9x9
  function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
  