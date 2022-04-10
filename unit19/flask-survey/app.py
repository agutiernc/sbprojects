from flask import Flask, render_template, redirect, request
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

@app.route('/answer', methods=['POST'])
def handle_question():
    '''Saves answer and redirects'''

    # gets user's choice
    choice = request.form['answer']

    # add to responses list
    responses.append(choice)
    print('responses: ', responses)
    
    # check if there are more questions
    if len(responses) == len(survey.questions):
        return redirect('/complete')
    else:
        return redirect(f'/questions/{len(responses)}')


@app.route('/complete')
def complete():
    '''Inform user that survey is done'''
    print('from complete: ', responses)
    return render_template('complete.html')

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