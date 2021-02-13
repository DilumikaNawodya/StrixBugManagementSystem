from Strix.viewsets import UserViewset, DevViewSet, DevTicketsViewSet,FilterByDateViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('User',UserViewset)
router.register('Dev_Users',DevViewSet)
router.register('Dev_Table',DevTicketsViewSet)
router.register('Dev_datefilter',FilterByDateViewSet)

