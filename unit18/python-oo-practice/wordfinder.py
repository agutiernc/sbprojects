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
        '''Read file and return the number of words read'''

        word_file = open(path, 'r')

        self.words = self.parse(word_file)

        print(f'{len(self.words)} words read')
    
    def parse(self, word_file):
        '''Parse the list of words file'''

        return [w.strip() for w in word_file]

    def random(self):
        '''Return a random word'''

        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    '''Remove blank lines and commends from file
    
    >>> swf = SpecialWordFinder('file_name.txt')
    3 words read

    >>> swf.random in ['banana', 'strawberry', 'mango']
    True
    '''

    def parse(self, word_file):
        '''Parse word_file and exclude blank lines and comments'''

        return [w.strip() for w in word_file if w.strip() and not w.startswith('#')]