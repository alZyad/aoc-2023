example_input = """
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
"""


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


def get_calibration_value(line):
    first_digit = None
    last_digit = None

    # forward loop
    for i in range(len(line)):
        if line[i].isdigit():
            first_digit = line[i]
            break
    # backward loop
    for i in range(len(line) - 1, -1, -1):
        if line[i].isdigit():
            last_digit = line[i]
            break
    if first_digit is None or last_digit is None:
        return "ERR"
    return int("{}{}".format(first_digit, last_digit))


print(call_function_on_example_input(example_input, get_calibration_value))
print(call_function_on_real_input(1, get_calibration_value))

print(sum(call_function_on_real_input(1, get_calibration_value)))  # 56049
