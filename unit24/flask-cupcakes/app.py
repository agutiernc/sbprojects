"""Flask app for Cupcakes"""

from flask import Flask, jsonify, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

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

    return render_template('index.html')

@app.route('/api/cupcakes')
def list_all_cupcakes():
    '''Get data about all cupcakes.'''

    cupcakes = [c.to_dict() for c in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cc_id>')
def get_cupcake(cc_id):
    '''Get data about a single cupcake'''

    cc = Cupcake.query.get_or_404(cc_id)

    return jsonify(cupcake=cc.to_dict())

@app.route('/api/cupcakes', methods=['POST'])
def add_cupcake():
    '''Create a new cupcake.'''
    
    data = request.json

    # create new cupcake
    new_cupcake = Cupcake(
        flavor=data['flavor'], 
        size=data['size'], 
        rating=data['rating'], 
        image=data['image'] or None
    )

    # Add and commit new cupcake to DB
    db.session.add(new_cupcake)
    db.session.commit()

    # convert to json
    response_json = jsonify(cupcake=new_cupcake.to_dict())

    return (response_json, 201)

@app.route('/api/cupcakes/<int:cc_id>', methods=['PATCH'])
def update_cupcake(cc_id):
    '''Update an existing cupcake's data.'''

    data = request.json

    # get specific cupcake
    cc = Cupcake.query.get_or_404(cc_id)

    # update whichever fields were provided
    cc.flavor = data.get('flavor', cc.flavor)
    cc.size = data.get('size', cc.size)
    cc.rating = data.get('rating', cc.rating)
    cc.image = data.get('image', cc.image)

    # commit updated cupcake to db
    db.session.commit()

    return jsonify(cupcake=cc.to_dict())

@app.route('/api/cupcakes/<int:cc_id>', methods=['DELETE'])
def delete_cupcake(cc_id):
    '''Delete a specific cupcake.'''

    # get specific cupcake
    cc = Cupcake.query.get_or_404(cc_id)

    # delete and commit in db
    db.session.delete(cc)
    db.session.commit()

    return jsonify(message='Deleted')
