# CodeMentor Skill - 编程教学智能体技能包

## 概述
本 Skill 为 AI 智能体提供编程教学能力，包含三大核心技能：
1. **逐行解释代码** — 系统化地分析和解释任意代码
2. **找出逻辑错误** — 识别代码中常见的逻辑陷阱
3. **算法解题引导** — 引导式的算法问题解题思路

## 文件结构
```
skill/
├── README.md                 ← 本文件（技能包说明）
├── skill_main.md             ← 主技能指令（智能体加载入口）
├── knowledge_bugs.md         ← 知识库：常见逻辑错误
├── knowledge_algorithms.md   ← 知识库：算法解题模板
└── knowledge_patterns.md     ← 知识库：代码模式识别
```

## 使用方式
1. **完整加载**：让智能体读取 `skill_main.md` 作为系统指令
2. **按需加载**：根据任务场景，加载对应的 knowledge 文件
3. **嵌入 Prompt**：将 `skill_main.md` 内容嵌入到智能体的 System Prompt 中

## 示例
```
# 加载方式一：直接作为 System Prompt
system_prompt = open("skill/skill_main.md").read()

# 加载方式二：RAG 检索
将 knowledge_*.md 文件切片后存入向量数据库，按用户问题检索相关片段
```
