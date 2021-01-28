import shutil
import os
Des = "D:\\Google Disk\\NapicuWebGoogleDisk"
Dir = os.getcwd()

try:
    shutil.copytree(Dir, Des)
    while True:
        print('Podařilo se převést soubory do: ' + '\033[33m' + Des + '\033[0m')
        os.system('pause')
        break
except FileExistsError:
    print('\033[31m' + 'Složka již existuje!!!' + '\033[0m')
    

