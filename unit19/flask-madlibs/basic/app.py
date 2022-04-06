from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-handshake'

debug = DebugToolbarExtension(app)

@app.route('/')
def ask_questions():
    '''Prompt user and generate form for each word'''

    prompts = story.prompts

    return render_template('index.html', prompts=prompts)

@app.route('/story')
def show_story():
    '''Display story from user's results'''

    text = story.generate(request.args)

    return render_template('story.html', text=text)