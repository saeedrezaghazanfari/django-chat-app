from django.utils.translation import activate
from django.shortcuts import redirect, render


# url: /change/language?lang=&url=
def activate_language(request):
    lang = request.GET.get('lang')
    next_url = request.GET.get('url')
    activate(lang)
    return redirect(f'/{lang}/{next_url}')

# url: /
def select_lang_redirect(request):
    return redirect('/fa')


# url: /404
def page_not_found_view(request, exception=None):
    return render(request, '404.html', status=404)

# url: /403
def page_forbidden_view(request, exception=None):
    return render(request, '403.html', status=403)

# url: /500
def page_server_error_view(request, exception=None):
    return render(request, '500.html', status=500)