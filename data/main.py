from os import listdir

import pandas as pd 
import numpy as np

DATA_PATH = '../frontend/src/data'

df = pd.DataFrame()

for file_name in listdir('./csse_covid_19_daily_reports/'):
    if ".csv" in file_name:
        temp_df = pd.read_csv(f'./csse_covid_19_daily_reports/{file_name}')

        temp_df.rename(columns={
            'Province/State': 'province_state',
            'Province_State': 'province_state',
            'Country/Region': 'country_region',
            'Country_Region': 'country_region',
            'Confirmed': 'confirmed',
            'Deaths': 'deaths',
            'Recovered': 'recovered'
        }, inplace=True)
        
        date = file_name[:file_name.find('.')].split('-')

        temp_df['month'] = int(date[0])
        temp_df['day'] = int(date[1])
        temp_df['year'] = int(date[2])
        temp_df['date'] = '-'.join(date)

        df = df.append(temp_df[['province_state', 'country_region', 'confirmed', 'deaths', 'recovered', 'month', 'day', 'year', 'date']])

df = df.sort_values(by=['month', 'day'])

bc = df.loc[(df['country_region'] == 'Canada') & (df['province_state'] == 'British Columbia')].reset_index(drop=True)

# print(bc)
bc.to_json(f'{DATA_PATH}/bc_data.json', orient='records')