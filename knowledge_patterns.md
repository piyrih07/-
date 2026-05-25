# 知识库：代码模式识别

本文件帮助智能体快速识别代码中使用的编程模式和语法结构，以便更准确地进行解释。

---

## Python 模式识别

### 语法模式
| 模式 | 示例 | 含义 |
|------|------|------|
| 列表推导 | `[x*2 for x in arr if x > 0]` | 创建新列表，等价于 for+if+append |
| 字典推导 | `{k: v for k, v in items}` | 创建新字典 |
| 元组解包 | `a, b = b, a` | 同时赋值/交换变量 |
| 三元表达式 | `x if condition else y` | 条件赋值 |
| walrus运算符 | `if (n := len(s)) > 10:` | 赋值的同时进行比较（Python 3.8+）|
| f-string | `f"Hello {name}"` | 格式化字符串 |
| `*args, **kwargs` | `def func(*args, **kwargs):` | 可变参数 |
| 装饰器 | `@decorator` | 函数包装器 |
| 上下文管理器 | `with open(f) as fp:` | 自动资源管理 |
| 生成器表达式 | `sum(x*x for x in range(n))` | 惰性计算，节省内存 |
| 海象运算符 | `while chunk := f.read(8192):` | 循环中赋值并判断 |

### 常见惯用法
| 惯用法 | 代码 | 说明 |
|--------|------|------|
| 枚举遍历 | `for i, val in enumerate(arr):` | 同时获取索引和值 |
| zip并行遍历 | `for a, b in zip(list1, list2):` | 并行遍历多个序列 |
| 默认字典 | `from collections import defaultdict` | 自动初始化的字典 |
| 排序key | `sorted(arr, key=lambda x: x[1])` | 自定义排序规则 |
| any/all | `if any(x > 0 for x in arr):` | 存在/全部满足条件 |
| 链式比较 | `if 0 <= x < n:` | 等价于 0<=x and x<n |

---

## JavaScript 模式识别

### 语法模式
| 模式 | 示例 | 含义 |
|------|------|------|
| 箭头函数 | `const fn = (x) => x * 2` | 简洁的函数定义 |
| 解构赋值 | `const {name, age} = person` | 从对象/数组提取值 |
| 展开运算符 | `[...arr1, ...arr2]` | 展开数组/对象 |
| 模板字符串 | `` `Hello ${name}` `` | 模板字面量 |
| 可选链 | `obj?.prop?.nested` | 安全访问嵌套属性 |
| 空值合并 | `value ?? defaultValue` | null/undefined 时取默认值 |
| Promise/async | `const data = await fetch(url)` | 异步操作 |
| map/filter/reduce | `arr.filter(x => x > 0).map(x => x*2)` | 函数式数据处理 |

---

## Java 模式识别

### 语法模式
| 模式 | 示例 | 含义 |
|------|------|------|
| 泛型 | `List<String> list` | 类型参数化 |
| Lambda | `list.forEach(x -> System.out.println(x))` | 简洁的匿名函数 |
| Stream API | `list.stream().filter(x -> x > 0).collect(...)` | 流式数据处理 |
| try-with-resources | `try (var br = new BufferedReader(...))` | 自动关闭资源 |
| var 类型推断 | `var list = new ArrayList<String>()` | 局部变量类型推断（Java 10+）|
| record | `record Point(int x, int y) {}` | 不可变数据类（Java 16+）|

---

## C/C++ 模式识别

### 语法模式
| 模式 | 示例 | 含义 |
|------|------|------|
| 指针操作 | `*ptr, &var, ptr->field` | 解引用、取地址、箭头访问 |
| 数组衰减 | `void func(int arr[])` | 数组传参退化为指针 |
| 宏定义 | `#define MAX(a,b) ((a)>(b)?(a):(b))` | 预处理器宏 |
| typedef/using | `typedef struct {...} Node;` | 类型别名 |
| RAII | 构造获取资源，析构释放 | C++ 资源管理范式 |
| 智能指针 | `std::unique_ptr<T>` | C++ 自动内存管理 |
| range-based for | `for (auto& x : vec)` | C++11 范围遍历 |
| auto | `auto it = vec.begin()` | 类型自动推导 |

---

## 设计模式识别

| 模式 | 关键特征 | 用途 |
|------|----------|------|
| 单例模式 | 私有构造函数 + static getInstance() | 全局唯一实例 |
| 工厂模式 | create/build 方法返回不同子类 | 解耦对象创建 |
| 观察者模式 | subscribe/on/addEventListener | 事件驱动通知 |
| 策略模式 | 接口 + 不同实现类作为参数 | 运行时切换算法 |
| 装饰器模式 | 包装原对象，增加新行为 | 动态扩展功能 |
| 迭代器模式 | `__iter__` + `__next__` / Iterator 接口 | 统一遍历接口 |

---

## 复杂度快速判断

### 时间复杂度识别规则
| 代码特征 | 复杂度 |
|----------|--------|
| 无循环，直接计算 | O(1) |
| 单层循环遍历 n 个元素 | O(n) |
| 嵌套两层循环 | O(n²) |
| 每次问题规模减半（二分） | O(log n) |
| 排序后操作 | O(n log n) |
| 遍历所有子集 | O(2ⁿ) |
| 遍历所有排列 | O(n!) |
| 树的遍历（每节点一次） | O(n) |
| 图的 BFS/DFS | O(V + E) |
| 动态规划（二维表） | O(n × m) |

### 空间复杂度识别规则
| 代码特征 | 复杂度 |
|----------|--------|
| 仅用固定数量变量 | O(1) |
| 创建与输入等大的数组 | O(n) |
| 二维 DP 表 | O(n × m) |
| 递归（递归深度 d） | O(d)（栈空间）|
| 哈希表存所有元素 | O(n) |
