class Category:

  def __init__(self, name):
    self.name = name
    self.funds = 0
    self.ledger = []
  
  def deposit(self, amount, description=''):
    self.ledger.append({'amount': amount, 'description': description})
    self.funds += amount
  
  def withdraw(self, amount, description=''):
    if self.check_funds(amount):
      self.ledger.append({'amount': -amount, 'description': description})
      self.funds -= amount
      return True
    else:
      return False
  
  def get_balance(self):
    return self.funds

  def transfer(self, amount, budget_category):
    if self.check_funds(amount):
      self.withdraw(amount, 'Transfer to {}'.format(budget_category.name))
      budget_category.deposit(amount, 'Transfer from {}'.format(self.name))
      return True
    else:
      return False

  def check_funds(self, amount):
    if self.funds >= amount:
      return True
    else:
      return False
  
  def __str__(self):
    print_string = f"{self.name:{'*'}{'^'}{30}}\n"
    for entry in self.ledger:
      amount_str = '{:.2f}'.format(entry['amount'])
      print_string += f"{entry['description'][:29-len(amount_str)].ljust(29 - len(amount_str)) + ' ' + amount_str}\n"
    print_string += "Total: {:.2f}".format(self.funds)
    return print_string


def create_spend_chart(categories):
  perc_list = []
  names = []
  for category in categories:
    names.append(category.name)
    withdrawals = 0
    for entry in category.ledger:
      if entry['amount'] < 0:
        withdrawals += -entry['amount']
    perc = int(category.get_balance() / withdrawals)
    while perc % 10 != 0:
      perc -= 1
    perc_list.append(perc)
  
  output = 'Percentage spent by category\n'
  for i in range(100, -1, -10):
    output += f"{str(i).rjust(3)}|"
    for val in perc_list:
      if i <= val:
        output += ' o '
      else:
        output += '   '
    output += '\n'
    if i - 10 < 0:
      output += '    '
      for num in range(len(categories)):
        output += '---'
  output += '\n'
  for i in range(len(max(names, key=len))):
    output += '    '
    for j in names:
      if len(j) - 1 >= i:
        output += ' ' + j[i] + ' '
      else:
        output += '   '
    output += '\n'

  print(output)
  return output
