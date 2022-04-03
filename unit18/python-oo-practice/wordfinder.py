"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    '''Random word generator that gets a word from a file.
    
    >>> wf = WordFinder("/Users/student/words.txt")
    3 words read

    >>> wf.random()
    'cat'

    >>> wf.random()
    'dog'

    >>> wf.random()
    'porcupine'
    '''

    def __init__(self, path):
        word_file = open(path, 'r')

        self.words = self.parse(word_file)

        print(f'{len(self.words)} words read')
    
    def parse(self, word_file):
        return [w.strip() for w in word_file]

    def random(self):
        return random.choice(self.words)