from django.db import models

class Script(models.Model):
    pin = models.PositiveIntegerField(unique=True)
    CPUName = models.CharField(max_length=100)

class Line(models.Model):
    TYPE_CHOICE = [
        ("delay", "Delay"),
        ("typeline", "Type Line")
    ]
    # 属するスクリプト(fk)
    script = models.ForeignKey(Script, related_name="messages", on_delete=models.CASCADE)
    # 行の種類
    type = models.CharField(choices=TYPE_CHOICE, max_length=50)
    # CPUかどうか
    is_CPU = models.BooleanField(default=False)
    # 行
    value = models.TextField(blank=True)
    # 行末尾に付け加える内容([Y/n]など)
    tail = models.TextField(blank=True, default="")