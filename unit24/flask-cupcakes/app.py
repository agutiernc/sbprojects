"""Flask app for Cupcakes"""
from flask import Flask, jsonify, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
import requests

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'thesecretishere'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def main_page():
    '''Display main page'''

    return render_template(index.html)

@app.route('/api/cupcakes')
def list_all_cupcakes():
    '''Get data about all cupcakes.'''

    cupcakes = [c.to_dict() for c in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)