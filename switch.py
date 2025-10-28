A, B, C, D=map(int,input().split())

ans=(min(B,D)-max(A,C))

if B<=C or D<=A:
    print(0)
else:
    print(ans)
