import os
print ('\033[31m' + 'Startuji' + '\033[0m')
print()
os.system('git add .')
os.system('git commit -m "web"')
os.system('git push')
print()
print ('\033[31m' + 'Vše bylo provedeno bez problému!' + '\033[0m')


