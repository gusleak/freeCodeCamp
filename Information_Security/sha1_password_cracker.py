import hashlib

def crack_sha1_hash(hash, use_salts=False): 
    if use_salts:
        s = open("known-salts.txt", "r")
        salts = [line.strip() for line in s]
    p = open("top-10000-passwords.txt", "r")
    for pwd in p:
        pwd = pwd.replace('\n', '')
        if use_salts:
            for salt in salts:
                encrypt_prep = hashlib.sha1((salt + pwd).encode('utf-8')).hexdigest()
                encrypt_app = hashlib.sha1((pwd + salt).encode('utf-8')).hexdigest()
                if encrypt_prep == hash or encrypt_app == hash:
                    return pwd
        else:
            encrypt = hashlib.sha1(pwd.encode('utf-8')).hexdigest()
            if encrypt == hash:
                return pwd
    return 'PASSWORD NOT IN DATABASE'
    
