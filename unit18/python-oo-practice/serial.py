"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        '''Make a number generator, starting at start'''
        self.start = start
        self.starter = start

    def __repr__(self):
        return f'<SerialGenerator start={self.start} starter={self.starter}>'
    
    def generate(self):
        '''increments start by 1'''
        self.start +=1

        return self.start

    def reset(self):
        '''Resets number back to original start'''
        self.start = self.starter - 1
