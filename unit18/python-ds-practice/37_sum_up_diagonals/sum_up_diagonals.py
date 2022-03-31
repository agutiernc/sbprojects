def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    # if arr length == 2, then sum the arrays
    # if more than 2 lists, then sum up first, and last items of lists
    lst = []

    for num in matrix:
        lst.append(num[0])
        lst.append(num[-1])

    return sum(lst)


m1 = [
       [1,   2],
       [30, 40],
    ]

m2 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]