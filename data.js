// ===== 代码解释示例数据 =====
const CODE_EXAMPLES = {
    python: [
        {
            name: "二分查找",
            code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
            explanations: [
                "定义函数 binary_search，接收有序数组 arr 和目标值 target",
                "初始化左指针 left=0，右指针 right=数组最后一个索引",
                "当左指针不超过右指针时，持续循环查找",
                "计算中间位置索引，使用整除避免小数",
                "如果中间元素正好等于目标值",
                "找到目标，返回其索引位置",
                "如果中间元素小于目标值",
                "目标在右半部分，左指针移到 mid+1",
                "否则（中间元素大于目标值）",
                "目标在左半部分，右指针移到 mid-1",
                "循环结束仍未找到，返回 -1 表示不存在"
            ]
        },
        {
            name: "冒泡排序",
            code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
            explanations: [
                "定义冒泡排序函数，接收数组 arr",
                "获取数组长度 n",
                "外层循环控制排序轮数，共需 n 轮",
                "设置标志位，用于优化：如果某轮没有交换则已排好序",
                "内层循环：每轮把最大值'冒泡'到末尾，已排好的部分不再比较",
                "比较相邻的两个元素",
                "如果前一个大于后一个，则交换位置（Python元组交换）",
                "标记本轮发生了交换",
                "如果本轮没有发生任何交换",
                "说明数组已有序，提前退出，这是冒泡排序的优化",
                "返回排序后的数组"
            ]
        },
        {
            name: "斐波那契（动态规划）",
            code: `def fibonacci(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
            explanations: [
                "定义斐波那契函数，参数 n 表示求第 n 个斐波那契数",
                "基准条件：n 为 0 或 1 时直接返回 n",
                "直接返回 n（fib(0)=0, fib(1)=1）",
                "创建长度为 n+1 的 dp 数组，初始化全为 0",
                "dp[0] = 0，第 0 个斐波那契数",
                "dp[1] = 1，第 1 个斐波那契数",
                "从第 2 个开始，逐个计算到第 n 个",
                "状态转移方程：当前值 = 前两个值之和",
                "返回第 n 个斐波那契数"
            ]
        }
    ],
    javascript: [
        {
            name: "数组去重",
            code: `function unique(arr) {
    const result = [];
    const seen = new Set();
    for (const item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    return result;
}`,
            explanations: [
                "定义去重函数，接收数组 arr",
                "创建空数组 result 用于存放去重后的结果",
                "创建 Set 集合 seen 用于记录已出现的元素（查找效率 O(1)）",
                "遍历数组中的每个元素",
                "判断当前元素是否从未出现过",
                "将新元素加入 seen 集合",
                "同时将新元素加入结果数组",
                "闭合 if 语句块",
                "闭合 for 循环",
                "返回去重后的数组"
            ]
        }
    ],
    java: [
        {
            name: "单例模式",
            code: `public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
            explanations: [
                "定义公共类 Singleton（单例模式）",
                "用 volatile 修饰静态实例变量，防止指令重排序导致的线程安全问题",
                "私有构造函数，外部无法直接 new 创建实例",
                "公共静态方法，提供全局唯一的访问入口",
                "第一次检查：如果实例已存在，直接跳到返回，避免加锁开销",
                "加同步锁，确保只有一个线程进入创建逻辑",
                "第二次检查（双重检查锁定）：防止多个线程同时通过第一次检查",
                "创建唯一实例",
                "闭合内层 if",
                "闭合 synchronized 块",
                "闭合外层 if",
                "返回单例实例",
                "闭合类定义"
            ]
        }
    ],
    c: [
        {
            name: "链表反转",
            code: `struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
            explanations: [
                "定义函数，接收链表头节点指针，返回反转后的头节点",
                "初始化 prev 指针为 NULL（反转后的尾节点指向 NULL）",
                "curr 指针指向当前节点，从 head 开始",
                "遍历链表直到 curr 为空",
                "临时保存下一个节点（因为接下来要修改 curr->next）",
                "核心操作：将当前节点的 next 指向前一个节点（反转指针方向）",
                "prev 前进到当前节点",
                "curr 前进到下一个节点",
                "循环结束",
                "prev 现在指向原链表的最后一个节点，即新链表的头节点"
            ]
        }
    ]
};

// ===== 逻辑错误数据 =====
const DEBUG_DATA = [
    {
        category: "🔄 循环错误",
        icon: "🔄",
        items: [
            {
                title: "死循环 - 忘记更新循环变量",
                difficulty: "简单",
                code: `# 计算 1 到 n 的和
def sum_to_n(n):
    total = 0
    i = 1
    while i <= n:
        total += i
        # 忘记 i += 1
    return total`,
                hint: "检查 while 循环中，循环变量 i 是否在每次迭代中发生了变化？",
                answer: "循环体内缺少 `i += 1`，导致 i 永远为 1，循环条件永远为真，形成死循环。",
                fixedCode: `def sum_to_n(n):
    total = 0
    i = 1
    while i <= n:
        total += i
        i += 1  # 修复：每次循环 i 加 1
    return total`
            },
            {
                title: "差一错误（Off-by-One）",
                difficulty: "中等",
                code: `# 打印数组所有元素
def print_all(arr):
    for i in range(1, len(arr)):
        print(arr[i])

# 调用：print_all([10, 20, 30])
# 期望输出：10 20 30
# 实际输出：20 30`,
                hint: "Python 的数组索引从几开始？range(1, n) 会包含 0 吗？",
                answer: "range(1, len(arr)) 从索引 1 开始，跳过了索引 0 的第一个元素。应改为 range(0, len(arr)) 或 range(len(arr))。",
                fixedCode: `def print_all(arr):
    for i in range(len(arr)):  # 从 0 开始
        print(arr[i])`
            }
        ]
    },
    {
        category: "📦 变量作用域",
        icon: "📦",
        items: [
            {
                title: "变量遮蔽 - 局部与全局",
                difficulty: "中等",
                code: `count = 0

def increment():
    count += 1  # UnboundLocalError!
    return count

print(increment())`,
                hint: "在函数内部对一个变量赋值时，Python 会将它视为什么类型的变量？",
                answer: "Python 中，在函数内对变量赋值会创建局部变量。`count += 1` 等价于 `count = count + 1`，读取时局部 count 尚未赋值，触发 UnboundLocalError。需要用 `global count` 声明。",
                fixedCode: `count = 0

def increment():
    global count  # 声明使用全局变量
    count += 1
    return count`
            }
        ]
    },
    {
        category: "⚡ 条件判断",
        icon: "⚡",
        items: [
            {
                title: "条件短路 - 逻辑运算符误用",
                difficulty: "中等",
                code: `# 判断年份是否为闰年
def is_leap_year(year):
    if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
        return True
    return False

# is_leap_year(1900) 应返回 False
# 但实际返回 True`,
                hint: "Python 中 and 和 or 的优先级谁更高？加括号会改变结果吗？",
                answer: "and 优先级高于 or。表达式被解析为 `(year%4==0 and year%100!=0) or (year%400==0)`，对于 1900：4整除且100也整除，前半为 False；400不整除，后半 False。实际上对于1900原式结果正确返回False。但更清晰的写法应加括号明确优先级避免歧义。",
                fixedCode: `def is_leap_year(year):
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        return True
    return False`
            },
            {
                title: "== 与 = 混淆",
                difficulty: "简单",
                code: `// JavaScript: 判断是否为管理员
function checkAdmin(role) {
    if (role = "admin") {  // 用了 = 而不是 ===
        return true;
    }
    return false;
}
// checkAdmin("user") 也返回 true!`,
                hint: "JavaScript 中 = 和 === 分别是什么操作？赋值表达式的返回值是什么？",
                answer: "`=` 是赋值操作符，`role = \"admin\"` 会将 role 赋值为 \"admin\" 并返回该值（truthy），所以 if 永远为真。应使用 `===` 严格比较。",
                fixedCode: `function checkAdmin(role) {
    if (role === "admin") {  // 使用严格比较
        return true;
    }
    return false;
}`
            }
        ]
    },
    {
        category: "🧮 数组/边界",
        icon: "🧮",
        items: [
            {
                title: "数组越界",
                difficulty: "简单",
                code: `# 查找数组中的最大值
def find_max(arr):
    max_val = arr[0]
    for i in range(len(arr) + 1):  # 越界！
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val`,
                hint: "如果数组长度为 5，range(6) 会产生哪些索引？最大合法索引是多少？",
                answer: "`range(len(arr) + 1)` 会产生 0 到 len(arr)，而最大合法索引是 len(arr)-1。当 i=len(arr) 时，arr[i] 越界。应改为 `range(len(arr))`。",
                fixedCode: `def find_max(arr):
    max_val = arr[0]
    for i in range(len(arr)):  # 去掉 +1
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val`
            },
            {
                title: "空数组未处理",
                difficulty: "中等",
                code: `def average(numbers):
    total = sum(numbers)
    return total / len(numbers)

# average([]) -> ZeroDivisionError!`,
                hint: "当传入空列表时，len(numbers) 的值是什么？除数可以为 0 吗？",
                answer: "空列表的长度为 0，`total / 0` 会触发 ZeroDivisionError。应在函数开头检查数组是否为空。",
                fixedCode: `def average(numbers):
    if not numbers:  # 检查空列表
        return 0
    total = sum(numbers)
    return total / len(numbers)`
            }
        ]
    },
    {
        category: "🔗 引用陷阱",
        icon: "🔗",
        items: [
            {
                title: "可变默认参数陷阱",
                difficulty: "困难",
                code: `def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item("a"))  # ['a']
print(add_item("b"))  # 期望 ['b']，实际 ['a', 'b']!`,
                hint: "Python 函数的默认参数在什么时候被创建？是每次调用都创建新的，还是只创建一次？",
                answer: "Python 的可变默认参数（如列表）只在函数定义时创建一次，后续调用共享同一个对象。每次 append 都会修改这个共享的列表。应使用 None 作为默认值。",
                fixedCode: `def add_item(item, lst=None):
    if lst is None:
        lst = []  # 每次调用创建新列表
    lst.append(item)
    return lst`
            }
        ]
    }
];

// ===== 算法题数据 =====
const ALGO_DATA = [
    {
        title: "两数之和",
        tags: ["哈希表", "数组"],
        difficulty: "easy",
        desc: "给定一个整数数组和一个目标值，找出数组中和为目标值的两个数的索引。",
        steps: [
            {
                title: "理解题意",
                content: "在数组中找到两个数，使它们的和等于目标值 target。返回这两个数的索引。假设每种输入只有一种答案，且不能重复使用同一个元素。"
            },
            {
                title: "暴力思路（O(n²)）",
                content: "最直观的方法：双重循环遍历所有组合，检查是否有两个数之和等于 target。",
                code: `def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`
            },
            {
                title: "优化思路 - 哈希表（O(n)）",
                content: "核心思想：遍历数组时，对于每个数 x，我们需要找的是 target - x。用哈希表存储已遍历的数及其索引，就能在 O(1) 时间内查找。",
                code: `def two_sum(nums, target):
    seen = {}  # 值 -> 索引
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`
            },
            {
                title: "关键洞察",
                content: "将「两数之和」转化为「查找差值」问题。哈希表的 O(1) 查找将时间复杂度从 O(n²) 降至 O(n)。这是空间换时间的经典案例。"
            }
        ],
        complexity: { time: "O(n)", space: "O(n)" }
    },
    {
        title: "反转链表",
        tags: ["链表", "指针"],
        difficulty: "easy",
        desc: "反转一个单链表。",
        steps: [
            {
                title: "理解题意",
                content: "将链表 1→2→3→4→5 反转为 5→4→3→2→1。需要改变每个节点的 next 指针方向。"
            },
            {
                title: "迭代法 - 三指针",
                content: "使用 prev、curr、next 三个指针。每次将 curr 的 next 指向 prev，然后三个指针同时前进。",
                code: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next  # 保存下一个
        curr.next = prev       # 反转指向
        prev = curr            # prev 前进
        curr = next_node       # curr 前进
    return prev  # prev 就是新的头`
            },
            {
                title: "关键洞察",
                content: "必须在修改 curr.next 之前保存 next 节点，否则链表会断开。prev 最终指向原链表的最后一个节点，即新链表的头节点。"
            }
        ],
        complexity: { time: "O(n)", space: "O(1)" }
    },
    {
        title: "有效括号",
        tags: ["栈", "字符串"],
        difficulty: "easy",
        desc: "判断字符串中的括号是否有效匹配。含 ()[]{}。",
        steps: [
            {
                title: "理解题意",
                content: "\"()[]{}\" 有效，\"(]\" 无效，\"([)]\" 无效，\"{[]}\" 有效。括号必须以正确的顺序配对关闭。"
            },
            {
                title: "栈的思路",
                content: "遇到左括号就入栈，遇到右括号就检查栈顶是否是对应的左括号。最后栈为空则有效。",
                code: `def is_valid(s):
    stack = []
    mapping = {')':'(', ']':'[', '}':'{'}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`
            },
            {
                title: "关键洞察",
                content: "栈的后进先出特性完美匹配括号嵌套结构。注意边界：空栈时遇到右括号、遍历结束后栈非空。"
            }
        ],
        complexity: { time: "O(n)", space: "O(n)" }
    },
    {
        title: "爬楼梯",
        tags: ["动态规划"],
        difficulty: "easy",
        desc: "每次可以爬 1 或 2 个台阶，求爬到第 n 阶有多少种方法。",
        steps: [
            {
                title: "理解题意",
                content: "n=1 → 1种（1）；n=2 → 2种（1+1, 2）；n=3 → 3种（1+1+1, 1+2, 2+1）。"
            },
            {
                title: "发现规律 - 斐波那契",
                content: "到达第 n 阶，只能从第 n-1 阶（走1步）或第 n-2 阶（走2步）到达。所以 f(n) = f(n-1) + f(n-2)，就是斐波那契数列！"
            },
            {
                title: "动态规划解法",
                content: "自底向上计算，只需保存前两个状态。",
                code: `def climb_stairs(n):
    if n <= 2:
        return n
    prev1, prev2 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev1 = prev2
        prev2 = curr
    return prev2`
            },
            {
                title: "关键洞察",
                content: "这是动态规划入门经典题。关键是定义状态 dp[i] = 到第 i 阶的方法数，找到状态转移方程 dp[i] = dp[i-1] + dp[i-2]。"
            }
        ],
        complexity: { time: "O(n)", space: "O(1)" }
    },
    {
        title: "最大子数组和",
        tags: ["动态规划", "数组"],
        difficulty: "medium",
        desc: "找到一个具有最大和的连续子数组，返回其最大和。",
        steps: [
            {
                title: "理解题意",
                content: "数组 [-2,1,-3,4,-1,2,1,-5,4]，最大子数组为 [4,-1,2,1]，和为 6。子数组必须是连续的。"
            },
            {
                title: "Kadane 算法",
                content: "核心思想：遍历数组，对于每个位置，决定是「加入当前子数组」还是「从当前位置重新开始」。如果之前的累加和为负数，不如从当前元素重新开始。",
                code: `def max_subarray(nums):
    max_sum = nums[0]
    curr_sum = nums[0]
    for i in range(1, len(nums)):
        curr_sum = max(nums[i], curr_sum + nums[i])
        max_sum = max(max_sum, curr_sum)
    return max_sum`
            },
            {
                title: "关键洞察",
                content: "curr_sum = max(nums[i], curr_sum + nums[i]) 这行是核心：如果 curr_sum + nums[i] < nums[i]，说明 curr_sum < 0，前面的累加和是负担，不如丢弃。"
            }
        ],
        complexity: { time: "O(n)", space: "O(1)" }
    },
    {
        title: "二叉树层序遍历",
        tags: ["BFS", "树"],
        difficulty: "medium",
        desc: "按层遍历二叉树，返回每一层的节点值。",
        steps: [
            {
                title: "理解题意",
                content: "给定二叉树 [3,9,20,null,null,15,7]，返回 [[3],[9,20],[15,7]]。每一层的节点从左到右收集。"
            },
            {
                title: "BFS + 队列",
                content: "使用队列实现广度优先搜索。关键是每次处理一整层：记录当前层的节点数，一次性处理完当前层。",
                code: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)  # 当前层节点数
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`
            },
            {
                title: "关键洞察",
                content: "用 level_size = len(queue) 记录当前层节点数是关键技巧。这样可以区分不同层的节点，实现按层收集。"
            }
        ],
        complexity: { time: "O(n)", space: "O(n)" }
    },
    {
        title: "LRU 缓存",
        tags: ["哈希表", "链表", "设计"],
        difficulty: "hard",
        desc: "设计一个 LRU（最近最少使用）缓存，支持 get 和 put 操作，均为 O(1)。",
        steps: [
            {
                title: "理解题意",
                content: "LRU 缓存有容量限制。get(key) 获取值并标记为最近使用；put(key,value) 插入/更新，超容量时淘汰最久未使用的。"
            },
            {
                title: "数据结构选择",
                content: "需要 O(1) 查找 → 哈希表；需要 O(1) 插入/删除/移动 → 双向链表。二者结合：哈希表的值存链表节点引用。"
            },
            {
                title: "实现思路",
                content: "链表头部是最近使用的，尾部是最久未使用的。get 时将节点移到头部；put 时新节点加到头部，超容量时删除尾部。",
                code: `# Python 可用 OrderedDict 简化实现
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.cap = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # 标记最近使用
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # 删除最久未用`
            },
            {
                title: "关键洞察",
                content: "这道题考察的是数据结构组合设计能力。哈希表 + 双向链表的组合，使得查找、插入、删除都是 O(1)。OrderedDict 底层就是这种结构。"
            }
        ],
        complexity: { time: "O(1) per operation", space: "O(capacity)" }
    }
];
