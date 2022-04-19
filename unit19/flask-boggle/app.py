from boggle import Boggle
from flask import Flask, request, render_template, session, redirect, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thesecret'

boggle_game = Boggle()


@app.route('/')
def main_page():
    '''Show boggle board'''

    board = boggle_game.make_board()
    session['board'] = board

    return render_template('index.html', board=board)

@app.route('/verify')
def check_word():
    '''Verify if word is in current board'''
    word = request.args.get('word')
    board = session['board']

    response = boggle_game.check_valid_word(board, word)

    print('response: ', response)
    print('response JSON: ', jsonify(response))

    # return render_template('test.html', word=word, board=board, response=response)
    return jsonify({'result': response})

