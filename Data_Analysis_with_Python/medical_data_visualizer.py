import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Import data
df = pd.read_csv('medical_examination.csv')

# Add 'overweight' column
def overweight_check(row):
    if row.weight / (row.height / 100) ** 2 > 25:
        return 1
    return 0
df['overweight'] = df.apply(lambda row: overweight_check(row), axis=1)

# Normalize data by making 0 always good and 1 always bad. If the value of 'cholestorol' or 'gluc' is 1, make the value 0. If the value is more than 1, make the value 1.
def normalize_chol(row):
    if row.cholesterol == 1:
        return 0
    return 1
def normalize_gluc(row):
    if row.gluc == 1:
        return 0
    return 1
df['cholesterol'] = df.apply(lambda row: normalize_chol(row), axis=1)
df['gluc'] = df.apply(lambda row: normalize_gluc(row), axis=1)

# Draw Categorical Plot
def draw_cat_plot():

    # Create DataFrame for cat plot using `pd.melt` using just the values from 'cholesterol', 'gluc', 'smoke', 'alco', 'active', and 'overweight'.
    df_cat = df.melt(id_vars='cardio', value_vars=['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight'])

    # Group and reformat the data to split it by 'cardio'. Show the counts of each feature.
    df_cat['total'] = df_cat.groupby(['cardio', 'variable', 'value'])['cardio'].transform('size')
    df_cat = df_cat.drop_duplicates().reset_index()
    order_list = sorted(df_cat['variable'].unique().tolist())

    # Draw the catplot with 'sns.catplot()'
    fig = sns.catplot(x="variable", y="total", order=order_list, col="cardio", col_wrap=2, hue="value", kind="bar", data=df_cat)

    fig.savefig('catplot.png')
    return fig
    

# Draw Heat Map
def draw_heat_map():
    # Clean the data
    df_heat = df[(df['ap_lo'] <= df['ap_hi']) & (df['height'] >= df['height'].quantile(0.025)) & (df['height'] <= df['height'].quantile(0.975)) & (df['weight'] >= df['weight'].quantile(0.025)) & (df['weight'] <= df['weight'].quantile(0.975))]

    # Calculate the correlation matrix
    corr = df_heat.corr()

    # Generate a mask for the upper triangle
    mask =  np.triu(np.ones_like(corr, dtype=bool))

    # Set up the matplotlib figure
    fig, ax = plt.subplots(figsize=(11, 9))

    # Draw the heatmap with 'sns.heatmap()'
    sns.heatmap(corr, annot=True, fmt=".1f", mask=mask, vmax=.3, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .5})

    # Do not modify the next two lines
    fig.savefig('heatmap.png')
    return fig
