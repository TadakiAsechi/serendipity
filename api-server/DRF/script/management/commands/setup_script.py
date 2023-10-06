from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "scriptをDBに入れるコマンド"

    def handle(self, *args, ** options):
        print("test")