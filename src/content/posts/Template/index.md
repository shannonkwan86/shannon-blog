---
title: "[自用] 算法竞赛模板"
published: 2026-06-05
description: "建好站不知道写什么，把算法竞赛板子丢上来吧"
image: "./cover.webp"
tags: ["XCPC", "算法模板"]
category: Notes
draft: false
---

# 数据结构

## 离散化

```cpp
vector<int> xs = a;
sort(xs.begin(), xs.end());
xs.erase(unique(xs.begin(), xs.end()), xs.end());

auto get_id = [&](int x) {
    return int(lower_bound(xs.begin(), xs.end(), x) - xs.begin()) + 1;
};

```

## 线段树

1. 区间加+区间和，支持区间修改和区间查询操作

```c++
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 2e5 + 5;
int a[N];
int sum[N * 4];
int add[N * 4];

void up(int i)
{
    sum[i] = sum[i * 2] + sum[i * 2 + 1];
}

void lazy(int i, int v, int l, int r)
{
    int n = r - l + 1;
    sum[i] += n * v;
    add[i] += v;
}

void down(int i, int l, int r)
{
    if (add[i] != 0)
    {
        int mid = (l + r) / 2;
        lazy(i * 2, add[i], l, mid);
        lazy(i * 2 + 1, add[i], mid + 1, r);
        add[i] = 0;
    }
}

void build(int i, int l, int r)
// 叶子直接赋值，不是叶子就建左右再 up
{
    if (l == r)
    {
        sum[i] = a[l];
    }
    else
    {
        int mid = (l + r) / 2;
        build(i * 2, l, mid);
        build(i * 2 + 1, mid + 1, r);
        up(i);
    }
    add[i] = 0;
}

void mfy(int i, int l, int r, int jbl, int jbr, int jbv)
// 全包就懒，否则先下传；能去左就去左，能去右就去右，最后 up。
{
    if (jbl <= l && jbr >= r)
    {
        lazy(i, jbv, l, r);
    }
    else
    {
        down(i, l, r);
        int mid = (l + r) / 2;
        if (jbl <= mid)
            mfy(i * 2, l, mid, jbl, jbr, jbv);
        if (jbr > mid)
            mfy(i * 2 + 1, mid + 1, r, jbl, jbr, jbv);
        up(i);
    }
}

int que(int i, int l, int r, int jbl, int jbr)
// 全含直接返，否则先下传；左边有交集查左，右边有交集查右，最后相加。
{
    if (jbl <= l && jbr >= r)
    {
        return sum[i];
    }
    else
    {
        down(i, l, r);
        int ans = 0;
        int mid = (l + r) / 2;
        if (jbl <= mid)
            ans += que(i * 2, l, mid, jbl, jbr);
        if (jbr > mid)
            ans += que(i * 2 + 1, mid + 1, r, jbl, jbr);
        return ans;
    }
}

signed main()
{
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }
    build(1, 1, n);
    for (int i = 1; i <= m; i++)
    {
        int op;
        cin >> op;
        if (op == 1)
        {
            int x, y, k;
            cin >> x >> y >> k;
            mfy(1, 1, n, x, y, k);
        }
        if (op == 2)
        {
            int x, y;
            cin >> x >> y;
            cout << que(1, 1, n, x, y) << endl;
        }
    }
    return 0;
}

```

2. 区间赋值+区间加修改，区间最大值查询。两个懒标记

```c++
#define int long long
#define endl "\n"
const int N = 1e6+5;
const int INF = 4e18;
int a[N];
int mx[N * 4];
int add[N * 4];
int hasSet[N * 4];
int setv[N * 4];

void up(int i)
{
    mx[i] = max(mx[i * 2], mx[i * 2 + 1]);
}

//set比add优先级更高，先add后set会把add覆盖掉；
//先set后add可以改set懒标记；
//down时先赋值再add

void lazyAdd(int i, int v, int l, int r)
{
    if (hasSet[i] == 1)
    {
        setv[i] += v;
        mx[i] += v;
    }
    else
    {
        add[i] += v;
        mx[i] += v;
    }
}

void lazySet(int i, int v, int l, int r)
{
    hasSet[i] = 1;
    setv[i] = v;
    mx[i] = v;
    add[i] = 0;
}

void down(int i, int l, int r)
{
    int mid = (l + r) / 2;
    if (hasSet[i] == 1)
    {
        lazySet(i * 2, setv[i], l, mid);
        lazySet(i * 2 + 1, setv[i], mid + 1, r);
        hasSet[i] = 0;
    }
    if (add[i] != 0)
    {

        lazyAdd(i * 2, add[i], l, mid);
        lazyAdd(i * 2 + 1, add[i], mid + 1, r);
        add[i] = 0;
    }
}

void build(int i, int l, int r)
// 叶子直接赋值，不是叶子就建左右再 up
{
    if (l == r)
    {
        mx[i] = a[l];
    }
    else
    {
        int mid = (l + r) / 2;
        build(i * 2, l, mid);
        build(i * 2 + 1, mid + 1, r);
        up(i);
    }
    add[i] = 0;
}

void mfyAdd(int i, int l, int r, int jbl, int jbr, int jbv)
// 全包就懒，否则先下传；能去左就去左，能去右就去右，最后 up。
{
    if (jbl <= l && jbr >= r)
    {
        lazyAdd(i, jbv, l, r);
    }
    else
    {
        down(i, l, r);
        int mid = (l + r) / 2;
        if (jbl <= mid)
            mfyAdd(i * 2, l, mid, jbl, jbr, jbv);
        if (jbr > mid)
            mfyAdd(i * 2 + 1, mid + 1, r, jbl, jbr, jbv);
        up(i);
    }
}
void mfySet(int i, int l, int r, int jbl, int jbr, int jbv)
// 全包就懒，否则先下传；能去左就去左，能去右就去右，最后 up。
{
    if (jbl <= l && jbr >= r)
    {
        lazySet(i, jbv, l, r);
    }
    else
    {
        down(i, l, r);
        int mid = (l + r) / 2;
        if (jbl <= mid)
            mfySet(i * 2, l, mid, jbl, jbr, jbv);
        if (jbr > mid)
            mfySet(i * 2 + 1, mid + 1, r, jbl, jbr, jbv);
        up(i);
    }
}

int que(int i, int l, int r, int jbl, int jbr)
// 全含直接返，否则先下传；左边有交集查左，右边有交集查右，最后取最大值。
{
    if (jbl <= l && jbr >= r)
    {
        return mx[i];
    }
    else
    {
        down(i, l, r);
        int ans = -INF;
        int mid = (l + r) / 2;
        if (jbl <= mid)
            ans = max(ans, que(i * 2, l, mid, jbl, jbr));
        if (jbr > mid)
            ans = max(ans, que(i * 2 + 1, mid + 1, r, jbl, jbr));
        return ans;
    }
}
```

3. 动态开点 区间加+区间求和

```c++
const int N = 6e6 + 5;

int sum[N];
int add[N];
int ls[N];
int rs[N];
int tot = 1;

int node()
{
    tot++;
    sum[tot] = 0;
    add[tot] = 0;
    ls[tot] = 0;
    rs[tot] = 0;
    return tot;
}

void up(int i)
{
    sum[i] = sum[ls[i]] + sum[rs[i]];
}

void lazy(int i, int v, int l, int r)
{
    int n = r - l + 1;
    sum[i] += n * v;
    add[i] += v;
}

void down(int i, int l, int r)
{
    if (add[i] != 0)
    {
        int mid = (l + r) / 2;
        if (ls[i] == 0)
        {
            ls[i] = node();
        }
        if (rs[i] == 0)
        {
            rs[i] = node();
        }
        lazy(ls[i], add[i], l, mid);
        lazy(rs[i], add[i], mid + 1, r);
        add[i] = 0;
    }
}

void mfy(int i, int l, int r, int jbl, int jbr, int jbv)
// 全包就懒，否则先下传；能去左就去左，能去右就去右，最后 up。
{
    if (jbl <= l && jbr >= r)
    {
        lazy(i, jbv, l, r);
    }
    else
    {
        down(i, l, r);
        int mid = (l + r) / 2;
        if (jbl <= mid)
        {
            if (ls[i] == 0)
            {
                ls[i] = node();
            }
            mfy(ls[i], l, mid, jbl, jbr, jbv);
        }

        if (jbr > mid)
        {
            if (rs[i] == 0)
            {
                rs[i] = node();
            }
            mfy(rs[i], mid + 1, r, jbl, jbr, jbv);
        }
        up(i);
    }
}

int que(int i, int l, int r, int jbl, int jbr)
// 全含直接返，否则先下传；左边有交集查左，右边有交集查右，最后相加。
{
    if (i == 0)
    {
        return 0;
    }
    if (jbl <= l && jbr >= r)
    {
        return sum[i];
    }
    else
    {
        down(i, l, r);
        int ans = 0;
        int mid = (l + r) / 2;
        if (jbl <= mid)
        {
            ans += que(ls[i], l, mid, jbl, jbr);
        }
        if (jbr > mid)
        {
            ans += que(rs[i], mid + 1, r, jbl, jbr);
        }
        return ans;
    }
}
```

## ST表

```cpp
    vector<vector<int>> stmx(30, vector<int>(N, -INT_MAX));
    vector<vector<int>> stmn(30, vector<int>(N, INT_MAX));
    for (int j = 1; j <= n; j++)
    {
        stmx[0][j] = h[j];
        stmn[0][j] = h[j];
    }
    for (int i = 1; i < 30; i++)
    {
        for (int j = 1; j + (1 << i) - 1 <= n; j++)
        {
            stmx[i][j] = max(stmx[i - 1][j], stmx[i - 1][j + (1 << (i - 1))]);
            stmn[i][j] = min(stmn[i - 1][j], stmn[i - 1][j + (1 << (i - 1))]);
        }
    }
    for (int i = 1; i <= q; i++)
    {
        int a, b;
        cin >> a >> b;
        int d = b - a + 1;
        int lgd = __lg(d);
        int mx = max(stmx[lgd][a], stmx[lgd][b - (1 << lgd) + 1]);
        int mn = min(stmn[lgd][a], stmn[lgd][b - (1 << lgd) + 1]);
        cout << mx - mn << endl;
    }

```

## 并查集

```cpp
const int N = 2e5 + 5;
int a[N];
int fa[N];

int find(int x)
{
    if (fa[x] != x)
        fa[x] = find(fa[x]);
    return fa[x];
}

bool isSame(int x, int y)
{
    return find(x) == find(y);
}

void Union(int x, int y)
{
    fa[find(x)] = find(y);
}
```

## 树状数组

```cpp
struct BIT
{
    int n;
    vector<int> tree;
    BIT(int n1)
    {
        n = n1;
        tree.assign(n + 1, 0);
    }
    int lowbit(int x)
    {
        return x & -x;
    }
    void add(int idx, int num)
    {
        while (idx <= n)
        {
            tree[idx] += num;
            idx += lowbit(idx);
        }
    }
    int sum(int idx)
    {
        int res = 0;
        while (idx > 0)
        {
            res += tree[idx];
            idx -= lowbit(idx);
        }
        return res;
    }
    int query(int l, int r)
    {
        return sum(r) - sum(l - 1);
    }
};
```

## 单调栈

```cpp
vector<int> st;
    for (int i = n; i >= 1; i--)
    {
        while (!st.empty() && a[st.back()] > a[i])
        {
            st.pop_back();
        }
        if (st.empty())
        {
            pos2[i] = n + 1;
        }
        else
        {
            pos2[i] = st.back();
        }
        st.push_back(i);
    }
```

# 图论

## 树

### 树上倍增LCA

```cpp
void dfs(int u, int fa, vector<int> &dep, vector<vector<int>> &g, vector<vector<int>> &f, vector<int> &lg)
// 预处理深度和祖先表
{
    if (fa == -1)
    {
        f[0][u] = u;
    }

    else
    {
        dep[u] = dep[fa] + 1;
        f[0][u] = fa;
    }

    for (int i = 1; i <= lg[dep[u]]; i++)
    {
        f[i][u] = f[i - 1][f[i - 1][u]];
    }

    for (int x : g[u])
    {
        if (x != fa)
        {
            dfs(x, u, dep, g, f, lg);
        }
    }
}

int lca(int a, int b, vector<int> &dep, vector<vector<int>> &f, vector<int> &lg)
{
    if (dep[a] > dep[b])
    {
        swap(a, b);
    }
    while (dep[a] != dep[b])
        b = f[lg[dep[b] - dep[a]]][b];
    if (a == b)
        return a;
    for (int k = lg[dep[a]]; k >= 0; k--)
        if (f[k][a] != f[k][b])
            a = f[k][a], b = f[k][b];
    return f[0][a];
}

void solve()
{
    int N, M, S;
    cin >> N >> M >> S;
    vector<vector<int>> g(N + 1, vector<int>());
    vector<int> dep(N + 1, 0);
    vector<vector<int>> f(30, vector<int>(N + 1));
    for (int i = 1; i < N; i++)
    {
        int x, y;
        cin >> x >> y;
        g[x].push_back(y);
        g[y].push_back(x);
    }
    vector<int> lg(N + 1);

    for (int i = 2; i <= N; i++)
    {
        lg[i] = lg[i / 2] + 1;
    }

    dep[S] = 1;
    dfs(S, -1, dep, g, f, lg);

    for (int i = 1; i <= M; i++)
    {
        int a, b;
        cin >> a >> b;
        cout << lca(a, b, dep, f, lg) << "\n";
    }
}
```

## 最短路

### dijkstra

```cpp
void solve()
{
    int n, m, s;
    cin >> n >> m >> s;
    vector<vector<pair<int, int>>> g(n + 1);
    for (int i = 1; i <= m; i++)
    {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }

    vector<ll> dist(n + 1, INF);
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<pair<ll, int>>> pq;

    auto dijkstra = [&]()
    {
        dist[s] = 0;
        pq.push({0, s});
        while (!pq.empty())
        {
            auto [d, u] = pq.top();
            pq.pop();

            if (d != dist[u])
                continue;

            for (auto [v, w] : g[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
    };

    dijkstra();

    for (int i = 1; i <= n; i++)
    {
        if (dist[i] == INF)
        {
            cout << (1 << 31) - 1 << " ";
        }
        else
        {
            cout << dist[i] << " ";
        }
    }
}

```

### floyd

```cpp
void solve()
{
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> g(n + 1);
    for (int i = 1; i <= m; i++)
    {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
        g[v].push_back({u, w});
    }

    vector<vector<int>> dist(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++)
    {
        dist[i][i] = 0;
        for (auto [v, w] : g[i])
        {
            dist[i][v] = min(dist[i][v], w);
            dist[v][i] = min(dist[v][i], w);
        }
    }

    for (int k = 1; k <= n; k++)
    {
        for (int j = 1; j <= n; j++)
        {
            for (int i = 1; i <= n; i++)
            {
                if (dist[i][k] != INF && dist[k][j] != INF)
                {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}
```

## 最小生成树

### Kruskal

```cpp
#define int long long

struct edge
{
    int x, y, z;
};

const int N = 5005;
int fa[N];

int find(int x)
{
    if (x != fa[x])
    {
        fa[x] = find(fa[x]);
    }
    return fa[x];
}

bool isSame(int a, int b)
{
    return find(a) == find(b);
}

void Unite(int a, int b)
{
    fa[find(a)] = find(b);
}
void solve()
{
    int n, m;
    cin >> n >> m;
    vector<edge> edges(m + 1);
    for (int i = 1; i <= m; i++)
    {
        cin >> edges[i].x >> edges[i].y >> edges[i].z;
    }
    auto cmp = [&](edge a, edge b) -> bool
    {
        return a.z < b.z;
    };
    sort(edges.begin() + 1, edges.end(), cmp);
    int cnt = 0;
    int ans = 0;
    for (int i = 1; i <= n; i++)
    {
        fa[i] = i;
    }
    for (int i = 1; i <= m; i++)
    {
        if (!isSame(edges[i].x, edges[i].y))
        {
            Unite(edges[i].x, edges[i].y);
            cnt++;
            ans += edges[i].z;
        }
    }
    if (cnt == n - 1)
    {
        cout << ans << endl;
    }
    else
    {
        cout << "orz" << endl;
    }
}

```

## 拓扑排序

```cpp
//DAG DP 所有路径计数
#define int long long
const int MOD = 80112002;
void solve()
{
    int n, m;
    cin >> n >> m;

    vector<vector<int>> g(n + 1);
    vector<int> indeg(n + 1);
    vector<int> outdeg(n + 1);
    queue<int> q;
    vector<int> dp(n + 1);

    for (int i = 1; i <= m; i++)
    {
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        indeg[b]++;
        outdeg[a]++;
    }

    for (int i = 1; i <= n; i++)
    {
        if (indeg[i] == 0)
        {
            q.push(i);
            dp[i] = 1;
        }
    }

    while (!q.empty())
    {
        int f = q.front();
        q.pop();
        for (int nxt : g[f])
        {
            dp[nxt] = (dp[nxt] + dp[f]) % MOD;
            indeg[nxt]--;
            if (indeg[nxt] == 0)
                q.push(nxt);
        }
    }

    int ans = 0;
    for (int i = 1; i <= n; i++)
    {
        if (outdeg[i] == 0)
        {
            ans = (ans + dp[i]) % MOD;
        }
    }
    cout << ans << endl;
}

```

# 数学

## 组合数

```cpp
#define int long long
const int MOD = 1e9 + 7;
const int MAXN = 3e7 + 5;

int fac[MAXN];
int ifac[MAXN];

int qpow(int a, int b)
{
    int ans = 1LL;
    while (b)
    {
        if (b & 1)
            ans = ans * a % MOD;
        a = a * a % MOD;
        b /= 2;
    }
    return ans∂
}

void init_comb()
{
    fac[0] = 1LL;
    for (int i = 1; i < MAXN; i++)
    {
        fac[i] = fac[i - 1] * i % MOD;
    }
    ifac[MAXN - 1] = qpow(fac[MAXN - 1], MOD - 2);
    for (int i = MAXN - 2; i >= 0; i--)
    {
        ifac[i] = ifac[i + 1] * (i + 1) % MOD;
    }
}
```

## 埃氏筛

```cpp
#define int long long
const int MAXN = 1e6 + 5;
bool is_prime[MAXN];
vector<int> primes;
void sieve()
{
    for (int i = 0; i < MAXN; i++)
    {
        is_prime[i] = true;
    }
    is_prime[0] = false;
    is_prime[1] = false;

    for (int i = 2; i < MAXN; i++)
    {
        if (is_prime[i] == 1)
        {
            primes.push_back(i);
            for (int j = i * i; j < MAXN; j += i)
            {
                is_prime[j] = 0;
            }
        }
    }
}
```

# 字符串

## 字符串哈希

```cpp
#define int  long long
const int MOD1 = 1000000007;
const int MOD2 = 1000000009;
const int base = 131;
const int base2 = 13331;

const int N = 1000010;
int h1[N], h2[N], p1[N], p2[N];

void init_hash(int n,const string &s)
{
    p1[0] = 1;
    p2[0] = 1;
    h1[0] = 0;
    h2[0] = 0;

    for (int i = 1; i <= n; i++)
    {
        p1[i] = 1LL * p1[i - 1] * base % MOD1;
        p2[i] = 1LL * p2[i - 1] * base2 % MOD2;
        h1[i] = (1LL * h1[i - 1] * base + s[i]) % MOD1;
        h2[i] = (1LL * h2[i - 1] * base2 + s[i]) % MOD2;
    }
}

pair<int, int> get_hash(int l, int r)
{
    int x1 = (h1[r] - 1LL * h1[l - 1] * p1[r - l + 1] % MOD1 + MOD1) % MOD1;
    int x2 = (h2[r] - 1LL * h2[l - 1] * p2[r - l + 1] % MOD2 + MOD2) % MOD2;
    return {x1, x2};
}
```

## Z函数

```cpp
vector<int> z_function(const string& s) {
    int n = s.size();
    vector<int> z(n);
    z[0] = n;

    int l = 0, r = 0;
    for (int i = 1; i < n; ++i) {
        if (i <= r) {
            z[i] = min(r - i + 1, z[i - l]);
        }
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}

```

# 对拍相关脚本

**数据生成 (data.cpp)**

C++

```cpp
#include <bits/stdc++.h>
int main()
{
    srand(time(0));
    freopen("in.in", "w", stdout);
    int a = rand(), b = rand();
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout << a << ' ' << b << '\n';
}
```

**暴力/待测程序 (baoli.cpp)**

C++

```cpp
#include <bits/stdc++.h>
int main()
{
    freopen("in.in", "r", stdin);
    freopen("baoli.txt", "w", stdout);
    int a, b, ans = 0;
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    std::cin >> a >> b;
    for (int i = 1; i <= a; ++i) ans++;
    for (int i = 1; i <= b; ++i) ans++;
    std::cout << ans << '\n';
}
```

**正确程序 (true.cpp)**

C++

```cpp
#include <bits/stdc++.h>
int main()
{
    freopen("in.in", "r", stdin);
    freopen("true.txt", "w", stdout);
    int a, b;
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    std::cin >> a >> b;
    std::cout << (a + b) << '\n';
}
```

**对拍控制 (check.cpp)**

C++

```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
    while (1)
    {
        system("data.exe");
        system("baoli.exe");
        system("true.exe");
        if (system("fc true.txt baoli.txt"))
            break;
    }
    return 0;
}
```

# 编译相关脚本

chmod +x run.sh 命令增加可执行权限

./run.sh 文件名 命令运行，第一个参数是文件名
in.txt 里放输入数据，out.txt 里放输出数据

```bash
#!/bin/bash
set -e
g++ -std=c++17 -O2 -Wall "$1.cpp" -o main
./main < in.txt > out.txt
cat out.txt
```
