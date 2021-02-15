import socket
import common_ports as cp

def get_open_ports(target, port_range, verbose=False):
    is_url = False
    for char in target:
        if char.isalpha():
            is_url = True
            break
    if is_url:
        url = target
        try:
            ip = socket.gethostbyname(url)
        except:
            return 'Error: Invalid hostname'
    else:
        ip = target
        try:
            url = socket.gethostbyaddr(ip)
        except:
            return 'Error: Invalid IP address'
    open_ports = []
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # s.settimeout(1)
    for port in range(port_range[0], port_range[1] + 1):
        try:
            res = s.connect((target, port))
            open_ports.append(port)
            res.close()
        except:
            continue
    if not verbose:
        return(open_ports)
    else:
        output = f'Open ports for {url} ({ip})\nPORT\tSERVICE\n'
        for port in open_ports:
            output += f'{str(port).ljust(8)}{cp.ports_and_services[port]}\n'
        return output
        
