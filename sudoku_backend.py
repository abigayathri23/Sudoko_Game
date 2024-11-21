from flask import Flask, jsonify, request
import random

app = Flask(__name__)

# Helper functions
def is_valid_move(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if board[i][j] == num:
                return False
    return True

def solve_sudoku(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                for num in range(1, 10):
                    if is_valid_move(board, row, col, num):
                        board[row][col] = num
                        if solve_sudoku(board):
                            return True
                        board[row][col] = 0
                return False
    return True

def generate_sudoku():
    board = [[0 for _ in range(9)] for _ in range(9)]
    for _ in range(random.randint(12, 18)):  # Randomly fill 12-18 cells
        row, col = random.randint(0, 8), random.randint(0, 8)
        num = random.randint(1, 9)
        if board[row][col] == 0 and is_valid_move(board, row, col, num):
            board[row][col] = num
    return board

# API routes
@app.route("/generate", methods=["GET"])
def generate():
    board = generate_sudoku()
    return jsonify({"board": board})

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    board = data.get("board", [])
    if solve_sudoku(board):
        return jsonify({"solved": True, "board": board})
    return jsonify({"solved": False, "board": board})

if __name__ == "__main__":
    app.run(debug=True)
