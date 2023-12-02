import re

DAY_NUMBER = 2
PUZZLE_NUMBER = 2

example_input = """
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
"""


def extract_cube_number(draw):
    alphabetic_number = ""
    for index, character in enumerate(draw):
        if character.isdigit():
            alphabetic_number += character
        else:
            if len(draw) < index + 2 or alphabetic_number == "":
                raise Exception(
                    'Invalid draw: "{}"'.format(
                        draw.replace(" ", ".").replace("\n", "⏎")
                    )
                )
            return [int(alphabetic_number), draw[index:]]
    raise Exception(
        'Invalid draw: "{}"'.format(draw.replace(" ", ".").replace("\n", "⏎"))
    )


def max_colors_in_game(game):
    colors = {"blue": 0, "red": 0, "green": 0}
    draws = re.split(",|;", game)
    for draw in draws:
        [number, color] = extract_cube_number(draw)
        if color not in colors.keys():
            raise Exception(
                'Invalid color: "{}"'.format(color.replace(" ", ".").replace("\n", "⏎"))
            )
        if colors[color] < number:
            colors[color] = number
    return colors


def game_is_possible(game):
    """
    can be made faster if we check on every draw directly rather than getting the maximum of the all draws
    """
    splitGame = game.replace(" ", "").split(":")
    formattedGame = splitGame[1].strip()
    gameId = int(splitGame[0].replace("Game", ""))
    colors = max_colors_in_game(formattedGame)
    return colors


def call_function_on_example_input(example_input, function):
    result = []
    for line in example_input.split("\n"):
        if line:
            colors = function(line)
            result.append(colors["red"] * colors["green"] * colors["blue"])

    return result


def call_function_on_real_input(dayNumber, puzzleNumber, function):
    result = []
    with open("./day{}/input{}.txt".format(dayNumber, puzzleNumber), "r") as file:
        lines = file.readlines()
    for line in lines:
        colors = function(line)
        result.append(colors["red"] * colors["green"] * colors["blue"])

    return result


print(sum(call_function_on_example_input(example_input, game_is_possible)))

print(sum(call_function_on_real_input(DAY_NUMBER, PUZZLE_NUMBER, game_is_possible)))  #
