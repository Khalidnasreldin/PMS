from django import forms 
from django.forms import ModelForm 
from . models import Product 

class ProductForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'class':'title', 'placeholder':'product name'}))
    brand = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'brand'}))
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder':'add description'}))
    price = forms.IntegerField(widget=forms.NumberInput(attrs={'placeholder':'0.00'}))
    qty = forms.DecimalField(widget=forms.NumberInput(attrs={'placeholder':'1'}))
    
    class Meta:
        model = Product
        fields = "__all__"