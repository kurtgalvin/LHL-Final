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
            'Country/Region': 'country',
            'Country_Region': 'country',
            'Confirmed': 'confirmed',
            'Deaths': 'deaths',
            'Recovered': 'recovered'
        }, inplace=True)
        
        date = file_name[:file_name.find('.')].split('-')

        temp_df['month'] = int(date[0])
        temp_df['day'] = int(date[1])
        temp_df['year'] = int(date[2])
        temp_df['date'] = '-'.join(date)

        df = df.append(temp_df[['province_state', 'country', 'confirmed', 'deaths', 'recovered', 'month', 'day', 'year', 'date']])

df = df.sort_values(by=['month', 'day'])

# bc = df.loc[(df['country'] == 'Canada') & (df['province_state'] == 'British Columbia')].reset_index(drop=True)
# print(bc)

canada_data = df.loc[(df['country'] == 'Canada')].reset_index(drop=True)
# canada_data.to_json(f'{DATA_PATH}/canada_data.json', orient='records')

provinces = {
    "British Columbia": "BC",
    "Alberta": "AB",
    "Saskatchewan": "SK",
    "Manitoba": "MB",
    ", ON|Ontario": "ON",
    ", QC|Quebec": "QC",
    "New Brunswick": "NB",
    "Nova Scotia": "NS",
    "Prince Edward Island": "PE",
    "Newfoundland and Labrador": "NL",
    "Yukon": "YT",
    "Northwest Territories": "NT"
}

for p in provinces.keys():
    p_data = canada_data.loc[canada_data['province_state'].str.contains(p, na=False, regex=True)]
    p_data = p_data.groupby(['date', 'country', 'month', 'day', 'year'], as_index=False).sum()
    p_data.to_json(f'{DATA_PATH}/canada/{provinces[p]}.json', orient='records')
    print(provinces[p], len(p_data.index))

# print(canada_data.loc[canada_data['province_state'].str.contains('Alberta', na=False, regex=False)].groupby(['date', 'country', 'month', 'day', 'year'], as_index=False).sum())