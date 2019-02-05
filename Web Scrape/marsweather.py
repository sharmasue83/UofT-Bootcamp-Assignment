import pandas as pd
import os
import re
import requests
import webbrowser
import sys
from bs4 import BeautifulSoup as bs
import pymongo
import numpy as np

#from selenium import webdriver
#from splinter import Browser
import time




def scrape_func():
    executable_path = {'executable_path': 'chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    
    data_dict={
    "title": title,
    "mars_news": dict_list
    }
    browser.quit()
    return data_dict
    
def mars_news():
    mars_url="https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    web_data = uReq(mars_url)
    
    page_html = web_data.read()
    web_data.close()    
    
    page = soup(page_html, "html.parser")
    
    try: 
        
        news_p= page.find_all("div",class_="rollover_description_inner")
        title = page.find_all("div", class_="content_title")
        
    except:
        
        return NULL,NULL
    
    return news_p, title
    
    
    
        
        