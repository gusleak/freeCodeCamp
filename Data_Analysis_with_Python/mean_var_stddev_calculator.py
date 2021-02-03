import numpy as np

def calculate(initial_list):
  if len(initial_list) < 9:
    raise ValueError('List must contain nine numbers.')
  arr = np.array(initial_list)
  new_arr = arr.reshape(3,3)
  return {
    'mean': [np.mean(new_arr, axis=0).tolist(), np.mean(new_arr, axis=1).tolist(), np.mean(arr)],
    'variance': [np.var(new_arr, axis=0).tolist(), np.var(new_arr, axis=1).tolist(), np.var(arr)],
    'standard deviation': [np.std(new_arr, axis=0).tolist(), np.std(new_arr, axis=1).tolist(), np.std(arr)],
    'max': [np.max(new_arr, axis=0).tolist(), np.max(new_arr, axis=1).tolist(), np.max(arr)],
    'min': [np.min(new_arr, axis=0).tolist(), np.min(new_arr, axis=1).tolist(), np.min(arr)],
    'sum': [np.sum(new_arr, axis=0).tolist(), np.sum(new_arr, axis=1).tolist(), np.sum(arr)]
  }
