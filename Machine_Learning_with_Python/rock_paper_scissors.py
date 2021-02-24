# Solution based on Telez's script on http://www.rpscontest.com/
import random


def player(prev_play, opponent_history=[], own_history=[], score=[], meta=[], DNA=[]):
    
    mix = {'RR':'1','RP':'2','RS':'3','PR':'4','PP':'5','PS':'6','SR':'7','SP':'8','SS':'9'}
    beat = {'R':'P', 'P':'S', 'S':'R'}

    if not prev_play:
        DNA.append([''] * 3)
        meta.append([random.choice('RPS')] * 18)
        score.append([0] * 18)
        guess = random.choice('RPS')
        own_history.append(guess)
    else:
        for i in range(3):
            score[0][i] = 0.9 * score[0][i] + (prev_play == meta[0][i])
        DNA[0][0] += prev_play
        DNA[0][1] += own_history[-1]
        DNA[0][2] += mix[prev_play + own_history[-1]]
        for i in range(3):
            j = 3
            k = -1
            while j > 1 and k < 0:
                  j -= 1
                  k = DNA[0][i].rfind(DNA[0][i][-j:], 0, -1)
            meta[0][2 * i] = DNA[0][0][j + k]
            meta[0][2 * i + 1] = beat[DNA[0][1][j + k]]
        for i in range(6, 18):
            meta[0][i] = beat[meta[0][i - 6]]
        guess = beat[meta[0][score[0].index(max(score[0]))]]
    own_history.append(guess)
    return guess
