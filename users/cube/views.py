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
    return f"{hours}:{minutes}:{seconds}:{milliseconds}"


def index(request):
    colors = ['white', 'yellow', 'red', 'orange', 'blue', 'green']
    # Buttons are paired
    pos = [(str(0.2 + i * 2 * 7.1), str(0.2 + (i * 2 + 1) * 7.1)) for i in range(6)]
    context = {
        'colors_pos': zip(colors, pos),
    }
    return render(request, 'cube/index.html', context)


def leaders(request):
    users = User.objects.all().order_by('milliseconds')[:10]
    usernames = [i.username for i in users]
    times = [get_time(user.milliseconds) for user in users]
    context = {
        'leaders': zip(usernames, times),
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
