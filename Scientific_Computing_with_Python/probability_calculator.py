import copy
import random

class Hat:
  
  def __init__(self, **kwargs):
    self.contents = []
    for key, value in kwargs.items():
      for i in range(value):
        self.contents.append(key)
  
  def draw(self, num_balls):
    balls = []
    while self.contents and num_balls > 0:
      random.shuffle(self.contents)
      ball = self.contents.pop()
      balls.append(ball)
      num_balls -= 1
    return balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  counter = 0
  exp_list = []
  for key, value in expected_balls.items():
    for i in range(value):
      exp_list.append(key)
  for i in range(num_experiments):
    hat_repl = copy.deepcopy(hat)
    drawn = hat_repl.draw(num_balls_drawn)
    match = True
    for ball in exp_list:
      if ball in drawn:
        drawn.remove(ball)
      else:
        match = False
    if match:
      counter += 1
  return counter / num_experiments
