import os

print ('\033[31m' + 'Startuji!' + '\033[0m')
print()
os.system('git add .')
print('\033[31m' + 'git add . Byl proveden' + '\033[31m')
os.system('git commit -m "web"')
print('\033[31m' + 'git commit -m Byl proveden' + '\033[31m')
os.system('git push')
print ('\033[31m' + 'Vše bylo provedeno!' + '\033[0m')

