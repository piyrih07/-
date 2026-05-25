# 知识库：常见逻辑错误

本文件供智能体检索和参考，包含编程中常见的逻辑错误模式、触发条件和修复方法。

---

## 1. 循环类错误

### 1.1 死循环 — 忘记更新循环变量
**语言**: 通用
**严重程度**: 🔴 高
**典型代码**:
```python
# ❌ 错误
def sum_to_n(n):
    total, i = 0, 1
    while i <= n:
        total += i
        # 缺少 i += 1
    return total
```
**根因**: while 循环中循环变量 i 没有被更新，循环条件永远为真
**修复**: 在循环体末尾添加 `i += 1`
**规避策略**: 优先使用 for 循环代替 while；写 while 时先写循环变量更新语句

### 1.2 差一错误（Off-by-One）
**语言**: 通用
**严重程度**: 🔴 高
**典型代码**:
```python
# ❌ 跳过了第一个元素
for i in range(1, len(arr)):
    print(arr[i])
```
**根因**: Python 索引从 0 开始，range(1, n) 不包含 0
**修复**: 改为 `range(len(arr))` 或 `range(0, len(arr))`
**规避策略**: 始终确认：起始索引（0 还是 1）、结束条件（< 还是 <=）、范围是否覆盖所有元素

### 1.3 循环中修改集合
**语言**: Python / Java
**严重程度**: 🟡 中
**典型代码**:
```python
# ❌ 遍历时删除元素导致跳过
lst = [1, 2, 3, 4, 5]
for item in lst:
    if item % 2 == 0:
        lst.remove(item)
# 结果: [1, 3, 5]? 不一定！可能是 [1, 3, 4]（跳过了4）
```
**根因**: 删除元素后，后续元素前移，迭代器索引未相应调整
**修复**: 使用列表推导 `lst = [x for x in lst if x % 2 != 0]` 或倒序遍历
**规避策略**: 永远不要在遍历容器时直接修改它的大小

---

## 2. 变量与作用域错误

### 2.1 全局变量在函数内赋值
**语言**: Python
**严重程度**: 🟡 中
**典型代码**:
```python
count = 0
def increment():
    count += 1  # UnboundLocalError!
    return count
```
**根因**: Python 中，函数内对变量赋值会创建局部变量。`count += 1` 等价于 `count = count + 1`，读取时局部 count 尚未定义
**修复**: 在函数内声明 `global count` 或传参返回
**规避策略**: 尽量避免全局变量；使用函数参数和返回值传递数据

### 2.2 闭包中的变量捕获
**语言**: Python / JavaScript
**严重程度**: 🟡 中
**典型代码**:
```python
# ❌ 所有函数都打印 4
funcs = []
for i in range(5):
    funcs.append(lambda: print(i))
funcs[0]()  # 输出 4，而不是 0
```
**根因**: lambda 捕获的是变量 i 的引用而非值，调用时 i 已经变为 4
**修复**: `lambda i=i: print(i)`（用默认参数捕获当前值）
**规避策略**: 在循环中创建闭包时，使用默认参数绑定或 functools.partial

---

## 3. 条件判断错误

### 3.1 赋值与比较混淆
**语言**: JavaScript / C / C++
**严重程度**: 🔴 高
**典型代码**:
```javascript
// ❌ = 是赋值，不是比较
if (role = "admin") {  // 永远为 true
    grantAccess();
}
```
**根因**: `=` 是赋值操作，表达式返回赋值后的值（truthy），所以条件永远成立
**修复**: 使用 `===`（严格比较）
**规避策略**: JavaScript 中始终使用 `===`；C 中可以写成 `"admin" == role`（常量在左）

### 3.2 逻辑运算符优先级
**语言**: 通用
**严重程度**: 🟡 中
**典型代码**:
```python
# 意图：(A and B) or C
# 实际：A and (B or C)?  不，Python 中 and 优先于 or
if a and b or c:
    pass
```
**根因**: 开发者对 and/or 优先级记忆不清
**修复**: 始终加括号明确优先级 `(a and b) or c`
**规避策略**: 涉及混合 and/or 时，必须加括号

### 3.3 浮点数比较
**语言**: 通用
**严重程度**: 🟡 中
**典型代码**:
```python
# ❌ 可能为 False
0.1 + 0.2 == 0.3  # False! (0.30000000000000004)
```
**根因**: IEEE 754 浮点数表示存在精度误差
**修复**: `abs(a - b) < 1e-9` 或使用 `math.isclose(a, b)`
**规避策略**: 永远不要用 `==` 比较浮点数

---

## 4. 数据结构错误

### 4.1 数组越界
**语言**: 通用
**严重程度**: 🔴 高
**典型代码**:
```python
# ❌ range(len(arr) + 1) 最后一个索引越界
for i in range(len(arr) + 1):
    print(arr[i])  # IndexError when i == len(arr)
```
**根因**: 数组索引从 0 到 len-1，访问 arr[len(arr)] 越界
**修复**: `range(len(arr))`
**规避策略**: 注意循环边界；访问 arr[i+1] 时确保 i+1 < len(arr)

### 4.2 空集合未检查
**语言**: 通用
**严重程度**: 🔴 高
**典型代码**:
```python
def average(nums):
    return sum(nums) / len(nums)  # ZeroDivisionError if empty!
```
**根因**: 未处理空列表的边界情况
**修复**: 先检查 `if not nums: return 0`
**规避策略**: 对任何集合操作，先考虑空集合场景

### 4.3 可变默认参数
**语言**: Python
**严重程度**: 🟡 中
**典型代码**:
```python
# ❌ 默认列表在所有调用间共享
def add_item(item, lst=[]):
    lst.append(item)
    return lst

add_item("a")  # ['a']
add_item("b")  # ['a', 'b'] — 不是 ['b']!
```
**根因**: Python 默认参数在函数定义时只创建一次，可变对象被所有调用共享
**修复**: `def add_item(item, lst=None): lst = lst if lst is not None else []`
**规避策略**: 永远不要用可变对象（list/dict/set）作为默认参数

### 4.4 浅拷贝陷阱
**语言**: Python / JavaScript
**严重程度**: 🟡 中
**典型代码**:
```python
# ❌ 内层列表仍是引用
matrix = [[0] * 3] * 3
matrix[0][0] = 1
# 结果：[[1,0,0],[1,0,0],[1,0,0]] 三行全变了！
```
**根因**: `[x] * 3` 创建 3 个指向同一对象的引用
**修复**: `matrix = [[0]*3 for _ in range(3)]`（列表推导创建独立对象）
**规避策略**: 创建嵌套数据结构时使用推导式或 copy.deepcopy

---

## 5. 字符串与类型错误

### 5.1 字符串不可变性
**语言**: Python / Java
**严重程度**: 🟢 低
**典型代码**:
```python
s = "hello"
s[0] = 'H'  # TypeError: 'str' does not support item assignment
```
**根因**: Python/Java 中字符串是不可变类型
**修复**: `s = 'H' + s[1:]` 或用列表操作
**规避策略**: 需要频繁修改字符时，先转为列表，最后 join

### 5.2 整除截断
**语言**: Python 2 / C / Java
**严重程度**: 🟡 中
**典型代码**:
```java
// Java: 整数除法截断小数部分
int avg = (3 + 4) / 2;  // 结果为 3，不是 3.5
```
**根因**: 整数除整数在 C/Java 中结果仍为整数（截断）
**修复**: `double avg = (3 + 4) / 2.0;`（至少一个操作数为浮点数）
**规避策略**: 涉及除法时，明确是否需要浮点结果
