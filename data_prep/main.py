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


def canada(df):
    canada_data = df.loc[(df['country'] == 'Canada')].reset_index(drop=True)

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

    canada_df = pd.DataFrame(columns=['month', 'day', 'year', 'date'])

    for p in provinces.keys():
        p_data = canada_data.loc[canada_data['province_state'].str.contains(p, na=False, regex=True)]
        p_data = p_data.groupby(['date', 'country', 'month', 'day', 'year'], as_index=False).sum()

        min_data = p_data[['month', 'day', 'year', 'date', 'confirmed', 'deaths', 'recovered']]
        min_data.rename(columns={
            'confirmed': f'{provinces[p]}_confirmed',
            'deaths': f'{provinces[p]}_deaths',
            'recovered': f'{provinces[p]}_recovered'
        }, inplace=True)
        # p_data.to_json(f'{DATA_PATH}/canada/{provinces[p]}.json', orient='records')
        canada_df = canada_df.merge(min_data, on=['month', 'day', 'year', 'date'], how='outer')

    canada_df = canada_df.sort_values(by=['month', 'day']).fillna(method='ffill')
    canada_df.to_json(f'{DATA_PATH}/canada.json', orient='records')
    return

def national(df):
    countries = ['Canada', 'Austria', 'US']
    national_data = df.groupby(['date', 'country', 'month', 'day', 'year'], as_index=False).sum()

    national_df = pd.DataFrame(columns=['month', 'day', 'year', 'date'])
    for c in countries:
        p_data = national_data.loc[national_data['country'].str.contains(c, na=False, regex=True)]
        p_data = p_data.groupby(['date', 'country', 'month', 'day', 'year'], as_index=False).sum()

        min_data = p_data[['month', 'day', 'year', 'date', 'confirmed', 'deaths', 'recovered']]
        min_data.rename(columns={
            'confirmed': f'{c}_confirmed',
            'deaths': f'{c}_deaths',
            'recovered': f'{c}_recovered'
        }, inplace=True)
        
        national_df = national_df.merge(min_data, on=['month', 'day', 'year', 'date'], how='outer')
    national_df = national_df.sort_values(by=['month', 'day']).fillna(method='ffill')
    national_df.to_json(f'{DATA_PATH}/national.json', orient='records')
    return

canada(df)
national(df)