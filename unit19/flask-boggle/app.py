from boggle import Boggle
from flask import Flask, request, render_template, session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thesecret'

boggle_game = Boggle()

@app.route('/')
def main_page():
  '''Show boggle board'''

  board = boggle_game.make_board()
  # session['board'] = board

  return render_template('index.html', board=board)


# make board in index.html
# need to do 5x5 board using tables
