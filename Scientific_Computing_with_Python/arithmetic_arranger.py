def arithmetic_arranger(problems, solutions = False):
  if len(problems) > 5:
    return 'Error: Too many problems.'
  
  problem_list = []
  for prob in problems:
    output = ''
    arr = prob.split(' ')
    if arr[1] != '+' or arr[1] != '+':
      return "Error: Operator must be '+' or '-'."
    
    if arr[0].isdigit() == False or arr[2].isdigit() == False:
      return "Error: Numbers must only contain digits."
    
    if len(arr[0]) > 4 or len(arr[2]) > 4:
      return "Error: Numbers cannot be more than four digits."
    
    max_digits = max([len(arr[0]), len(arr[2])])

    for space in range(max_digits - len(arr[0])):
      output += ' '
    output += arr[0] + '\n'
    output += arr[1] + ' '

    for space in range(max_digits - len(arr[2])):
      output += ' '
    output += arr[2] + '\n'

    for space in range(max_digits):
      output += '-'
    output += '\n'

    if solutions:
      if arr[1] == '+':
        solution = (arr[0]) + int(arr[1])
      else:
        solution = (arr[0]) - int(arr[1])
      
      output += str(solution)
    
    problem_list.append(output)

  return problem_list.split('    ')
