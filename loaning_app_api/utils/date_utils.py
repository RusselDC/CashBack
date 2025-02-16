from datetime import datetime, timedelta


class DatesUtils:
    
    
    def tommorow(self):
        return datetime.now() + timedelta(days=1)
    
    def now(self):
        return datetime.now()