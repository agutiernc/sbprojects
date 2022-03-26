# words = ["hello", "hey", "goodbye", "yo", "yes"]
words = ['hello', 'everyone', 'how', 'elephant']

def print_upper_words(words):
  ''' print each word to uppercase on a seperate line '''
  for word in words:
    print(word.upper())

def print_upper_words2(words):
  ''' prints each word, to uppercase, that only starts with the letter 'e' '''
  for word in words:
    if word[0] == 'e' or word[0] == 'E':
      print(word.upper())

def print_upper_words3(words, must_start_with):
  ''' prints each word, to uppercase, that starts with specified letters '''
  for word in words:
    for char in must_start_with:
      if (word.startswith(char)):
        print(word.upper())
        break
