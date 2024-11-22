from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    qty = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    