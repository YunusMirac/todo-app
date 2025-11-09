from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    # Für die Suchleiste (?search=...)
    search_fields = ['title', 'description']

    # Für den Status-Filter (?status=PENDING)
    filterset_fields = ['status']
