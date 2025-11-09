from django.db import models

# Mein Todo-Modell
STATUS_CHOICES = [
    ('PENDING', 'PENDING'),
    ('COMPLETED', 'COMPLETED'),
]

# repräsentiert die Todo-Einträge in der Datenbank
class Todo(models.Model):
    id = models.AutoField(primary_key=True) 
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='PENDING', max_length=12)
        
    # gibt Todo-Objekt zurück
    def __str__(self):
        return f"{self.id}. {self.title} - {self.status}"
    
    

                            



                                        