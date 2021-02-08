import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data
df = pd.read_csv('fcc-forum-pageviews.csv', parse_dates=True, index_col='date')

# Clean data
df = df[(df['value'] >= df['value'].quantile(0.025)) & (df['value'] <= df['value'].quantile(0.975))]

def draw_line_plot():
    # Draw line plot
    plot = df.plot.line(color='green', figsize=(10,6), legend=False)
    plot.set_xlabel("Date")
    plot.set_ylabel("Page Views")
    plot.set_title('freeCodeCamp Daily Page Views')
    fig = plot.get_figure()

    # Save image and return fig
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar['m-year'] = df_bar.index.strftime('%Y-%m')
    df_bar['avg'] = df_bar.groupby('m-year')['value'].transform('mean')
    df_bar = df_bar[['m-year', 'avg']].drop_duplicates()

    # Draw bar plot
    plot = df_bar.plot.bar(x='m-year', y='avg', figsize=(12,10), legend=False)
    plot.set_xlabel("Years")
    plot.set_ylabel("Average Page Views")
    plot.set_title('freeCodeCamp Average Monthly Page Views')
    fig= plot.get_figure()

    # Save image and return fig
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # Draw box plots (using Seaborn)
    fig, axes = plt.subplots(1, 2, figsize=(20,15))
    plot = sns.boxplot(ax=axes[0], x='year', y='value', data=df_box)
    axes[0].set(xlabel="Year", ylabel = "Page Views", title="Year-wise Box Plot")
    plot = sns.boxplot(ax=axes[1], x='month', y='value', data=df_box)
    axes[1].set(xlabel="Month", ylabel = "Page Views", title="Month-wise Box Plot")
    fig = plot.get_figure()

    # Save image and return fig
    fig.savefig('box_plot.png')
    return fig
