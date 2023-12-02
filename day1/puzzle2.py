example_input = """
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
"""
# example_input = "two1nine"
validDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]


def call_function_on_example_input(example_input, function):
    result = []
    for line in example_input.split("\n"):
        if line:
            result.append(function(line))

    return result


def call_function_on_real_input(dayNumber, function):
    result = []
    with open("./day1/input{}.txt".format(dayNumber), "r") as file:
        lines = file.readlines()
    for line in lines:
        result.append(function(line))

    return result


def snippet_starts_with_digit(snippet, digit):
    if len(snippet) < len(digit):
        return False
    for index, letter in enumerate(digit):
        if snippet[index] != letter:
            return False
    return True


def snippet_ends_with_digit(snippet, digit):
    if len(snippet) < len(digit):
        return False
    for index in range(len(digit)):
        letter = digit[len(digit) - index - 1]
        if snippet[len(snippet) - index - 1] != letter:
            return False
    return True


def get_calibration_value(line):
    first_digit = None
    last_digit = None

    # forward loop
    for i in range(len(line)):
        if line[i].isdigit():
            first_digit = line[i]
            break
        else:
            [is_typed_digit, typed_digit] = check_is_typed_digit(
                line[i : min(i + 5, len(line))]
            )
            if is_typed_digit:
                first_digit = typed_digit
                break
    # backward loop
    for i in range(len(line) - 1, -1, -1):
        if line[i].isdigit():
            last_digit = line[i]
            break
        else:
            [is_typed_digit, typed_digit] = check_is_typed_digit(
                line[max(i - 5, 0) : i + 1], True
            )
            if is_typed_digit:
                last_digit = typed_digit
                break
    if first_digit is None or last_digit is None:
        return None
    return int("{}{}".format(first_digit, last_digit))


def check_is_typed_digit(snippet, reverse=False):
    for index, digit in enumerate(validDigits):
        if reverse:
            if snippet_ends_with_digit(snippet, digit):
                return [True, index + 1]
        else:
            if snippet_starts_with_digit(snippet, digit):
                return [True, index + 1]
    return [False, None]


print(call_function_on_example_input(example_input, get_calibration_value))
print(call_function_on_real_input(2, get_calibration_value))

print(sum(call_function_on_real_input(1, get_calibration_value)))  # 54530
