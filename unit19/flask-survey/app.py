from flask import Flask, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thesecrets'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = [] # stores user's answers

@app.route('/')
def survey_intro():
    '''Select survey'''

    return render_template('survey_start.html', survey=survey)

@app.route('/begin', methods=['POST'])
def start_survey():
    '''Start survey and redirect to first question'''

    return redirect('/questions/0')

@app.route('/questions/<int:q_id>')
def show_question(q_id):
    '''Display question'''

    question = survey.questions[q_id]

    return render_template('question.html', question=question)

# make route to /questions/<list index>
# create form with current question
# if choices, then add radio buttons
# after answering, form fires POST request to /answer
#   - includes answer that user selected


# get length of questions from satisfaction_survey.questions
#   - use it as list index

# satisfaction_survey.questions[0].question
#   - gets the question

# Survey has 3 parameters:
#   - title
#   - instructions
#   - questions