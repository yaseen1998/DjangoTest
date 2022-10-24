from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from contract.api.serializer import ContractSerializer

from contract.models import Contract


class ContractViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ContractSerializer
    
    def get_queryset(self):
        queryset = Contract.objects.filter(user=self.request.user, status=True)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)