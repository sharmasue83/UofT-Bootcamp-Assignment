from flask import Flask, render_template
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["Mongo_url"]="mongodb://127.0.0.1:27017"
# create a database connection

mongo = PyMongo(app)

@app.route("/")

def index():
    mars_db = mongo.db.mars.find_one()
    return render_template("index.html",mars =mars_db)

@app.route("/scrape")   
    
def scrap_mars():
    mars_db =mongo.db.mars
    scrape_data = marsweather.scrape_func()
    #mars_db.update({},scrape_data)
    return 

    