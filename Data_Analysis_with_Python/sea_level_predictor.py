import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    x = df['Year']
    y = df['CSIRO Adjusted Sea Level']
    plt.scatter(x, y)

    # Create first line of best fit
    reg = linregress(x, y)
    x_low = x.min()
    x_high = 2050
    x_ext = np.linspace(x_low, x_high, 100)
    plt.plot(x_ext, reg.intercept + reg.slope*x_ext, 'r', color='blue', label='Data from 1880')

    # Create second line of best fit
    new_x = df['Year'][df['Year'] >= 2000]
    new_y = df['CSIRO Adjusted Sea Level'][df['Year'] >= 2000]
    new_reg = linregress(new_x, new_y)
    x_new_low = 2000
    x_new_ext = np.linspace(x_new_low, x_high, 100)
    plt.plot(x_new_ext, new_reg.intercept + new_reg.slope*x_new_ext, 'r', label='Data from 2000 and on')

    # Add labels and title
    plt.legend()
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    
    # Save plot and return data for testing
    plt.savefig('sea_level_plot.png')
    return plt.gca()
    
