import random
def func(**p):
	print(p)
	return ''.join(sorted(p))
print(func(x=1,y=2,z=3))