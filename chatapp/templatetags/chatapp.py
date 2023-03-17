from django import template


register = template.Library()

@register.inclusion_tag('client.html')
def include_chatapp():
   return {}

