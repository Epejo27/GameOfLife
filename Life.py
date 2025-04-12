import random
import time

def state_height(state):
    return len(state)

def state_width(state):
    return len(state[0])

def dead_state(w, h):
    result_dead = []
    for y in range(h):
        result_dead_height = []
        for x in range(w):
            result_dead_height.append(0)
        result_dead.append(result_dead_height)
    return result_dead

def random_state(w, h):
    result_rand = dead_state(w, h)
    for y in range(h):
        for x in range(w):
            rand_num = random.random()
            if rand_num >= 0.6:
                rand_num = 1
            else:
                rand_num = 0
            result_rand[y][x] = rand_num
    return result_rand

def render(state):
    h = state_height(state)
    w = state_width(state)
    b = ""
    for _ in range(w+2):
        b = b + "="
    lines = b + "\n"
    for y in range(h):
        line = "|"
        for x in range(w):
            if state[y][x] == 0:
                line = line + ' '
            else:
                line = line + '#'
        line = line + "|\n"
        lines = lines + line
    lines = lines + b
    print(lines)

def next_cell_value(coord, state):
    count = 0
    h = state_height(state)
    w = state_width(state)
    x = coord[0]
    y = coord[1]
    cell = state[y][x]
    for x1 in range(x-1, x+2):
        if x1 < 0 or x1 >= w: continue
        for y1 in range(y-1, y+2):
            if y1 < 0 or y1 >= h: continue
            if y1 == y and x1 == x: continue
            if state[y1][x1] == 1:
                count += 1
    if cell == 1:
        if count <= 1:
            cell = 0
        elif count <= 3:
            cell = 1
        elif count > 3:
            cell = 0
    else:
        if count == 3:
            cell = 1
        if random.random() > 0.995:
            cell = 1
    return cell

def next_board_state(state):
    h = state_height(state)
    w = state_width(state)
    new_state = dead_state(w, h)
    for y in range(h):
        for x in range(w):
            new_state[y][x] = next_cell_value((x, y), state)
    return new_state

def load_board_state(file):
    state = []
    with open(file) as f:
        for i in f:
            line = []
            for j in i:
                if j != "\n":
                    line.append(int(j))
            state.append(line)
    return state

# state = load_board_state("GameOfLife/glider.txt")
state = random_state(30, 35)
render(state)

while True:
    state = next_board_state(state)
    render(state)
    time.sleep(0.01)