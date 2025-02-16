import hashlib


class String:
    
    def hash_string(self, value=str) -> str:
        return hashlib.sha256(value.encode()).hexdigest()