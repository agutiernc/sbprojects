from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def do_add():
    '''Add a and b'''

    a = int(request.args['a'])
    b = int(request.args['b'])
    result = add(a, b)

    return str(result)

@app.route('/sub')
def do_sub():
    '''Subtract a and b'''
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = sub(a, b)

    return str(result)

@app.route('/mult')
def do_mult():
    '''Multiply a and b'''
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = mult(a, b)

    return str(result)

@app.route('/div')
def do_div():
    '''Divide a and b'''
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = div(a, b)

    return str(result)