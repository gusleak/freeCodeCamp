class Rectangle:

  def __init__(self, width, height):
    self.width = width
    self.height= height
  
  def __str__(self):
    return self.__class__.__name__ + f"(width={self.width}, height={self.height})"
  
  def set_width(self, width):
    self.width = width
  
  def set_height(self, height):
    self.height = height
  
  def get_area(self):
    return self.width * self.height
  
  def get_perimeter(self):
    return 2 * self.width + 2 * self.height
  
  def get_diagonal(self):
    return (self.width ** 2 + self.height ** 2) ** .5
  
  def get_picture(self):
    if self.width > 50 or self.height > 50:
      return 'Too big for picture.'
    else:
      output = ''
      for i in range(self.height):
        for j in range(self.width):
          output += '*'
        output += '\n'
      return output

  def get_amount_inside(self, shape):
    times = 0;
    area = self.get_area() - shape.get_area()
    while area >= 0:
      times += 1
      area -= shape.get_area()
    return times


class Square(Rectangle):

  def __init__(self, side):
    self.side = side
    self.height = side
    self.width = side
  
  def __str__(self):
    return self.__class__.__name__ + f"(side={self.side})"

  def set_side(self, side):
    self.side = side
    self.height = side
    self.width = side
  
  def set_width(self, width):
    self.side = width
    self.height = width
    self.width = width
  
  def set_height(self, height):
    self.side = height
    self.height = height
    self.width = height
