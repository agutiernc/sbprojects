from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thesecret'

boggle_game = Boggle()


@app.route('/')
def main_page():
    '''Show boggle board'''

    board = boggle_game.make_board()
    session['board'] = board

    high_score = session.get('high_score', 0)
    plays = session.get('plays', 0)

    return render_template('index.html', board=board, highscore=high_score, plays=plays)

@app.route('/verify')
def check_word():
    '''Verify if word is in current board'''
    word = request.args.get('word')
    board = session['board']

    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

@app.route('/score', methods=['POST'])
def post_score():
    '''Get score. Also, update high score and number of plays'''
    
    score = request.json['score']
    high_score = session.get('high_score', 0)
    plays = session.get('plays', 0)

    session['plays'] = plays + 1
    session['high_score'] = max(score, high_score)

    return jsonify(record=score > high_score)
