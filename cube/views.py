from django.shortcuts import render, HttpResponseRedirect, reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from users.models import User

import json


def get_time(milliseconds: int):
    seconds = int(milliseconds / 10)
    minutes = int(seconds / 60)
    hours = int(minutes / 60)
    minutes %= 60
    seconds %= 60
    milliseconds %= 10
    return f"{hours:02}:{minutes:02}:{seconds:02}:{milliseconds}"


def index(request):
    colors = ['white', 'yellow', 'red', 'orange', 'blue', 'green']
    # Buttons are paired
    pos = [(str(0.2 + i * 2 * 7.1), str(0.2 + (i * 2 + 1) * 7.1)) for i in range(6)]
    context = {
        'colors_pos': zip(colors, pos),
    }
    return render(request, 'cube/index.html', context)


def leaders(request):
    users = User.objects.filter(milliseconds__isnull=False).order_by('milliseconds')
    positions, usernames, times = [], [], []
    position = 0

    for i, user in enumerate(users[:10], start=1):
        positions.append(i)
        usernames.append(user.username)
        times.append(get_time(user.milliseconds))
        if request.user == user:
            position = i

    if not request.user.is_anonymous:
        user = request.user
        if position == 0 or position > 10:
            positions.pop()
            usernames.pop()
            times.pop()
            position = users.filter(milliseconds__lte=user.milliseconds).count()  # получить место текущего пользователя
            positions.append(position)
            usernames.append(user.username)
            times.append(get_time(user.milliseconds))

    context = {
        'leaders': zip(positions, usernames, times),
        'user_position': position,
    }

    return render(request, 'cube/leaders.html', context)


@login_required
@csrf_exempt
def save_time(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        milliseconds = data['milliseconds']
        user = request.user
        if milliseconds is not None and milliseconds < user.milliseconds:
            user.milliseconds = milliseconds
            user.save()
    return HttpResponseRedirect(reverse('index'))
