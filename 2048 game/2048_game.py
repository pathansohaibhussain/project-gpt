import tkinter as tk
import random

# Constants
SIZE = 4
BG_COLOR = "#BBADA0"
TILE_COLORS = {
    0: "#CDC1B4",
    2: "#EEE4DA",
    4: "#EDE0C8",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EDC850",
    1024: "#EDC53F",
    2048: "#EDC22E"
}

# Initialize the game board
def init_board():
    return [[0] * SIZE for _ in range(SIZE)]

# Add a random tile (either 2 or 4) to the board
def add_random_tile(board):
    empty_cells = [(row, col) for row in range(SIZE) for col in range(SIZE) if board[row][col] == 0]
    if empty_cells:
        row, col = random.choice(empty_cells)
        board[row][col] = 2 if random.random() < 0.9 else 4

# Update the GUI based on the current state of the board
def update_gui():
    for row in range(SIZE):
        for col in range(SIZE):
            value = board[row][col]
            tile = tiles[row][col]
            tile.config(text=str(value) if value > 0 else "", bg=TILE_COLORS.get(value, BG_COLOR))

# Handle keypress events
def key_press(event):
    if event.keysym in ("Up", "Down", "Left", "Right"):
        moved = False
        if event.keysym == "Up":
            moved = move_tiles((0, -1))
        elif event.keysym == "Down":
            moved = move_tiles((0, 1))
        elif event.keysym == "Left":
            moved = move_tiles((-1, 0))
        elif event.keysym == "Right":
            moved = move_tiles((1, 0))
        
        if moved:
            add_random_tile(board)
            update_gui()

# Move tiles in a given direction
def move_tiles(direction):
    moved = False
    dx, dy = direction
    for row in range(SIZE):
        for col in range(SIZE):
            if board[row][col] != 0:
                r, c = row, col
                while 0 <= r + dy < SIZE and 0 <= c + dx < SIZE:
                    if board[r + dy][c + dx] == 0:
                        board[r + dy][c + dx] = board[r][c]
                        board[r][c] = 0
                        r, c = r + dy, c + dx
                        moved = True
                    elif board[r + dy][c + dx] == board[r][c]:
                        board[r + dy][c + dx] *= 2
                        board[r][c] = 0
                        moved = True
                    else:
                        break
    return moved

# Create the main window
root = tk.Tk()
root.title("2048 Game")
root.geometry("400x400")

# Create the game board
board = init_board()

# Create and place tiles on the board
tiles = [[None for _ in range(SIZE)] for _ in range(SIZE)]
for row in range(SIZE):
    for col in range(SIZE):
        tile = tk.Label(root, text="", width=5, height=2, font=("Helvetica", 24, "bold"))
        tile.grid(row=row, column=col, padx=5, pady=5)
        tiles[row][col] = tile

# Add initial tiles
add_random_tile(board)
add_random_tile(board)

# Update the GUI
update_gui()

# Bind keypress events
root.bind("<Key>", key_press)

# Start the main loop
root.mainloop()
