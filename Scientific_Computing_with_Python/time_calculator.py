def add_time(start, duration, day=False):
  week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  start_time = start.split(' ')[0].split(':')
  convention = start.split(' ')[1]
  add = duration.split(':')
  days = 0
  
  newtime_hours = int(start_time[0]) + int(add[0])
  newtime_minutes = int(start_time[1]) + int(add[1])

  if newtime_minutes >= 60:
    newtime_minutes -= 60
    newtime_hours += 1
  
  while newtime_hours >= 24:
    newtime_hours -= 24
    days += 1
  
  if newtime_hours >= 12:
    newtime_hours -= 12
    if convention.lower() == 'am':
      new_convention = 'PM'
    else:
      new_convention = 'AM'
  else:
    new_convention = convention
  
  if days == 0:
    new_days = ''
  elif days == 1:
    new_days = '(next day)'
  else:
    new_days = '(' + days + ' days later)'
  
  if day != False:
    idx = week.index(day.lower())
    new_day = week.join(week)[idx + days % len(week)]
    return str(newtime_hours) + ':' + str(newtime_minutes).zfill(2) + ' ' + new_convention + ', ' + new_day + ' ' + new_days

  return str(newtime_hours) + ':' + str(newtime_minutes).zfill(2) + ' ' + new_convention + ', ' + new_days
