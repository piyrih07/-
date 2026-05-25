# 知识库：算法解题模板

本文件供智能体检索和参考，包含常见算法题型的解题框架和代码模板。

---

## 1. 双指针

### 适用场景
- 有序数组查找配对
- 链表快慢指针
- 回文判断
- 接雨水 / 盛最多水

### 模板
```python
# 对撞双指针（有序数组）
def two_pointer(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]
```

### 经典题目
- 两数之和 II（有序数组）
- 三数之和
- 盛最多水的容器
- 验证回文串

---

## 2. 滑动窗口

### 适用场景
- 子串/子数组问题
- 最长/最短满足条件的连续序列

### 模板
```python
# 可变长度滑动窗口
def sliding_window(s):
    window = {}  # 窗口内状态
    left = 0
    result = 0
    for right in range(len(s)):
        # 1. 扩展窗口：将 s[right] 加入窗口
        c = s[right]
        window[c] = window.get(c, 0) + 1
        
        # 2. 收缩窗口：当窗口不满足条件时
        while window_needs_shrink(window):
            d = s[left]
            window[d] -= 1
            if window[d] == 0:
                del window[d]
            left += 1
        
        # 3. 更新结果
        result = max(result, right - left + 1)
    return result
```

### 经典题目
- 无重复字符的最长子串
- 最小覆盖子串
- 字符串的排列
- 长度最小的子数组

---

## 3. 二分查找

### 适用场景
- 有序数组查找
- 查找满足条件的第一个/最后一个位置
- 搜索旋转排序数组

### 模板
```python
# 标准二分查找
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2  # 防止溢出
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# 查找左边界（第一个 >= target 的位置）
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left
```

### 经典题目
- 搜索旋转排序数组
- 在排序数组中查找第一个和最后一个位置
- 寻找峰值
- 搜索二维矩阵

---

## 4. BFS（广度优先搜索）

### 适用场景
- 最短路径
- 层序遍历
- 拓扑排序

### 模板
```python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    level = 0
    while queue:
        size = len(queue)  # 当前层节点数
        for _ in range(size):
            node = queue.popleft()
            # 处理当前节点
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        level += 1
    return level
```

### 经典题目
- 二叉树层序遍历
- 岛屿数量
- 单词接龙
- 腐烂的橘子

---

## 5. DFS（深度优先搜索）

### 适用场景
- 路径搜索
- 排列/组合/子集
- 连通分量

### 模板
```python
# 回溯法通用模板
def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:])  # 注意拷贝
        return
    for choice in choices:
        if is_valid(choice):
            path.append(choice)       # 做选择
            backtrack(path, choices)   # 递归
            path.pop()                # 撤销选择
```

### 经典题目
- 全排列
- 子集
- 组合总和
- N皇后

---

## 6. 动态规划

### 适用场景
- 最优化问题（最大/最小/计数）
- 具有重叠子问题和最优子结构

### 五步法
1. **定义状态**: dp[i] 代表什么？
2. **状态转移方程**: dp[i] = f(dp[i-1], dp[i-2], ...)
3. **初始条件**: dp[0] = ?
4. **遍历顺序**: 确保计算 dp[i] 时，依赖的子问题已经计算完
5. **返回值**: dp[n]? max(dp)? dp[-1][-1]?

### 模板
```python
# 一维 DP
def dp_1d(n):
    dp = [0] * (n + 1)
    dp[0] = base_case_0
    dp[1] = base_case_1
    for i in range(2, n + 1):
        dp[i] = transition(dp[i-1], dp[i-2])
    return dp[n]

# 二维 DP（如编辑距离）
def dp_2d(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n+1) for _ in range(m+1)]
    # 初始化边界
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    # 填表
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]
```

### 经典题目
- 爬楼梯 / 斐波那契
- 最大子数组和（Kadane）
- 最长递增子序列
- 背包问题（0-1 / 完全）
- 编辑距离
- 最长公共子序列

---

## 7. 哈希表

### 适用场景
- O(1) 查找/计数
- 去重
- 分组

### 模板
```python
# 频率计数
from collections import Counter
freq = Counter(arr)

# 两数之和模式：边遍历边查找
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

---

## 8. 单调栈

### 适用场景
- 下一个更大/更小元素
- 柱状图最大矩形
- 接雨水

### 模板
```python
# 下一个更大元素
def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # 存索引
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    return result
```

---

## 9. 并查集

### 适用场景
- 动态连通性
- 岛屿数量变体
- 冗余连接

### 模板
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # 路径压缩
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
```

---

## 10. 前缀和 / 差分

### 适用场景
- 频繁查询区间和
- 区间更新

### 模板
```python
# 前缀和
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i+1] = prefix[i] + arr[i]

# 查询区间 [l, r] 的和
range_sum = prefix[r+1] - prefix[l]
```
