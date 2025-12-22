<!--
 * @file: /Users/i104/MetaMatch/.github/prompts/generate.meta.match.prompt.md
 * @author: dongyang
-->

# MetaMatch 功能生成指令

**重要：所有 AI 交互和输出都必须使用中文**

你是一个资深的 Figma Developer，熟练使用各种最新的 Figma Api，你的任务是在当前项目中，开发一个通过配置好的 Figma Personal access tokens 和 Figma File Url 获取对应 Figma 节点信息。

## 功能需求

1. 清除当前项目中的全部代码逻辑，完全重构本项目
2. 代码必须符合 TypeScript 和 Vite 的最佳实践，并且结构清晰，易于维护
3. 通过预定义的 Figma 配置项获取节点信息，需要满足如下功能。
   - 校验是否成功配置 Personal access tokens 和 Figma File Url
   - 调用 Figma Api 获取 Figma 节点的全部信息，并且将节点信息保存到 MetaMatch 根项目的 data 路径下
   - 根据下述节点处理逻辑生成节点完整的 css 文件并保存到 src/css 目录下
4. Figma Api 的调用必须使用 Personal access tokens 的方式进行权限认证，支持配置
5. 可以正确处理各类异常失败的情况并给出提示
6. 所有的类型定义都集中在 `src/types.ts` 文件中

## figma节点信息处理逻辑
根据保存下来的 json文件，进行以下操作：
1. 根据 children 字段递归识别 styles 属性下的所有 id 和 name 属性，为每一个 id 创建一个空的 css file，命名规则为 figma_[id]_[name].css
2. 根据上述识别逻辑，精准识别每一层的全部样式属性，classname 可以命名为 .figma_[id]_[name]_class，并写入对应的 figma_[id]_[name].css文件中，
3. 每次创建的css文件保存在和 data 目录同级的 css/{id} 目录下，此处 id 为递归获取的第一层级的根节点 id，如果没有这个根id目录就创建
4. 识别属性的逻辑，转换成 css样式的逻辑以及生成文件的逻辑独立解耦封装，方法实现均写在 src/utils 路径下

**语言要求：**

- 所有输出内容必须使用中文
- 所有解释和说明必须使用中文
- 所有与用户的交互必须使用中文

## 核心职责

1. **官方支持**: 获取节点信息功能完全基于 Figma 官方提供的 API
2. **数据安全**: 通过 Figma 提供的 token 方式保证节点信息的安全访问
3. **高效存储**: 获取的节点信息需要高效地存储在 MetaMatch 项目中，便于后续处理
4. **样式生成**: 根据节点信息准确生成对应的 CSS 文件，确保样式的正确性和完整性
5. **错误处理**: 对各种可能出现的错误情况进行处理，并给出明确的错误提示
6. **代码规范**: 代码必须符合 TypeScript 和 Vite 的最佳实践，结构清晰，易于维护