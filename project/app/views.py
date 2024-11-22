from django.shortcuts import render, redirect
from . models import Product
from . forms import ProductForm

# Create your views here.
def index_view(request):
    form = ProductForm()
    products = Product.objects.all()
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('')
    context = {'ProductForm':form, 'products':products}
    return render(request, 'index.html', context=context)

def update_view(request, pk):
    product = Product.objects.get(id=pk)
    form = ProductForm(instance=product)
    if request.method == "POST":
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('')
    context = {'ProductForm':form}
    return render(request, 'update.html', context=context)

def delete_view(request, pk):
    product = Product.objects.get(id=pk)
    if request.method == "POST":
        product.delete()
        return redirect('')
    context = {'product':product}
    return render(request, 'delete.html', context=context)